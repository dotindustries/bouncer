import { Zodios, ZodiosOptions } from "@zodios/core";
import { configApi, subscriptionApi, seatsApi } from "@dotinc/bouncer-core";
import { CancellablePromiseLike } from "../../utils/task-queue.js";

const newSubscriptions = (baseUrl: string, opts?: ZodiosOptions) =>
  new Zodios(baseUrl, subscriptionApi, opts);
const newConfig = (baseUrl: string, opts?: ZodiosOptions) =>
  new Zodios(baseUrl, configApi, opts);
const newSeats = (baseUrl: string, opts?: ZodiosOptions) =>
  new Zodios(baseUrl, seatsApi, opts);

export type TestCase = {
  name: string;
  description?: string;
  startedAt?: string;
  finishedAt?: string;
  result?: string;
  executionTime?: string;
  error?: any;
};

export type Test = {
  type: "api" | "event";
  fn:
    | ((opts: { baseUrl: string }) => void)
    | ((opts: { baseUrl: string }) => Promise<void>);
  cancellationToken?: CancellablePromiseLike<any>;
  data: TestCase;
};

const sample = async (
  res:
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
) => {
  return (await import(`./${res}.json`)).default;
};

export const tests: Test[] = [
  {
    type: "api",
    fn: async (opts) => {
      const client = newConfig(opts.baseUrl ?? "");
      const pub = await sample("publisher");

      return await client.publisherConfiguration(pub);
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

      return await client.createSubscription(sub, {
        params: { publisherId, subscriptionId },
      });
    },
    data: {
      name: "Test #2 - create a new subscription",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #3 - Patch an existing subscription",
    },
  },
  {
    type: "api",
    fn: async (opts) => {
      const client = newSeats(opts.baseUrl);
      client.reserveSeat(
        {
          identifier: {
            tenant_id: "",
            user_id: "",
          },
          invite_url: null,
        },
        { subscriptionId: "", seatId: "" }
      );
    },
    data: {
      name: "Test #4 - Reserve a seat in the subscription",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #5 - Redeem a reserved seat",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: 'Test #6 - Request some "walk-up" seats',
      description: `
  This subscription has 5 total_seats.
  We've already occupied one of them during the seat reservation test so let's max this out
  and request 4 additional seats for \"walk-up\" users.`,
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #7 - Request a limited seat",
      description: `
  At this point, we've exhausted our supply of this subscription's total_seats.
  This subscription is configured to provide limited seats after the supply of standard seats
  has been exhausted (subscription.seating_config.limited_overflow_seating_enabled == true).`,
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #8 - Check to see if a user has a seat",
      description: `
  When a user logs in to your SaaS app, you should call this API to see if that user has a seat.
  If they don't have a seat, redirect them to the main Turnstile endpoint. To keep things simple,
  we'll reuse the identity of the user that we just created a limited seat for.
  The seat should certainly be here since we just created it!`,
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