import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const AccountScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AccountScalarFieldEnum);

export const CredentialChallengeScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.CredentialChallengeScalarFieldEnum);

export const CredentialScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.CredentialScalarFieldEnum);

export const CredentialTransportsScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.CredentialTransportsScalarFieldEnum);

export const JsonNullValueFilterSchema = z.enum(['DbNull', 'JsonNull', 'AnyNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull',]).transform((v) => transformJsonNull(v));

export const ProductScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ProductScalarFieldEnum);

export const SeatOccupantScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SeatOccupantScalarFieldEnum);

export const SeatReservationScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SeatReservationScalarFieldEnum);

export const SeatScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SeatScalarFieldEnum);

export const SeatSummaryScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SeatSummaryScalarFieldEnum);

export const SeatingConfigScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SeatingConfigScalarFieldEnum);

export const SessionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SessionScalarFieldEnum);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const SubscriptionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SubscriptionScalarFieldEnum);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

export const VerificationTokenScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.VerificationTokenScalarFieldEnum);

// CUSTOM ENUMS
//------------------------------------------------------

export const SeatingStrategyNameSchema = z.nativeEnum(PrismaClient.SeatingStrategyName);

export const SeatTypeSchema = z.nativeEnum(PrismaClient.SeatType);

export const SubscriptionStateSchema = z.nativeEnum(PrismaClient.SubscriptionState);

export const AuthenticatorTransportSchema = z.nativeEnum(PrismaClient.AuthenticatorTransport);

/////////////////////////////////////////
// HELPER TYPES
/////////////////////////////////////////

// JSON
//------------------------------------------------------

type NullableJsonInput = PrismaClient.Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | PrismaClient.Prisma.NullTypes.DbNull | PrismaClient.Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;
  if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<PrismaClient.Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export const InputJsonValue: z.ZodType<PrismaClient.Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// PRODUCT
//------------------------------------------------------

export const ProductSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().nullish(),
  contact_page_url: z.string().nullish(),
  privacy_notice_page_url: z.string().nullish(),
  contact_sales_email: z.string().nullish(),
  contact_sales_url: z.string().nullish(),
  contact_support_email: z.string().nullish(),
  contact_support_url: z.string().nullish(),
  is_setup_complete: z.boolean().nullish(),
  on_access_denied_url: z.string().nullish(),
  on_access_granted_url: z.string().nullish(),
  on_no_seat_available_url: z.string().nullish(),
  on_subscription_not_ready_url: z.string().nullish(),
  on_subscription_canceled_url: z.string().nullish(),
  on_subscription_suspended_url: z.string().nullish(),
  on_subscription_not_found_url: z.string().nullish(),
  on_no_subscriptions_found_url: z.string().nullish(),
});

// SEATING CONFIG
//------------------------------------------------------

export const SeatingConfigSchema = z.object({
  seating_strategy_name: SeatingStrategyNameSchema,
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  low_seat_warning_level_pct: z.number().nullish(),
  limited_overflow_seating_enabled: z.boolean().nullish(),
  seat_reservation_expiry_in_days: z.number().int().nullish(),
  default_seat_expiry_in_days: z.number().int().nullish(),
});

// SEAT OCCUPANT
//------------------------------------------------------

export const SeatOccupantSchema = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().nullish(),
  user_name: z.string().nullish(),
});

// SEAT RESERVATION
//------------------------------------------------------

export const SeatReservationSchema = z.object({
  seat_id: z.string(),
  tenant_id: z.string().nullish(),
  user_id: z.string().nullish(),
  email: z.string().nullish(),
  invite_url: z.string().nullish(),
});

// SEAT SUMMARY
//------------------------------------------------------

export const SeatSummarySchema = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
});

// SEAT
//------------------------------------------------------

export const SeatSchema = z.object({
  seating_strategy_name: SeatingStrategyNameSchema,
  seat_type: SeatTypeSchema,
  id: z.string(),
  subscription_id: z.string().nullish(),
  created_utc: z.date().nullish(),
  expires_utc: z.date().nullish(),
  redeemed_utc: z.date().nullish(),
});

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionSchema = z.object({
  state: SubscriptionStateSchema,
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().nullish(),
  created_utc: z.date().nullish(),
  tenant_id: z.string().nullish(),
  subscriber_info: NullableJsonValue.optional(),
  source_subscription: NullableJsonValue.optional(),
  subscription_name: z.string().nullish(),
  tenant_name: z.string().nullish(),
  offer_id: z.string().nullish(),
  plan_id: z.string().nullish(),
  admin_role_name: z.string().nullish(),
  user_role_name: z.string().nullish(),
  management_urls: NullableJsonValue.optional(),
  admin_name: z.string().nullish(),
  admin_email: z.string().nullish(),
  total_seats: z.number().int().nullish(),
  is_being_configured: z.boolean().nullish(),
  is_free_trial: z.boolean().nullish(),
  is_test_subscription: z.boolean().nullish(),
  state_last_updated_utc: z.date().nullish(),
});

// ACCOUNT
//------------------------------------------------------

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
});

// SESSION
//------------------------------------------------------

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
});

// USER
//------------------------------------------------------

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

// CREDENTIAL TRANSPORTS
//------------------------------------------------------

export const CredentialTransportsSchema = z.object({
  transport: AuthenticatorTransportSchema,
  id: z.string(),
});

// CREDENTIAL
//------------------------------------------------------

export const CredentialSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int(),
  name: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// CREDENTIAL CHALLENGE
//------------------------------------------------------

export const CredentialChallengeSchema = z.object({
  userId: z.string(),
  value: z.string(),
});

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PRODUCT
//------------------------------------------------------

