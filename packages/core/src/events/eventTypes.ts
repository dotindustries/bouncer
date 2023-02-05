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

export const seatReservedEvent = z.object({
  subscription,
  seat,
  seatingSummary,
});

export const seatRedeemedEvent = z.object({
  subscription,
  seat,
});

export const seatReleasedEvent = z.object({
  subscription,
  seat,
});

export const eventSchemas = {
  no_seat_available: noSeatAvailableEvent,
  low_seat_warning_level_reached: lowSeatWarningLevelReachedEvent,
  seat_provided: seatProvidedEvent,
  seat_reserved: seatReservedEvent,
  seat_redeemed: seatRedeemedEvent,
  seat_released: seatReleasedEvent,
};

export type EventTypes = {
  no_seat_available: z.infer<typeof noSeatAvailableEvent>;
  low_seat_warning_level_reached: z.infer<
    typeof lowSeatWarningLevelReachedEvent
  >;
  seat_provided: z.infer<typeof seatProvidedEvent>;
  seat_reserved: z.infer<typeof seatReservedEvent>;
  seat_redeemed: z.infer<typeof seatRedeemedEvent>;
  seat_released: z.infer<typeof seatReleasedEvent>;
};
