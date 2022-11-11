import { makeApi } from "@zodios/core";
import { z } from "zod";
import { seatingConfiguration } from "./config";
import { error, error404, sqlDateString } from "./shared";

export const subscriptionStates = z.enum([
  "purchased",
  "active",
  "suspended",
  "canceled",
]);

export type SubscriptionStates = z.infer<typeof subscriptionStates>;

export const subscription = z.object({
  subscription_id: z.string(),
  subscription_name: z.string().optional(),
  tenant_id: z.string(),
  tenant_name: z.string().optional(),
  offer_id: z.string(),
  plan_id: z.string(),
  state: subscriptionStates,
  admin_role_name: z.string().optional(),
  user_role_name: z.string().optional(),
  management_urls: z.record(z.string()).optional(),
  admin_name: z.string().optional(),
  admin_email: z.string().optional(),
  total_seats: z.number().optional(),
  is_being_configured: z.boolean().optional(),
  is_free_trial: z.boolean(),
  is_setup_complete: z.boolean().optional(),
  is_test_subscription: z.boolean(),
  created_utc: sqlDateString.optional(),
  state_last_updated_utc: sqlDateString.optional(),
  seating_config: seatingConfiguration.optional(),
  subscriber_info: z.record(z.string()).optional(),
  source_subscription: z.record(z.string()).optional(),
});

export type Subscription = z.infer<typeof subscription>;

export const subscriptionPatch = subscription
  .pick({ subscription_id: true })
  .and(
    subscription
      .omit({
        offer_id: true,
        tenant_id: true,
      })
      .partial()
  );
export type SubscriptionPatch = z.infer<typeof subscriptionPatch>;

export const validateSubscriptionPatch = (
  sub: Subscription,
  patch: SubscriptionPatch
) => {
  if (
    !patch.subscription_name &&
    !patch.plan_id &&
    !patch.state &&
    !patch.admin_role_name &&
    !patch.user_role_name &&
    !patch.admin_name &&
    !patch.admin_email &&
    !patch.management_urls &&
    !patch.total_seats &&
    patch.is_being_configured === undefined &&
    patch.is_setup_complete === undefined &&
    !patch.seating_config &&
    !patch.subscriber_info &&
    !patch.tenant_name &&
    !patch.source_subscription
  ) {
    return (
      "No subscription properties have been patched; patchable subscription properties are " +
      `[subscription_name], [plan_id], [state] (must be ${subscriptionStates.Values}), [tenant_name], ` +
      "[admin_role_name], [user_role_name], [management_urls], [total_seats] (if [total_seats] has already been set), " +
      "[is_being_configured], [is_setup_complete], [seating_config], [subscriber_info], [source_subscription], [admin_name], and [admin_email]."
    );
  } else {
    if (patch.total_seats != null) {
      if (sub.total_seats == null) {
        return "[total_seats] can be patched only on subscriptions that already have [total_seats] configured.";
      } else if (patch.total_seats <= sub.total_seats) {
        return `Patched [total_seats] (${patch.total_seats}) must be > existing total seats (${sub.total_seats}).`;
      }
    }
  }

  return undefined;
};

export const subscriptionApi = makeApi([
  {
    method: "get",
    alias: "subscriptionById",
    path: "/subscriptions/:subscriptionId",
    parameters: [
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: 404,
        schema: error404,
      },
      {
        status: "default",
        schema: error,
      },
    ],
    response: subscription,
  },
  {
    method: "get",
    alias: "subscriptions",
    path: "/subscriptions",
    parameters: [
      {
        name: "publisherId",
        type: "Query",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: z.array(subscription),
  },
  {
    method: "patch",
    alias: "updateSubscription",
    path: "/subscriptions/:subscriptionId",
    parameters: [
      {
        name: "subscription",
        schema: subscriptionPatch,
        type: "Body",
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
      {
        status: 404,
        schema: error404,
      },
    ],
    response: subscription,
  },
  {
    method: "post",
    alias: "createSubscription",
    path: "/subscriptions/:publisherId/:subscriptionId",
    parameters: [
      {
        name: "subscription",
        schema: subscription,
        type: "Body",
      },
      {
        name: "publisherId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: subscription,
  },
]);