export const ProductArgsSchema: z.ZodType<PrismaClient.Prisma.ProductArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductIncludeSchema: z.ZodType<PrismaClient.Prisma.ProductInclude> = z.object({
  seatingConfig: z.union([z.boolean(), z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<PrismaClient.Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  owner_id: z.boolean().optional(),
  product_name: z.boolean().optional(),
  publisher_name: z.boolean().optional(),
  home_page_url: z.boolean().optional(),
  contact_page_url: z.boolean().optional(),
  privacy_notice_page_url: z.boolean().optional(),
  contact_sales_email: z.boolean().optional(),
  contact_sales_url: z.boolean().optional(),
  contact_support_email: z.boolean().optional(),
  contact_support_url: z.boolean().optional(),
  is_setup_complete: z.boolean().optional(),
  on_access_denied_url: z.boolean().optional(),
  on_access_granted_url: z.boolean().optional(),
  on_no_seat_available_url: z.boolean().optional(),
  on_subscription_not_ready_url: z.boolean().optional(),
  on_subscription_canceled_url: z.boolean().optional(),
  on_subscription_suspended_url: z.boolean().optional(),
  on_subscription_not_found_url: z.boolean().optional(),
  on_no_subscriptions_found_url: z.boolean().optional(),
  seatingConfig: z.union([z.boolean(), z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

// SEATING CONFIG
//------------------------------------------------------

export const SeatingConfigArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigArgs> = z.object({
  select: z.lazy(() => SeatingConfigSelectSchema).optional(),
  include: z.lazy(() => SeatingConfigIncludeSchema).optional(),
}).strict();

export const SeatingConfigIncludeSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigInclude> = z.object({
  publisher: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
  subscription: z.union([z.boolean(), z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict();

export const SeatingConfigSelectSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigSelect> = z.object({
  owner_id: z.boolean().optional(),
  default_low_seat_warning_level_percent: z.boolean().optional(),
  seating_strategy_name: z.boolean().optional(),
  low_seat_warning_level_pct: z.boolean().optional(),
  limited_overflow_seating_enabled: z.boolean().optional(),
  seat_reservation_expiry_in_days: z.boolean().optional(),
  default_seat_expiry_in_days: z.boolean().optional(),
  publisher: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
  subscription: z.union([z.boolean(), z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict();

// SEAT OCCUPANT
//------------------------------------------------------

export const SeatOccupantArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantArgs> = z.object({
  select: z.lazy(() => SeatOccupantSelectSchema).optional(),
  include: z.lazy(() => SeatOccupantIncludeSchema).optional(),
}).strict();

export const SeatOccupantIncludeSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantInclude> = z.object({
  seat: z.union([z.boolean(), z.lazy(() => SeatArgsSchema)]).optional(),
}).strict();

export const SeatOccupantSelectSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantSelect> = z.object({
  seat_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  tenant_id: z.boolean().optional(),
  email: z.boolean().optional(),
  user_name: z.boolean().optional(),
  seat: z.union([z.boolean(), z.lazy(() => SeatArgsSchema)]).optional(),
}).strict();

// SEAT RESERVATION
//------------------------------------------------------

export const SeatReservationArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationArgs> = z.object({
  select: z.lazy(() => SeatReservationSelectSchema).optional(),
  include: z.lazy(() => SeatReservationIncludeSchema).optional(),
}).strict();

export const SeatReservationIncludeSchema: z.ZodType<PrismaClient.Prisma.SeatReservationInclude> = z.object({
  seat: z.union([z.boolean(), z.lazy(() => SeatArgsSchema)]).optional(),
}).strict();

export const SeatReservationSelectSchema: z.ZodType<PrismaClient.Prisma.SeatReservationSelect> = z.object({
  seat_id: z.boolean().optional(),
  tenant_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  email: z.boolean().optional(),
  invite_url: z.boolean().optional(),
  seat: z.union([z.boolean(), z.lazy(() => SeatArgsSchema)]).optional(),
}).strict();

// SEAT SUMMARY
//------------------------------------------------------

export const SeatSummaryArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryArgs> = z.object({
  select: z.lazy(() => SeatSummarySelectSchema).optional(),
  include: z.lazy(() => SeatSummaryIncludeSchema).optional(),
}).strict();

export const SeatSummaryIncludeSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryInclude> = z.object({
  subscription: z.union([z.boolean(), z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict();

export const SeatSummarySelectSchema: z.ZodType<PrismaClient.Prisma.SeatSummarySelect> = z.object({
  subscription_id: z.boolean().optional(),
  standard_seat_count: z.boolean().optional(),
  limited_seat_count: z.boolean().optional(),
  subscription: z.union([z.boolean(), z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict();

// SEAT
//------------------------------------------------------

export const SeatArgsSchema: z.ZodType<PrismaClient.Prisma.SeatArgs> = z.object({
  select: z.lazy(() => SeatSelectSchema).optional(),
  include: z.lazy(() => SeatIncludeSchema).optional(),
}).strict();

export const SeatIncludeSchema: z.ZodType<PrismaClient.Prisma.SeatInclude> = z.object({
  reservation: z.union([z.boolean(), z.lazy(() => SeatReservationArgsSchema)]).optional(),
  occupant: z.union([z.boolean(), z.lazy(() => SeatOccupantArgsSchema)]).optional(),
}).strict();

export const SeatSelectSchema: z.ZodType<PrismaClient.Prisma.SeatSelect> = z.object({
  id: z.boolean().optional(),
  seating_strategy_name: z.boolean().optional(),
  subscription_id: z.boolean().optional(),
  created_utc: z.boolean().optional(),
  seat_type: z.boolean().optional(),
  expires_utc: z.boolean().optional(),
  redeemed_utc: z.boolean().optional(),
  reservation: z.union([z.boolean(), z.lazy(() => SeatReservationArgsSchema)]).optional(),
  occupant: z.union([z.boolean(), z.lazy(() => SeatOccupantArgsSchema)]).optional(),
}).strict();

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionArgs> = z.object({
  select: z.lazy(() => SubscriptionSelectSchema).optional(),
  include: z.lazy(() => SubscriptionIncludeSchema).optional(),
}).strict();

export const SubscriptionIncludeSchema: z.ZodType<PrismaClient.Prisma.SubscriptionInclude> = z.object({
  seatingConfig: z.union([z.boolean(), z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  seatSummary: z.union([z.boolean(), z.lazy(() => SeatSummaryArgsSchema)]).optional(),
}).strict();

export const SubscriptionSelectSchema: z.ZodType<PrismaClient.Prisma.SubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  product_id: z.boolean().optional(),
  is_setup_complete: z.boolean().optional(),
  created_utc: z.boolean().optional(),
  tenant_id: z.boolean().optional(),
  subscriber_info: z.boolean().optional(),
  source_subscription: z.boolean().optional(),
  subscription_name: z.boolean().optional(),
  tenant_name: z.boolean().optional(),
  offer_id: z.boolean().optional(),
  plan_id: z.boolean().optional(),
  state: z.boolean().optional(),
  admin_role_name: z.boolean().optional(),
  user_role_name: z.boolean().optional(),
  management_urls: z.boolean().optional(),
  admin_name: z.boolean().optional(),
  admin_email: z.boolean().optional(),
  total_seats: z.boolean().optional(),
  is_being_configured: z.boolean().optional(),
  is_free_trial: z.boolean().optional(),
  is_test_subscription: z.boolean().optional(),
  state_last_updated_utc: z.boolean().optional(),
  seatingConfig: z.union([z.boolean(), z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  seatSummary: z.union([z.boolean(), z.lazy(() => SeatSummaryArgsSchema)]).optional(),
}).strict();

// ACCOUNT
//------------------------------------------------------

export const AccountArgsSchema: z.ZodType<PrismaClient.Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountIncludeSchema: z.ZodType<PrismaClient.Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<PrismaClient.Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

// SESSION
//------------------------------------------------------

export const SessionArgsSchema: z.ZodType<PrismaClient.Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionIncludeSchema: z.ZodType<PrismaClient.Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<PrismaClient.Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<PrismaClient.Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserIncludeSchema: z.ZodType<PrismaClient.Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  credentials: z.union([z.boolean(), z.lazy(() => CredentialFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  products: z.boolean().optional(),
  credentials: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<PrismaClient.Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  credentials: z.union([z.boolean(), z.lazy(() => CredentialFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

// CREDENTIAL TRANSPORTS
//------------------------------------------------------

export const CredentialTransportsArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsArgs> = z.object({
  select: z.lazy(() => CredentialTransportsSelectSchema).optional(),
  include: z.lazy(() => CredentialTransportsIncludeSchema).optional(),
}).strict();

export const CredentialTransportsIncludeSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsInclude> = z.object({
  credential: z.union([z.boolean(), z.lazy(() => CredentialArgsSchema)]).optional(),
}).strict();

export const CredentialTransportsSelectSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsSelect> = z.object({
  id: z.boolean().optional(),
  transport: z.boolean().optional(),
  credential: z.union([z.boolean(), z.lazy(() => CredentialArgsSchema)]).optional(),
}).strict();

// CREDENTIAL
//------------------------------------------------------

export const CredentialArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialArgs> = z.object({
  select: z.lazy(() => CredentialSelectSchema).optional(),
  include: z.lazy(() => CredentialIncludeSchema).optional(),
}).strict();

export const CredentialIncludeSchema: z.ZodType<PrismaClient.Prisma.CredentialInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  transports: z.union([z.boolean(), z.lazy(() => CredentialTransportsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CredentialCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CredentialCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CredentialCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CredentialCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.CredentialCountOutputTypeSelect> = z.object({
  transports: z.boolean().optional(),
}).strict();

export const CredentialSelectSchema: z.ZodType<PrismaClient.Prisma.CredentialSelect> = z.object({
  id: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  userId: z.boolean().optional(),
  transports: z.union([z.boolean(), z.lazy(() => CredentialTransportsFindManyArgsSchema)]).optional(),
  publicKey: z.boolean().optional(),
  signCount: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CredentialCountOutputTypeArgsSchema)]).optional(),
}).strict();

// CREDENTIAL CHALLENGE
//------------------------------------------------------

export const CredentialChallengeSelectSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeSelect> = z.object({
  userId: z.boolean().optional(),
  value: z.boolean().optional(),
}).strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ProductWhereInputSchema: z.ZodType<PrismaClient.Prisma.ProductWhereInput> = z.object({
  AND: z.union([z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  owner_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  product_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  publisher_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  home_page_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_page_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  privacy_notice_page_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_sales_email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_sales_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_support_email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_support_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  is_setup_complete: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  on_access_denied_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_access_granted_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_no_seat_available_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  seatingConfig: z.union([z.lazy(() => SeatingConfigRelationFilterSchema), z.lazy(() => SeatingConfigWhereInputSchema)]).optional(),
  owner: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}).strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  product_name: z.lazy(() => SortOrderSchema).optional(),
  publisher_name: z.lazy(() => SortOrderSchema).optional(),
  home_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_page_url: z.lazy(() => SortOrderSchema).optional(),
  privacy_notice_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_email: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_url: z.lazy(() => SortOrderSchema).optional(),
  contact_support_email: z.lazy(() => SortOrderSchema).optional(),
  contact_support_url: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  on_access_denied_url: z.lazy(() => SortOrderSchema).optional(),
  on_access_granted_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_seat_available_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_ready_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_canceled_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_suspended_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_found_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_subscriptions_found_url: z.lazy(() => SortOrderSchema).optional(),
  seatingConfig: z.lazy(() => SeatingConfigOrderByWithRelationInputSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const ProductOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  product_name: z.lazy(() => SortOrderSchema).optional(),
  publisher_name: z.lazy(() => SortOrderSchema).optional(),
  home_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_page_url: z.lazy(() => SortOrderSchema).optional(),
  privacy_notice_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_email: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_url: z.lazy(() => SortOrderSchema).optional(),
  contact_support_email: z.lazy(() => SortOrderSchema).optional(),
  contact_support_url: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  on_access_denied_url: z.lazy(() => SortOrderSchema).optional(),
  on_access_granted_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_seat_available_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_ready_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_canceled_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_suspended_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_found_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_subscriptions_found_url: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
}).strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  owner_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  product_name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  publisher_name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  home_page_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  contact_page_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  privacy_notice_page_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  contact_sales_email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  contact_sales_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  contact_support_email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  contact_support_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  is_setup_complete: z.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()]).optional().nullable(),
  on_access_denied_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_access_granted_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_no_seat_available_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SeatingConfigWhereInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigWhereInput> = z.object({
  AND: z.union([z.lazy(() => SeatingConfigWhereInputSchema), z.lazy(() => SeatingConfigWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatingConfigWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatingConfigWhereInputSchema), z.lazy(() => SeatingConfigWhereInputSchema).array()]).optional(),
  owner_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  default_low_seat_warning_level_percent: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  seating_strategy_name: z.union([z.lazy(() => EnumSeatingStrategyNameFilterSchema), z.lazy(() => SeatingStrategyNameSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.lazy(() => FloatNullableFilterSchema), z.number()]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  publisher: z.union([z.lazy(() => ProductRelationFilterSchema), z.lazy(() => ProductWhereInputSchema)]).optional().nullable(),
  subscription: z.union([z.lazy(() => SubscriptionRelationFilterSchema), z.lazy(() => SubscriptionWhereInputSchema)]).optional().nullable(),
}).strict();

export const SeatingConfigOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigOrderByWithRelationInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatingConfigWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigWhereUniqueInput> = z.object({
  owner_id: z.string().optional(),
}).strict();

export const SeatingConfigOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigOrderByWithAggregationInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatingConfigCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SeatingConfigAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatingConfigMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatingConfigMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SeatingConfigSumOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatingConfigScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema).array()]).optional(),
  owner_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  default_low_seat_warning_level_percent: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  seating_strategy_name: z.union([z.lazy(() => EnumSeatingStrategyNameWithAggregatesFilterSchema), z.lazy(() => SeatingStrategyNameSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
}).strict();

export const SeatOccupantWhereInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantWhereInput> = z.object({
  AND: z.union([z.lazy(() => SeatOccupantWhereInputSchema), z.lazy(() => SeatOccupantWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatOccupantWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatOccupantWhereInputSchema), z.lazy(() => SeatOccupantWhereInputSchema).array()]).optional(),
  seat_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  tenant_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user_name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  seat: z.union([z.lazy(() => SeatRelationFilterSchema), z.lazy(() => SeatWhereInputSchema)]).optional(),
}).strict();

export const SeatOccupantOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantOrderByWithRelationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  seat: z.lazy(() => SeatOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatOccupantWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantWhereUniqueInput> = z.object({
  seat_id: z.string().optional(),
}).strict();

export const SeatOccupantOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantOrderByWithAggregationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatOccupantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatOccupantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatOccupantMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatOccupantScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema).array()]).optional(),
  seat_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  tenant_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  user_name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SeatReservationWhereInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationWhereInput> = z.object({
  AND: z.union([z.lazy(() => SeatReservationWhereInputSchema), z.lazy(() => SeatReservationWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatReservationWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatReservationWhereInputSchema), z.lazy(() => SeatReservationWhereInputSchema).array()]).optional(),
  seat_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  tenant_id: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user_id: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  invite_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  seat: z.union([z.lazy(() => SeatRelationFilterSchema), z.lazy(() => SeatWhereInputSchema)]).optional(),
}).strict();

export const SeatReservationOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationOrderByWithRelationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
  seat: z.lazy(() => SeatOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatReservationWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationWhereUniqueInput> = z.object({
  seat_id: z.string().optional(),
}).strict();

export const SeatReservationOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationOrderByWithAggregationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatReservationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatReservationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatReservationMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatReservationScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema).array()]).optional(),
  seat_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  tenant_id: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  user_id: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  invite_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SeatSummaryWhereInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryWhereInput> = z.object({
  AND: z.union([z.lazy(() => SeatSummaryWhereInputSchema), z.lazy(() => SeatSummaryWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatSummaryWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatSummaryWhereInputSchema), z.lazy(() => SeatSummaryWhereInputSchema).array()]).optional(),
  subscription_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  standard_seat_count: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  limited_seat_count: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  subscription: z.union([z.lazy(() => SubscriptionRelationFilterSchema), z.lazy(() => SubscriptionWhereInputSchema)]).optional(),
}).strict();

export const SeatSummaryOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryOrderByWithRelationInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
  subscription: z.lazy(() => SubscriptionOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatSummaryWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryWhereUniqueInput> = z.object({
  subscription_id: z.string().optional(),
}).strict();

export const SeatSummaryOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryOrderByWithAggregationInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatSummaryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SeatSummaryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatSummaryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatSummaryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SeatSummarySumOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatSummaryScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema).array()]).optional(),
  subscription_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  standard_seat_count: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  limited_seat_count: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
}).strict();

export const SeatWhereInputSchema: z.ZodType<PrismaClient.Prisma.SeatWhereInput> = z.object({
  AND: z.union([z.lazy(() => SeatWhereInputSchema), z.lazy(() => SeatWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatWhereInputSchema), z.lazy(() => SeatWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  seating_strategy_name: z.union([z.lazy(() => EnumSeatingStrategyNameFilterSchema), z.lazy(() => SeatingStrategyNameSchema)]).optional(),
  subscription_id: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  created_utc: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  seat_type: z.union([z.lazy(() => EnumSeatTypeFilterSchema), z.lazy(() => SeatTypeSchema)]).optional(),
  expires_utc: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  redeemed_utc: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  reservation: z.union([z.lazy(() => SeatReservationRelationFilterSchema), z.lazy(() => SeatReservationWhereInputSchema)]).optional().nullable(),
  occupant: z.union([z.lazy(() => SeatOccupantRelationFilterSchema), z.lazy(() => SeatOccupantWhereInputSchema)]).optional().nullable(),
}).strict();

export const SeatOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SeatOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
  reservation: z.lazy(() => SeatReservationOrderByWithRelationInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SeatWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const SeatOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SeatOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SeatScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SeatScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SeatScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SeatScalarWhereWithAggregatesInputSchema), z.lazy(() => SeatScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  seating_strategy_name: z.union([z.lazy(() => EnumSeatingStrategyNameWithAggregatesFilterSchema), z.lazy(() => SeatingStrategyNameSchema)]).optional(),
  subscription_id: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  created_utc: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  seat_type: z.union([z.lazy(() => EnumSeatTypeWithAggregatesFilterSchema), z.lazy(() => SeatTypeSchema)]).optional(),
  expires_utc: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  redeemed_utc: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
}).strict();

export const SubscriptionWhereInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionWhereInput> = z.object({
  AND: z.union([z.lazy(() => SubscriptionWhereInputSchema), z.lazy(() => SubscriptionWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SubscriptionWhereInputSchema), z.lazy(() => SubscriptionWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  product_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  is_setup_complete: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  created_utc: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  tenant_id: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  subscriber_info: z.lazy(() => JsonNullableFilterSchema).optional(),
  source_subscription: z.lazy(() => JsonNullableFilterSchema).optional(),
  subscription_name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  tenant_name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  offer_id: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  plan_id: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  state: z.union([z.lazy(() => EnumSubscriptionStateFilterSchema), z.lazy(() => SubscriptionStateSchema)]).optional(),
  admin_role_name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user_role_name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  management_urls: z.lazy(() => JsonNullableFilterSchema).optional(),
  admin_name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  admin_email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  total_seats: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  is_being_configured: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  is_free_trial: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  is_test_subscription: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  state_last_updated_utc: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  seatingConfig: z.union([z.lazy(() => SeatingConfigRelationFilterSchema), z.lazy(() => SeatingConfigWhereInputSchema)]).optional(),
  seatSummary: z.union([z.lazy(() => SeatSummaryRelationFilterSchema), z.lazy(() => SeatSummaryWhereInputSchema)]).optional().nullable(),
}).strict();

export const SubscriptionOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  subscriber_info: z.lazy(() => SortOrderSchema).optional(),
  source_subscription: z.lazy(() => SortOrderSchema).optional(),
  subscription_name: z.lazy(() => SortOrderSchema).optional(),
  tenant_name: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  plan_id: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  admin_role_name: z.lazy(() => SortOrderSchema).optional(),
  user_role_name: z.lazy(() => SortOrderSchema).optional(),
  management_urls: z.lazy(() => SortOrderSchema).optional(),
  admin_name: z.lazy(() => SortOrderSchema).optional(),
  admin_email: z.lazy(() => SortOrderSchema).optional(),
  total_seats: z.lazy(() => SortOrderSchema).optional(),
  is_being_configured: z.lazy(() => SortOrderSchema).optional(),
  is_free_trial: z.lazy(() => SortOrderSchema).optional(),
  is_test_subscription: z.lazy(() => SortOrderSchema).optional(),
  state_last_updated_utc: z.lazy(() => SortOrderSchema).optional(),
  seatingConfig: z.lazy(() => SeatingConfigOrderByWithRelationInputSchema).optional(),
  seatSummary: z.lazy(() => SeatSummaryOrderByWithRelationInputSchema).optional(),
}).strict();

export const SubscriptionWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  subscriber_info: z.lazy(() => SortOrderSchema).optional(),
  source_subscription: z.lazy(() => SortOrderSchema).optional(),
  subscription_name: z.lazy(() => SortOrderSchema).optional(),
  tenant_name: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  plan_id: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  admin_role_name: z.lazy(() => SortOrderSchema).optional(),
  user_role_name: z.lazy(() => SortOrderSchema).optional(),
  management_urls: z.lazy(() => SortOrderSchema).optional(),
  admin_name: z.lazy(() => SortOrderSchema).optional(),
  admin_email: z.lazy(() => SortOrderSchema).optional(),
  total_seats: z.lazy(() => SortOrderSchema).optional(),
  is_being_configured: z.lazy(() => SortOrderSchema).optional(),
  is_free_trial: z.lazy(() => SortOrderSchema).optional(),
  is_test_subscription: z.lazy(() => SortOrderSchema).optional(),
  state_last_updated_utc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscriptionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SubscriptionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscriptionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SubscriptionSumOrderByAggregateInputSchema).optional(),
}).strict();

export const SubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema), z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema), z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  product_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  is_setup_complete: z.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()]).optional().nullable(),
  created_utc: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  tenant_id: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  subscriber_info: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  source_subscription: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  subscription_name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  tenant_name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  offer_id: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  plan_id: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  state: z.union([z.lazy(() => EnumSubscriptionStateWithAggregatesFilterSchema), z.lazy(() => SubscriptionStateSchema)]).optional(),
  admin_role_name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  user_role_name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  management_urls: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  admin_name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  admin_email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  total_seats: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  is_being_configured: z.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()]).optional().nullable(),
  is_free_trial: z.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()]).optional().nullable(),
  is_test_subscription: z.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()]).optional().nullable(),
  state_last_updated_utc: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<PrismaClient.Prisma.AccountWhereInput> = z.object({
  AND: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<PrismaClient.Prisma.SessionWhereInput> = z.object({
  AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  emailVerified: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  image: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  credentials: z.lazy(() => CredentialListRelationFilterSchema).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  credentials: z.lazy(() => CredentialOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  emailVerified: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  image: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const CredentialTransportsWhereInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsWhereInput> = z.object({
  AND: z.union([z.lazy(() => CredentialTransportsWhereInputSchema), z.lazy(() => CredentialTransportsWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialTransportsWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialTransportsWhereInputSchema), z.lazy(() => CredentialTransportsWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  transport: z.union([z.lazy(() => EnumAuthenticatorTransportFilterSchema), z.lazy(() => AuthenticatorTransportSchema)]).optional(),
  credential: z.union([z.lazy(() => CredentialRelationFilterSchema), z.lazy(() => CredentialWhereInputSchema)]).optional(),
}).strict();

export const CredentialTransportsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
  credential: z.lazy(() => CredentialOrderByWithRelationInputSchema).optional(),
}).strict();

export const CredentialTransportsWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsWhereUniqueInput> = z.object({
  id_transport: z.lazy(() => CredentialTransportsIdTransportCompoundUniqueInputSchema).optional(),
}).strict();

export const CredentialTransportsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CredentialTransportsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CredentialTransportsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CredentialTransportsMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CredentialTransportsScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema), z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema), z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  transport: z.union([z.lazy(() => EnumAuthenticatorTransportWithAggregatesFilterSchema), z.lazy(() => AuthenticatorTransportSchema)]).optional(),
}).strict();

export const CredentialWhereInputSchema: z.ZodType<PrismaClient.Prisma.CredentialWhereInput> = z.object({
  AND: z.union([z.lazy(() => CredentialWhereInputSchema), z.lazy(() => CredentialWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialWhereInputSchema), z.lazy(() => CredentialWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  transports: z.lazy(() => CredentialTransportsListRelationFilterSchema).optional(),
  publicKey: z.union([z.lazy(() => BytesFilterSchema), z.instanceof(Buffer)]).optional(),
  signCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const CredentialOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => CredentialTransportsOrderByRelationAggregateInputSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CredentialWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const CredentialOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CredentialCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CredentialAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CredentialMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CredentialMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CredentialSumOrderByAggregateInputSchema).optional(),
}).strict();

export const CredentialScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.CredentialScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema), z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema), z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  publicKey: z.union([z.lazy(() => BytesWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional(),
  signCount: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const CredentialChallengeWhereInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeWhereInput> = z.object({
  AND: z.union([z.lazy(() => CredentialChallengeWhereInputSchema), z.lazy(() => CredentialChallengeWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialChallengeWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialChallengeWhereInputSchema), z.lazy(() => CredentialChallengeWhereInputSchema).array()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const CredentialChallengeOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialChallengeWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeWhereUniqueInput> = z.object({
  userId: z.string().optional(),
}).strict();

export const CredentialChallengeOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CredentialChallengeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CredentialChallengeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CredentialChallengeMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CredentialChallengeScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema), z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema), z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema).array()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional(),
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const ProductCreateInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateInput> = z.object({
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigCreateNestedOneWithoutPublisherInputSchema),
  owner: z.lazy(() => UserCreateNestedOneWithoutProductsInputSchema),
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string(),
  owner_id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
}).strict();

export const ProductUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateInput> = z.object({
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateManyInput> = z.object({
  id: z.string(),
  owner_id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
}).strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateManyMutationInput> = z.object({
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatingConfigCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().int().optional().nullable(),
  default_seat_expiry_in_days: z.number().int().optional().nullable(),
  publisher: z.lazy(() => ProductCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedCreateInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().int().optional().nullable(),
  default_seat_expiry_in_days: z.number().int().optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.lazy(() => ProductUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedUpdateInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateManyInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().int().optional().nullable(),
  default_seat_expiry_in_days: z.number().int().optional().nullable(),
}).strict();

export const SeatingConfigUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateManyMutationInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatingConfigUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedUpdateManyInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatOccupantCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateInput> = z.object({
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
  seat: z.lazy(() => SeatCreateNestedOneWithoutOccupantInputSchema),
}).strict();

export const SeatOccupantUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedCreateInput> = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpdateInput> = z.object({
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat: z.lazy(() => SeatUpdateOneRequiredWithoutOccupantNestedInputSchema).optional(),
}).strict();

export const SeatOccupantUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedUpdateInput> = z.object({
  seat_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatOccupantCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateManyInput> = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpdateManyMutationInput> = z.object({
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatOccupantUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedUpdateManyInput> = z.object({
  seat_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatReservationCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateInput> = z.object({
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
  seat: z.lazy(() => SeatCreateNestedOneWithoutReservationInputSchema),
}).strict();

export const SeatReservationUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedCreateInput> = z.object({
  seat_id: z.string(),
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpdateInput> = z.object({
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  invite_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat: z.lazy(() => SeatUpdateOneRequiredWithoutReservationNestedInputSchema).optional(),
}).strict();

export const SeatReservationUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedUpdateInput> = z.object({
  seat_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  invite_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatReservationCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateManyInput> = z.object({
  seat_id: z.string(),
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpdateManyMutationInput> = z.object({
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  invite_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatReservationUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedUpdateManyInput> = z.object({
  seat_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  invite_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatSummaryCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateInput> = z.object({
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutSeatSummaryInputSchema),
}).strict();

export const SeatSummaryUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedCreateInput> = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
}).strict();

export const SeatSummaryUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpdateInput> = z.object({
  standard_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  limited_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneRequiredWithoutSeatSummaryNestedInputSchema).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedUpdateInput> = z.object({
  subscription_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  standard_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  limited_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SeatSummaryCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateManyInput> = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
}).strict();

export const SeatSummaryUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpdateManyMutationInput> = z.object({
  standard_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  limited_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedUpdateManyInput> = z.object({
  subscription_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  standard_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  limited_seat_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SeatCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationCreateNestedOneWithoutSeatInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedCreateInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUpdateOneWithoutSeatNestedInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateManyInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
}).strict();

export const SeatUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateManyMutationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SubscriptionCreateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().int().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigCreateNestedOneWithoutSubscriptionInputSchema),
  seatSummary: z.lazy(() => SeatSummaryCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedCreateInput> = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().int().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateInput> = z.object({
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInputSchema).optional(),
  seatSummary: z.lazy(() => SeatSummaryUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateManyInput> = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().int().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
}).strict();

export const SubscriptionUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateManyMutationInput> = z.object({
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SubscriptionUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
}).strict();

export const SessionUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const CredentialTransportsCreateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
  credential: z.lazy(() => CredentialCreateNestedOneWithoutTransportsInputSchema),
}).strict();

export const CredentialTransportsUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedCreateInput> = z.object({
  id: z.string(),
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateInput> = z.object({
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
  credential: z.lazy(() => CredentialUpdateOneRequiredWithoutTransportsNestedInputSchema).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialTransportsCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateManyInput> = z.object({
  id: z.string(),
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateManyMutationInput> = z.object({
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialCreateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCredentialsInputSchema),
  transports: z.lazy(() => CredentialTransportsCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  transports: z.lazy(() => CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCredentialsNestedInputSchema).optional(),
  transports: z.lazy(() => CredentialTransportsUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  transports: z.lazy(() => CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialChallengeCreateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeCreateInput> = z.object({
  userId: z.string(),
  value: z.string(),
}).strict();

export const CredentialChallengeUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUncheckedCreateInput> = z.object({
  userId: z.string(),
  value: z.string(),
}).strict();

export const CredentialChallengeUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUpdateInput> = z.object({
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialChallengeUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUncheckedUpdateInput> = z.object({
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialChallengeCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeCreateManyInput> = z.object({
  userId: z.string(),
  value: z.string(),
}).strict();

export const CredentialChallengeUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUpdateManyMutationInput> = z.object({
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialChallengeUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUncheckedUpdateManyInput> = z.object({
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<PrismaClient.Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<PrismaClient.Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)]).optional().nullable(),
}).strict();

export const SeatingConfigRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigRelationFilter> = z.object({
  is: z.lazy(() => SeatingConfigWhereInputSchema).optional(),
  isNot: z.lazy(() => SeatingConfigWhereInputSchema).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  product_name: z.lazy(() => SortOrderSchema).optional(),
  publisher_name: z.lazy(() => SortOrderSchema).optional(),
  home_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_page_url: z.lazy(() => SortOrderSchema).optional(),
  privacy_notice_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_email: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_url: z.lazy(() => SortOrderSchema).optional(),
  contact_support_email: z.lazy(() => SortOrderSchema).optional(),
  contact_support_url: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  on_access_denied_url: z.lazy(() => SortOrderSchema).optional(),
  on_access_granted_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_seat_available_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_ready_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_canceled_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_suspended_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_found_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_subscriptions_found_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  product_name: z.lazy(() => SortOrderSchema).optional(),
  publisher_name: z.lazy(() => SortOrderSchema).optional(),
  home_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_page_url: z.lazy(() => SortOrderSchema).optional(),
  privacy_notice_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_email: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_url: z.lazy(() => SortOrderSchema).optional(),
  contact_support_email: z.lazy(() => SortOrderSchema).optional(),
  contact_support_url: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  on_access_denied_url: z.lazy(() => SortOrderSchema).optional(),
  on_access_granted_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_seat_available_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_ready_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_canceled_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_suspended_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_found_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_subscriptions_found_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  product_name: z.lazy(() => SortOrderSchema).optional(),
  publisher_name: z.lazy(() => SortOrderSchema).optional(),
  home_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_page_url: z.lazy(() => SortOrderSchema).optional(),
  privacy_notice_page_url: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_email: z.lazy(() => SortOrderSchema).optional(),
  contact_sales_url: z.lazy(() => SortOrderSchema).optional(),
  contact_support_email: z.lazy(() => SortOrderSchema).optional(),
  contact_support_url: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  on_access_denied_url: z.lazy(() => SortOrderSchema).optional(),
  on_access_granted_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_seat_available_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_ready_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_canceled_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_suspended_url: z.lazy(() => SortOrderSchema).optional(),
  on_subscription_not_found_url: z.lazy(() => SortOrderSchema).optional(),
  on_no_subscriptions_found_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<PrismaClient.Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const EnumSeatingStrategyNameFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSeatingStrategyNameFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema)]).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<PrismaClient.Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const ProductRelationFilterSchema: z.ZodType<PrismaClient.Prisma.ProductRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
}).strict();

export const SubscriptionRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SubscriptionRelationFilter> = z.object({
  is: z.lazy(() => SubscriptionWhereInputSchema).optional(),
  isNot: z.lazy(() => SubscriptionWhereInputSchema).optional(),
}).strict();

export const SeatingConfigCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCountOrderByAggregateInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigAvgOrderByAggregateInput> = z.object({
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigMaxOrderByAggregateInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigMinOrderByAggregateInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigSumOrderByAggregateInput> = z.object({
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const EnumSeatingStrategyNameWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSeatingStrategyNameWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => NestedEnumSeatingStrategyNameWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const SeatRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SeatRelationFilter> = z.object({
  is: z.lazy(() => SeatWhereInputSchema).optional(),
  isNot: z.lazy(() => SeatWhereInputSchema).optional(),
}).strict();

export const SeatOccupantCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCountOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatOccupantMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantMaxOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatOccupantMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantMinOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatReservationCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCountOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatReservationMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationMaxOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatReservationMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationMinOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<PrismaClient.Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const SeatSummaryCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCountOrderByAggregateInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummaryAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryAvgOrderByAggregateInput> = z.object({
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummaryMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryMaxOrderByAggregateInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummaryMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryMinOrderByAggregateInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummarySumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummarySumOrderByAggregateInput> = z.object({
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable(),
}).strict();

export const EnumSeatTypeFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSeatTypeFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => NestedEnumSeatTypeFilterSchema)]).optional(),
}).strict();

export const SeatReservationRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SeatReservationRelationFilter> = z.object({
  is: z.lazy(() => SeatReservationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeatReservationWhereInputSchema).optional().nullable(),
}).strict();

export const SeatOccupantRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantRelationFilter> = z.object({
  is: z.lazy(() => SeatOccupantWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeatOccupantWhereInputSchema).optional().nullable(),
}).strict();

export const SeatCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SeatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const EnumSeatTypeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSeatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => NestedEnumSeatTypeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<PrismaClient.Prisma.JsonNullableFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
}).strict();

export const EnumSubscriptionStateFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSubscriptionStateFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => NestedEnumSubscriptionStateFilterSchema)]).optional(),
}).strict();

export const SeatSummaryRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryRelationFilter> = z.object({
  is: z.lazy(() => SeatSummaryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeatSummaryWhereInputSchema).optional().nullable(),
}).strict();

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  subscriber_info: z.lazy(() => SortOrderSchema).optional(),
  source_subscription: z.lazy(() => SortOrderSchema).optional(),
  subscription_name: z.lazy(() => SortOrderSchema).optional(),
  tenant_name: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  plan_id: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  admin_role_name: z.lazy(() => SortOrderSchema).optional(),
  user_role_name: z.lazy(() => SortOrderSchema).optional(),
  management_urls: z.lazy(() => SortOrderSchema).optional(),
  admin_name: z.lazy(() => SortOrderSchema).optional(),
  admin_email: z.lazy(() => SortOrderSchema).optional(),
  total_seats: z.lazy(() => SortOrderSchema).optional(),
  is_being_configured: z.lazy(() => SortOrderSchema).optional(),
  is_free_trial: z.lazy(() => SortOrderSchema).optional(),
  is_test_subscription: z.lazy(() => SortOrderSchema).optional(),
  state_last_updated_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SubscriptionAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionAvgOrderByAggregateInput> = z.object({
  total_seats: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SubscriptionMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  subscription_name: z.lazy(() => SortOrderSchema).optional(),
  tenant_name: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  plan_id: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  admin_role_name: z.lazy(() => SortOrderSchema).optional(),
  user_role_name: z.lazy(() => SortOrderSchema).optional(),
  admin_name: z.lazy(() => SortOrderSchema).optional(),
  admin_email: z.lazy(() => SortOrderSchema).optional(),
  total_seats: z.lazy(() => SortOrderSchema).optional(),
  is_being_configured: z.lazy(() => SortOrderSchema).optional(),
  is_free_trial: z.lazy(() => SortOrderSchema).optional(),
  is_test_subscription: z.lazy(() => SortOrderSchema).optional(),
  state_last_updated_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SubscriptionMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  is_setup_complete: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  subscription_name: z.lazy(() => SortOrderSchema).optional(),
  tenant_name: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  plan_id: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  admin_role_name: z.lazy(() => SortOrderSchema).optional(),
  user_role_name: z.lazy(() => SortOrderSchema).optional(),
  admin_name: z.lazy(() => SortOrderSchema).optional(),
  admin_email: z.lazy(() => SortOrderSchema).optional(),
  total_seats: z.lazy(() => SortOrderSchema).optional(),
  is_being_configured: z.lazy(() => SortOrderSchema).optional(),
  is_free_trial: z.lazy(() => SortOrderSchema).optional(),
  is_test_subscription: z.lazy(() => SortOrderSchema).optional(),
  state_last_updated_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SubscriptionSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionSumOrderByAggregateInput> = z.object({
  total_seats: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
}).strict();

export const EnumSubscriptionStateWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSubscriptionStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => NestedEnumSubscriptionStateWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional(),
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional(),
}).strict();

export const CredentialListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CredentialListRelationFilter> = z.object({
  every: z.lazy(() => CredentialWhereInputSchema).optional(),
  some: z.lazy(() => CredentialWhereInputSchema).optional(),
  none: z.lazy(() => CredentialWhereInputSchema).optional(),
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumAuthenticatorTransportFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAuthenticatorTransportFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema)]).optional(),
}).strict();

export const CredentialRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CredentialRelationFilter> = z.object({
  is: z.lazy(() => CredentialWhereInputSchema).optional(),
  isNot: z.lazy(() => CredentialWhereInputSchema).optional(),
}).strict();

export const CredentialTransportsIdTransportCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsIdTransportCompoundUniqueInput> = z.object({
  id: z.string(),
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialTransportsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialTransportsMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumAuthenticatorTransportWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAuthenticatorTransportWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => NestedEnumAuthenticatorTransportWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
}).strict();

export const CredentialTransportsListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsListRelationFilter> = z.object({
  every: z.lazy(() => CredentialTransportsWhereInputSchema).optional(),
  some: z.lazy(() => CredentialTransportsWhereInputSchema).optional(),
  none: z.lazy(() => CredentialTransportsWhereInputSchema).optional(),
}).strict();

export const BytesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterSchema)]).optional(),
}).strict();

export const CredentialTransportsOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialAvgOrderByAggregateInput> = z.object({
  signCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialSumOrderByAggregateInput> = z.object({
  signCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict();

export const CredentialChallengeCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialChallengeMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialChallengeMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string(),
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigCreateNestedOneWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateNestedOneWithoutPublisherInput> = z.object({
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutPublisherInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutProductsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProductsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
}).strict();

export const SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateOneRequiredWithoutPublisherNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutPublisherInputSchema).optional(),
  upsert: z.lazy(() => SeatingConfigUpsertWithoutPublisherInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatingConfigUpdateWithoutPublisherInputSchema), z.lazy(() => SeatingConfigUncheckedUpdateWithoutPublisherInputSchema)]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutProductsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProductsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutProductsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProductsInputSchema)]).optional(),
}).strict();

export const ProductCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
}).strict();

export const SubscriptionCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
}).strict();

export const ProductUncheckedCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const EnumSeatingStrategyNameFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumSeatingStrategyNameFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SeatingStrategyNameSchema).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const ProductUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutSeatingConfigInputSchema)]).optional(),
}).strict();

export const SubscriptionUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SubscriptionUpdateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema)]).optional(),
}).strict();

export const ProductUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutSeatingConfigInputSchema)]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SubscriptionUpdateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema)]).optional(),
}).strict();

export const SeatCreateNestedOneWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateNestedOneWithoutOccupantInput> = z.object({
  create: z.union([z.lazy(() => SeatCreateWithoutOccupantInputSchema), z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutOccupantInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
}).strict();

export const SeatUpdateOneRequiredWithoutOccupantNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateOneRequiredWithoutOccupantNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatCreateWithoutOccupantInputSchema), z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutOccupantInputSchema).optional(),
  upsert: z.lazy(() => SeatUpsertWithoutOccupantInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatUpdateWithoutOccupantInputSchema), z.lazy(() => SeatUncheckedUpdateWithoutOccupantInputSchema)]).optional(),
}).strict();

export const SeatCreateNestedOneWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateNestedOneWithoutReservationInput> = z.object({
  create: z.union([z.lazy(() => SeatCreateWithoutReservationInputSchema), z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
}).strict();

export const SeatUpdateOneRequiredWithoutReservationNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateOneRequiredWithoutReservationNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatCreateWithoutReservationInputSchema), z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutReservationInputSchema).optional(),
  upsert: z.lazy(() => SeatUpsertWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatUpdateWithoutReservationInputSchema), z.lazy(() => SeatUncheckedUpdateWithoutReservationInputSchema)]).optional(),
}).strict();

export const SubscriptionCreateNestedOneWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateNestedOneWithoutSeatSummaryInput> = z.object({
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatSummaryInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const SubscriptionUpdateOneRequiredWithoutSeatSummaryNestedInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateOneRequiredWithoutSeatSummaryNestedInput> = z.object({
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatSummaryInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutSeatSummaryInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SubscriptionUpdateWithoutSeatSummaryInputSchema), z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatSummaryInputSchema)]).optional(),
}).strict();

export const SeatReservationCreateNestedOneWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([z.lazy(() => SeatReservationCreateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
}).strict();

export const SeatOccupantCreateNestedOneWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
}).strict();

export const SeatReservationUncheckedCreateNestedOneWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([z.lazy(() => SeatReservationCreateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
}).strict();

export const SeatOccupantUncheckedCreateNestedOneWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional().nullable(),
}).strict();

export const EnumSeatTypeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumSeatTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SeatTypeSchema).optional(),
}).strict();

export const SeatReservationUpdateOneWithoutSeatNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatReservationCreateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatReservationUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatReservationUpdateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedUpdateWithoutSeatInputSchema)]).optional(),
}).strict();

export const SeatOccupantUpdateOneWithoutSeatNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatOccupantUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatOccupantUpdateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedUpdateWithoutSeatInputSchema)]).optional(),
}).strict();

