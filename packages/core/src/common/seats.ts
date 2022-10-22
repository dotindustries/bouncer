import { z } from "zod";
import type { Subscription } from "./subscriptions";
import { user } from "./users";

const reservation = z.object({
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

const seat = z.object({
  seat_id: z.string().nullable(),
  subscription_id: z.string().nullable(),
  occupant: user.nullable(),
  seating_strategy_name: z.string().nullable(),
  seat_type: z.string(),
  reservation: reservation.nullable(),
  expires_utc: z.date().nullable(),
  created_utc: z.date().nullable(),
  redeemed_utc: z.date().nullable(),
});

export type Seat = z.infer<typeof seat>;

const seatsByIdInputSchema = z.object({
  subscriptionId: z.string(),
  seatId: z.string(),
});

export type SeatsByIdInput = z.infer<typeof seatsByIdInputSchema>;
