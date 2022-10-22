import { z } from "zod";

const user = z.object({
  user_id: z.string().nullable(),
  user_name: z.string().nullable(),
  tenant_id: z.string().nullable(),
  email: z.string().nullable(),
});

export type User = z.infer<typeof user>;

const reservation = z.object({
  user_id: z.string().nullable(),
  tenant_id: z.string().nullable(),
  email: z.string().nullable(),
  invite_url: z.string().nullable(),
});

export type Reservation = z.infer<typeof reservation>;

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
