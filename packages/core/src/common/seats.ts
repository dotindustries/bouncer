import { z } from "zod";
import { api } from "zodios-api-shorthand";
import type { Subscription } from "./subscriptions";
import { user } from "./users";

export const noContentResult = z.object({});

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

export const seat = z.object({
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

export const seats = z.array(seat);

export type Seats = z.infer<typeof seats>;

const seatByIdInput = z.object({
  subscriptionId: z.string(),
  seatId: z.string(),
});

export type SeatsByIdInput = z.infer<typeof seatByIdInput>;

export const seatsApi = api({
  "GET seatById": {
    path: "/v1/subscriptions/:subscriptionId/seats/:seatId",
    response: seat,
  },
  "GET seats": {
    path: "/v1/subscriptions/:subscriptionId/seats",
    queries: {
      user_id: z.string(),
      user_email: z.string(),
    },
    response: seats,
  },
  "GET userSeat": {
    path: "/v1/subscriptions/:subscriptionId/user-seat/:tenantId/:userId",
    response: seat,
  },
  "PATCH userOccupant": {
    path: "/v1/subscriptions/:subscriptionId/seats/:seatId",
    body: user,
    response: seat,
  },
  "POST redeemSeat": {
    path: "/v1/subscriptions/:subscriptionId/seats/:seatId/redeem",
    body: user,
    response: seat,
  },
  "DELETE releaseSeat": {
    path: "/v1/subscriptions/:subscriptionId/seats/:seatId",
    response: noContentResult,
  },
  "POST requestSeat": {
    path: "/v1/subscriptions/:subscriptionId/seats/:seatId/request",
    body: user,
    response: seat,
  },
  "POST reserveSeat": {
    path: "/v1/subscriptions/{subscriptionId}/seats/{seatId}/reserve",
    body: reservation,
    response: seat,
  },
});
