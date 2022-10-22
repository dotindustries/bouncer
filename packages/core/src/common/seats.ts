import { z } from "zod";
import { reservation } from "./reservation";
import { user } from "./users";

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
