import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteAccount, AccountModel, CompleteSession, SessionModel, CompleteProduct, ProductModel, CompleteCredential, CredentialModel, CompleteProductMembers, ProductMembersModel } from "./index"

export const _UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof _UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  products: CompleteProduct[]
  credentials: CompleteCredential[]
  accessibleProducts: CompleteProductMembers[]
}

/**
 * UserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const UserModel: z.ZodSchema<CompleteUser> = z.lazy(() => _UserModel.extend({
  accounts: AccountModel.array(),
  sessions: SessionModel.array(),
  products: ProductModel.array(),
  credentials: CredentialModel.array(),
  accessibleProducts: ProductMembersModel.array(),
}))
