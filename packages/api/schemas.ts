import { z } from "zod";
import type {
  AuthenticatorTransport as DbAuthenticatorTransport,
  Prisma,
  Product as DbProduct,
  Subscription as DbSubscription,
  Seat as DbSeat,
  SeatingConfig as DbSeatingConfig,
  SeatingStrategyName as DbSeatingStrategyName,
  SeatOccupant as DbSeatOccupant,
  SeatReservation as DbSeatReservation,
  SeatType as DbSeatType,
  SubscriptionState as DbSubscriptionState,
} from "@dotinc/bouncer-db";
import { schemaForType } from "./src/utils";

export const seatingStrategyName = schemaForType<DbSeatingStrategyName>()(
  z.enum(["monthly_active_user", "first_come_first_served"])
);

export const seatType = schemaForType<DbSeatType>()(
  z.enum(["standard", "limited"])
);

export const subscriptionStates = schemaForType<DbSubscriptionState>()(
  z.enum(["purchased", "active", "suspended", "canceled"])
);

export const authenticatorTransport = schemaForType<DbAuthenticatorTransport>()(
  z.enum(["ble", "hybrid", "internal", "nfc", "usb", "cable"])
);

type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | "JsonNull"
  | "DbNull"
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === "DbNull") return null;
  if (v === "JsonNull") return null;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export const NullableJsonValue = z
  .union([JsonValue, z.literal("DbNull"), z.literal("JsonNull")])
  .nullable()
  .transform((v) => transformJsonNull(v));

export const seatingConfig = schemaForType<DbSeatingConfig>()(
  z.object({
    owner_id: z.string(),
    default_low_seat_warning_level_percent: z.number(),
    seating_strategy_name: z.enum([
      "monthly_active_user",
      "first_come_first_served",
    ]),
    low_seat_warning_level_pct: z
      .number()
      .gt(0, {
        message: `if provided, seating configuration [low_seat_warning_level_pct] must be > 0 (0%) and < 1 (100%).`,
      })
      .max(1, {
        message: `if provided, seating configuration [low_seat_warning_level_pct] must be > 0 (0%) and < 1 (100%).`,
      })
      .nullable(),
    limited_overflow_seating_enabled: z.boolean().nullable(),
    seat_reservation_expiry_in_days: z.number().min(1).default(1).nullable(),
    default_seat_expiry_in_days: z.number().min(1).default(1).nullable(),
  })
);

export type SeatingConfig = z.infer<typeof seatingConfig>;

export const productConfig = schemaForType<
  DbProduct & { seatingConfig: SeatingConfig }
>()(
  z.object({
    id: z.string(),
    owner_id: z.string(),
    product_name: z.string(),
    publisher_name: z.string(),
    home_page_url: z.string().nullable(),
    contact_page_url: z.string().nullable(),
    privacy_notice_page_url: z.string().nullable(),
    contact_sales_email: z.string().nullable(),
    contact_sales_url: z.string().nullable(),
    contact_support_email: z.string().nullable(),
    contact_support_url: z.string().nullable(),
    is_setup_complete: z.boolean().nullable(),
    on_access_denied_url: z.string().nullable(),
    on_access_granted_url: z.string().nullable(),
    on_no_seat_available_url: z.string().nullable(),
    on_subscription_not_ready_url: z.string().nullable(),
    on_subscription_canceled_url: z.string().nullable(),
    on_subscription_suspended_url: z.string().nullable(),
    on_subscription_not_found_url: z.string().nullable(),
    on_no_subscriptions_found_url: z.string().nullable(),
    seatingConfig: seatingConfig,
  })
);

export type ProductConfig = z.infer<typeof productConfig>;

export type SeatingSummary = {
  standardSeatCount: number;
  limitedSeatCount: number;
};

export type SeatCreationContext = {
  isSeatCreated: boolean;
  seatingSummary: SeatingSummary;
  createdSeat?: DbSeat & {
    reservation: DbSeatReservation | null;
    occupant: DbSeatOccupant | null;
  };
};

export const occupant = schemaForType<DbSeatOccupant>()(
  z.object({
    seat_id: z.string(),
    user_id: z.string(),
    tenant_id: z.string(),
    email: z.string().nullable(),
    user_name: z.string().nullable(),
  })
);

// use like this:
export const reservation = schemaForType<DbSeatReservation>()(
  z.object({
    seat_id: z.string(),
    tenant_id: z.string().nullable(),
    user_id: z.string().nullable(),
    email: z.string().nullable(),
    invite_url: z.string().nullable(),
  })
);

// Reservation ([user_id] and [tenant_id]) or [email] is required.
export type Reservation = z.infer<typeof reservation>;
export const seat = schemaForType<
  DbSeat & {
    reservation: DbSeatReservation | null;
    occupant: DbSeatOccupant | null;
  }
>()(
  z.object({
    id: z.string(),
    seating_strategy_name: seatingStrategyName,
    subscription_id: z.string().nullable(),
    created_utc: z.date().nullable(),
    seat_type: seatType,
    expires_utc: z.date().nullable(),
    redeemed_utc: z.date().nullable(),
    reservation: reservation.nullable(),
    occupant: occupant.nullable(),
  })
);

export type Seat = z.infer<typeof seat>;

export const seats = z.array(seat);

export type Seats = z.infer<typeof seats>;

export const subscription = schemaForType<
  DbSubscription & { seatingConfig: DbSeatingConfig }
>()(
  z.object({
    id: z.string(),
    state: subscriptionStates,
    product_id: z.string(),
    is_setup_complete: z.boolean().nullable(),
    created_utc: z.date().nullable(),
    tenant_id: z.string().nullable(),
    subscriber_info: z.custom<Prisma.JsonValue>().nullable(),
    source_subscription: z.custom<Prisma.JsonValue>().nullable(),
    subscription_name: z.string().nullable(),
    tenant_name: z.string().nullable(),
    offer_id: z.string().nullable(),
    plan_id: z.string().nullable(),
    admin_role_name: z.string().nullable(),
    user_role_name: z.string().nullable(),
    management_urls: z.custom<Prisma.JsonValue>().nullable(), // NullableJsonValue.optional()
    admin_name: z.string().nullable(),
    admin_email: z.string().nullable(),
    total_seats: z.number().int().nullable(),
    is_being_configured: z.boolean().nullable(),
    is_free_trial: z.boolean().nullable(),
    is_test_subscription: z.boolean().nullable(),
    state_last_updated_utc: z.date().nullable(),
    seatingConfig: seatingConfig,
  })
);

export type Subscription = z.infer<typeof subscription>;

export const subscriptionPatch = subscription.pick({ id: true }).and(
  subscription
    .omit({
      id: true,
      offer_id: true,
      tenant_id: true,
    })
    .partial()
    .and(z.object({ seatingConfig: seatingConfig.partial() }))
);

export type SubscriptionPatch = z.infer<typeof subscriptionPatch>;

export const user = z.object({
  user_id: z.string(),
  user_name: z.string().optional(),
  tenant_id: z.string(),
  email: z.string().optional(),
});

export type User = z.infer<typeof user>;
