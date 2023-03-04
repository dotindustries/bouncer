import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteProduct, ProductModel, CompleteUser, UserModel } from "./index"

export const _ProductMembersModel = z.object({
  assignedAt: z.date(),
  product_id: z.string(),
  user_id: z.string(),
})

export interface CompleteProductMembers extends z.infer<typeof _ProductMembersModel> {
  product: CompleteProduct
  user: CompleteUser
}

/**
 * ProductMembersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const ProductMembersModel: z.ZodSchema<CompleteProductMembers> = z.lazy(() => _ProductMembersModel.extend({
  product: ProductModel,
  user: UserModel,
}))
