import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel, CompleteCredentialTransports, CredentialTransportsModel } from "./index"

export const _CredentialModel = z.object({
  id: z.string(),
  userId: z.string(),
  publicKey: z.unknown(),
  signCount: z.number().int(),
  name: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCredential extends z.infer<typeof _CredentialModel> {
  user: CompleteUser
  transports: CompleteCredentialTransports[]
}

/**
 * CredentialModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const CredentialModel: z.ZodSchema<CompleteCredential> = z.lazy(() => _CredentialModel.extend({
  user: UserModel,
  transports: CredentialTransportsModel.array(),
}))
