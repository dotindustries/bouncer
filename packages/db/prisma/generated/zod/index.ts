import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const CredentialChallengeScalarFieldEnumSchema = z.enum(['userId','value']);

export const CredentialScalarFieldEnumSchema = z.enum(['id','userId','publicKey','signCount','name','createdAt','updatedAt']);

export const CredentialTransportsScalarFieldEnumSchema = z.enum(['id','transport']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const ProductMembersScalarFieldEnumSchema = z.enum(['assignedAt','product_id','user_id']);

export const ProductScalarFieldEnumSchema = z.enum(['id','owner_id','product_name','publisher_name','home_page_url','contact_page_url','privacy_notice_page_url','contact_sales_email','contact_sales_url','contact_support_email','contact_support_url','is_setup_complete','on_access_denied_url','on_access_granted_url','on_no_seat_available_url','on_subscription_not_ready_url','on_subscription_canceled_url','on_subscription_suspended_url','on_subscription_not_found_url','on_no_subscriptions_found_url']);

export const SeatOccupantScalarFieldEnumSchema = z.enum(['seat_id','user_id','tenant_id','email','user_name']);

export const SeatReservationScalarFieldEnumSchema = z.enum(['seat_id','tenant_id','user_id','email','invite_url']);

export const SeatScalarFieldEnumSchema = z.enum(['id','seating_strategy_name','subscription_id','created_utc','seat_type','expires_utc','redeemed_utc']);

export const SeatSummaryScalarFieldEnumSchema = z.enum(['subscription_id','standard_seat_count','limited_seat_count']);

export const SeatingConfigScalarFieldEnumSchema = z.enum(['owner_id','default_low_seat_warning_level_percent','seating_strategy_name','low_seat_warning_level_pct','limited_overflow_seating_enabled','seat_reservation_expiry_in_days','default_seat_expiry_in_days']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const SubscriptionScalarFieldEnumSchema = z.enum(['id','product_id','is_setup_complete','created_utc','tenant_id','subscriber_info','source_subscription','subscription_name','tenant_name','offer_id','plan_id','state','admin_role_name','user_role_name','management_urls','admin_name','admin_email','total_seats','is_being_configured','is_free_trial','is_test_subscription','state_last_updated_utc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SeatingStrategyNameSchema = z.enum(['monthly_active_user','first_come_first_served']);

export type SeatingStrategyNameType = `${z.infer<typeof SeatingStrategyNameSchema>}`

export const SeatTypeSchema = z.enum(['standard','limited']);

export type SeatTypeType = `${z.infer<typeof SeatTypeSchema>}`

export const SubscriptionStateSchema = z.enum(['purchased','active','suspended','canceled']);

export type SubscriptionStateType = `${z.infer<typeof SubscriptionStateSchema>}`

export const AuthenticatorTransportSchema = z.enum(['ble','hybrid','internal','nfc','usb','cable']);

export type AuthenticatorTransportType = `${z.infer<typeof AuthenticatorTransportSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
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
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT MEMBERS SCHEMA
/////////////////////////////////////////

export const ProductMembersSchema = z.object({
  assignedAt: z.coerce.date(),
  product_id: z.string(),
  user_id: z.string(),
})

export type ProductMembers = z.infer<typeof ProductMembersSchema>

/////////////////////////////////////////
// SEATING CONFIG SCHEMA
/////////////////////////////////////////

export const SeatingConfigSchema = z.object({
  seating_strategy_name: SeatingStrategyNameSchema,
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  low_seat_warning_level_pct: z.number().nullable(),
  limited_overflow_seating_enabled: z.boolean().nullable(),
  seat_reservation_expiry_in_days: z.number().int().nullable(),
  default_seat_expiry_in_days: z.number().int().nullable(),
})

export type SeatingConfig = z.infer<typeof SeatingConfigSchema>

/////////////////////////////////////////
// SEAT OCCUPANT SCHEMA
/////////////////////////////////////////

export const SeatOccupantSchema = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().nullable(),
  user_name: z.string().nullable(),
})

export type SeatOccupant = z.infer<typeof SeatOccupantSchema>

/////////////////////////////////////////
// SEAT RESERVATION SCHEMA
/////////////////////////////////////////

export const SeatReservationSchema = z.object({
  seat_id: z.string(),
  tenant_id: z.string().nullable(),
  user_id: z.string().nullable(),
  email: z.string().nullable(),
  invite_url: z.string().nullable(),
})

export type SeatReservation = z.infer<typeof SeatReservationSchema>

/////////////////////////////////////////
// SEAT SUMMARY SCHEMA
/////////////////////////////////////////

export const SeatSummarySchema = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
})

export type SeatSummary = z.infer<typeof SeatSummarySchema>

/////////////////////////////////////////
// SEAT SCHEMA
/////////////////////////////////////////

export const SeatSchema = z.object({
  seating_strategy_name: SeatingStrategyNameSchema,
  seat_type: SeatTypeSchema,
  id: z.string(),
  subscription_id: z.string().nullable(),
  created_utc: z.coerce.date().nullable(),
  expires_utc: z.coerce.date().nullable(),
  redeemed_utc: z.coerce.date().nullable(),
})

export type Seat = z.infer<typeof SeatSchema>

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  state: SubscriptionStateSchema,
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().nullable(),
  created_utc: z.coerce.date().nullable(),
  tenant_id: z.string().nullable(),
  subscriber_info: NullableJsonValue.optional(),
  source_subscription: NullableJsonValue.optional(),
  subscription_name: z.string().nullable(),
  tenant_name: z.string().nullable(),
  offer_id: z.string().nullable(),
  plan_id: z.string().nullable(),
  admin_role_name: z.string().nullable(),
  user_role_name: z.string().nullable(),
  management_urls: NullableJsonValue.optional(),
  admin_name: z.string().nullable(),
  admin_email: z.string().nullable(),
  total_seats: z.number().int().nullable(),
  is_being_configured: z.boolean().nullable(),
  is_free_trial: z.boolean().nullable(),
  is_test_subscription: z.boolean().nullable(),
  state_last_updated_utc: z.coerce.date().nullable(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CREDENTIAL TRANSPORTS SCHEMA
/////////////////////////////////////////

export const CredentialTransportsSchema = z.object({
  transport: AuthenticatorTransportSchema,
  id: z.string(),
})

export type CredentialTransports = z.infer<typeof CredentialTransportsSchema>

/////////////////////////////////////////
// CREDENTIAL SCHEMA
/////////////////////////////////////////

export const CredentialSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Credential = z.infer<typeof CredentialSchema>

/////////////////////////////////////////
// CREDENTIAL CHALLENGE SCHEMA
/////////////////////////////////////////

export const CredentialChallengeSchema = z.object({
  userId: z.string(),
  value: z.string(),
})

export type CredentialChallenge = z.infer<typeof CredentialChallengeSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  seatingConfig: z.union([z.boolean(),z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => ProductMembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  members: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
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
  seatingConfig: z.union([z.boolean(),z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => ProductMembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT MEMBERS
//------------------------------------------------------

export const ProductMembersIncludeSchema: z.ZodType<Prisma.ProductMembersInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ProductMembersArgsSchema: z.ZodType<Prisma.ProductMembersArgs> = z.object({
  select: z.lazy(() => ProductMembersSelectSchema).optional(),
  include: z.lazy(() => ProductMembersIncludeSchema).optional(),
}).strict();

export const ProductMembersSelectSchema: z.ZodType<Prisma.ProductMembersSelect> = z.object({
  assignedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  product_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  user_id: z.boolean().optional(),
}).strict()

// SEATING CONFIG
//------------------------------------------------------

export const SeatingConfigIncludeSchema: z.ZodType<Prisma.SeatingConfigInclude> = z.object({
  publisher: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict()

export const SeatingConfigArgsSchema: z.ZodType<Prisma.SeatingConfigArgs> = z.object({
  select: z.lazy(() => SeatingConfigSelectSchema).optional(),
  include: z.lazy(() => SeatingConfigIncludeSchema).optional(),
}).strict();

export const SeatingConfigSelectSchema: z.ZodType<Prisma.SeatingConfigSelect> = z.object({
  owner_id: z.boolean().optional(),
  default_low_seat_warning_level_percent: z.boolean().optional(),
  seating_strategy_name: z.boolean().optional(),
  low_seat_warning_level_pct: z.boolean().optional(),
  limited_overflow_seating_enabled: z.boolean().optional(),
  seat_reservation_expiry_in_days: z.boolean().optional(),
  default_seat_expiry_in_days: z.boolean().optional(),
  publisher: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict()

// SEAT OCCUPANT
//------------------------------------------------------

export const SeatOccupantIncludeSchema: z.ZodType<Prisma.SeatOccupantInclude> = z.object({
  seat: z.union([z.boolean(),z.lazy(() => SeatArgsSchema)]).optional(),
}).strict()

export const SeatOccupantArgsSchema: z.ZodType<Prisma.SeatOccupantArgs> = z.object({
  select: z.lazy(() => SeatOccupantSelectSchema).optional(),
  include: z.lazy(() => SeatOccupantIncludeSchema).optional(),
}).strict();

export const SeatOccupantSelectSchema: z.ZodType<Prisma.SeatOccupantSelect> = z.object({
  seat_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  tenant_id: z.boolean().optional(),
  email: z.boolean().optional(),
  user_name: z.boolean().optional(),
  seat: z.union([z.boolean(),z.lazy(() => SeatArgsSchema)]).optional(),
}).strict()

// SEAT RESERVATION
//------------------------------------------------------

export const SeatReservationIncludeSchema: z.ZodType<Prisma.SeatReservationInclude> = z.object({
  seat: z.union([z.boolean(),z.lazy(() => SeatArgsSchema)]).optional(),
}).strict()

export const SeatReservationArgsSchema: z.ZodType<Prisma.SeatReservationArgs> = z.object({
  select: z.lazy(() => SeatReservationSelectSchema).optional(),
  include: z.lazy(() => SeatReservationIncludeSchema).optional(),
}).strict();

export const SeatReservationSelectSchema: z.ZodType<Prisma.SeatReservationSelect> = z.object({
  seat_id: z.boolean().optional(),
  tenant_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  email: z.boolean().optional(),
  invite_url: z.boolean().optional(),
  seat: z.union([z.boolean(),z.lazy(() => SeatArgsSchema)]).optional(),
}).strict()

// SEAT SUMMARY
//------------------------------------------------------

export const SeatSummaryIncludeSchema: z.ZodType<Prisma.SeatSummaryInclude> = z.object({
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict()

export const SeatSummaryArgsSchema: z.ZodType<Prisma.SeatSummaryArgs> = z.object({
  select: z.lazy(() => SeatSummarySelectSchema).optional(),
  include: z.lazy(() => SeatSummaryIncludeSchema).optional(),
}).strict();

export const SeatSummarySelectSchema: z.ZodType<Prisma.SeatSummarySelect> = z.object({
  subscription_id: z.boolean().optional(),
  standard_seat_count: z.boolean().optional(),
  limited_seat_count: z.boolean().optional(),
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
}).strict()

// SEAT
//------------------------------------------------------

export const SeatIncludeSchema: z.ZodType<Prisma.SeatInclude> = z.object({
  reservation: z.union([z.boolean(),z.lazy(() => SeatReservationArgsSchema)]).optional(),
  occupant: z.union([z.boolean(),z.lazy(() => SeatOccupantArgsSchema)]).optional(),
}).strict()

export const SeatArgsSchema: z.ZodType<Prisma.SeatArgs> = z.object({
  select: z.lazy(() => SeatSelectSchema).optional(),
  include: z.lazy(() => SeatIncludeSchema).optional(),
}).strict();

export const SeatSelectSchema: z.ZodType<Prisma.SeatSelect> = z.object({
  id: z.boolean().optional(),
  seating_strategy_name: z.boolean().optional(),
  subscription_id: z.boolean().optional(),
  created_utc: z.boolean().optional(),
  seat_type: z.boolean().optional(),
  expires_utc: z.boolean().optional(),
  redeemed_utc: z.boolean().optional(),
  reservation: z.union([z.boolean(),z.lazy(() => SeatReservationArgsSchema)]).optional(),
  occupant: z.union([z.boolean(),z.lazy(() => SeatOccupantArgsSchema)]).optional(),
}).strict()

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionIncludeSchema: z.ZodType<Prisma.SubscriptionInclude> = z.object({
  seatingConfig: z.union([z.boolean(),z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  seatSummary: z.union([z.boolean(),z.lazy(() => SeatSummaryArgsSchema)]).optional(),
}).strict()

export const SubscriptionArgsSchema: z.ZodType<Prisma.SubscriptionArgs> = z.object({
  select: z.lazy(() => SubscriptionSelectSchema).optional(),
  include: z.lazy(() => SubscriptionIncludeSchema).optional(),
}).strict();

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z.object({
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
  seatingConfig: z.union([z.boolean(),z.lazy(() => SeatingConfigArgsSchema)]).optional(),
  seatSummary: z.union([z.boolean(),z.lazy(() => SeatSummaryArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
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
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  credentials: z.union([z.boolean(),z.lazy(() => CredentialFindManyArgsSchema)]).optional(),
  accessibleProducts: z.union([z.boolean(),z.lazy(() => ProductMembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  products: z.boolean().optional(),
  credentials: z.boolean().optional(),
  accessibleProducts: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  credentials: z.union([z.boolean(),z.lazy(() => CredentialFindManyArgsSchema)]).optional(),
  accessibleProducts: z.union([z.boolean(),z.lazy(() => ProductMembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CREDENTIAL TRANSPORTS
//------------------------------------------------------

export const CredentialTransportsIncludeSchema: z.ZodType<Prisma.CredentialTransportsInclude> = z.object({
  credential: z.union([z.boolean(),z.lazy(() => CredentialArgsSchema)]).optional(),
}).strict()

export const CredentialTransportsArgsSchema: z.ZodType<Prisma.CredentialTransportsArgs> = z.object({
  select: z.lazy(() => CredentialTransportsSelectSchema).optional(),
  include: z.lazy(() => CredentialTransportsIncludeSchema).optional(),
}).strict();

export const CredentialTransportsSelectSchema: z.ZodType<Prisma.CredentialTransportsSelect> = z.object({
  id: z.boolean().optional(),
  transport: z.boolean().optional(),
  credential: z.union([z.boolean(),z.lazy(() => CredentialArgsSchema)]).optional(),
}).strict()

// CREDENTIAL
//------------------------------------------------------

export const CredentialIncludeSchema: z.ZodType<Prisma.CredentialInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  transports: z.union([z.boolean(),z.lazy(() => CredentialTransportsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CredentialCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CredentialArgsSchema: z.ZodType<Prisma.CredentialArgs> = z.object({
  select: z.lazy(() => CredentialSelectSchema).optional(),
  include: z.lazy(() => CredentialIncludeSchema).optional(),
}).strict();

export const CredentialCountOutputTypeArgsSchema: z.ZodType<Prisma.CredentialCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CredentialCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CredentialCountOutputTypeSelectSchema: z.ZodType<Prisma.CredentialCountOutputTypeSelect> = z.object({
  transports: z.boolean().optional(),
}).strict();

export const CredentialSelectSchema: z.ZodType<Prisma.CredentialSelect> = z.object({
  id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  userId: z.boolean().optional(),
  transports: z.union([z.boolean(),z.lazy(() => CredentialTransportsFindManyArgsSchema)]).optional(),
  publicKey: z.boolean().optional(),
  signCount: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => CredentialCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CREDENTIAL CHALLENGE
//------------------------------------------------------

export const CredentialChallengeSelectSchema: z.ZodType<Prisma.CredentialChallengeSelect> = z.object({
  userId: z.boolean().optional(),
  value: z.boolean().optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publisher_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  home_page_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_page_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_sales_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_sales_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_support_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_support_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_setup_complete: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  on_access_denied_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_access_granted_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seatingConfig: z.union([ z.lazy(() => SeatingConfigRelationFilterSchema),z.lazy(() => SeatingConfigWhereInputSchema) ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  members: z.lazy(() => ProductMembersListRelationFilterSchema).optional(),
}).strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.object({
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
  members: z.lazy(() => ProductMembersOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.object({
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

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  owner_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  product_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publisher_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  home_page_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contact_page_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contact_sales_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contact_sales_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contact_support_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contact_support_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_setup_complete: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  on_access_denied_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_access_granted_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProductMembersWhereInputSchema: z.ZodType<Prisma.ProductMembersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductMembersWhereInputSchema),z.lazy(() => ProductMembersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductMembersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductMembersWhereInputSchema),z.lazy(() => ProductMembersWhereInputSchema).array() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProductMembersOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductMembersOrderByWithRelationInput> = z.object({
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductMembersWhereUniqueInputSchema: z.ZodType<Prisma.ProductMembersWhereUniqueInput> = z.object({
  product_id_user_id: z.lazy(() => ProductMembersProduct_idUser_idCompoundUniqueInputSchema).optional(),
}).strict();

export const ProductMembersOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductMembersOrderByWithAggregationInput> = z.object({
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductMembersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMembersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMembersMinOrderByAggregateInputSchema).optional(),
}).strict();

export const ProductMembersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductMembersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductMembersScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductMembersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductMembersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductMembersScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductMembersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  product_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SeatingConfigWhereInputSchema: z.ZodType<Prisma.SeatingConfigWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SeatingConfigWhereInputSchema),z.lazy(() => SeatingConfigWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatingConfigWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatingConfigWhereInputSchema),z.lazy(() => SeatingConfigWhereInputSchema).array() ]).optional(),
  owner_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => EnumSeatingStrategyNameFilterSchema),z.lazy(() => SeatingStrategyNameSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  publisher: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional().nullable(),
  subscription: z.union([ z.lazy(() => SubscriptionRelationFilterSchema),z.lazy(() => SubscriptionWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SeatingConfigOrderByWithRelationInputSchema: z.ZodType<Prisma.SeatingConfigOrderByWithRelationInput> = z.object({
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

export const SeatingConfigWhereUniqueInputSchema: z.ZodType<Prisma.SeatingConfigWhereUniqueInput> = z.object({
  owner_id: z.string().optional(),
}).strict();

export const SeatingConfigOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeatingConfigOrderByWithAggregationInput> = z.object({
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

export const SeatingConfigScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeatingConfigScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatingConfigScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  owner_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => EnumSeatingStrategyNameWithAggregatesFilterSchema),z.lazy(() => SeatingStrategyNameSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SeatOccupantWhereInputSchema: z.ZodType<Prisma.SeatOccupantWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SeatOccupantWhereInputSchema),z.lazy(() => SeatOccupantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatOccupantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatOccupantWhereInputSchema),z.lazy(() => SeatOccupantWhereInputSchema).array() ]).optional(),
  seat_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tenant_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seat: z.union([ z.lazy(() => SeatRelationFilterSchema),z.lazy(() => SeatWhereInputSchema) ]).optional(),
}).strict();

export const SeatOccupantOrderByWithRelationInputSchema: z.ZodType<Prisma.SeatOccupantOrderByWithRelationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  seat: z.lazy(() => SeatOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatOccupantWhereUniqueInputSchema: z.ZodType<Prisma.SeatOccupantWhereUniqueInput> = z.object({
  seat_id: z.string().optional(),
}).strict();

export const SeatOccupantOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeatOccupantOrderByWithAggregationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatOccupantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatOccupantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatOccupantMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatOccupantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeatOccupantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatOccupantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  seat_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tenant_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SeatReservationWhereInputSchema: z.ZodType<Prisma.SeatReservationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SeatReservationWhereInputSchema),z.lazy(() => SeatReservationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatReservationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatReservationWhereInputSchema),z.lazy(() => SeatReservationWhereInputSchema).array() ]).optional(),
  seat_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tenant_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invite_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seat: z.union([ z.lazy(() => SeatRelationFilterSchema),z.lazy(() => SeatWhereInputSchema) ]).optional(),
}).strict();

export const SeatReservationOrderByWithRelationInputSchema: z.ZodType<Prisma.SeatReservationOrderByWithRelationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
  seat: z.lazy(() => SeatOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatReservationWhereUniqueInputSchema: z.ZodType<Prisma.SeatReservationWhereUniqueInput> = z.object({
  seat_id: z.string().optional(),
}).strict();

export const SeatReservationOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeatReservationOrderByWithAggregationInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatReservationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatReservationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatReservationMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatReservationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeatReservationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatReservationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  seat_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tenant_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  invite_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SeatSummaryWhereInputSchema: z.ZodType<Prisma.SeatSummaryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SeatSummaryWhereInputSchema),z.lazy(() => SeatSummaryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatSummaryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatSummaryWhereInputSchema),z.lazy(() => SeatSummaryWhereInputSchema).array() ]).optional(),
  subscription_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  standard_seat_count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  limited_seat_count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  subscription: z.union([ z.lazy(() => SubscriptionRelationFilterSchema),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
}).strict();

export const SeatSummaryOrderByWithRelationInputSchema: z.ZodType<Prisma.SeatSummaryOrderByWithRelationInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
  subscription: z.lazy(() => SubscriptionOrderByWithRelationInputSchema).optional(),
}).strict();

export const SeatSummaryWhereUniqueInputSchema: z.ZodType<Prisma.SeatSummaryWhereUniqueInput> = z.object({
  subscription_id: z.string().optional(),
}).strict();

export const SeatSummaryOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeatSummaryOrderByWithAggregationInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeatSummaryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SeatSummaryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeatSummaryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeatSummaryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SeatSummarySumOrderByAggregateInputSchema).optional(),
}).strict();

export const SeatSummaryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeatSummaryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatSummaryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  subscription_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  standard_seat_count: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  limited_seat_count: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const SeatWhereInputSchema: z.ZodType<Prisma.SeatWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SeatWhereInputSchema),z.lazy(() => SeatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatWhereInputSchema),z.lazy(() => SeatWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => EnumSeatingStrategyNameFilterSchema),z.lazy(() => SeatingStrategyNameSchema) ]).optional(),
  subscription_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_utc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => EnumSeatTypeFilterSchema),z.lazy(() => SeatTypeSchema) ]).optional(),
  expires_utc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  redeemed_utc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation: z.union([ z.lazy(() => SeatReservationRelationFilterSchema),z.lazy(() => SeatReservationWhereInputSchema) ]).optional().nullable(),
  occupant: z.union([ z.lazy(() => SeatOccupantRelationFilterSchema),z.lazy(() => SeatOccupantWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SeatOrderByWithRelationInputSchema: z.ZodType<Prisma.SeatOrderByWithRelationInput> = z.object({
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

export const SeatWhereUniqueInputSchema: z.ZodType<Prisma.SeatWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const SeatOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeatOrderByWithAggregationInput> = z.object({
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

export const SeatScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeatScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SeatScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeatScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeatScalarWhereWithAggregatesInputSchema),z.lazy(() => SeatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => EnumSeatingStrategyNameWithAggregatesFilterSchema),z.lazy(() => SeatingStrategyNameSchema) ]).optional(),
  subscription_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_utc: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => EnumSeatTypeWithAggregatesFilterSchema),z.lazy(() => SeatTypeSchema) ]).optional(),
  expires_utc: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  redeemed_utc: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const SubscriptionWhereInputSchema: z.ZodType<Prisma.SubscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_setup_complete: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_utc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  tenant_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  subscriber_info: z.lazy(() => JsonNullableFilterSchema).optional(),
  source_subscription: z.lazy(() => JsonNullableFilterSchema).optional(),
  subscription_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tenant_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  offer_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  plan_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => EnumSubscriptionStateFilterSchema),z.lazy(() => SubscriptionStateSchema) ]).optional(),
  admin_role_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_role_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  management_urls: z.lazy(() => JsonNullableFilterSchema).optional(),
  admin_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  admin_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  total_seats: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  is_being_configured: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  is_free_trial: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  is_test_subscription: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  seatingConfig: z.union([ z.lazy(() => SeatingConfigRelationFilterSchema),z.lazy(() => SeatingConfigWhereInputSchema) ]).optional(),
  seatSummary: z.union([ z.lazy(() => SeatSummaryRelationFilterSchema),z.lazy(() => SeatSummaryWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithRelationInput> = z.object({
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

export const SubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput> = z.object({
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

export const SubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_setup_complete: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  created_utc: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  tenant_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  subscriber_info: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  source_subscription: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  subscription_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tenant_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  offer_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  plan_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => EnumSubscriptionStateWithAggregatesFilterSchema),z.lazy(() => SubscriptionStateSchema) ]).optional(),
  admin_role_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_role_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  management_urls: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  admin_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  admin_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  total_seats: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  is_being_configured: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  is_free_trial: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  is_test_subscription: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
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

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
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

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  credentials: z.lazy(() => CredentialListRelationFilterSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersListRelationFilterSchema).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  credentials: z.lazy(() => CredentialOrderByRelationAggregateInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CredentialTransportsWhereInputSchema: z.ZodType<Prisma.CredentialTransportsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialTransportsWhereInputSchema),z.lazy(() => CredentialTransportsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialTransportsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialTransportsWhereInputSchema),z.lazy(() => CredentialTransportsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transport: z.union([ z.lazy(() => EnumAuthenticatorTransportFilterSchema),z.lazy(() => AuthenticatorTransportSchema) ]).optional(),
  credential: z.union([ z.lazy(() => CredentialRelationFilterSchema),z.lazy(() => CredentialWhereInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsOrderByWithRelationInputSchema: z.ZodType<Prisma.CredentialTransportsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
  credential: z.lazy(() => CredentialOrderByWithRelationInputSchema).optional(),
}).strict();

export const CredentialTransportsWhereUniqueInputSchema: z.ZodType<Prisma.CredentialTransportsWhereUniqueInput> = z.object({
  id_transport: z.lazy(() => CredentialTransportsIdTransportCompoundUniqueInputSchema).optional(),
}).strict();

export const CredentialTransportsOrderByWithAggregationInputSchema: z.ZodType<Prisma.CredentialTransportsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CredentialTransportsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CredentialTransportsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CredentialTransportsMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CredentialTransportsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CredentialTransportsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialTransportsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  transport: z.union([ z.lazy(() => EnumAuthenticatorTransportWithAggregatesFilterSchema),z.lazy(() => AuthenticatorTransportSchema) ]).optional(),
}).strict();

export const CredentialWhereInputSchema: z.ZodType<Prisma.CredentialWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialWhereInputSchema),z.lazy(() => CredentialWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialWhereInputSchema),z.lazy(() => CredentialWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transports: z.lazy(() => CredentialTransportsListRelationFilterSchema).optional(),
  publicKey: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  signCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CredentialOrderByWithRelationInputSchema: z.ZodType<Prisma.CredentialOrderByWithRelationInput> = z.object({
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

export const CredentialWhereUniqueInputSchema: z.ZodType<Prisma.CredentialWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const CredentialOrderByWithAggregationInputSchema: z.ZodType<Prisma.CredentialOrderByWithAggregationInput> = z.object({
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

export const CredentialScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CredentialScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publicKey: z.union([ z.lazy(() => BytesWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional(),
  signCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CredentialChallengeWhereInputSchema: z.ZodType<Prisma.CredentialChallengeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialChallengeWhereInputSchema),z.lazy(() => CredentialChallengeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialChallengeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialChallengeWhereInputSchema),z.lazy(() => CredentialChallengeWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CredentialChallengeOrderByWithRelationInputSchema: z.ZodType<Prisma.CredentialChallengeOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialChallengeWhereUniqueInputSchema: z.ZodType<Prisma.CredentialChallengeWhereUniqueInput> = z.object({
  userId: z.string().optional(),
}).strict();

export const CredentialChallengeOrderByWithAggregationInputSchema: z.ZodType<Prisma.CredentialChallengeOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CredentialChallengeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CredentialChallengeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CredentialChallengeMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CredentialChallengeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CredentialChallengeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialChallengeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional(),
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.object({
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
  members: z.lazy(() => ProductMembersCreateNestedManyWithoutProductInputSchema).optional(),
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
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
  members: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
}).strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.object({
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  members: z.lazy(() => ProductMembersUpdateManyWithoutProductNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.object({
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

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.object({
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductMembersCreateInputSchema: z.ZodType<Prisma.ProductMembersCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAccessibleProductsInputSchema),
}).strict();

export const ProductMembersUncheckedCreateInputSchema: z.ZodType<Prisma.ProductMembersUncheckedCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  product_id: z.string(),
  user_id: z.string(),
}).strict();

export const ProductMembersUpdateInputSchema: z.ZodType<Prisma.ProductMembersUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccessibleProductsNestedInputSchema).optional(),
}).strict();

export const ProductMembersUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductMembersCreateManyInputSchema: z.ZodType<Prisma.ProductMembersCreateManyInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  product_id: z.string(),
  user_id: z.string(),
}).strict();

export const ProductMembersUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductMembersUpdateManyMutationInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductMembersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateManyInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SeatingConfigCreateInputSchema: z.ZodType<Prisma.SeatingConfigCreateInput> = z.object({
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

export const SeatingConfigUncheckedCreateInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedCreateInput> = z.object({
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

export const SeatingConfigUpdateInputSchema: z.ZodType<Prisma.SeatingConfigUpdateInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publisher: z.lazy(() => ProductUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedUpdateInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedUpdateInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigCreateManyInputSchema: z.ZodType<Prisma.SeatingConfigCreateManyInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().int().optional().nullable(),
  default_seat_expiry_in_days: z.number().int().optional().nullable(),
}).strict();

export const SeatingConfigUpdateManyMutationInputSchema: z.ZodType<Prisma.SeatingConfigUpdateManyMutationInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatingConfigUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedUpdateManyInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatOccupantCreateInputSchema: z.ZodType<Prisma.SeatOccupantCreateInput> = z.object({
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
  seat: z.lazy(() => SeatCreateNestedOneWithoutOccupantInputSchema),
}).strict();

export const SeatOccupantUncheckedCreateInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedCreateInput> = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantUpdateInputSchema: z.ZodType<Prisma.SeatOccupantUpdateInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat: z.lazy(() => SeatUpdateOneRequiredWithoutOccupantNestedInputSchema).optional(),
}).strict();

export const SeatOccupantUncheckedUpdateInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedUpdateInput> = z.object({
  seat_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatOccupantCreateManyInputSchema: z.ZodType<Prisma.SeatOccupantCreateManyInput> = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantUpdateManyMutationInputSchema: z.ZodType<Prisma.SeatOccupantUpdateManyMutationInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatOccupantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedUpdateManyInput> = z.object({
  seat_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatReservationCreateInputSchema: z.ZodType<Prisma.SeatReservationCreateInput> = z.object({
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
  seat: z.lazy(() => SeatCreateNestedOneWithoutReservationInputSchema),
}).strict();

export const SeatReservationUncheckedCreateInputSchema: z.ZodType<Prisma.SeatReservationUncheckedCreateInput> = z.object({
  seat_id: z.string(),
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationUpdateInputSchema: z.ZodType<Prisma.SeatReservationUpdateInput> = z.object({
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invite_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat: z.lazy(() => SeatUpdateOneRequiredWithoutReservationNestedInputSchema).optional(),
}).strict();

export const SeatReservationUncheckedUpdateInputSchema: z.ZodType<Prisma.SeatReservationUncheckedUpdateInput> = z.object({
  seat_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invite_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatReservationCreateManyInputSchema: z.ZodType<Prisma.SeatReservationCreateManyInput> = z.object({
  seat_id: z.string(),
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationUpdateManyMutationInputSchema: z.ZodType<Prisma.SeatReservationUpdateManyMutationInput> = z.object({
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invite_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatReservationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeatReservationUncheckedUpdateManyInput> = z.object({
  seat_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invite_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatSummaryCreateInputSchema: z.ZodType<Prisma.SeatSummaryCreateInput> = z.object({
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutSeatSummaryInputSchema),
}).strict();

export const SeatSummaryUncheckedCreateInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedCreateInput> = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
}).strict();

export const SeatSummaryUpdateInputSchema: z.ZodType<Prisma.SeatSummaryUpdateInput> = z.object({
  standard_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneRequiredWithoutSeatSummaryNestedInputSchema).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedUpdateInput> = z.object({
  subscription_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  standard_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SeatSummaryCreateManyInputSchema: z.ZodType<Prisma.SeatSummaryCreateManyInput> = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
}).strict();

export const SeatSummaryUpdateManyMutationInputSchema: z.ZodType<Prisma.SeatSummaryUpdateManyMutationInput> = z.object({
  standard_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedUpdateManyInput> = z.object({
  subscription_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  standard_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited_seat_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SeatCreateInputSchema: z.ZodType<Prisma.SeatCreateInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationCreateNestedOneWithoutSeatInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUncheckedCreateInputSchema: z.ZodType<Prisma.SeatUncheckedCreateInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUpdateInputSchema: z.ZodType<Prisma.SeatUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUpdateOneWithoutSeatNestedInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatUncheckedUpdateInputSchema: z.ZodType<Prisma.SeatUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
  occupant: z.lazy(() => SeatOccupantUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatCreateManyInputSchema: z.ZodType<Prisma.SeatCreateManyInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
}).strict();

export const SeatUpdateManyMutationInputSchema: z.ZodType<Prisma.SeatUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeatUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriptionCreateInputSchema: z.ZodType<Prisma.SubscriptionCreateInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().int().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigCreateNestedOneWithoutSubscriptionInputSchema),
  seatSummary: z.lazy(() => SeatSummaryCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateInput> = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().int().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionUpdateInputSchema: z.ZodType<Prisma.SubscriptionUpdateInput> = z.object({
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInputSchema).optional(),
  seatSummary: z.lazy(() => SeatSummaryUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionCreateManyInputSchema: z.ZodType<Prisma.SubscriptionCreateManyInput> = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().int().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
}).strict();

export const SubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyMutationInput> = z.object({
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
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

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
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

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
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

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CredentialTransportsCreateInputSchema: z.ZodType<Prisma.CredentialTransportsCreateInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
  credential: z.lazy(() => CredentialCreateNestedOneWithoutTransportsInputSchema),
}).strict();

export const CredentialTransportsUncheckedCreateInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedCreateInput> = z.object({
  id: z.string(),
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUpdateInputSchema: z.ZodType<Prisma.CredentialTransportsUpdateInput> = z.object({
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
  credential: z.lazy(() => CredentialUpdateOneRequiredWithoutTransportsNestedInputSchema).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsCreateManyInputSchema: z.ZodType<Prisma.CredentialTransportsCreateManyInput> = z.object({
  id: z.string(),
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUpdateManyMutationInputSchema: z.ZodType<Prisma.CredentialTransportsUpdateManyMutationInput> = z.object({
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialCreateInputSchema: z.ZodType<Prisma.CredentialCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCredentialsInputSchema),
  transports: z.lazy(() => CredentialTransportsCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialUncheckedCreateInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  transports: z.lazy(() => CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialUpdateInputSchema: z.ZodType<Prisma.CredentialUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCredentialsNestedInputSchema).optional(),
  transports: z.lazy(() => CredentialTransportsUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialUncheckedUpdateInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.lazy(() => CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialCreateManyInputSchema: z.ZodType<Prisma.CredentialCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().int().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialUpdateManyMutationInputSchema: z.ZodType<Prisma.CredentialUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialChallengeCreateInputSchema: z.ZodType<Prisma.CredentialChallengeCreateInput> = z.object({
  userId: z.string(),
  value: z.string(),
}).strict();

export const CredentialChallengeUncheckedCreateInputSchema: z.ZodType<Prisma.CredentialChallengeUncheckedCreateInput> = z.object({
  userId: z.string(),
  value: z.string(),
}).strict();

export const CredentialChallengeUpdateInputSchema: z.ZodType<Prisma.CredentialChallengeUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialChallengeUncheckedUpdateInputSchema: z.ZodType<Prisma.CredentialChallengeUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialChallengeCreateManyInputSchema: z.ZodType<Prisma.CredentialChallengeCreateManyInput> = z.object({
  userId: z.string(),
  value: z.string(),
}).strict();

export const CredentialChallengeUpdateManyMutationInputSchema: z.ZodType<Prisma.CredentialChallengeUpdateManyMutationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialChallengeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CredentialChallengeUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SeatingConfigRelationFilterSchema: z.ZodType<Prisma.SeatingConfigRelationFilter> = z.object({
  is: z.lazy(() => SeatingConfigWhereInputSchema).optional(),
  isNot: z.lazy(() => SeatingConfigWhereInputSchema).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const ProductMembersListRelationFilterSchema: z.ZodType<Prisma.ProductMembersListRelationFilter> = z.object({
  every: z.lazy(() => ProductMembersWhereInputSchema).optional(),
  some: z.lazy(() => ProductMembersWhereInputSchema).optional(),
  none: z.lazy(() => ProductMembersWhereInputSchema).optional(),
}).strict();

export const ProductMembersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductMembersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.object({
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

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.object({
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

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.object({
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

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ProductRelationFilterSchema: z.ZodType<Prisma.ProductRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
}).strict();

export const ProductMembersProduct_idUser_idCompoundUniqueInputSchema: z.ZodType<Prisma.ProductMembersProduct_idUser_idCompoundUniqueInput> = z.object({
  product_id: z.string(),
  user_id: z.string(),
}).strict();

export const ProductMembersCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMembersCountOrderByAggregateInput> = z.object({
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductMembersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMembersMaxOrderByAggregateInput> = z.object({
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductMembersMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMembersMinOrderByAggregateInput> = z.object({
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EnumSeatingStrategyNameFilterSchema: z.ZodType<Prisma.EnumSeatingStrategyNameFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema) ]).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SubscriptionRelationFilterSchema: z.ZodType<Prisma.SubscriptionRelationFilter> = z.object({
  is: z.lazy(() => SubscriptionWhereInputSchema).optional(),
  isNot: z.lazy(() => SubscriptionWhereInputSchema).optional(),
}).strict();

export const SeatingConfigCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeatingConfigCountOrderByAggregateInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SeatingConfigAvgOrderByAggregateInput> = z.object({
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeatingConfigMaxOrderByAggregateInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeatingConfigMinOrderByAggregateInput> = z.object({
  owner_id: z.lazy(() => SortOrderSchema).optional(),
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  limited_overflow_seating_enabled: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigSumOrderByAggregateInputSchema: z.ZodType<Prisma.SeatingConfigSumOrderByAggregateInput> = z.object({
  default_low_seat_warning_level_percent: z.lazy(() => SortOrderSchema).optional(),
  low_seat_warning_level_pct: z.lazy(() => SortOrderSchema).optional(),
  seat_reservation_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
  default_seat_expiry_in_days: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const EnumSeatingStrategyNameWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSeatingStrategyNameWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => NestedEnumSeatingStrategyNameWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const SeatRelationFilterSchema: z.ZodType<Prisma.SeatRelationFilter> = z.object({
  is: z.lazy(() => SeatWhereInputSchema).optional(),
  isNot: z.lazy(() => SeatWhereInputSchema).optional(),
}).strict();

export const SeatOccupantCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeatOccupantCountOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatOccupantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeatOccupantMaxOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatOccupantMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeatOccupantMinOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatReservationCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeatReservationCountOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatReservationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeatReservationMaxOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatReservationMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeatReservationMinOrderByAggregateInput> = z.object({
  seat_id: z.lazy(() => SortOrderSchema).optional(),
  tenant_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invite_url: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const SeatSummaryCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeatSummaryCountOrderByAggregateInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummaryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SeatSummaryAvgOrderByAggregateInput> = z.object({
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummaryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeatSummaryMaxOrderByAggregateInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummaryMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeatSummaryMinOrderByAggregateInput> = z.object({
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatSummarySumOrderByAggregateInputSchema: z.ZodType<Prisma.SeatSummarySumOrderByAggregateInput> = z.object({
  standard_seat_count: z.lazy(() => SortOrderSchema).optional(),
  limited_seat_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumSeatTypeFilterSchema: z.ZodType<Prisma.EnumSeatTypeFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => NestedEnumSeatTypeFilterSchema) ]).optional(),
}).strict();

export const SeatReservationRelationFilterSchema: z.ZodType<Prisma.SeatReservationRelationFilter> = z.object({
  is: z.lazy(() => SeatReservationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeatReservationWhereInputSchema).optional().nullable(),
}).strict();

export const SeatOccupantRelationFilterSchema: z.ZodType<Prisma.SeatOccupantRelationFilter> = z.object({
  is: z.lazy(() => SeatOccupantWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeatOccupantWhereInputSchema).optional().nullable(),
}).strict();

export const SeatCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  seating_strategy_name: z.lazy(() => SortOrderSchema).optional(),
  subscription_id: z.lazy(() => SortOrderSchema).optional(),
  created_utc: z.lazy(() => SortOrderSchema).optional(),
  seat_type: z.lazy(() => SortOrderSchema).optional(),
  expires_utc: z.lazy(() => SortOrderSchema).optional(),
  redeemed_utc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const EnumSeatTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSeatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => NestedEnumSeatTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
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
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const EnumSubscriptionStateFilterSchema: z.ZodType<Prisma.EnumSubscriptionStateFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => NestedEnumSubscriptionStateFilterSchema) ]).optional(),
}).strict();

export const SeatSummaryRelationFilterSchema: z.ZodType<Prisma.SeatSummaryRelationFilter> = z.object({
  is: z.lazy(() => SeatSummaryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeatSummaryWhereInputSchema).optional().nullable(),
}).strict();

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput> = z.object({
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

export const SubscriptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionAvgOrderByAggregateInput> = z.object({
  total_seats: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMaxOrderByAggregateInput> = z.object({
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

export const SubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMinOrderByAggregateInput> = z.object({
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

export const SubscriptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionSumOrderByAggregateInput> = z.object({
  total_seats: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
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
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
}).strict();

export const EnumSubscriptionStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSubscriptionStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => NestedEnumSubscriptionStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
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

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
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

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
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

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional(),
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional(),
}).strict();

export const CredentialListRelationFilterSchema: z.ZodType<Prisma.CredentialListRelationFilter> = z.object({
  every: z.lazy(() => CredentialWhereInputSchema).optional(),
  some: z.lazy(() => CredentialWhereInputSchema).optional(),
  none: z.lazy(() => CredentialWhereInputSchema).optional(),
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CredentialOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumAuthenticatorTransportFilterSchema: z.ZodType<Prisma.EnumAuthenticatorTransportFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema) ]).optional(),
}).strict();

export const CredentialRelationFilterSchema: z.ZodType<Prisma.CredentialRelationFilter> = z.object({
  is: z.lazy(() => CredentialWhereInputSchema).optional(),
  isNot: z.lazy(() => CredentialWhereInputSchema).optional(),
}).strict();

export const CredentialTransportsIdTransportCompoundUniqueInputSchema: z.ZodType<Prisma.CredentialTransportsIdTransportCompoundUniqueInput> = z.object({
  id: z.string(),
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsCountOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialTransportsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialTransportsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialTransportsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialTransportsMinOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialTransportsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transport: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumAuthenticatorTransportWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAuthenticatorTransportWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => NestedEnumAuthenticatorTransportWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
}).strict();

export const CredentialTransportsListRelationFilterSchema: z.ZodType<Prisma.CredentialTransportsListRelationFilter> = z.object({
  every: z.lazy(() => CredentialTransportsWhereInputSchema).optional(),
  some: z.lazy(() => CredentialTransportsWhereInputSchema).optional(),
  none: z.lazy(() => CredentialTransportsWhereInputSchema).optional(),
}).strict();

export const BytesFilterSchema: z.ZodType<Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict();

export const CredentialTransportsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CredentialTransportsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialCountOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialAvgOrderByAggregateInput> = z.object({
  signCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialMinOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  signCount: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialSumOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialSumOrderByAggregateInput> = z.object({
  signCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BytesWithAggregatesFilterSchema: z.ZodType<Prisma.BytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict();

export const CredentialChallengeCountOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialChallengeCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialChallengeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialChallengeMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CredentialChallengeMinOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialChallengeMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string(),
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SeatingConfigCreateNestedOneWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigCreateNestedOneWithoutPublisherInput> = z.object({
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutPublisherInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const ProductMembersCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutProductInputSchema),z.lazy(() => ProductMembersCreateWithoutProductInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductMembersUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutProductInputSchema),z.lazy(() => ProductMembersCreateWithoutProductInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
}).strict();

export const SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema: z.ZodType<Prisma.SeatingConfigUpdateOneRequiredWithoutPublisherNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutPublisherInputSchema).optional(),
  upsert: z.lazy(() => SeatingConfigUpsertWithoutPublisherInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatingConfigUpdateWithoutPublisherInputSchema),z.lazy(() => SeatingConfigUncheckedUpdateWithoutPublisherInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
}).strict();

export const ProductMembersUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductMembersUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutProductInputSchema),z.lazy(() => ProductMembersCreateWithoutProductInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductMembersUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ProductMembersUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductMembersScalarWhereInputSchema),z.lazy(() => ProductMembersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductMembersUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutProductInputSchema),z.lazy(() => ProductMembersCreateWithoutProductInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductMembersUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ProductMembersUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductMembersScalarWhereInputSchema),z.lazy(() => ProductMembersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutMembersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccessibleProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccessibleProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessibleProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccessibleProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutMembersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutMembersInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAccessibleProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccessibleProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccessibleProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessibleProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccessibleProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccessibleProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccessibleProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccessibleProductsInputSchema) ]).optional(),
}).strict();

export const ProductCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
}).strict();

export const SubscriptionCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
}).strict();

export const ProductUncheckedCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const EnumSeatingStrategyNameFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSeatingStrategyNameFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SeatingStrategyNameSchema).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const ProductUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutSeatingConfigInputSchema) ]).optional(),
}).strict();

export const SubscriptionUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema) ]).optional(),
}).strict();

export const ProductUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutSeatingConfigInputSchema) ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutSeatingConfigInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema) ]).optional(),
}).strict();

export const SeatCreateNestedOneWithoutOccupantInputSchema: z.ZodType<Prisma.SeatCreateNestedOneWithoutOccupantInput> = z.object({
  create: z.union([ z.lazy(() => SeatCreateWithoutOccupantInputSchema),z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutOccupantInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
}).strict();

export const SeatUpdateOneRequiredWithoutOccupantNestedInputSchema: z.ZodType<Prisma.SeatUpdateOneRequiredWithoutOccupantNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatCreateWithoutOccupantInputSchema),z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutOccupantInputSchema).optional(),
  upsert: z.lazy(() => SeatUpsertWithoutOccupantInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatUpdateWithoutOccupantInputSchema),z.lazy(() => SeatUncheckedUpdateWithoutOccupantInputSchema) ]).optional(),
}).strict();

export const SeatCreateNestedOneWithoutReservationInputSchema: z.ZodType<Prisma.SeatCreateNestedOneWithoutReservationInput> = z.object({
  create: z.union([ z.lazy(() => SeatCreateWithoutReservationInputSchema),z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
}).strict();

export const SeatUpdateOneRequiredWithoutReservationNestedInputSchema: z.ZodType<Prisma.SeatUpdateOneRequiredWithoutReservationNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatCreateWithoutReservationInputSchema),z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatCreateOrConnectWithoutReservationInputSchema).optional(),
  upsert: z.lazy(() => SeatUpsertWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => SeatWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatUpdateWithoutReservationInputSchema),z.lazy(() => SeatUncheckedUpdateWithoutReservationInputSchema) ]).optional(),
}).strict();

export const SubscriptionCreateNestedOneWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedOneWithoutSeatSummaryInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatSummaryInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const SubscriptionUpdateOneRequiredWithoutSeatSummaryNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateOneRequiredWithoutSeatSummaryNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutSeatSummaryInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutSeatSummaryInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutSeatSummaryInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatSummaryInputSchema) ]).optional(),
}).strict();

export const SeatReservationCreateNestedOneWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([ z.lazy(() => SeatReservationCreateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
}).strict();

export const SeatOccupantCreateNestedOneWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([ z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
}).strict();

export const SeatReservationUncheckedCreateNestedOneWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationUncheckedCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([ z.lazy(() => SeatReservationCreateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
}).strict();

export const SeatOccupantUncheckedCreateNestedOneWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedCreateNestedOneWithoutSeatInput> = z.object({
  create: z.union([ z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
}).strict();

export const EnumSeatTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSeatTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SeatTypeSchema).optional(),
}).strict();

export const SeatReservationUpdateOneWithoutSeatNestedInputSchema: z.ZodType<Prisma.SeatReservationUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatReservationCreateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatReservationUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatReservationUpdateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedUpdateWithoutSeatInputSchema) ]).optional(),
}).strict();

export const SeatOccupantUpdateOneWithoutSeatNestedInputSchema: z.ZodType<Prisma.SeatOccupantUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatOccupantUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatOccupantUpdateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedUpdateWithoutSeatInputSchema) ]).optional(),
}).strict();

export const SeatReservationUncheckedUpdateOneWithoutSeatNestedInputSchema: z.ZodType<Prisma.SeatReservationUncheckedUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatReservationCreateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatReservationCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatReservationUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatReservationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatReservationUpdateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedUpdateWithoutSeatInputSchema) ]).optional(),
}).strict();

export const SeatOccupantUncheckedUpdateOneWithoutSeatNestedInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedUpdateOneWithoutSeatNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatOccupantCreateOrConnectWithoutSeatInputSchema).optional(),
  upsert: z.lazy(() => SeatOccupantUpsertWithoutSeatInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatOccupantWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatOccupantUpdateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedUpdateWithoutSeatInputSchema) ]).optional(),
}).strict();

export const SeatingConfigCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
}).strict();

export const SeatSummaryCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([ z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
}).strict();

export const SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([ z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
}).strict();

export const EnumSubscriptionStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSubscriptionStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SubscriptionStateSchema).optional(),
}).strict();

export const SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInputSchema: z.ZodType<Prisma.SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatingConfigCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => SeatingConfigUpsertWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => SeatingConfigWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatingConfigUpdateWithoutSubscriptionInputSchema),z.lazy(() => SeatingConfigUncheckedUpdateWithoutSubscriptionInputSchema) ]).optional(),
}).strict();

export const SeatSummaryUpdateOneWithoutSubscriptionNestedInputSchema: z.ZodType<Prisma.SeatSummaryUpdateOneWithoutSubscriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => SeatSummaryUpsertWithoutSubscriptionInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatSummaryUpdateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema) ]).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => SeatSummaryUpsertWithoutSubscriptionInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SeatSummaryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeatSummaryUpdateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOwnerInputSchema),z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CredentialCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CredentialCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductMembersCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutUserInputSchema),z.lazy(() => ProductMembersCreateWithoutUserInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOwnerInputSchema),z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CredentialUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductMembersUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutUserInputSchema),z.lazy(() => ProductMembersCreateWithoutUserInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOwnerInputSchema),z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CredentialUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CredentialUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductMembersUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProductMembersUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutUserInputSchema),z.lazy(() => ProductMembersCreateWithoutUserInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductMembersUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProductMembersUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductMembersScalarWhereInputSchema),z.lazy(() => ProductMembersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOwnerInputSchema),z.lazy(() => ProductCreateWithoutOwnerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductMembersUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutUserInputSchema),z.lazy(() => ProductMembersCreateWithoutUserInputSchema).array(),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProductMembersCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProductMembersUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductMembersCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductMembersWhereUniqueInputSchema),z.lazy(() => ProductMembersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProductMembersUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductMembersUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProductMembersUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductMembersScalarWhereInputSchema),z.lazy(() => ProductMembersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CredentialCreateNestedOneWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialCreateNestedOneWithoutTransportsInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutTransportsInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CredentialCreateOrConnectWithoutTransportsInputSchema).optional(),
  connect: z.lazy(() => CredentialWhereUniqueInputSchema).optional(),
}).strict();

export const EnumAuthenticatorTransportFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAuthenticatorTransportFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AuthenticatorTransportSchema).optional(),
}).strict();

export const CredentialUpdateOneRequiredWithoutTransportsNestedInputSchema: z.ZodType<Prisma.CredentialUpdateOneRequiredWithoutTransportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutTransportsInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CredentialCreateOrConnectWithoutTransportsInputSchema).optional(),
  upsert: z.lazy(() => CredentialUpsertWithoutTransportsInputSchema).optional(),
  connect: z.lazy(() => CredentialWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CredentialUpdateWithoutTransportsInputSchema),z.lazy(() => CredentialUncheckedUpdateWithoutTransportsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCredentialsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCredentialsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCredentialsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const CredentialTransportsCreateNestedManyWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsCreateNestedManyWithoutCredentialInput> = z.object({
  create: z.union([ z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInput> = z.object({
  create: z.union([ z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCredentialsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCredentialsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCredentialsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCredentialsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsUpdateManyWithoutCredentialNestedInputSchema: z.ZodType<Prisma.CredentialTransportsUpdateManyWithoutCredentialNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CredentialTransportsScalarWhereInputSchema),z.lazy(() => CredentialTransportsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema).array(),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsCreateOrConnectWithoutCredentialInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialTransportsCreateManyCredentialInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CredentialTransportsWhereUniqueInputSchema),z.lazy(() => CredentialTransportsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CredentialTransportsScalarWhereInputSchema),z.lazy(() => CredentialTransportsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSeatingStrategyNameFilterSchema: z.ZodType<Prisma.NestedEnumSeatingStrategyNameFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema) ]).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const NestedEnumSeatingStrategyNameWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSeatingStrategyNameWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatingStrategyNameSchema).optional(),
  in: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  notIn: z.lazy(() => SeatingStrategyNameSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => NestedEnumSeatingStrategyNameWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatingStrategyNameFilterSchema).optional(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumSeatTypeFilterSchema: z.ZodType<Prisma.NestedEnumSeatTypeFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => NestedEnumSeatTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const NestedEnumSeatTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSeatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SeatTypeSchema).optional(),
  in: z.lazy(() => SeatTypeSchema).array().optional(),
  notIn: z.lazy(() => SeatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => NestedEnumSeatTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSeatTypeFilterSchema).optional(),
}).strict();

export const NestedEnumSubscriptionStateFilterSchema: z.ZodType<Prisma.NestedEnumSubscriptionStateFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => NestedEnumSubscriptionStateFilterSchema) ]).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
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
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSubscriptionStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSubscriptionStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStateSchema).optional(),
  in: z.lazy(() => SubscriptionStateSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStateSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => NestedEnumSubscriptionStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStateFilterSchema).optional(),
}).strict();

export const NestedEnumAuthenticatorTransportFilterSchema: z.ZodType<Prisma.NestedEnumAuthenticatorTransportFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAuthenticatorTransportWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAuthenticatorTransportWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AuthenticatorTransportSchema).optional(),
  in: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  notIn: z.lazy(() => AuthenticatorTransportSchema).array().optional(),
  not: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => NestedEnumAuthenticatorTransportWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAuthenticatorTransportFilterSchema).optional(),
}).strict();

export const NestedBytesFilterSchema: z.ZodType<Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict();

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict();

export const SeatingConfigCreateWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigCreateWithoutPublisherInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedCreateWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedCreateWithoutPublisherInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigCreateOrConnectWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigCreateOrConnectWithoutPublisherInput> = z.object({
  where: z.lazy(() => SeatingConfigWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema) ]),
}).strict();

export const UserCreateWithoutProductsInputSchema: z.ZodType<Prisma.UserCreateWithoutProductsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProductsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema) ]),
}).strict();

export const ProductMembersCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersCreateWithoutProductInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccessibleProductsInputSchema),
}).strict();

export const ProductMembersUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUncheckedCreateWithoutProductInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  user_id: z.string(),
}).strict();

export const ProductMembersCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => ProductMembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ProductMembersCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.ProductMembersCreateManyProductInputEnvelope> = z.object({
  data: z.lazy(() => ProductMembersCreateManyProductInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeatingConfigUpsertWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigUpsertWithoutPublisherInput> = z.object({
  update: z.union([ z.lazy(() => SeatingConfigUpdateWithoutPublisherInputSchema),z.lazy(() => SeatingConfigUncheckedUpdateWithoutPublisherInputSchema) ]),
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutPublisherInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutPublisherInputSchema) ]),
}).strict();

export const SeatingConfigUpdateWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigUpdateWithoutPublisherInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedUpdateWithoutPublisherInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedUpdateWithoutPublisherInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const UserUpsertWithoutProductsInputSchema: z.ZodType<Prisma.UserUpsertWithoutProductsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema) ]),
}).strict();

export const UserUpdateWithoutProductsInputSchema: z.ZodType<Prisma.UserUpdateWithoutProductsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProductsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const ProductMembersUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ProductMembersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductMembersUpdateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ProductMembersUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ProductMembersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductMembersUpdateWithoutProductInputSchema),z.lazy(() => ProductMembersUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const ProductMembersUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => ProductMembersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductMembersUpdateManyMutationInputSchema),z.lazy(() => ProductMembersUncheckedUpdateManyWithoutMembersInputSchema) ]),
}).strict();

export const ProductMembersScalarWhereInputSchema: z.ZodType<Prisma.ProductMembersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductMembersScalarWhereInputSchema),z.lazy(() => ProductMembersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductMembersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductMembersScalarWhereInputSchema),z.lazy(() => ProductMembersScalarWhereInputSchema).array() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProductCreateWithoutMembersInputSchema: z.ZodType<Prisma.ProductCreateWithoutMembersInput> = z.object({
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

export const ProductUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutMembersInput> = z.object({
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

export const ProductCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutMembersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserCreateWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccessibleProductsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccessibleProductsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccessibleProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccessibleProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessibleProductsInputSchema) ]),
}).strict();

export const ProductUpsertWithoutMembersInputSchema: z.ZodType<Prisma.ProductUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutMembersInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutMembersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const ProductUpdateWithoutMembersInputSchema: z.ZodType<Prisma.ProductUpdateWithoutMembersInput> = z.object({
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccessibleProductsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccessibleProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccessibleProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccessibleProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessibleProductsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccessibleProductsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccessibleProductsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const ProductCreateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductCreateWithoutSeatingConfigInput> = z.object({
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
  members: z.lazy(() => ProductMembersCreateNestedManyWithoutProductInputSchema).optional(),
}).strict();

export const ProductUncheckedCreateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutSeatingConfigInput> = z.object({
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
  members: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
}).strict();

export const ProductCreateOrConnectWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutSeatingConfigInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema) ]),
}).strict();

export const SubscriptionCreateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionCreateWithoutSeatingConfigInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutSeatingConfigInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedCreateNestedOneWithoutSubscriptionInputSchema).optional(),
}).strict();

export const SubscriptionCreateOrConnectWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutSeatingConfigInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema) ]),
}).strict();

export const ProductUpsertWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductUpsertWithoutSeatingConfigInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutSeatingConfigInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutSeatingConfigInputSchema),z.lazy(() => ProductUncheckedCreateWithoutSeatingConfigInputSchema) ]),
}).strict();

export const ProductUpdateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductUpdateWithoutSeatingConfigInput> = z.object({
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  members: z.lazy(() => ProductMembersUpdateManyWithoutProductNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutSeatingConfigInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
}).strict();

export const SubscriptionUpsertWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithoutSeatingConfigInput> = z.object({
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatingConfigInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatingConfigInputSchema) ]),
}).strict();

export const SubscriptionUpdateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithoutSeatingConfigInput> = z.object({
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedUpdateWithoutSeatingConfigInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutSeatingConfigInput> = z.object({
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatSummary: z.lazy(() => SeatSummaryUncheckedUpdateOneWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SeatCreateWithoutOccupantInputSchema: z.ZodType<Prisma.SeatCreateWithoutOccupantInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUncheckedCreateWithoutOccupantInputSchema: z.ZodType<Prisma.SeatUncheckedCreateWithoutOccupantInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatCreateOrConnectWithoutOccupantInputSchema: z.ZodType<Prisma.SeatCreateOrConnectWithoutOccupantInput> = z.object({
  where: z.lazy(() => SeatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatCreateWithoutOccupantInputSchema),z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema) ]),
}).strict();

export const SeatUpsertWithoutOccupantInputSchema: z.ZodType<Prisma.SeatUpsertWithoutOccupantInput> = z.object({
  update: z.union([ z.lazy(() => SeatUpdateWithoutOccupantInputSchema),z.lazy(() => SeatUncheckedUpdateWithoutOccupantInputSchema) ]),
  create: z.union([ z.lazy(() => SeatCreateWithoutOccupantInputSchema),z.lazy(() => SeatUncheckedCreateWithoutOccupantInputSchema) ]),
}).strict();

export const SeatUpdateWithoutOccupantInputSchema: z.ZodType<Prisma.SeatUpdateWithoutOccupantInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatUncheckedUpdateWithoutOccupantInputSchema: z.ZodType<Prisma.SeatUncheckedUpdateWithoutOccupantInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.lazy(() => SeatReservationUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatCreateWithoutReservationInputSchema: z.ZodType<Prisma.SeatCreateWithoutReservationInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
  occupant: z.lazy(() => SeatOccupantCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatUncheckedCreateWithoutReservationInputSchema: z.ZodType<Prisma.SeatUncheckedCreateWithoutReservationInput> = z.object({
  id: z.string(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  subscription_id: z.string().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  seat_type: z.lazy(() => SeatTypeSchema),
  expires_utc: z.coerce.date().optional().nullable(),
  redeemed_utc: z.coerce.date().optional().nullable(),
  occupant: z.lazy(() => SeatOccupantUncheckedCreateNestedOneWithoutSeatInputSchema).optional(),
}).strict();

export const SeatCreateOrConnectWithoutReservationInputSchema: z.ZodType<Prisma.SeatCreateOrConnectWithoutReservationInput> = z.object({
  where: z.lazy(() => SeatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatCreateWithoutReservationInputSchema),z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema) ]),
}).strict();

export const SeatUpsertWithoutReservationInputSchema: z.ZodType<Prisma.SeatUpsertWithoutReservationInput> = z.object({
  update: z.union([ z.lazy(() => SeatUpdateWithoutReservationInputSchema),z.lazy(() => SeatUncheckedUpdateWithoutReservationInputSchema) ]),
  create: z.union([ z.lazy(() => SeatCreateWithoutReservationInputSchema),z.lazy(() => SeatUncheckedCreateWithoutReservationInputSchema) ]),
}).strict();

export const SeatUpdateWithoutReservationInputSchema: z.ZodType<Prisma.SeatUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupant: z.lazy(() => SeatOccupantUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SeatUncheckedUpdateWithoutReservationInputSchema: z.ZodType<Prisma.SeatUncheckedUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_type: z.union([ z.lazy(() => SeatTypeSchema),z.lazy(() => EnumSeatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redeemed_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupant: z.lazy(() => SeatOccupantUncheckedUpdateOneWithoutSeatNestedInputSchema).optional(),
}).strict();

export const SubscriptionCreateWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionCreateWithoutSeatSummaryInput> = z.object({
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigCreateNestedOneWithoutSubscriptionInputSchema),
}).strict();

export const SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutSeatSummaryInput> = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().optional().nullable(),
  created_utc: z.coerce.date().optional().nullable(),
  tenant_id: z.string().optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.string().optional().nullable(),
  tenant_name: z.string().optional().nullable(),
  offer_id: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
  state: z.lazy(() => SubscriptionStateSchema),
  admin_role_name: z.string().optional().nullable(),
  user_role_name: z.string().optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.string().optional().nullable(),
  admin_email: z.string().optional().nullable(),
  total_seats: z.number().optional().nullable(),
  is_being_configured: z.boolean().optional().nullable(),
  is_free_trial: z.boolean().optional().nullable(),
  is_test_subscription: z.boolean().optional().nullable(),
  state_last_updated_utc: z.coerce.date().optional().nullable(),
}).strict();

export const SubscriptionCreateOrConnectWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutSeatSummaryInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema) ]),
}).strict();

export const SubscriptionUpsertWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithoutSeatSummaryInput> = z.object({
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutSeatSummaryInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutSeatSummaryInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutSeatSummaryInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutSeatSummaryInputSchema) ]),
}).strict();

export const SubscriptionUpdateWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithoutSeatSummaryInput> = z.object({
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutSubscriptionNestedInputSchema).optional(),
}).strict();

export const SubscriptionUncheckedUpdateWithoutSeatSummaryInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutSeatSummaryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber_info: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  source_subscription: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  subscription_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plan_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => SubscriptionStateSchema),z.lazy(() => EnumSubscriptionStateFieldUpdateOperationsInputSchema) ]).optional(),
  admin_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_role_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  management_urls: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  admin_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  total_seats: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_being_configured: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_free_trial: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_subscription: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_last_updated_utc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatReservationCreateWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationCreateWithoutSeatInput> = z.object({
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationUncheckedCreateWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationUncheckedCreateWithoutSeatInput> = z.object({
  tenant_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  invite_url: z.string().optional().nullable(),
}).strict();

export const SeatReservationCreateOrConnectWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationCreateOrConnectWithoutSeatInput> = z.object({
  where: z.lazy(() => SeatReservationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatReservationCreateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema) ]),
}).strict();

export const SeatOccupantCreateWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantCreateWithoutSeatInput> = z.object({
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantUncheckedCreateWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedCreateWithoutSeatInput> = z.object({
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
}).strict();

export const SeatOccupantCreateOrConnectWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantCreateOrConnectWithoutSeatInput> = z.object({
  where: z.lazy(() => SeatOccupantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema) ]),
}).strict();

export const SeatReservationUpsertWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationUpsertWithoutSeatInput> = z.object({
  update: z.union([ z.lazy(() => SeatReservationUpdateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedUpdateWithoutSeatInputSchema) ]),
  create: z.union([ z.lazy(() => SeatReservationCreateWithoutSeatInputSchema),z.lazy(() => SeatReservationUncheckedCreateWithoutSeatInputSchema) ]),
}).strict();

export const SeatReservationUpdateWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationUpdateWithoutSeatInput> = z.object({
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invite_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatReservationUncheckedUpdateWithoutSeatInputSchema: z.ZodType<Prisma.SeatReservationUncheckedUpdateWithoutSeatInput> = z.object({
  tenant_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invite_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatOccupantUpsertWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantUpsertWithoutSeatInput> = z.object({
  update: z.union([ z.lazy(() => SeatOccupantUpdateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedUpdateWithoutSeatInputSchema) ]),
  create: z.union([ z.lazy(() => SeatOccupantCreateWithoutSeatInputSchema),z.lazy(() => SeatOccupantUncheckedCreateWithoutSeatInputSchema) ]),
}).strict();

export const SeatOccupantUpdateWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantUpdateWithoutSeatInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatOccupantUncheckedUpdateWithoutSeatInputSchema: z.ZodType<Prisma.SeatOccupantUncheckedUpdateWithoutSeatInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SeatingConfigCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigCreateWithoutSubscriptionInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  publisher: z.lazy(() => ProductCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedCreateWithoutSubscriptionInput> = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.lazy(() => SeatingStrategyNameSchema),
  low_seat_warning_level_pct: z.number().optional().nullable(),
  limited_overflow_seating_enabled: z.boolean().optional().nullable(),
  seat_reservation_expiry_in_days: z.number().optional().nullable(),
  default_seat_expiry_in_days: z.number().optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedCreateNestedOneWithoutSeatingConfigInputSchema).optional(),
}).strict();

export const SeatingConfigCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigCreateOrConnectWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => SeatingConfigWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema) ]),
}).strict();

export const SeatSummaryCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryCreateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.number(),
  limited_seat_count: z.number(),
}).strict();

export const SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedCreateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.number(),
  limited_seat_count: z.number(),
}).strict();

export const SeatSummaryCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryCreateOrConnectWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => SeatSummaryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema) ]),
}).strict();

export const SeatingConfigUpsertWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigUpsertWithoutSubscriptionInput> = z.object({
  update: z.union([ z.lazy(() => SeatingConfigUpdateWithoutSubscriptionInputSchema),z.lazy(() => SeatingConfigUncheckedUpdateWithoutSubscriptionInputSchema) ]),
  create: z.union([ z.lazy(() => SeatingConfigCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatingConfigUncheckedCreateWithoutSubscriptionInputSchema) ]),
}).strict();

export const SeatingConfigUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigUpdateWithoutSubscriptionInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publisher: z.lazy(() => ProductUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatingConfigUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatingConfigUncheckedUpdateWithoutSubscriptionInput> = z.object({
  owner_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  default_low_seat_warning_level_percent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  seating_strategy_name: z.union([ z.lazy(() => SeatingStrategyNameSchema),z.lazy(() => EnumSeatingStrategyNameFieldUpdateOperationsInputSchema) ]).optional(),
  low_seat_warning_level_pct: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  limited_overflow_seating_enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seat_reservation_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  default_seat_expiry_in_days: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publisher: z.lazy(() => ProductUncheckedUpdateOneWithoutSeatingConfigNestedInputSchema).optional(),
}).strict();

export const SeatSummaryUpsertWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryUpsertWithoutSubscriptionInput> = z.object({
  update: z.union([ z.lazy(() => SeatSummaryUpdateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema) ]),
  create: z.union([ z.lazy(() => SeatSummaryCreateWithoutSubscriptionInputSchema),z.lazy(() => SeatSummaryUncheckedCreateWithoutSubscriptionInputSchema) ]),
}).strict();

export const SeatSummaryUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryUpdateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited_seat_count: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SeatSummaryUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.SeatSummaryUncheckedUpdateWithoutSubscriptionInput> = z.object({
  standard_seat_count: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  limited_seat_count: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
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

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
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

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => AccountCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => SessionCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductCreateWithoutOwnerInputSchema: z.ZodType<Prisma.ProductCreateWithoutOwnerInput> = z.object({
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
  members: z.lazy(() => ProductMembersCreateNestedManyWithoutProductInputSchema).optional(),
}).strict();

export const ProductUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutOwnerInput> = z.object({
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
  members: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
}).strict();

export const ProductCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const ProductCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyOwnerInputEnvelope> = z.object({
  data: z.lazy(() => ProductCreateManyOwnerInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CredentialCreateWithoutUserInputSchema: z.ZodType<Prisma.CredentialCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  transports: z.lazy(() => CredentialTransportsCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  transports: z.lazy(() => CredentialTransportsUncheckedCreateNestedManyWithoutCredentialInputSchema).optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CredentialCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CredentialCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CredentialCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => CredentialCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductMembersCreateWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersCreateWithoutUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutMembersInputSchema),
}).strict();

export const ProductMembersUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUncheckedCreateWithoutUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  product_id: z.string(),
}).strict();

export const ProductMembersCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProductMembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProductMembersCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ProductMembersCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ProductMembersCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutOwnerInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutProductsInputSchema) ]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publisher_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  home_page_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_page_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_sales_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_sales_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_support_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact_support_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_setup_complete: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  on_access_denied_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_access_granted_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CredentialUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CredentialUpdateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CredentialUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CredentialUpdateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CredentialUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CredentialUpdateManyMutationInputSchema),z.lazy(() => CredentialUncheckedUpdateManyWithoutCredentialsInputSchema) ]),
}).strict();

export const CredentialScalarWhereInputSchema: z.ZodType<Prisma.CredentialScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicKey: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  signCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductMembersUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProductMembersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductMembersUpdateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductMembersCreateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProductMembersUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProductMembersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductMembersUpdateWithoutUserInputSchema),z.lazy(() => ProductMembersUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ProductMembersUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProductMembersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductMembersUpdateManyMutationInputSchema),z.lazy(() => ProductMembersUncheckedUpdateManyWithoutAccessibleProductsInputSchema) ]),
}).strict();

export const CredentialCreateWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialCreateWithoutTransportsInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCredentialsInputSchema),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialUncheckedCreateWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateWithoutTransportsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CredentialCreateOrConnectWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialCreateOrConnectWithoutTransportsInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CredentialCreateWithoutTransportsInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema) ]),
}).strict();

export const CredentialUpsertWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialUpsertWithoutTransportsInput> = z.object({
  update: z.union([ z.lazy(() => CredentialUpdateWithoutTransportsInputSchema),z.lazy(() => CredentialUncheckedUpdateWithoutTransportsInputSchema) ]),
  create: z.union([ z.lazy(() => CredentialCreateWithoutTransportsInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutTransportsInputSchema) ]),
}).strict();

export const CredentialUpdateWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialUpdateWithoutTransportsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCredentialsNestedInputSchema).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialUncheckedUpdateWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateWithoutTransportsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserCreateWithoutCredentialsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutOwnerInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCredentialsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutCredentialsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCredentialsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]),
}).strict();

export const CredentialTransportsCreateWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsCreateWithoutCredentialInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUncheckedCreateWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedCreateWithoutCredentialInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsCreateOrConnectWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsCreateOrConnectWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema) ]),
}).strict();

export const CredentialTransportsCreateManyCredentialInputEnvelopeSchema: z.ZodType<Prisma.CredentialTransportsCreateManyCredentialInputEnvelope> = z.object({
  data: z.lazy(() => CredentialTransportsCreateManyCredentialInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCredentialsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCredentialsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutOwnerNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCredentialsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  accessibleProducts: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUpsertWithWhereUniqueWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CredentialTransportsUpdateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedUpdateWithoutCredentialInputSchema) ]),
  create: z.union([ z.lazy(() => CredentialTransportsCreateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedCreateWithoutCredentialInputSchema) ]),
}).strict();

export const CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUpdateWithWhereUniqueWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CredentialTransportsUpdateWithoutCredentialInputSchema),z.lazy(() => CredentialTransportsUncheckedUpdateWithoutCredentialInputSchema) ]),
}).strict();

export const CredentialTransportsUpdateManyWithWhereWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUpdateManyWithWhereWithoutCredentialInput> = z.object({
  where: z.lazy(() => CredentialTransportsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CredentialTransportsUpdateManyMutationInputSchema),z.lazy(() => CredentialTransportsUncheckedUpdateManyWithoutTransportsInputSchema) ]),
}).strict();

export const CredentialTransportsScalarWhereInputSchema: z.ZodType<Prisma.CredentialTransportsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialTransportsScalarWhereInputSchema),z.lazy(() => CredentialTransportsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialTransportsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialTransportsScalarWhereInputSchema),z.lazy(() => CredentialTransportsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transport: z.union([ z.lazy(() => EnumAuthenticatorTransportFilterSchema),z.lazy(() => AuthenticatorTransportSchema) ]).optional(),
}).strict();

export const ProductMembersCreateManyProductInputSchema: z.ZodType<Prisma.ProductMembersCreateManyProductInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  user_id: z.string(),
}).strict();

export const ProductMembersUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUpdateWithoutProductInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccessibleProductsNestedInputSchema).optional(),
}).strict();

export const ProductMembersUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateWithoutProductInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductMembersUncheckedUpdateManyWithoutMembersInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateManyWithoutMembersInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
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

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
}).strict();

export const ProductCreateManyOwnerInputSchema: z.ZodType<Prisma.ProductCreateManyOwnerInput> = z.object({
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

export const CredentialCreateManyUserInputSchema: z.ZodType<Prisma.CredentialCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicKey: z.instanceof(Buffer),
  signCount: z.number().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const ProductMembersCreateManyUserInputSchema: z.ZodType<Prisma.ProductMembersCreateManyUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  product_id: z.string(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUpdateWithoutOwnerInput> = z.object({
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingConfig: z.lazy(() => SeatingConfigUpdateOneRequiredWithoutPublisherNestedInputSchema).optional(),
  members: z.lazy(() => ProductMembersUpdateManyWithoutProductNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => ProductMembersUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutProductsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publisher_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  home_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privacy_notice_page_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_sales_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact_support_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_setup_complete: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_denied_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_access_granted_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_seat_available_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_ready_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_canceled_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_suspended_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_subscription_not_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  on_no_subscriptions_found_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CredentialUpdateWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.lazy(() => CredentialTransportsUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.lazy(() => CredentialTransportsUncheckedUpdateManyWithoutCredentialNestedInputSchema).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyWithoutCredentialsInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateManyWithoutCredentialsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicKey: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  signCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductMembersUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUpdateWithoutUserInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
}).strict();

export const ProductMembersUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateWithoutUserInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductMembersUncheckedUpdateManyWithoutAccessibleProductsInputSchema: z.ZodType<Prisma.ProductMembersUncheckedUpdateManyWithoutAccessibleProductsInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsCreateManyCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsCreateManyCredentialInput> = z.object({
  transport: z.lazy(() => AuthenticatorTransportSchema),
}).strict();

export const CredentialTransportsUpdateWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUpdateWithoutCredentialInput> = z.object({
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateWithoutCredentialInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedUpdateWithoutCredentialInput> = z.object({
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialTransportsUncheckedUpdateManyWithoutTransportsInputSchema: z.ZodType<Prisma.CredentialTransportsUncheckedUpdateManyWithoutTransportsInput> = z.object({
  transport: z.union([ z.lazy(() => AuthenticatorTransportSchema),z.lazy(() => EnumAuthenticatorTransportFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(),ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductMembersFindFirstArgsSchema: z.ZodType<Prisma.ProductMembersFindFirstArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereInputSchema.optional(),
  orderBy: z.union([ ProductMembersOrderByWithRelationInputSchema.array(),ProductMembersOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductMembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductMembersScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProductMembersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductMembersFindFirstOrThrowArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereInputSchema.optional(),
  orderBy: z.union([ ProductMembersOrderByWithRelationInputSchema.array(),ProductMembersOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductMembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductMembersScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProductMembersFindManyArgsSchema: z.ZodType<Prisma.ProductMembersFindManyArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereInputSchema.optional(),
  orderBy: z.union([ ProductMembersOrderByWithRelationInputSchema.array(),ProductMembersOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductMembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProductMembersScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProductMembersAggregateArgsSchema: z.ZodType<Prisma.ProductMembersAggregateArgs> = z.object({
  where: ProductMembersWhereInputSchema.optional(),
  orderBy: z.union([ ProductMembersOrderByWithRelationInputSchema.array(),ProductMembersOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductMembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductMembersGroupByArgsSchema: z.ZodType<Prisma.ProductMembersGroupByArgs> = z.object({
  where: ProductMembersWhereInputSchema.optional(),
  orderBy: z.union([ ProductMembersOrderByWithAggregationInputSchema.array(),ProductMembersOrderByWithAggregationInputSchema ]).optional(),
  by: ProductMembersScalarFieldEnumSchema.array(),
  having: ProductMembersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductMembersFindUniqueArgsSchema: z.ZodType<Prisma.ProductMembersFindUniqueArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereUniqueInputSchema,
}).strict()

export const ProductMembersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductMembersFindUniqueOrThrowArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereUniqueInputSchema,
}).strict()

export const SeatingConfigFindFirstArgsSchema: z.ZodType<Prisma.SeatingConfigFindFirstArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([ SeatingConfigOrderByWithRelationInputSchema.array(),SeatingConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatingConfigScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatingConfigFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeatingConfigFindFirstOrThrowArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([ SeatingConfigOrderByWithRelationInputSchema.array(),SeatingConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatingConfigScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatingConfigFindManyArgsSchema: z.ZodType<Prisma.SeatingConfigFindManyArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([ SeatingConfigOrderByWithRelationInputSchema.array(),SeatingConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatingConfigScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatingConfigAggregateArgsSchema: z.ZodType<Prisma.SeatingConfigAggregateArgs> = z.object({
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([ SeatingConfigOrderByWithRelationInputSchema.array(),SeatingConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatingConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatingConfigGroupByArgsSchema: z.ZodType<Prisma.SeatingConfigGroupByArgs> = z.object({
  where: SeatingConfigWhereInputSchema.optional(),
  orderBy: z.union([ SeatingConfigOrderByWithAggregationInputSchema.array(),SeatingConfigOrderByWithAggregationInputSchema ]).optional(),
  by: SeatingConfigScalarFieldEnumSchema.array(),
  having: SeatingConfigScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatingConfigFindUniqueArgsSchema: z.ZodType<Prisma.SeatingConfigFindUniqueArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict()

export const SeatingConfigFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeatingConfigFindUniqueOrThrowArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict()

export const SeatOccupantFindFirstArgsSchema: z.ZodType<Prisma.SeatOccupantFindFirstArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([ SeatOccupantOrderByWithRelationInputSchema.array(),SeatOccupantOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatOccupantScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatOccupantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeatOccupantFindFirstOrThrowArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([ SeatOccupantOrderByWithRelationInputSchema.array(),SeatOccupantOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatOccupantScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatOccupantFindManyArgsSchema: z.ZodType<Prisma.SeatOccupantFindManyArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([ SeatOccupantOrderByWithRelationInputSchema.array(),SeatOccupantOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatOccupantScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatOccupantAggregateArgsSchema: z.ZodType<Prisma.SeatOccupantAggregateArgs> = z.object({
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([ SeatOccupantOrderByWithRelationInputSchema.array(),SeatOccupantOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatOccupantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatOccupantGroupByArgsSchema: z.ZodType<Prisma.SeatOccupantGroupByArgs> = z.object({
  where: SeatOccupantWhereInputSchema.optional(),
  orderBy: z.union([ SeatOccupantOrderByWithAggregationInputSchema.array(),SeatOccupantOrderByWithAggregationInputSchema ]).optional(),
  by: SeatOccupantScalarFieldEnumSchema.array(),
  having: SeatOccupantScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatOccupantFindUniqueArgsSchema: z.ZodType<Prisma.SeatOccupantFindUniqueArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict()

export const SeatOccupantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeatOccupantFindUniqueOrThrowArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict()

export const SeatReservationFindFirstArgsSchema: z.ZodType<Prisma.SeatReservationFindFirstArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([ SeatReservationOrderByWithRelationInputSchema.array(),SeatReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatReservationScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatReservationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeatReservationFindFirstOrThrowArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([ SeatReservationOrderByWithRelationInputSchema.array(),SeatReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatReservationScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatReservationFindManyArgsSchema: z.ZodType<Prisma.SeatReservationFindManyArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([ SeatReservationOrderByWithRelationInputSchema.array(),SeatReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatReservationScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatReservationAggregateArgsSchema: z.ZodType<Prisma.SeatReservationAggregateArgs> = z.object({
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([ SeatReservationOrderByWithRelationInputSchema.array(),SeatReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatReservationGroupByArgsSchema: z.ZodType<Prisma.SeatReservationGroupByArgs> = z.object({
  where: SeatReservationWhereInputSchema.optional(),
  orderBy: z.union([ SeatReservationOrderByWithAggregationInputSchema.array(),SeatReservationOrderByWithAggregationInputSchema ]).optional(),
  by: SeatReservationScalarFieldEnumSchema.array(),
  having: SeatReservationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatReservationFindUniqueArgsSchema: z.ZodType<Prisma.SeatReservationFindUniqueArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
}).strict()

export const SeatReservationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeatReservationFindUniqueOrThrowArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
}).strict()

export const SeatSummaryFindFirstArgsSchema: z.ZodType<Prisma.SeatSummaryFindFirstArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([ SeatSummaryOrderByWithRelationInputSchema.array(),SeatSummaryOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatSummaryScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatSummaryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeatSummaryFindFirstOrThrowArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([ SeatSummaryOrderByWithRelationInputSchema.array(),SeatSummaryOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatSummaryScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatSummaryFindManyArgsSchema: z.ZodType<Prisma.SeatSummaryFindManyArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([ SeatSummaryOrderByWithRelationInputSchema.array(),SeatSummaryOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatSummaryScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatSummaryAggregateArgsSchema: z.ZodType<Prisma.SeatSummaryAggregateArgs> = z.object({
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([ SeatSummaryOrderByWithRelationInputSchema.array(),SeatSummaryOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatSummaryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatSummaryGroupByArgsSchema: z.ZodType<Prisma.SeatSummaryGroupByArgs> = z.object({
  where: SeatSummaryWhereInputSchema.optional(),
  orderBy: z.union([ SeatSummaryOrderByWithAggregationInputSchema.array(),SeatSummaryOrderByWithAggregationInputSchema ]).optional(),
  by: SeatSummaryScalarFieldEnumSchema.array(),
  having: SeatSummaryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatSummaryFindUniqueArgsSchema: z.ZodType<Prisma.SeatSummaryFindUniqueArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict()

export const SeatSummaryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeatSummaryFindUniqueOrThrowArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict()

export const SeatFindFirstArgsSchema: z.ZodType<Prisma.SeatFindFirstArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([ SeatOrderByWithRelationInputSchema.array(),SeatOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeatFindFirstOrThrowArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([ SeatOrderByWithRelationInputSchema.array(),SeatOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatFindManyArgsSchema: z.ZodType<Prisma.SeatFindManyArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([ SeatOrderByWithRelationInputSchema.array(),SeatOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SeatScalarFieldEnumSchema.array().optional(),
}).strict()

export const SeatAggregateArgsSchema: z.ZodType<Prisma.SeatAggregateArgs> = z.object({
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([ SeatOrderByWithRelationInputSchema.array(),SeatOrderByWithRelationInputSchema ]).optional(),
  cursor: SeatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatGroupByArgsSchema: z.ZodType<Prisma.SeatGroupByArgs> = z.object({
  where: SeatWhereInputSchema.optional(),
  orderBy: z.union([ SeatOrderByWithAggregationInputSchema.array(),SeatOrderByWithAggregationInputSchema ]).optional(),
  by: SeatScalarFieldEnumSchema.array(),
  having: SeatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SeatFindUniqueArgsSchema: z.ZodType<Prisma.SeatFindUniqueArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
}).strict()

export const SeatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeatFindUniqueOrThrowArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
}).strict()

export const SubscriptionFindFirstArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SubscriptionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SubscriptionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SubscriptionFindManyArgsSchema: z.ZodType<Prisma.SubscriptionFindManyArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SubscriptionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SubscriptionAggregateArgsSchema: z.ZodType<Prisma.SubscriptionAggregateArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SubscriptionGroupByArgsSchema: z.ZodType<Prisma.SubscriptionGroupByArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithAggregationInputSchema.array(),SubscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: SubscriptionScalarFieldEnumSchema.array(),
  having: SubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict()

export const SubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict()

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const CredentialTransportsFindFirstArgsSchema: z.ZodType<Prisma.CredentialTransportsFindFirstArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([ CredentialTransportsOrderByWithRelationInputSchema.array(),CredentialTransportsOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialTransportsScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialTransportsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CredentialTransportsFindFirstOrThrowArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([ CredentialTransportsOrderByWithRelationInputSchema.array(),CredentialTransportsOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialTransportsScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialTransportsFindManyArgsSchema: z.ZodType<Prisma.CredentialTransportsFindManyArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([ CredentialTransportsOrderByWithRelationInputSchema.array(),CredentialTransportsOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialTransportsScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialTransportsAggregateArgsSchema: z.ZodType<Prisma.CredentialTransportsAggregateArgs> = z.object({
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([ CredentialTransportsOrderByWithRelationInputSchema.array(),CredentialTransportsOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialTransportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CredentialTransportsGroupByArgsSchema: z.ZodType<Prisma.CredentialTransportsGroupByArgs> = z.object({
  where: CredentialTransportsWhereInputSchema.optional(),
  orderBy: z.union([ CredentialTransportsOrderByWithAggregationInputSchema.array(),CredentialTransportsOrderByWithAggregationInputSchema ]).optional(),
  by: CredentialTransportsScalarFieldEnumSchema.array(),
  having: CredentialTransportsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CredentialTransportsFindUniqueArgsSchema: z.ZodType<Prisma.CredentialTransportsFindUniqueArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict()

export const CredentialTransportsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CredentialTransportsFindUniqueOrThrowArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict()

export const CredentialFindFirstArgsSchema: z.ZodType<Prisma.CredentialFindFirstArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CredentialFindFirstOrThrowArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialFindManyArgsSchema: z.ZodType<Prisma.CredentialFindManyArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialAggregateArgsSchema: z.ZodType<Prisma.CredentialAggregateArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CredentialGroupByArgsSchema: z.ZodType<Prisma.CredentialGroupByArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithAggregationInputSchema.array(),CredentialOrderByWithAggregationInputSchema ]).optional(),
  by: CredentialScalarFieldEnumSchema.array(),
  having: CredentialScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CredentialFindUniqueArgsSchema: z.ZodType<Prisma.CredentialFindUniqueArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict()

export const CredentialFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CredentialFindUniqueOrThrowArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict()

export const CredentialChallengeFindFirstArgsSchema: z.ZodType<Prisma.CredentialChallengeFindFirstArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([ CredentialChallengeOrderByWithRelationInputSchema.array(),CredentialChallengeOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialChallengeScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialChallengeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CredentialChallengeFindFirstOrThrowArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([ CredentialChallengeOrderByWithRelationInputSchema.array(),CredentialChallengeOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialChallengeScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialChallengeFindManyArgsSchema: z.ZodType<Prisma.CredentialChallengeFindManyArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([ CredentialChallengeOrderByWithRelationInputSchema.array(),CredentialChallengeOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CredentialChallengeScalarFieldEnumSchema.array().optional(),
}).strict()

export const CredentialChallengeAggregateArgsSchema: z.ZodType<Prisma.CredentialChallengeAggregateArgs> = z.object({
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([ CredentialChallengeOrderByWithRelationInputSchema.array(),CredentialChallengeOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialChallengeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CredentialChallengeGroupByArgsSchema: z.ZodType<Prisma.CredentialChallengeGroupByArgs> = z.object({
  where: CredentialChallengeWhereInputSchema.optional(),
  orderBy: z.union([ CredentialChallengeOrderByWithAggregationInputSchema.array(),CredentialChallengeOrderByWithAggregationInputSchema ]).optional(),
  by: CredentialChallengeScalarFieldEnumSchema.array(),
  having: CredentialChallengeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CredentialChallengeFindUniqueArgsSchema: z.ZodType<Prisma.CredentialChallengeFindUniqueArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict()

export const CredentialChallengeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CredentialChallengeFindUniqueOrThrowArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
}).strict()

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
}).strict()

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: ProductCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
}).strict()

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
}).strict()

export const ProductMembersCreateArgsSchema: z.ZodType<Prisma.ProductMembersCreateArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  data: z.union([ ProductMembersCreateInputSchema,ProductMembersUncheckedCreateInputSchema ]),
}).strict()

export const ProductMembersUpsertArgsSchema: z.ZodType<Prisma.ProductMembersUpsertArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereUniqueInputSchema,
  create: z.union([ ProductMembersCreateInputSchema,ProductMembersUncheckedCreateInputSchema ]),
  update: z.union([ ProductMembersUpdateInputSchema,ProductMembersUncheckedUpdateInputSchema ]),
}).strict()

export const ProductMembersCreateManyArgsSchema: z.ZodType<Prisma.ProductMembersCreateManyArgs> = z.object({
  data: ProductMembersCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProductMembersDeleteArgsSchema: z.ZodType<Prisma.ProductMembersDeleteArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  where: ProductMembersWhereUniqueInputSchema,
}).strict()

export const ProductMembersUpdateArgsSchema: z.ZodType<Prisma.ProductMembersUpdateArgs> = z.object({
  select: ProductMembersSelectSchema.optional(),
  include: ProductMembersIncludeSchema.optional(),
  data: z.union([ ProductMembersUpdateInputSchema,ProductMembersUncheckedUpdateInputSchema ]),
  where: ProductMembersWhereUniqueInputSchema,
}).strict()

export const ProductMembersUpdateManyArgsSchema: z.ZodType<Prisma.ProductMembersUpdateManyArgs> = z.object({
  data: z.union([ ProductMembersUpdateManyMutationInputSchema,ProductMembersUncheckedUpdateManyInputSchema ]),
  where: ProductMembersWhereInputSchema.optional(),
}).strict()

export const ProductMembersDeleteManyArgsSchema: z.ZodType<Prisma.ProductMembersDeleteManyArgs> = z.object({
  where: ProductMembersWhereInputSchema.optional(),
}).strict()

export const SeatingConfigCreateArgsSchema: z.ZodType<Prisma.SeatingConfigCreateArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  data: z.union([ SeatingConfigCreateInputSchema,SeatingConfigUncheckedCreateInputSchema ]),
}).strict()

export const SeatingConfigUpsertArgsSchema: z.ZodType<Prisma.SeatingConfigUpsertArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
  create: z.union([ SeatingConfigCreateInputSchema,SeatingConfigUncheckedCreateInputSchema ]),
  update: z.union([ SeatingConfigUpdateInputSchema,SeatingConfigUncheckedUpdateInputSchema ]),
}).strict()

export const SeatingConfigCreateManyArgsSchema: z.ZodType<Prisma.SeatingConfigCreateManyArgs> = z.object({
  data: SeatingConfigCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SeatingConfigDeleteArgsSchema: z.ZodType<Prisma.SeatingConfigDeleteArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict()

export const SeatingConfigUpdateArgsSchema: z.ZodType<Prisma.SeatingConfigUpdateArgs> = z.object({
  select: SeatingConfigSelectSchema.optional(),
  include: SeatingConfigIncludeSchema.optional(),
  data: z.union([ SeatingConfigUpdateInputSchema,SeatingConfigUncheckedUpdateInputSchema ]),
  where: SeatingConfigWhereUniqueInputSchema,
}).strict()

export const SeatingConfigUpdateManyArgsSchema: z.ZodType<Prisma.SeatingConfigUpdateManyArgs> = z.object({
  data: z.union([ SeatingConfigUpdateManyMutationInputSchema,SeatingConfigUncheckedUpdateManyInputSchema ]),
  where: SeatingConfigWhereInputSchema.optional(),
}).strict()

export const SeatingConfigDeleteManyArgsSchema: z.ZodType<Prisma.SeatingConfigDeleteManyArgs> = z.object({
  where: SeatingConfigWhereInputSchema.optional(),
}).strict()

export const SeatOccupantCreateArgsSchema: z.ZodType<Prisma.SeatOccupantCreateArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  data: z.union([ SeatOccupantCreateInputSchema,SeatOccupantUncheckedCreateInputSchema ]),
}).strict()

export const SeatOccupantUpsertArgsSchema: z.ZodType<Prisma.SeatOccupantUpsertArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
  create: z.union([ SeatOccupantCreateInputSchema,SeatOccupantUncheckedCreateInputSchema ]),
  update: z.union([ SeatOccupantUpdateInputSchema,SeatOccupantUncheckedUpdateInputSchema ]),
}).strict()

export const SeatOccupantCreateManyArgsSchema: z.ZodType<Prisma.SeatOccupantCreateManyArgs> = z.object({
  data: SeatOccupantCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SeatOccupantDeleteArgsSchema: z.ZodType<Prisma.SeatOccupantDeleteArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict()

export const SeatOccupantUpdateArgsSchema: z.ZodType<Prisma.SeatOccupantUpdateArgs> = z.object({
  select: SeatOccupantSelectSchema.optional(),
  include: SeatOccupantIncludeSchema.optional(),
  data: z.union([ SeatOccupantUpdateInputSchema,SeatOccupantUncheckedUpdateInputSchema ]),
  where: SeatOccupantWhereUniqueInputSchema,
}).strict()

export const SeatOccupantUpdateManyArgsSchema: z.ZodType<Prisma.SeatOccupantUpdateManyArgs> = z.object({
  data: z.union([ SeatOccupantUpdateManyMutationInputSchema,SeatOccupantUncheckedUpdateManyInputSchema ]),
  where: SeatOccupantWhereInputSchema.optional(),
}).strict()

export const SeatOccupantDeleteManyArgsSchema: z.ZodType<Prisma.SeatOccupantDeleteManyArgs> = z.object({
  where: SeatOccupantWhereInputSchema.optional(),
}).strict()

export const SeatReservationCreateArgsSchema: z.ZodType<Prisma.SeatReservationCreateArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  data: z.union([ SeatReservationCreateInputSchema,SeatReservationUncheckedCreateInputSchema ]),
}).strict()

export const SeatReservationUpsertArgsSchema: z.ZodType<Prisma.SeatReservationUpsertArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
  create: z.union([ SeatReservationCreateInputSchema,SeatReservationUncheckedCreateInputSchema ]),
  update: z.union([ SeatReservationUpdateInputSchema,SeatReservationUncheckedUpdateInputSchema ]),
}).strict()

export const SeatReservationCreateManyArgsSchema: z.ZodType<Prisma.SeatReservationCreateManyArgs> = z.object({
  data: SeatReservationCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SeatReservationDeleteArgsSchema: z.ZodType<Prisma.SeatReservationDeleteArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  where: SeatReservationWhereUniqueInputSchema,
}).strict()

export const SeatReservationUpdateArgsSchema: z.ZodType<Prisma.SeatReservationUpdateArgs> = z.object({
  select: SeatReservationSelectSchema.optional(),
  include: SeatReservationIncludeSchema.optional(),
  data: z.union([ SeatReservationUpdateInputSchema,SeatReservationUncheckedUpdateInputSchema ]),
  where: SeatReservationWhereUniqueInputSchema,
}).strict()

export const SeatReservationUpdateManyArgsSchema: z.ZodType<Prisma.SeatReservationUpdateManyArgs> = z.object({
  data: z.union([ SeatReservationUpdateManyMutationInputSchema,SeatReservationUncheckedUpdateManyInputSchema ]),
  where: SeatReservationWhereInputSchema.optional(),
}).strict()

export const SeatReservationDeleteManyArgsSchema: z.ZodType<Prisma.SeatReservationDeleteManyArgs> = z.object({
  where: SeatReservationWhereInputSchema.optional(),
}).strict()

export const SeatSummaryCreateArgsSchema: z.ZodType<Prisma.SeatSummaryCreateArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  data: z.union([ SeatSummaryCreateInputSchema,SeatSummaryUncheckedCreateInputSchema ]),
}).strict()

export const SeatSummaryUpsertArgsSchema: z.ZodType<Prisma.SeatSummaryUpsertArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
  create: z.union([ SeatSummaryCreateInputSchema,SeatSummaryUncheckedCreateInputSchema ]),
  update: z.union([ SeatSummaryUpdateInputSchema,SeatSummaryUncheckedUpdateInputSchema ]),
}).strict()

export const SeatSummaryCreateManyArgsSchema: z.ZodType<Prisma.SeatSummaryCreateManyArgs> = z.object({
  data: SeatSummaryCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SeatSummaryDeleteArgsSchema: z.ZodType<Prisma.SeatSummaryDeleteArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict()

export const SeatSummaryUpdateArgsSchema: z.ZodType<Prisma.SeatSummaryUpdateArgs> = z.object({
  select: SeatSummarySelectSchema.optional(),
  include: SeatSummaryIncludeSchema.optional(),
  data: z.union([ SeatSummaryUpdateInputSchema,SeatSummaryUncheckedUpdateInputSchema ]),
  where: SeatSummaryWhereUniqueInputSchema,
}).strict()

export const SeatSummaryUpdateManyArgsSchema: z.ZodType<Prisma.SeatSummaryUpdateManyArgs> = z.object({
  data: z.union([ SeatSummaryUpdateManyMutationInputSchema,SeatSummaryUncheckedUpdateManyInputSchema ]),
  where: SeatSummaryWhereInputSchema.optional(),
}).strict()

export const SeatSummaryDeleteManyArgsSchema: z.ZodType<Prisma.SeatSummaryDeleteManyArgs> = z.object({
  where: SeatSummaryWhereInputSchema.optional(),
}).strict()

export const SeatCreateArgsSchema: z.ZodType<Prisma.SeatCreateArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  data: z.union([ SeatCreateInputSchema,SeatUncheckedCreateInputSchema ]),
}).strict()

export const SeatUpsertArgsSchema: z.ZodType<Prisma.SeatUpsertArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
  create: z.union([ SeatCreateInputSchema,SeatUncheckedCreateInputSchema ]),
  update: z.union([ SeatUpdateInputSchema,SeatUncheckedUpdateInputSchema ]),
}).strict()

export const SeatCreateManyArgsSchema: z.ZodType<Prisma.SeatCreateManyArgs> = z.object({
  data: SeatCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SeatDeleteArgsSchema: z.ZodType<Prisma.SeatDeleteArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  where: SeatWhereUniqueInputSchema,
}).strict()

export const SeatUpdateArgsSchema: z.ZodType<Prisma.SeatUpdateArgs> = z.object({
  select: SeatSelectSchema.optional(),
  include: SeatIncludeSchema.optional(),
  data: z.union([ SeatUpdateInputSchema,SeatUncheckedUpdateInputSchema ]),
  where: SeatWhereUniqueInputSchema,
}).strict()

export const SeatUpdateManyArgsSchema: z.ZodType<Prisma.SeatUpdateManyArgs> = z.object({
  data: z.union([ SeatUpdateManyMutationInputSchema,SeatUncheckedUpdateManyInputSchema ]),
  where: SeatWhereInputSchema.optional(),
}).strict()

export const SeatDeleteManyArgsSchema: z.ZodType<Prisma.SeatDeleteManyArgs> = z.object({
  where: SeatWhereInputSchema.optional(),
}).strict()

export const SubscriptionCreateArgsSchema: z.ZodType<Prisma.SubscriptionCreateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
}).strict()

export const SubscriptionUpsertArgsSchema: z.ZodType<Prisma.SubscriptionUpsertArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
  create: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
  update: z.union([ SubscriptionUpdateInputSchema,SubscriptionUncheckedUpdateInputSchema ]),
}).strict()

export const SubscriptionCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyArgs> = z.object({
  data: SubscriptionCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SubscriptionDeleteArgsSchema: z.ZodType<Prisma.SubscriptionDeleteArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict()

export const SubscriptionUpdateArgsSchema: z.ZodType<Prisma.SubscriptionUpdateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([ SubscriptionUpdateInputSchema,SubscriptionUncheckedUpdateInputSchema ]),
  where: SubscriptionWhereUniqueInputSchema,
}).strict()

export const SubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.SubscriptionUpdateManyArgs> = z.object({
  data: z.union([ SubscriptionUpdateManyMutationInputSchema,SubscriptionUncheckedUpdateManyInputSchema ]),
  where: SubscriptionWhereInputSchema.optional(),
}).strict()

export const SubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.SubscriptionDeleteManyArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: AccountCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: SessionCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const CredentialTransportsCreateArgsSchema: z.ZodType<Prisma.CredentialTransportsCreateArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  data: z.union([ CredentialTransportsCreateInputSchema,CredentialTransportsUncheckedCreateInputSchema ]),
}).strict()

export const CredentialTransportsUpsertArgsSchema: z.ZodType<Prisma.CredentialTransportsUpsertArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
  create: z.union([ CredentialTransportsCreateInputSchema,CredentialTransportsUncheckedCreateInputSchema ]),
  update: z.union([ CredentialTransportsUpdateInputSchema,CredentialTransportsUncheckedUpdateInputSchema ]),
}).strict()

export const CredentialTransportsCreateManyArgsSchema: z.ZodType<Prisma.CredentialTransportsCreateManyArgs> = z.object({
  data: CredentialTransportsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CredentialTransportsDeleteArgsSchema: z.ZodType<Prisma.CredentialTransportsDeleteArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict()

export const CredentialTransportsUpdateArgsSchema: z.ZodType<Prisma.CredentialTransportsUpdateArgs> = z.object({
  select: CredentialTransportsSelectSchema.optional(),
  include: CredentialTransportsIncludeSchema.optional(),
  data: z.union([ CredentialTransportsUpdateInputSchema,CredentialTransportsUncheckedUpdateInputSchema ]),
  where: CredentialTransportsWhereUniqueInputSchema,
}).strict()

export const CredentialTransportsUpdateManyArgsSchema: z.ZodType<Prisma.CredentialTransportsUpdateManyArgs> = z.object({
  data: z.union([ CredentialTransportsUpdateManyMutationInputSchema,CredentialTransportsUncheckedUpdateManyInputSchema ]),
  where: CredentialTransportsWhereInputSchema.optional(),
}).strict()

export const CredentialTransportsDeleteManyArgsSchema: z.ZodType<Prisma.CredentialTransportsDeleteManyArgs> = z.object({
  where: CredentialTransportsWhereInputSchema.optional(),
}).strict()

export const CredentialCreateArgsSchema: z.ZodType<Prisma.CredentialCreateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  data: z.union([ CredentialCreateInputSchema,CredentialUncheckedCreateInputSchema ]),
}).strict()

export const CredentialUpsertArgsSchema: z.ZodType<Prisma.CredentialUpsertArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
  create: z.union([ CredentialCreateInputSchema,CredentialUncheckedCreateInputSchema ]),
  update: z.union([ CredentialUpdateInputSchema,CredentialUncheckedUpdateInputSchema ]),
}).strict()

export const CredentialCreateManyArgsSchema: z.ZodType<Prisma.CredentialCreateManyArgs> = z.object({
  data: CredentialCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CredentialDeleteArgsSchema: z.ZodType<Prisma.CredentialDeleteArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict()

export const CredentialUpdateArgsSchema: z.ZodType<Prisma.CredentialUpdateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  data: z.union([ CredentialUpdateInputSchema,CredentialUncheckedUpdateInputSchema ]),
  where: CredentialWhereUniqueInputSchema,
}).strict()

export const CredentialUpdateManyArgsSchema: z.ZodType<Prisma.CredentialUpdateManyArgs> = z.object({
  data: z.union([ CredentialUpdateManyMutationInputSchema,CredentialUncheckedUpdateManyInputSchema ]),
  where: CredentialWhereInputSchema.optional(),
}).strict()

export const CredentialDeleteManyArgsSchema: z.ZodType<Prisma.CredentialDeleteManyArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
}).strict()

export const CredentialChallengeCreateArgsSchema: z.ZodType<Prisma.CredentialChallengeCreateArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  data: z.union([ CredentialChallengeCreateInputSchema,CredentialChallengeUncheckedCreateInputSchema ]),
}).strict()

export const CredentialChallengeUpsertArgsSchema: z.ZodType<Prisma.CredentialChallengeUpsertArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
  create: z.union([ CredentialChallengeCreateInputSchema,CredentialChallengeUncheckedCreateInputSchema ]),
  update: z.union([ CredentialChallengeUpdateInputSchema,CredentialChallengeUncheckedUpdateInputSchema ]),
}).strict()

export const CredentialChallengeCreateManyArgsSchema: z.ZodType<Prisma.CredentialChallengeCreateManyArgs> = z.object({
  data: CredentialChallengeCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CredentialChallengeDeleteArgsSchema: z.ZodType<Prisma.CredentialChallengeDeleteArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict()

export const CredentialChallengeUpdateArgsSchema: z.ZodType<Prisma.CredentialChallengeUpdateArgs> = z.object({
  select: CredentialChallengeSelectSchema.optional(),
  data: z.union([ CredentialChallengeUpdateInputSchema,CredentialChallengeUncheckedUpdateInputSchema ]),
  where: CredentialChallengeWhereUniqueInputSchema,
}).strict()

export const CredentialChallengeUpdateManyArgsSchema: z.ZodType<Prisma.CredentialChallengeUpdateManyArgs> = z.object({
  data: z.union([ CredentialChallengeUpdateManyMutationInputSchema,CredentialChallengeUncheckedUpdateManyInputSchema ]),
  where: CredentialChallengeWhereInputSchema.optional(),
}).strict()

export const CredentialChallengeDeleteManyArgsSchema: z.ZodType<Prisma.CredentialChallengeDeleteManyArgs> = z.object({
  where: CredentialChallengeWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: VerificationTokenCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()