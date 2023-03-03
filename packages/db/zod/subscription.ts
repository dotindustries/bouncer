import * as z from "zod"
import * as imports from "../zod-utils"
import { SubscriptionState } from "@prisma/client"
import { CompleteSeatingConfig, SeatingConfigModel, CompleteSeatSummary, SeatSummaryModel, CompleteProduct, ProductModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _SubscriptionModel = z.object({
  id: z.string(),
  product_id: z.string(),
  is_setup_complete: z.boolean().nullish(),
  created_utc: z.date().nullish(),
  tenant_id: z.string().nullish(),
  subscriber_info: jsonSchema,
  source_subscription: jsonSchema,
  subscription_name: z.string().nullish(),
  tenant_name: z.string().nullish(),
  offer_id: z.string().nullish(),
  plan_id: z.string().nullish(),
  state: z.nativeEnum(SubscriptionState),
  admin_role_name: z.string().nullish(),
  user_role_name: z.string().nullish(),
  management_urls: jsonSchema,
  admin_name: z.string().nullish(),
  admin_email: z.string().nullish(),
  total_seats: z.number().int().nullish(),
  is_being_configured: z.boolean().nullish(),
  is_free_trial: z.boolean().nullish(),
  is_test_subscription: z.boolean().nullish(),
  state_last_updated_utc: z.date().nullish(),
})

export interface CompleteSubscription extends z.infer<typeof _SubscriptionModel> {
  seatingConfig: CompleteSeatingConfig
  seatSummary?: CompleteSeatSummary | null
  product: CompleteProduct
}

/**
 * SubscriptionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SubscriptionModel: z.ZodSchema<CompleteSubscription> = z.lazy(() => _SubscriptionModel.extend({
  seatingConfig: SeatingConfigModel,
  seatSummary: SeatSummaryModel.nullish(),
  product: ProductModel,
}))