export const SeatReservationUncheckedUpdateOneWithoutSeatNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatReservationCreateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatReservationUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatReservationUpdateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedUpdateWithoutSeatInputSchema)]).optional(),
}).strict();

export const SeatOccupantUncheckedUpdateOneWithoutSeatNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatOccupantUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatOccupantUpdateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedUpdateWithoutSeatInputSchema)]).optional(),
}).strict();

export const SeatingConfigCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
}).strict();

export const SeatSummaryCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
}).strict();

export const SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
}).strict();

export const EnumSubscriptionStateFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumSubscriptionStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SubscriptionStateSchema).optional(),
}).strict();

export const SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => SeatingConfigUpsertWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatingConfigUpdateWithoutSubscriptionInputSchema), z.lazy(() => SeatingConfigUncheckedUpdateWithoutSubscriptionInputSchema)]).optional(),
}).strict();

export const SeatSummaryUpdateOneWithoutSubscriptionNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpdateOneWithoutSubscriptionNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => SeatSummaryUpsertWithoutSubscriptionInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatSummaryUpdateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema)]).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInput> = z.object({
  create: z.union([z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => SeatSummaryUpsertWithoutSubscriptionInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SeatSummaryUpdateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOwnerInputSchema), z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema), z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CredentialCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => CredentialCreateWithoutUserInputSchema), z.lazy(() => CredentialCreateWithoutUserInputSchema).array(), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema), z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOwnerInputSchema), z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema), z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CredentialUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => CredentialCreateWithoutUserInputSchema), z.lazy(() => CredentialCreateWithoutUserInputSchema).array(), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema), z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const ProductUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOwnerInputSchema), z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema), z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CredentialUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => CredentialCreateWithoutUserInputSchema), z.lazy(() => CredentialCreateWithoutUserInputSchema).array(), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema), z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CredentialScalarWhereInputSchema), z.lazy(() => CredentialScalarWhereInputSchema).array()]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOwnerInputSchema), z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema), z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => CredentialCreateWithoutUserInputSchema), z.lazy(() => CredentialCreateWithoutUserInputSchema).array(), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema), z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CredentialWhereUniqueInputSchema), z.lazy(() => CredentialWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CredentialScalarWhereInputSchema), z.lazy(() => CredentialScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CredentialCreateNestedOneWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateNestedOneWithoutTransportsInput> = z.object({
  create: z.union([z.lazy(() => CredentialCreateWithoutTransportsInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CredentialCreateOrConnectWithoutTransportsInputSchema).optional(),
  connect: z.lazy(() => CredentialWhereUniqueInputSchema).optional(),
}).strict();

export const EnumAuthenticatorTransportFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumAuthenticatorTransportFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AuthenticatorTransportSchema).optional(),
}).strict();

