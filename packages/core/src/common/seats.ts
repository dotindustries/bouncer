import { makeApi } from "@zodios/core";
import { z } from "zod";
import { error, error404, sqlDateString } from "./shared";
import type { Subscription } from "./subscriptions";
import { user } from "./users";

export const noContentResult = z.object({});

export type SeatingSummary = {
  standardSeatCount: number;
  limitedSeatCount: number;
};

export type SeatCreationContext = {
  isSeatCreated: boolean;
  seatingSummary: SeatingSummary;
  createdSeat?: Seat;
};

export const reservation = z.object({
  // Reservation ([user_id] and [tenant_id]) or [email] is required.
  identifier: z.union([
    z.object({
      user_id: z.string(),
      tenant_id: z.string(),
    }),
    z.object({
      email: z.string(),
    }),
  ]),
  invite_url: z.string().nullish(),
});

export type Reservation = z.infer<typeof reservation>;

export const validateSeatReservation = (
  reservation: Reservation,
  inSubscription: Subscription
) => {
  if (
    ("email" in reservation.identifier && !reservation.identifier.email) ||
    ("tenant_id" in reservation.identifier &&
      (!reservation.identifier.tenant_id || !reservation.identifier.user_id))
  ) {
    return "Reservation ([user_id] and [tenant_id]) or [email] is required.";
  }
  if (inSubscription.state != "active")
    return (
      `Subscription [${inSubscription.subscription_id}] is currently [${inSubscription.state}]; ` +
      `seats can be reserved only in ['active'] subscriptions.`
    );
  return undefined;
};

export const validateSeatRequest = (inSubscription: Subscription) => {
  if (inSubscription.state != "active")
    return (
      `Subscription [${inSubscription.subscription_id}] is currently [${inSubscription.state}]; ` +
      `seats can be reserved only in ['active'] subscriptions.`
    );
  return undefined;
};

export const seat = z.object({
  seat_id: z.string(),
  subscription_id: z.string().nullable(),
  occupant: user.nullable(),
  seating_strategy_name: z.string().nullable(),
  seat_type: z.enum(["standard", "limited"]),
  reservation: reservation.nullable(),
  expires_utc: sqlDateString.nullable(),
  created_utc: sqlDateString.nullable(),
  redeemed_utc: sqlDateString.nullable(),
});

export type Seat = z.infer<typeof seat>;

export const seats = z.array(seat);

export type Seats = z.infer<typeof seats>;

export const seatsApi = makeApi([
  {
    method: "get",
    alias: "seatById",
    path: "/subscriptions/:subscriptionId/seats/:seatId",
    response: seat,
    parameters: [
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "seatId",
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
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "userId",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "userEmail",
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
    parameters: [
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "userId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "tenantId",
        type: "Path",
        schema: z.string(),
      },
    ],
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
        status: "default",
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
      },
    ],
    response: seat,
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
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "seatId",
        type: "Path",
        schema: z.string(),
      },
    ],
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
        status: "default",
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
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
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "seatId",
        type: "Path",
        schema: z.string(),
      },
    ],
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
        status: "default",
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
      },
    ],
    response: seat,
  },
  {
    alias: "releaseSeat",
    method: "delete",
    path: "/subscriptions/:subscriptionId/seats/:seatId",
    parameters: [
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "seatId",
        type: "Path",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: "default",
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
      },
    ],
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
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "seatId",
        type: "Path",
        schema: z.string(),
      },
    ],
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
        status: "default",
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
      },
    ],
    response: seat,
  },
  {
    alias: "reserveSeat",
    method: "post",
    path: "/subscriptions/:subscriptionId/seats/:seatId/reserve",
    parameters: [
      {
        name: "reservation",
        type: "Body",
        schema: reservation,
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "seatId",
        type: "Path",
        schema: z.string(),
      },
    ],
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
        status: "default",
        schema: z.object({
          code: z.number(),
          message: z.string(),
        }),
      },
    ],
    response: seat,
  },
]);
