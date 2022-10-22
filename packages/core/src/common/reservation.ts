import { z } from "zod";
import type { Subscription } from "./subscriptions";

export const reservation = z.object({
  // Reservation ([user_id] and [tenant_id]) or [email] is required.
  identifier: z.union([
    z.object({
      user_id: z.string().nullable(),
      tenant_id: z.string().nullable(),
    }),
    z.object({
      email: z.string().nullable(),
    }),
  ]),
  invite_url: z.string().nullable(),
});

export type Reservation = z.infer<typeof reservation>;

export const validateReservation = (inSubscription: Subscription) => {
  if (inSubscription.state != "active") return;
  `Subscription [${inSubscription.subscription_id}] is currently [${inSubscription.state}]; ` +
    `seats can be reserved only in ['active'] subscriptions.`;
};
