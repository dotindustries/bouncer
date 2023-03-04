import * as z from "zod"
import * as imports from "../zod-utils"
import { SeatingStrategyName, SeatType } from "@prisma/client"
import { CompleteSeatReservation, SeatReservationModel, CompleteSeatOccupant, SeatOccupantModel } from "./index"

export const _SeatModel = z.object({
  id: z.string(),
  seating_strategy_name: z.nativeEnum(SeatingStrategyName),
  subscription_id: z.string().nullish(),
  created_utc: z.date().nullish(),
  seat_type: z.nativeEnum(SeatType),
  expires_utc: z.date().nullish(),
  redeemed_utc: z.date().nullish(),
})

export interface CompleteSeat extends z.infer<typeof _SeatModel> {
  reservation?: CompleteSeatReservation | null
  occupant?: CompleteSeatOccupant | null
}

/**
 * SeatModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SeatModel: z.ZodSchema<CompleteSeat> = z.lazy(() => _SeatModel.extend({
  reservation: SeatReservationModel.nullish(),
  occupant: SeatOccupantModel.nullish(),
}))
