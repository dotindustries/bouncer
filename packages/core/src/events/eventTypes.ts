import { seatingSummary, subscription, seat } from "../common/schemas";
import { z } from "zod";

export const noSeatAvailableEvent = z.object({
  subscription: subscription,
  seatingSummary: seatingSummary,
});

export const lowSeatWarningLevelReachedEvent = z.object({
  subscription,
  seatingSummary,
});

export const seatProvidedEvent = z.object({
  subscription,
  seat,
  seatingSummary,
});

export type EventTypes = {
  no_seat_available: z.infer<typeof noSeatAvailableEvent>;
  low_seat_warning_level_reached: z.infer<
    typeof lowSeatWarningLevelReachedEvent
  >;
  seat_provided: z.infer<typeof seatProvidedEvent>;
};
