import * as z from "zod"
import * as imports from "../zod-utils"
import { AuthenticatorTransport } from "@prisma/client"
import { CompleteCredential, CredentialModel } from "./index"

export const _CredentialTransportsModel = z.object({
  id: z.string(),
  transport: z.nativeEnum(AuthenticatorTransport),
})

export interface CompleteCredentialTransports extends z.infer<typeof _CredentialTransportsModel> {
  credential: CompleteCredential
}

/**
 * CredentialTransportsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const CredentialTransportsModel: z.ZodSchema<CompleteCredentialTransports> = z.lazy(() => _CredentialTransportsModel.extend({
  credential: CredentialModel,
}))