export const CredentialUpdateOneRequiredWithoutTransportsNestedInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateOneRequiredWithoutTransportsNestedInput> = z.object({
  create: z.union([z.lazy(() => CredentialCreateWithoutTransportsInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CredentialCreateOrConnectWithoutTransportsInputSchema).optional(),
  upsert: z.lazy(() => CredentialUpsertWithoutTransportsInputSchema).optional(),
  connect: z.lazy(() => CredentialWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => CredentialUpdateWithoutTransportsInputSchema), z.lazy(() => CredentialUncheckedUpdateWithoutTransportsInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutCredentialsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCredentialsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCredentialsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const CredentialTransportsCreateNestedManyWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateNestedManyWithoutCredentialInput> = z.object({
  create: z.union([z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInput> = z.object({
  create: z.union([z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCredentialsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutCredentialsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCredentialsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCredentialsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCredentialsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutCredentialsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema)]).optional(),
}).strict();

export const CredentialTransportsUpdateManyWithoutCredentialNestedInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateManyWithoutCredentialNestedInput> = z.object({
  create: z.union([z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CredentialTransportsScalarWhereInputSchema), z.lazy(() => CredentialTransportsScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInput> = z.object({
  create: z.union([z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema).array()]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CredentialTransportsWhereUniqueInputSchema), z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CredentialTransportsScalarWhereInputSchema), z.lazy(() => CredentialTransportsScalarWhereInputSchema).array()]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const NestedEnumSeatingStrategyNameFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSeatingStrategyNameFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema)]).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const NestedEnumSeatingStrategyNameWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSeatingStrategyNameWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => NestedEnumSeatingStrategyNameWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedEnumSeatTypeFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSeatTypeFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => NestedEnumSeatTypeFilterSchema)]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const NestedEnumSeatTypeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSeatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => NestedEnumSeatTypeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
}).strict();

export const NestedEnumSubscriptionStateFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSubscriptionStateFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => NestedEnumSubscriptionStateFilterSchema)]).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
}).strict();

export const NestedEnumSubscriptionStateWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSubscriptionStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => NestedEnumSubscriptionStateWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const NestedEnumAuthenticatorTransportFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumAuthenticatorTransportFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema)]).optional(),
}).strict();

export const NestedEnumAuthenticatorTransportWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumAuthenticatorTransportWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => NestedEnumAuthenticatorTransportWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
}).strict();

export const NestedBytesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterSchema)]).optional(),
}).strict();

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict();

export const SeatingConfigCreateWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateWithoutPublisherInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedCreateWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedCreateWithoutPublisherInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigCreateOrConnectWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateOrConnectWithoutPublisherInput> = z.object({
  where: z.lazy(() => SeatingConfigWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema)]),
}).strict();

export const UserCreateWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutProductsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutProductsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutProductsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema)]),
}).strict();

export const SeatingConfigUpsertWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpsertWithoutPublisherInput> = z.object({
  update: z.union([z.lazy(() => SeatingConfigUpdateWithoutPublisherInputSchema), z.lazy(() => SeatingConfigUncheckedUpdateWithoutPublisherInputSchema)]),
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema)]),
}).strict();

export const SeatingConfigUpdateWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateWithoutPublisherInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedUpdateWithoutPublisherInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedUpdateWithoutPublisherInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const UserUpsertWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutProductsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutProductsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProductsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutProductsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema)]),
}).strict();

export const UserUpdateWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutProductsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutProductsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const ProductCreateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateWithoutSeatingConfigInput> = z.object({
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
  owner: z.lazy(() => UserCreateNestedOneWithoutProductsInputSchema),
}).strict();

export const ProductUncheckedCreateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedCreateWithoutSeatingConfigInput> = z.object({
  owner_id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
}).strict();

export const ProductCreateOrConnectWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateOrConnectWithoutSeatingConfigInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema)]),
}).strict();

export const SubscriptionCreateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateWithoutSeatingConfigInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedCreateWithoutSeatingConfigInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateOrConnectWithoutSeatingConfigInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema)]),
}).strict();

export const ProductUpsertWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpsertWithoutSeatingConfigInput> = z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutSeatingConfigInputSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema)]),
}).strict();

export const ProductUpdateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateWithoutSeatingConfigInput> = z.object({
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateWithoutSeatingConfigInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SubscriptionUpsertWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpsertWithoutSeatingConfigInput> = z.object({
  update: z.union([z.lazy(() => SubscriptionUpdateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema)]),
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema)]),
}).strict();

export const SubscriptionUpdateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateWithoutSeatingConfigInput> = z.object({
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedUpdateWithoutSeatingConfigInput> = z.object({
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SeatCreateWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateWithoutOccupantInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUncheckedCreateWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedCreateWithoutOccupantInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatCreateOrConnectWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateOrConnectWithoutOccupantInput> = z.object({
  where: z.lazy(() => SeatWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatCreateWithoutOccupantInputSchema), z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema)]),
}).strict();

export const SeatUpsertWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpsertWithoutOccupantInput> = z.object({
  update: z.union([z.lazy(() => SeatUpdateWithoutOccupantInputSchema), z.lazy(() => SeatUncheckedUpdateWithoutOccupantInputSchema)]),
  create: z.union([z.lazy(() => SeatCreateWithoutOccupantInputSchema), z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema)]),
}).strict();

