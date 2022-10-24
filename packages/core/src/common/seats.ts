import { makeApi } from "@zodios/core";
import { z } from "zod";
import { error, error404 } from "./shared";
// TODO: PR for shorthand to add typed makeErrors?
// import { api } from "../utils/shorthand";
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
  seat_id: z.string(),
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

export const seatsApi = makeApi([
  {
    method: "get",
    alias: "seatById",
    path: "/subscriptions/:subscriptionId/seats/:seatId",
    response: seat,
    errors: [
      {
        status: 404,
        schema: error404,
      },
      {
        status: "default", // default status code will be used if error is not 404
        schema: error,
      },
    ],
  },
  {
    method: "get",
    alias: "seats",
    path: "/subscriptions/:subscriptionId/seats",
    parameters: [
      {
        name: "user_id",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "user_email",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: seats,
    errors: [
      {
        status: 404,
        schema: z.object({
          code: z.number(),
          message: z.string(),
          id: z.number().or(z.string()),
        }),
      },
      {
        status: "default", // default status code will be used if error is not 404
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
      },
    ],
  },
  {
    alias: "userSeat",
    method: "get",
    path: "/subscriptions/:subscriptionId/user-seat/:tenantId/:userId",
    response: seat,
    parameters: [],
  },
  {
    alias: "userOccupant",
    method: "patch",
    path: "/subscriptions/:subscriptionId/seats/:seatId",
    parameters: [
      {
        name: "user",
        type: "Body",
        schema: user,
      },
    ],
    response: seat,
  },
  {
    alias: "redeemSeat",
    method: "post",
    path: "/subscriptions/:subscriptionId/seats/:seatId/redeem",
    parameters: [
      {
        name: "user",
        type: "Body",
        schema: user,
      },
    ],
    response: seat,
  },
  {
    alias: "releaseSeat",
    method: "delete",
    path: "/subscriptions/:subscriptionId/seats/:seatId",
    response: noContentResult,
  },
  {
    alias: "requestSeat",
    method: "post",
    path: "/subscriptions/:subscriptionId/seats/:seatId/request",
    parameters: [
      {
        name: "user",
        type: "Body",
        schema: user,
      },
    ],
    response: seat,
  },
  {
    alias: "reserveSeat",
    method: "post",
    path: "/subscriptions/{subscriptionId}/seats/{seatId}/reserve",
    parameters: [
      {
        name: "reservation",
        type: "Body",
        schema: reservation,
      },
    ],
    response: seat,
  },
]);
