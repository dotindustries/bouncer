import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteSeat, SeatModel } from "./index"

export const _SeatReservationModel = z.object({
  seat_id: z.string(),
  tenant_id: z.string().nullish(),
  user_id: z.string().nullish(),
  email: z.string().nullish(),
  invite_url: z.string().nullish(),
})

export interface CompleteSeatReservation extends z.infer<typeof _SeatReservationModel> {
  seat: CompleteSeat
}

/**
 * SeatReservationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SeatReservationModel: z.ZodSchema<CompleteSeatReservation> = z.lazy(() => _SeatReservationModel.extend({
  seat: SeatModel,
}))