export const SeatUpdateWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateWithoutOccupantInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatUncheckedUpdateWithoutOccupantInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedUpdateWithoutOccupantInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatCreateWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateWithoutReservationInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
  occupant: z.lazy(() => SeatOccupantCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUncheckedCreateWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedCreateWithoutReservationInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.date().optional().nullable(),
  redeemed_utc: z.date().optional().nullable(),
  occupant: z.lazy(() => SeatOccupantUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatCreateOrConnectWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatCreateOrConnectWithoutReservationInput> = z.object({
  where: z.lazy(() => SeatWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatCreateWithoutReservationInputSchema), z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema)]),
}).strict();

export const SeatUpsertWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpsertWithoutReservationInput> = z.object({
  update: z.union([z.lazy(() => SeatUpdateWithoutReservationInputSchema), z.lazy(() => SeatUncheckedUpdateWithoutReservationInputSchema)]),
  create: z.union([z.lazy(() => SeatCreateWithoutReservationInputSchema), z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema)]),
}).strict();

export const SeatUpdateWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateWithoutReservationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  occupant: z.lazy(() => SeatOccupantUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatUncheckedUpdateWithoutReservationInputSchema: z.ZodType<PrismaClient.Prisma.SeatUncheckedUpdateWithoutReservationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  subscription_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_type: z.union([z.lazy(() => SeatTypeSchema), z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema)]).optional(),
  expires_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  redeemed_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  occupant: z.lazy(() => SeatOccupantUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SubscriptionCreateWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateWithoutSeatSummaryInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigCreateNestedOneWithoutSubscriptionInputSchema),
}).strict();

export const SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedCreateWithoutSeatSummaryInput> = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.date().optional().nullable(),
}).strict();

export const SubscriptionCreateOrConnectWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateOrConnectWithoutSeatSummaryInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema)]),
}).strict();

export const SubscriptionUpsertWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpsertWithoutSeatSummaryInput> = z.object({
  update: z.union([z.lazy(() => SubscriptionUpdateWithoutSeatSummaryInputSchema), z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatSummaryInputSchema)]),
  create: z.union([z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema), z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema)]),
}).strict();

export const SubscriptionUpdateWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateWithoutSeatSummaryInput> = z.object({
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedUpdateWithoutSeatSummaryInputSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUncheckedUpdateWithoutSeatSummaryInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  created_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  subscriber_info: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  source_subscription: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  subscription_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  tenant_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  offer_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  plan_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state: z.union([z.lazy(() => SubscriptionStateSchema), z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema)]).optional(),
  admin_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_role_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  management_urls: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  admin_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  admin_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  total_seats: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_being_configured: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_free_trial: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_test_subscription: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  state_last_updated_utc: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatReservationCreateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateWithoutSeatInput> = z.object({
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationUncheckedCreateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedCreateWithoutSeatInput> = z.object({
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationCreateOrConnectWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateOrConnectWithoutSeatInput> = z.object({
  where: z.lazy(() => SeatReservationWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatReservationCreateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema)]),
}).strict();

export const SeatOccupantCreateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateWithoutSeatInput> = z.object({
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantUncheckedCreateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedCreateWithoutSeatInput> = z.object({
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantCreateOrConnectWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateOrConnectWithoutSeatInput> = z.object({
  where: z.lazy(() => SeatOccupantWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema)]),
}).strict();

export const SeatReservationUpsertWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpsertWithoutSeatInput> = z.object({
  update: z.union([z.lazy(() => SeatReservationUpdateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedUpdateWithoutSeatInputSchema)]),
  create: z.union([z.lazy(() => SeatReservationCreateWithoutSeatInputSchema), z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema)]),
}).strict();

export const SeatReservationUpdateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpdateWithoutSeatInput> = z.object({
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  invite_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatReservationUncheckedUpdateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUncheckedUpdateWithoutSeatInput> = z.object({
  tenant_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  invite_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatOccupantUpsertWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpsertWithoutSeatInput> = z.object({
  update: z.union([z.lazy(() => SeatOccupantUpdateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedUpdateWithoutSeatInputSchema)]),
  create: z.union([z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema), z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema)]),
}).strict();

export const SeatOccupantUpdateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpdateWithoutSeatInput> = z.object({
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatOccupantUncheckedUpdateWithoutSeatInputSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUncheckedUpdateWithoutSeatInput> = z.object({
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  tenant_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user_name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SeatingConfigCreateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateWithoutSubscriptionInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  publisher: z.lazy(() => ProductCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedCreateWithoutSubscriptionInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateOrConnectWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => SeatingConfigWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema)]),
}).strict();

export const SeatSummaryCreateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.number(),
  limited_seat_count: z.number(),
}).strict();

export const SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedCreateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.number(),
  limited_seat_count: z.number(),
}).strict();

export const SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateOrConnectWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => SeatSummaryWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema)]),
}).strict();

export const SeatingConfigUpsertWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpsertWithoutSubscriptionInput> = z.object({
  update: z.union([z.lazy(() => SeatingConfigUpdateWithoutSubscriptionInputSchema), z.lazy(() => SeatingConfigUncheckedUpdateWithoutSubscriptionInputSchema)]),
  create: z.union([z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema)]),
}).strict();

export const SeatingConfigUpdateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateWithoutSubscriptionInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.lazy(() => ProductUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUncheckedUpdateWithoutSubscriptionInput> = z.object({
  owner_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  default_low_seat_warning_level_percent: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  seating_strategy_name: z.union([z.lazy(() => SeatingStrategyNameSchema), z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema)]).optional(),
  low_seat_warning_level_pct: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  default_seat_expiry_in_days: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatSummaryUpsertWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpsertWithoutSubscriptionInput> = z.object({
  update: z.union([z.lazy(() => SeatSummaryUpdateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema)]),
  create: z.union([z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema), z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema)]),
}).strict();

export const SeatSummaryUpdateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpdateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  limited_seat_count: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUncheckedUpdateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  limited_seat_count: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => AccountCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date(),
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date(),
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => SessionCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductCreateWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateWithoutOwnerInput> = z.object({
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigCreateNestedOneWithoutPublisherInputSchema),
}).strict();

export const ProductUncheckedCreateWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
}).strict();

export const ProductCreateOrConnectWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema)]),
}).strict();

export const ProductCreateManyOwnerInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.ProductCreateManyOwnerInputEnvelope> = z.object({
  data: z.lazy(() => ProductCreateManyOwnerInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CredentialCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  transports: z.lazy(() => CredentialTransportsCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  transports: z.lazy(() => CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CredentialCreateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const CredentialCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => CredentialCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([z.lazy(() => AccountUpdateManyMutationInputSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema)]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([z.lazy(() => SessionUpdateManyMutationInputSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema)]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const ProductUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([z.lazy(() => ProductUpdateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutOwnerInputSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema)]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([z.lazy(() => ProductUpdateWithoutOwnerInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutOwnerInputSchema)]),
}).strict();

export const ProductUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([z.lazy(() => ProductUpdateManyMutationInputSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutProductsInputSchema)]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  owner_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  product_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  publisher_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  home_page_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_page_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  privacy_notice_page_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_sales_email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_sales_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_support_email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  contact_support_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  is_setup_complete: z.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()]).optional().nullable(),
  on_access_denied_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_access_granted_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_no_seat_available_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const CredentialUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CredentialUpdateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => CredentialCreateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const CredentialUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CredentialUpdateWithoutUserInputSchema), z.lazy(() => CredentialUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const CredentialUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialScalarWhereInputSchema),
  data: z.union([z.lazy(() => CredentialUpdateManyMutationInputSchema), z.lazy(() => CredentialUncheckedUpdateManyWithoutCredentialsInputSchema)]),
}).strict();

export const CredentialScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.CredentialScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => CredentialScalarWhereInputSchema), z.lazy(() => CredentialScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialScalarWhereInputSchema), z.lazy(() => CredentialScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  publicKey: z.union([z.lazy(() => BytesFilterSchema), z.instanceof(Buffer)]).optional(),
  signCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const CredentialCreateWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateWithoutTransportsInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCredentialsInputSchema),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialUncheckedCreateWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedCreateWithoutTransportsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const CredentialCreateOrConnectWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateOrConnectWithoutTransportsInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CredentialCreateWithoutTransportsInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema)]),
}).strict();

export const CredentialUpsertWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpsertWithoutTransportsInput> = z.object({
  update: z.union([z.lazy(() => CredentialUpdateWithoutTransportsInputSchema), z.lazy(() => CredentialUncheckedUpdateWithoutTransportsInputSchema)]),
  create: z.union([z.lazy(() => CredentialCreateWithoutTransportsInputSchema), z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema)]),
}).strict();

export const CredentialUpdateWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateWithoutTransportsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCredentialsNestedInputSchema).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialUncheckedUpdateWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedUpdateWithoutTransportsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutCredentialsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutCredentialsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutCredentialsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCredentialsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema)]),
}).strict();

export const CredentialTransportsCreateWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateWithoutCredentialInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUncheckedCreateWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedCreateWithoutCredentialInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsCreateOrConnectWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateOrConnectWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema)]),
}).strict();

export const CredentialTransportsCreateManyCredentialInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateManyCredentialInputEnvelope> = z.object({
  data: z.lazy(() => CredentialTransportsCreateManyCredentialInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutCredentialsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCredentialsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCredentialsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema)]),
}).strict();

export const UserUpdateWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutCredentialsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutCredentialsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
}).strict();

export const CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CredentialTransportsUpdateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedUpdateWithoutCredentialInputSchema)]),
  create: z.union([z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema)]),
}).strict();

export const CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CredentialTransportsUpdateWithoutCredentialInputSchema), z.lazy(() => CredentialTransportsUncheckedUpdateWithoutCredentialInputSchema)]),
}).strict();

export const CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateManyWithWhereWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsScalarWhereInputSchema),
  data: z.union([z.lazy(() => CredentialTransportsUpdateManyMutationInputSchema), z.lazy(() => CredentialTransportsUncheckedUpdateManyWithoutTransportsInputSchema)]),
}).strict();

export const CredentialTransportsScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => CredentialTransportsScalarWhereInputSchema), z.lazy(() => CredentialTransportsScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CredentialTransportsScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CredentialTransportsScalarWhereInputSchema), z.lazy(() => CredentialTransportsScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  transport: z.union([z.lazy(() => EnumAuthenticatorTransportFilterSchema), z.lazy(() => AuthenticatorTransportSchema)]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.date(),
}).strict();

export const ProductCreateManyOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductCreateManyOwnerInput> = z.object({
  id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().optional().nullable(),
  contact_page_url: z.string().optional().nullable(),
  privacy_notice_page_url: z.string().optional().nullable(),
  contact_sales_email: z.string().optional().nullable(),
  contact_sales_url: z.string().optional().nullable(),
  contact_support_email: z.string().optional().nullable(),
  contact_support_url: z.string().optional().nullable(),
  is_setup_complete: z.boolean().optional().nullable(),
  on_access_denied_url: z.string().optional().nullable(),
  on_access_granted_url: z.string().optional().nullable(),
  on_no_seat_available_url: z.string().optional().nullable(),
  on_subscription_not_ready_url: z.string().optional().nullable(),
  on_subscription_canceled_url: z.string().optional().nullable(),
  on_subscription_suspended_url: z.string().optional().nullable(),
  on_subscription_not_found_url: z.string().optional().nullable(),
  on_no_subscriptions_found_url: z.string().optional().nullable(),
}).strict();

