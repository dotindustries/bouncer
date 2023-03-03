import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteSeatingConfig, SeatingConfigModel, CompleteUser, UserModel, CompleteProductMembers, ProductMembersModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _ProductModel = z.object({
  id: z.string(),
  owner_id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  billing_manager_email: z.string(),
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
  metadata: imports.productMetadata,
})

export interface CompleteProduct extends z.infer<typeof _ProductModel> {
  seatingConfig: CompleteSeatingConfig
  owner: CompleteUser
  members: CompleteProductMembers[]
}

/**
 * ProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const ProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => _ProductModel.extend({
  seatingConfig: SeatingConfigModel,
  owner: UserModel,
  members: ProductMembersModel.array(),
}))
