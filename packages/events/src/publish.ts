import { svix } from "./index";
import { SeatingSummary, Subscription, EventTypes } from "@dotinc/bouncer-core";

export const publishSeatWarningEvents = async (
  subscription: Subscription,
  seatingSummary: SeatingSummary
) => {
  if (!subscription.total_seats) {
    return;
  }

  const lowSeatWarningLevel =
    subscription.seatingConfig.low_seat_warning_level_pct ??
    subscription.seatingConfig.default_low_seat_warning_level_percent ??
    0.25;

  if (seatingSummary.standardSeatCount >= subscription.total_seats) {
    await publishEvent(subscription.product_id, "no_seat_available", {
      subscription,
      seatingSummary,
    });
  } else if (
    subscription.total_seats > 0 &&
    1 - seatingSummary.standardSeatCount / subscription.total_seats <=
      lowSeatWarningLevel
  ) {
    await publishEvent(
      subscription.product_id,
      "low_seat_warning_level_reached",
      {
        subscription,
        seatingSummary,
      }
    );
  }
};

type KeyOf<T> = Extract<keyof T, string>;
type EventTypeKeys = KeyOf<EventTypes>;

export const publishEvent = async (
  appId: string,
  eventType: EventTypeKeys,
  data: EventTypes[EventTypeKeys]
) => {
  const payload = {
    ...data,
  };
  svix.message.create(appId, {
    eventType,
    payload,
  });
};