export const CredentialCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ProductUpdateWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateWithoutOwnerInput> = z.object({
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const ProductUncheckedUpdateManyWithoutProductsInputSchema: z.ZodType<PrismaClient.Prisma.ProductUncheckedUpdateManyWithoutProductsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  product_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publisher_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  home_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  privacy_notice_page_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_sales_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  contact_support_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  is_setup_complete: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_denied_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_access_granted_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_seat_available_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_ready_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_canceled_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_suspended_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_subscription_not_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const CredentialUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  transports: z.lazy(() => CredentialTransportsUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  transports: z.lazy(() => CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyWithoutCredentialsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialUncheckedUpdateManyWithoutCredentialsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicKey: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  signCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialTransportsCreateManyCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateManyCredentialInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUpdateWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateWithoutCredentialInput> = z.object({
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateWithoutCredentialInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedUpdateWithoutCredentialInput> = z.object({
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateManyWithoutTransportsInputSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUncheckedUpdateManyWithoutTransportsInput> = z.object({
  transport: z.union([z.lazy(() => AuthenticatorTransportSchema), z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ProductFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProductFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProductAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ProductAggregateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ProductGroupByArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ProductOrderByWithAggregationInputSchema.array(), ProductOrderByWithAggregationInputSchema]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict();

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict();

export const SeatingConfigFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigFindFirstArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([SeatingConfigOrderByWithRelationInputSchema.array(), SeatingConfigOrderByWithRelationInputSchema]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatingConfigScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatingConfigFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigFindFirstOrThrowArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([SeatingConfigOrderByWithRelationInputSchema.array(), SeatingConfigOrderByWithRelationInputSchema]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatingConfigScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatingConfigFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigFindManyArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([SeatingConfigOrderByWithRelationInputSchema.array(), SeatingConfigOrderByWithRelationInputSchema]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatingConfigScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatingConfigAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigAggregateArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([SeatingConfigOrderByWithRelationInputSchema.array(), SeatingConfigOrderByWithRelationInputSchema]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatingConfigGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigGroupByArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([SeatingConfigOrderByWithAggregationInputSchema.array(), SeatingConfigOrderByWithAggregationInputSchema]).optional(),
  by: SeatingConfigScalarFieldEnumSchema.array(),
  having: SeatingConfigScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatingConfigFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigFindUniqueArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict();

export const SeatingConfigFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigFindUniqueOrThrowArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict();

export const SeatOccupantFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantFindFirstArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([SeatOccupantOrderByWithRelationInputSchema.array(), SeatOccupantOrderByWithRelationInputSchema]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatOccupantScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatOccupantFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantFindFirstOrThrowArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([SeatOccupantOrderByWithRelationInputSchema.array(), SeatOccupantOrderByWithRelationInputSchema]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatOccupantScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatOccupantFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantFindManyArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([SeatOccupantOrderByWithRelationInputSchema.array(), SeatOccupantOrderByWithRelationInputSchema]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatOccupantScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatOccupantAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantAggregateArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([SeatOccupantOrderByWithRelationInputSchema.array(), SeatOccupantOrderByWithRelationInputSchema]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatOccupantGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantGroupByArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([SeatOccupantOrderByWithAggregationInputSchema.array(), SeatOccupantOrderByWithAggregationInputSchema]).optional(),
  by: SeatOccupantScalarFieldEnumSchema.array(),
  having: SeatOccupantScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatOccupantFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantFindUniqueArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict();

export const SeatOccupantFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantFindUniqueOrThrowArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict();

export const SeatReservationFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationFindFirstArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([SeatReservationOrderByWithRelationInputSchema.array(), SeatReservationOrderByWithRelationInputSchema]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatReservationScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatReservationFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationFindFirstOrThrowArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([SeatReservationOrderByWithRelationInputSchema.array(), SeatReservationOrderByWithRelationInputSchema]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatReservationScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatReservationFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationFindManyArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([SeatReservationOrderByWithRelationInputSchema.array(), SeatReservationOrderByWithRelationInputSchema]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatReservationScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatReservationAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationAggregateArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([SeatReservationOrderByWithRelationInputSchema.array(), SeatReservationOrderByWithRelationInputSchema]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatReservationGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationGroupByArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([SeatReservationOrderByWithAggregationInputSchema.array(), SeatReservationOrderByWithAggregationInputSchema]).optional(),
  by: SeatReservationScalarFieldEnumSchema.array(),
  having: SeatReservationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatReservationFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationFindUniqueArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
}).strict();

export const SeatReservationFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationFindUniqueOrThrowArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
}).strict();

export const SeatSummaryFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryFindFirstArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([SeatSummaryOrderByWithRelationInputSchema.array(), SeatSummaryOrderByWithRelationInputSchema]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatSummaryScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatSummaryFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryFindFirstOrThrowArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([SeatSummaryOrderByWithRelationInputSchema.array(), SeatSummaryOrderByWithRelationInputSchema]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatSummaryScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatSummaryFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryFindManyArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([SeatSummaryOrderByWithRelationInputSchema.array(), SeatSummaryOrderByWithRelationInputSchema]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatSummaryScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatSummaryAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryAggregateArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([SeatSummaryOrderByWithRelationInputSchema.array(), SeatSummaryOrderByWithRelationInputSchema]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatSummaryGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryGroupByArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([SeatSummaryOrderByWithAggregationInputSchema.array(), SeatSummaryOrderByWithAggregationInputSchema]).optional(),
  by: SeatSummaryScalarFieldEnumSchema.array(),
  having: SeatSummaryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatSummaryFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryFindUniqueArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict();

export const SeatSummaryFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryFindUniqueOrThrowArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict();

export const SeatFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SeatFindFirstArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([SeatOrderByWithRelationInputSchema.array(), SeatOrderByWithRelationInputSchema]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatFindFirstOrThrowArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([SeatOrderByWithRelationInputSchema.array(), SeatOrderByWithRelationInputSchema]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatFindManyArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([SeatOrderByWithRelationInputSchema.array(), SeatOrderByWithRelationInputSchema]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatScalarFieldEnumSchema.array().optional(),
}).strict();

export const SeatAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatAggregateArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([SeatOrderByWithRelationInputSchema.array(), SeatOrderByWithRelationInputSchema]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SeatGroupByArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([SeatOrderByWithAggregationInputSchema.array(), SeatOrderByWithAggregationInputSchema]).optional(),
  by: SeatScalarFieldEnumSchema.array(),
  having: SeatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeatFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SeatFindUniqueArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
}).strict();

export const SeatFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SeatFindUniqueOrThrowArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
}).strict();

export const SubscriptionFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionFindFirstArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([SubscriptionOrderByWithRelationInputSchema.array(), SubscriptionOrderByWithRelationInputSchema]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SubscriptionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SubscriptionFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionFindFirstOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([SubscriptionOrderByWithRelationInputSchema.array(), SubscriptionOrderByWithRelationInputSchema]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SubscriptionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SubscriptionFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionFindManyArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([SubscriptionOrderByWithRelationInputSchema.array(), SubscriptionOrderByWithRelationInputSchema]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SubscriptionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SubscriptionAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionAggregateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([SubscriptionOrderByWithRelationInputSchema.array(), SubscriptionOrderByWithRelationInputSchema]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SubscriptionGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionGroupByArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([SubscriptionOrderByWithAggregationInputSchema.array(), SubscriptionOrderByWithAggregationInputSchema]).optional(),
  by: SubscriptionScalarFieldEnumSchema.array(),
  having: SubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SubscriptionFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionFindUniqueArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict();

export const SubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionFindUniqueOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict();

export const AccountFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict();

export const AccountFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict();

export const AccountAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.AccountAggregateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.AccountGroupByArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const SessionFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SessionFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SessionAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SessionAggregateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SessionGroupByArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.UserAggregateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.UserGroupByArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const CredentialTransportsFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsFindFirstArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([CredentialTransportsOrderByWithRelationInputSchema.array(), CredentialTransportsOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialTransportsScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialTransportsFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsFindFirstOrThrowArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([CredentialTransportsOrderByWithRelationInputSchema.array(), CredentialTransportsOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialTransportsScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialTransportsFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsFindManyArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([CredentialTransportsOrderByWithRelationInputSchema.array(), CredentialTransportsOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialTransportsScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialTransportsAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsAggregateArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([CredentialTransportsOrderByWithRelationInputSchema.array(), CredentialTransportsOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CredentialTransportsGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsGroupByArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([CredentialTransportsOrderByWithAggregationInputSchema.array(), CredentialTransportsOrderByWithAggregationInputSchema]).optional(),
  by: CredentialTransportsScalarFieldEnumSchema.array(),
  having: CredentialTransportsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CredentialTransportsFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsFindUniqueArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict();

export const CredentialTransportsFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsFindUniqueOrThrowArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict();

export const CredentialFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialFindFirstArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([CredentialOrderByWithRelationInputSchema.array(), CredentialOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialFindFirstOrThrowArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([CredentialOrderByWithRelationInputSchema.array(), CredentialOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialFindManyArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([CredentialOrderByWithRelationInputSchema.array(), CredentialOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialAggregateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([CredentialOrderByWithRelationInputSchema.array(), CredentialOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CredentialGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialGroupByArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([CredentialOrderByWithAggregationInputSchema.array(), CredentialOrderByWithAggregationInputSchema]).optional(),
  by: CredentialScalarFieldEnumSchema.array(),
  having: CredentialScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CredentialFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialFindUniqueArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict();

export const CredentialFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialFindUniqueOrThrowArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict();

export const CredentialChallengeFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeFindFirstArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([CredentialChallengeOrderByWithRelationInputSchema.array(), CredentialChallengeOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialChallengeScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialChallengeFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeFindFirstOrThrowArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([CredentialChallengeOrderByWithRelationInputSchema.array(), CredentialChallengeOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialChallengeScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialChallengeFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeFindManyArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([CredentialChallengeOrderByWithRelationInputSchema.array(), CredentialChallengeOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialChallengeScalarFieldEnumSchema.array().optional(),
}).strict();

export const CredentialChallengeAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeAggregateArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([CredentialChallengeOrderByWithRelationInputSchema.array(), CredentialChallengeOrderByWithRelationInputSchema]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CredentialChallengeGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeGroupByArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([CredentialChallengeOrderByWithAggregationInputSchema.array(), CredentialChallengeOrderByWithAggregationInputSchema]).optional(),
  by: CredentialChallengeScalarFieldEnumSchema.array(),
  having: CredentialChallengeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CredentialChallengeFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeFindUniqueArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict();

export const CredentialChallengeFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeFindUniqueOrThrowArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenAggregateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenGroupByArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithAggregationInputSchema.array(), VerificationTokenOrderByWithAggregationInputSchema]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const ProductCreateArgsSchema: z.ZodType<PrismaClient.Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ProductCreateInputSchema, ProductUncheckedCreateInputSchema]),
}).strict();

export const ProductUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ProductCreateInputSchema, ProductUncheckedCreateInputSchema]),
  update: z.union([ProductUpdateInputSchema, ProductUncheckedUpdateInputSchema]),
}).strict();

export const ProductCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProductCreateManyArgs> = z.object({
  data: ProductCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict();

export const ProductUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ProductUpdateInputSchema, ProductUncheckedUpdateInputSchema]),
  where: ProductWhereUniqueInputSchema,
}).strict();

export const ProductUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ProductUpdateManyMutationInputSchema, ProductUncheckedUpdateManyInputSchema]),
  where: ProductWhereInputSchema.optional(),
}).strict();

export const ProductDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
}).strict();

export const SeatingConfigCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  data: z.union([SeatingConfigCreateInputSchema, SeatingConfigUncheckedCreateInputSchema]),
}).strict();

export const SeatingConfigUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpsertArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
  create: z.union([SeatingConfigCreateInputSchema, SeatingConfigUncheckedCreateInputSchema]),
  update: z.union([SeatingConfigUpdateInputSchema, SeatingConfigUncheckedUpdateInputSchema]),
}).strict();

export const SeatingConfigCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigCreateManyArgs> = z.object({
  data: SeatingConfigCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeatingConfigDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigDeleteArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict();

export const SeatingConfigUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  data: z.union([SeatingConfigUpdateInputSchema, SeatingConfigUncheckedUpdateInputSchema]),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict();

export const SeatingConfigUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigUpdateManyArgs> = z.object({
  data: z.union([SeatingConfigUpdateManyMutationInputSchema, SeatingConfigUncheckedUpdateManyInputSchema]),
  where: SeatingConfigWhereInputSchema.optional(),
}).strict();

export const SeatingConfigDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatingConfigDeleteManyArgs> = z.object({
  where: SeatingConfigWhereInputSchema.optional(),
}).strict();

export const SeatOccupantCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  data: z.union([SeatOccupantCreateInputSchema, SeatOccupantUncheckedCreateInputSchema]),
}).strict();

export const SeatOccupantUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpsertArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
  create: z.union([SeatOccupantCreateInputSchema, SeatOccupantUncheckedCreateInputSchema]),
  update: z.union([SeatOccupantUpdateInputSchema, SeatOccupantUncheckedUpdateInputSchema]),
}).strict();

export const SeatOccupantCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantCreateManyArgs> = z.object({
  data: SeatOccupantCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeatOccupantDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantDeleteArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict();

export const SeatOccupantUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpdateArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  data: z.union([SeatOccupantUpdateInputSchema, SeatOccupantUncheckedUpdateInputSchema]),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict();

export const SeatOccupantUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantUpdateManyArgs> = z.object({
  data: z.union([SeatOccupantUpdateManyMutationInputSchema, SeatOccupantUncheckedUpdateManyInputSchema]),
  where: SeatOccupantWhereInputSchema.optional(),
}).strict();

export const SeatOccupantDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatOccupantDeleteManyArgs> = z.object({
  where: SeatOccupantWhereInputSchema.optional(),
}).strict();

export const SeatReservationCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  data: z.union([SeatReservationCreateInputSchema, SeatReservationUncheckedCreateInputSchema]),
}).strict();

export const SeatReservationUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpsertArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
  create: z.union([SeatReservationCreateInputSchema, SeatReservationUncheckedCreateInputSchema]),
  update: z.union([SeatReservationUpdateInputSchema, SeatReservationUncheckedUpdateInputSchema]),
}).strict();

export const SeatReservationCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationCreateManyArgs> = z.object({
  data: SeatReservationCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeatReservationDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationDeleteArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
}).strict();

export const SeatReservationUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpdateArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  data: z.union([SeatReservationUpdateInputSchema, SeatReservationUncheckedUpdateInputSchema]),
  where: SeatReservationWhereUniqueInputSchema,
}).strict();

export const SeatReservationUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationUpdateManyArgs> = z.object({
  data: z.union([SeatReservationUpdateManyMutationInputSchema, SeatReservationUncheckedUpdateManyInputSchema]),
  where: SeatReservationWhereInputSchema.optional(),
}).strict();

export const SeatReservationDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatReservationDeleteManyArgs> = z.object({
  where: SeatReservationWhereInputSchema.optional(),
}).strict();

export const SeatSummaryCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  data: z.union([SeatSummaryCreateInputSchema, SeatSummaryUncheckedCreateInputSchema]),
}).strict();

export const SeatSummaryUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpsertArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
  create: z.union([SeatSummaryCreateInputSchema, SeatSummaryUncheckedCreateInputSchema]),
  update: z.union([SeatSummaryUpdateInputSchema, SeatSummaryUncheckedUpdateInputSchema]),
}).strict();

export const SeatSummaryCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryCreateManyArgs> = z.object({
  data: SeatSummaryCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeatSummaryDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryDeleteArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict();

export const SeatSummaryUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpdateArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  data: z.union([SeatSummaryUpdateInputSchema, SeatSummaryUncheckedUpdateInputSchema]),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict();

export const SeatSummaryUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryUpdateManyArgs> = z.object({
  data: z.union([SeatSummaryUpdateManyMutationInputSchema, SeatSummaryUncheckedUpdateManyInputSchema]),
  where: SeatSummaryWhereInputSchema.optional(),
}).strict();

export const SeatSummaryDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatSummaryDeleteManyArgs> = z.object({
  where: SeatSummaryWhereInputSchema.optional(),
}).strict();

export const SeatCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatCreateArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  data: z.union([SeatCreateInputSchema, SeatUncheckedCreateInputSchema]),
}).strict();

export const SeatUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SeatUpsertArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
  create: z.union([SeatCreateInputSchema, SeatUncheckedCreateInputSchema]),
  update: z.union([SeatUpdateInputSchema, SeatUncheckedUpdateInputSchema]),
}).strict();

export const SeatCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatCreateManyArgs> = z.object({
  data: SeatCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeatDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SeatDeleteArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
}).strict();

export const SeatUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  data: z.union([SeatUpdateInputSchema, SeatUncheckedUpdateInputSchema]),
  where: SeatWhereUniqueInputSchema,
}).strict();

export const SeatUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatUpdateManyArgs> = z.object({
  data: z.union([SeatUpdateManyMutationInputSchema, SeatUncheckedUpdateManyInputSchema]),
  where: SeatWhereInputSchema.optional(),
}).strict();

export const SeatDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SeatDeleteManyArgs> = z.object({
  where: SeatWhereInputSchema.optional(),
}).strict();

export const SubscriptionCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([SubscriptionCreateInputSchema, SubscriptionUncheckedCreateInputSchema]),
}).strict();

export const SubscriptionUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpsertArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
  create: z.union([SubscriptionCreateInputSchema, SubscriptionUncheckedCreateInputSchema]),
  update: z.union([SubscriptionUpdateInputSchema, SubscriptionUncheckedUpdateInputSchema]),
}).strict();

export const SubscriptionCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionCreateManyArgs> = z.object({
  data: SubscriptionCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SubscriptionDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionDeleteArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict();

export const SubscriptionUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([SubscriptionUpdateInputSchema, SubscriptionUncheckedUpdateInputSchema]),
  where: SubscriptionWhereUniqueInputSchema,
}).strict();

export const SubscriptionUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionUpdateManyArgs> = z.object({
  data: z.union([SubscriptionUpdateManyMutationInputSchema, SubscriptionUncheckedUpdateManyInputSchema]),
  where: SubscriptionWhereInputSchema.optional(),
}).strict();

export const SubscriptionDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SubscriptionDeleteManyArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
}).strict();

export const AccountCreateArgsSchema: z.ZodType<PrismaClient.Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
}).strict();

export const AccountUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
  update: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
}).strict();

export const AccountCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyArgs> = z.object({
  data: AccountCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const AccountUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const AccountUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema]),
  where: AccountWhereInputSchema.optional(),
}).strict();

