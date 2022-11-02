import { createClient } from "@dotinc/bouncer-client";
import fs from "fs";
import { Zodios, ZodiosOptions } from "@zodios/core";
import { ZodError, ZodFormattedError } from "zod";
import { configApi, subscriptionApi } from "@dotinc/bouncer-core";
import type { CancellablePromiseLike } from "../../utils/task-queue.js";
import { AxiosError } from "axios";
import jq from "node-jq";
import { isDeepStrictEqual } from "util";
import cuid from "cuid";

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
      return undefined;
    })
    .filter(Boolean);

const newSubscriptions = (baseUrl: string, opts?: ZodiosOptions) =>
  new Zodios(baseUrl, subscriptionApi, opts);
const newConfig = (baseUrl: string, opts?: ZodiosOptions) =>
  new Zodios(baseUrl, configApi, opts);

const seatId = cuid();

export type TestCase = {
  name: string;
  description?: string;
  started?: bigint;
  startedAt?: string;
  finishedAt?: string;
  result?: string;
  executionTime?: string;
  error?: any;
};

export type Test = {
  type: "api" | "event";
  fn: (opts: { baseUrl: string }) => Promise<any>;
  cancellationToken?: CancellablePromiseLike<any>;
  data: TestCase;
};

const sample = async (
  res:
    | (
        | "publisher"
        | "redeem_seat"
        | "request_limited_seat"
        | "request_seat_2"
        | "request_seat_3"
        | "request_seat_4"
        | "request_seat_5"
        | "reserve_seat"
        | "subscription_patch"
        | "subscription"
      )
    | string
) => {
  // cwd = package dir
  return JSON.parse(
    fs.readFileSync(`src/functions/test/${res}.json`).toString()
  );
};

const stringErrorWithDetails = (e: any) => {
  let details = "";
  if (e instanceof AxiosError) {
    details = ": " + e.response?.data.message;
  }
  if (e.cause instanceof ZodError) {
    console.log("zod error", e.cause.issues);
    details = ": " + formatErrors(e.cause.format()).join(" AND ");
  }
  return new Error(`${e.message}${details}`);
};

