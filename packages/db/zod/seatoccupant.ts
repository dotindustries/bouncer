import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteSeat, SeatModel } from "./index"

export const _SeatOccupantModel = z.object({
  seat_id: z.string(),
  user_id: z.string(),
  tenant_id: z.string(),
  email: z.string().nullish(),
  user_name: z.string().nullish(),
})

export interface CompleteSeatOccupant extends z.infer<typeof _SeatOccupantModel> {
  seat: CompleteSeat
}

/**
 * SeatOccupantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SeatOccupantModel: z.ZodSchema<CompleteSeatOccupant> = z.lazy(() => _SeatOccupantModel.extend({
  seat: SeatModel,
}))