export const AccountDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict();

export const SessionCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
}).strict();

export const SessionUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
  update: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
}).strict();

export const SessionCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyArgs> = z.object({
  data: SessionCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const SessionUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const SessionUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema]),
  where: SessionWhereInputSchema.optional(),
}).strict();

export const SessionDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyArgs> = z.object({
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
  where: UserWhereInputSchema.optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict();

export const CredentialTransportsCreateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  data: z.union([CredentialTransportsCreateInputSchema, CredentialTransportsUncheckedCreateInputSchema]),
}).strict();

export const CredentialTransportsUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpsertArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
  create: z.union([CredentialTransportsCreateInputSchema, CredentialTransportsUncheckedCreateInputSchema]),
  update: z.union([CredentialTransportsUpdateInputSchema, CredentialTransportsUncheckedUpdateInputSchema]),
}).strict();

export const CredentialTransportsCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsCreateManyArgs> = z.object({
  data: CredentialTransportsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CredentialTransportsDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsDeleteArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict();

export const CredentialTransportsUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  data: z.union([CredentialTransportsUpdateInputSchema, CredentialTransportsUncheckedUpdateInputSchema]),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict();

export const CredentialTransportsUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsUpdateManyArgs> = z.object({
  data: z.union([CredentialTransportsUpdateManyMutationInputSchema, CredentialTransportsUncheckedUpdateManyInputSchema]),
  where: CredentialTransportsWhereInputSchema.optional(),
}).strict();

export const CredentialTransportsDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialTransportsDeleteManyArgs> = z.object({
  where: CredentialTransportsWhereInputSchema.optional(),
}).strict();

export const CredentialCreateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  data: z.union([CredentialCreateInputSchema, CredentialUncheckedCreateInputSchema]),
}).strict();

export const CredentialUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialUpsertArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
  create: z.union([CredentialCreateInputSchema, CredentialUncheckedCreateInputSchema]),
  update: z.union([CredentialUpdateInputSchema, CredentialUncheckedUpdateInputSchema]),
}).strict();

export const CredentialCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialCreateManyArgs> = z.object({
  data: CredentialCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CredentialDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialDeleteArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict();

export const CredentialUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  data: z.union([CredentialUpdateInputSchema, CredentialUncheckedUpdateInputSchema]),
  where: CredentialWhereUniqueInputSchema,
}).strict();

export const CredentialUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialUpdateManyArgs> = z.object({
  data: z.union([CredentialUpdateManyMutationInputSchema, CredentialUncheckedUpdateManyInputSchema]),
  where: CredentialWhereInputSchema.optional(),
}).strict();

export const CredentialDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialDeleteManyArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
}).strict();

export const CredentialChallengeCreateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeCreateArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  data: z.union([CredentialChallengeCreateInputSchema, CredentialChallengeUncheckedCreateInputSchema]),
}).strict();

export const CredentialChallengeUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUpsertArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
  create: z.union([CredentialChallengeCreateInputSchema, CredentialChallengeUncheckedCreateInputSchema]),
  update: z.union([CredentialChallengeUpdateInputSchema, CredentialChallengeUncheckedUpdateInputSchema]),
}).strict();

export const CredentialChallengeCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeCreateManyArgs> = z.object({
  data: CredentialChallengeCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CredentialChallengeDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeDeleteArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict();

export const CredentialChallengeUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUpdateArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  include: CredentialChallengeIncludeSchema.optional(),
  data: z.union([CredentialChallengeUpdateInputSchema, CredentialChallengeUncheckedUpdateInputSchema]),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict();

export const CredentialChallengeUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeUpdateManyArgs> = z.object({
  data: z.union([CredentialChallengeUpdateManyMutationInputSchema, CredentialChallengeUncheckedUpdateManyInputSchema]),
  where: CredentialChallengeWhereInputSchema.optional(),
}).strict();

export const CredentialChallengeDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.CredentialChallengeDeleteManyArgs> = z.object({
  where: CredentialChallengeWhereInputSchema.optional(),
}).strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema]),
}).strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema]),
  update: z.union([VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema]),
}).strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: VerificationTokenCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict();
