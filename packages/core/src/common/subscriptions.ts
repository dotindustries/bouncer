import { api } from "../utils/shorthand";
import { z } from "zod";
import { seatingConfiguration } from "./config";

export const subscriptionStates = z.enum([
  "purchased",
  "active",
  "suspended",
  "canceled",
]);

export type SubscriptionStates = z.infer<typeof subscriptionStates>;

export const subscription = z.object({
  subscription_id: z.string(),
  subscription_name: z.string().nullable(),
  tenant_id: z.string(),
  tenant_name: z.string().nullable(),
  offer_id: z.string(),
  plan_id: z.string(),
  state: subscriptionStates,
  admin_role_name: z.string().nullable(),
  user_role_name: z.string().nullable(),
  management_urls: z.record(z.string()).nullable(),
  admin_name: z.string().nullable(),
  admin_email: z.string().nullable(),
  total_seats: z.number().nullable(),
  is_being_configured: z.boolean().nullable(),
  is_free_trial: z.boolean(),
  is_setup_complete: z.boolean().nullable(),
  is_test_subscription: z.boolean(),
  created_utc: z.string().nullable(),
  state_last_updated_utc: z.string().nullable(),
  seating_config: seatingConfiguration.nullable(),
  subscriber_info: z.any().nullable(),
  source_subscription: z.any().nullable(),
});

export type Subscription = z.infer<typeof subscription>;

export const validateSubscriptionPatch = (
  sub: Subscription,
  patch: Subscription
) => {
  if (!patch) throw new Error("Subscription patch not defined");

  var errors: string[] = [];

  if (
    patch.subscription_name == null &&
    patch.plan_id == null &&
    patch.state == null &&
    patch.admin_role_name == null &&
    patch.user_role_name == null &&
    patch.admin_name == null &&
    patch.admin_email == null &&
    patch.management_urls == null &&
    patch.total_seats == null &&
    patch.is_being_configured == null &&
    patch.is_setup_complete == null &&
    patch.seating_config == null &&
    patch.subscriber_info == null &&
    patch.tenant_name == null &&
    patch.source_subscription == null
  ) {
    errors.push(
      "No subscription properties have been patched; patchable subscription properties are " +
        `[subscription_name], [plan_id], [state] (must be ${subscriptionStates.Values}), [tenant_name], ` +
        "[admin_role_name], [user_role_name], [management_urls], [total_seats] (if [total_seats] has already been set), " +
        "[is_being_configured], [is_setup_complete], [seating_config], [subscriber_info], [source_subscription], [admin_name], and [admin_email]."
    );
  } else {
    if (patch.total_seats != null) {
      if (sub.total_seats == null) {
        errors.push(
          "[total_seats] can be patched only on subscriptions that already have [total_seats] configured."
        );
      } else if (patch.total_seats <= sub.total_seats) {
        errors.push(
          `Patched [total_seats] (${patch.total_seats}) must be > existing total seats (${sub.total_seats}).`
        );
      }
    }
  }

  return errors;
};

export const subscriptionApi = api({
  "GET subscriptionById": {
    path: "/subscriptions/:subscriptionId",
    response: subscription,
  },
  "GET subscriptions": {
    path: "/subscriptions",
    response: z.array(subscription),
  },
  "PATCH subscriptionById": {
    path: "/subscriptions/:subscriptionId",
    body: subscription,
    response: subscription,
  },
  "POST subscription": {
    path: "/subscriptions/:subscriptionId",
    body: subscription,
    response: subscription,
  },
});
