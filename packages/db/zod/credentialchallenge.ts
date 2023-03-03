import * as z from "zod"
import * as imports from "../zod-utils"

export const _CredentialChallengeModel = z.object({
  userId: z.string(),
  value: z.string(),
})