export const tests: Test[] = [
  {
    type: "api",
    fn: async (opts) => {
      const client = newConfig(opts.baseUrl ?? "");
      const pub = await sample("publisher");
      try {
        return await client.publisherConfiguration(pub);
      } catch (e: any) {
        throw stringErrorWithDetails(e);
      }
    },
    data: {
      name: "Test #1 - create a new publisher",
    },
  },
  {
    type: "api",
    fn: async (opts) => {
      const client = newSubscriptions(opts.baseUrl);
      const sub = await sample("subscription");
      const pub = await sample("publisher");
      const { subscription_id: subscriptionId } = sub;
      const { id: publisherId } = pub;
      try {
        return await client.createSubscription(sub, {
          params: { publisherId, subscriptionId },
        });
      } catch (e) {
        throw stringErrorWithDetails(e);
      }
    },
    data: {
      name: "Test #2 - create a new subscription",
    },
  },
  {
    type: "api",
    fn: async (opts) => {
      const client = newSubscriptions(opts.baseUrl);
      const sub = await sample("subscription");
      const { subscription_id: subscriptionId } = sub;
      const patch = await sample("subscription_patch");

      try {
        const updated = await client.updateSubscription(patch, {
          params: {
            subscriptionId,
          },
        });

        try {
          const matchMask =
            "{subscription_id, subscription_name, plan_id, state, admin_role_name, user_role_name, admin_name, admin_email, total_seats, subscriber_country: .subscriber_info.country, source_subscription_id: .source_subscription.id, seating_strategy_name: .seating_config.seating_strategy_name, limited_overflow_seating: .seating_config.limited_overflow_seating_enabled, reservation_expiry: .seating_config.seat_reservation_expiry_in_days, seat_expiry: .seating_config.default_seat_expiry_in_days}";
          const patchjq = await jq.run(matchMask, patch, { input: "json" });
          const updatedjq = await jq.run(matchMask, updated, { input: "json" });

          if (isDeepStrictEqual(patchjq, updatedjq))
            return "Expected patch applied.";
          else
            throw new Error("returned update result did not match the input.");
        } catch (e: any) {
          throw new Error("comparison failed: " + e.message);
        }
      } catch (e) {
        throw stringErrorWithDetails(e);
      }
    },
    data: {
      name: "Test #3 - Patch an existing subscription",
    },
  },
  {
    type: "api",
    data: {
      name: "Test #4 - Reserve a seat in the subscription",
    },
    fn: async (opts) => {
      const client = createClient({ baseUrl: opts.baseUrl, apiKey: "" });
      const sub = await sample("subscription");
      const reserve = await sample("reserve_seat");
      const { subscription_id: subscriptionId } = sub;

      try {
        const resp = await client.seats.reserve(
          { subscriptionId, seatId },
          reserve
        );

        if (
          resp.seat_id === seatId &&
          resp.subscription_id === subscriptionId &&
          resp.reservation &&
          "email" in resp.reservation.identifier &&
          resp.reservation?.identifier.email
        ) {
          return "Seat successfully reserved.";
        } else {
          throw new Error("Reserved seat details don't match the input.");
        }
      } catch (e) {
        throw stringErrorWithDetails(e);
      }
    },
  },
  {
    type: "api",
    data: {
      name: "Test #5 - Redeem a reserved seat",
    },
    fn: async (opts) => {
      const client = createClient({ baseUrl: opts.baseUrl, apiKey: "" });
      const sub = await sample("subscription");
      const redeem = await sample("redeem_seat");
      const { subscription_id: subscriptionId, tenant_id: tenantId } = sub;

      client.identify(redeem);
      try {
        const resp = await client.seats.redeem({
          subscriptionId,
          seatId,
        });

        if (
          resp.seat_type == "standard" &&
          resp.seat_id == seatId &&
          subscriptionId == resp.subscription_id &&
          resp.occupant &&
          resp.occupant.tenant_id === tenantId &&
          resp.occupant.user_id === redeem.user_id
        ) {
          return "Seat successfully redeemed.";
        } else {
          throw new Error(`Failed to redeem seat [${seatId}]`);
        }
      } catch (e) {
        throw stringErrorWithDetails(e);
      }
    },
  },
  {
    type: "api",
    data: {
      name: 'Test #6 - Request some "walk-up" seats',
      description: `
      This subscription has 5 total_seats.
      We've already occupied one of them during the seat reservation test so let's max this out
      and request 4 additional seats for \"walk-up\" users.`,
    },
    fn: async (opts) => {
      const client = createClient({ baseUrl: opts.baseUrl, apiKey: "" });

      const results: string[] = [];

      for (let idx = 2; idx <= 5; idx++) {
        const uid = cuid();
        const sub = await sample("subscription");
        const { subscription_id: subscriptionId, tenant_id } = sub;
        const req = await sample(`request_seat_${idx}`);

        client.identify(req);
        try {
          const resp = await client.seats.request({
            subscriptionId,
            seatId: uid,
          });

          if (
            resp.seat_type === "standard" &&
            uid === resp.seat_id &&
            subscriptionId === resp.subscription_id &&
            resp.occupant &&
            tenant_id === resp.occupant.tenant_id &&
            resp.occupant.user_id === req.user_id
          ) {
            results.push(
              `Seat [${uid}] was successfully provided for user [${req.user_id}]`
            );
          } else {
            throw new Error(`Unable to request seat [${idx}, ${uid}]`);
          }
        } catch (e) {
          throw stringErrorWithDetails(e);
        }
      }
      return results;
    },
  },
  {
    type: "api",
    data: {
      name: "Test #7 - Request a limited seat",
      description: `
      At this point, we've exhausted our supply of this subscription's total_seats.
      This subscription is configured to provide limited seats after the supply of standard seats
      has been exhausted (subscription.seating_config.limited_overflow_seating_enabled == true).`,
    },
    fn: async (opts) => {
      const uid = cuid();
      const client = createClient({ baseUrl: opts.baseUrl, apiKey: "" });
      const sub = await sample("subscription");
      const { subscription_id: subscriptionId, tenant_id } = sub;
      const req = await sample("request_limited_seat");
      client.identify(req);
      try {
        const resp = await client.seats.request({
          subscriptionId,
          seatId: uid,
        });

        if (
          resp.seat_type === "limited" &&
          uid === resp.seat_id &&
          subscriptionId === resp.subscription_id &&
          resp.occupant &&
          resp.occupant.tenant_id === tenant_id &&
          resp.occupant.user_id === req.user_id
        ) {
          return `Limited seat [${uid}] was successfully provided for user [${req.user_id}]`;
        } else {
          throw new Error(
            `Unable to request limited seat [${uid}, ${req.user_id}, ${resp}]`
          );
        }
      } catch (e) {
        throw stringErrorWithDetails(e);
      }
    },
  },
  {
    type: "api",
    data: {
      name: "Test #8 - Check to see if a user has a seat",
      description: `
      When a user logs in to your SaaS app, you should call this API to see if that user has a seat.
      If they don't have a seat, redirect them to the main Turnstile endpoint. To keep things simple,
      we'll reuse the identity of the user that we just created a limited seat for.
      The seat should certainly be here since we just created it!`,
    },
    fn: async (opts) => {
      const client = createClient({ baseUrl: opts.baseUrl, apiKey: "" });
      const sub = await sample("subscription");
      const { subscription_id: subscriptionId, tenant_id: tenantId } = sub;
      const redeem = await sample("redeem_seat");
      const { user_id: userId } = redeem;

      client.identify(redeem);
      try {
        const resp = await client.seats.userSeat({
          subscriptionId,
          tenantId,
          userId,
        });

        if (
          subscriptionId === resp.subscription_id &&
          resp.occupant &&
          tenantId === resp.occupant.tenant_id &&
          seatId === resp.seat_id
        ) {
          return `User [${userId}] is currently occupying seat [${seatId}].`;
        } else {
          throw new Error(`Unable to get seat for user [${userId}, ${resp}]`);
        }
      } catch (e) {
        throw stringErrorWithDetails(e);
      }
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #9 - Release a user's seat",
      description: `
  Seats automatically expire on a scheduled based on the chosen seating strategy.
  If needed, however, tenant administrators can remove users from seats and cancel reservations.`,
    },
  },
];
