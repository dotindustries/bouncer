import * as z from "zod"
import * as imports from "../zod-utils"
import { SeatingStrategyName } from "@prisma/client"
import { CompleteProduct, ProductModel, CompleteSubscription, SubscriptionModel } from "./index"

export const _SeatingConfigModel = z.object({
  owner_id: z.string(),
  default_low_seat_warning_level_percent: z.number(),
  seating_strategy_name: z.nativeEnum(SeatingStrategyName),
  low_seat_warning_level_pct: z.number().nullish(),
  limited_overflow_seating_enabled: z.boolean().nullish(),
  seat_reservation_expiry_in_days: z.number().int().nullish(),
  default_seat_expiry_in_days: z.number().int().nullish(),
})

export interface CompleteSeatingConfig extends z.infer<typeof _SeatingConfigModel> {
  publisher?: CompleteProduct | null
  subscription?: CompleteSubscription | null
}

/**
 * SeatingConfigModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SeatingConfigModel: z.ZodSchema<CompleteSeatingConfig> = z.lazy(() => _SeatingConfigModel.extend({
  publisher: ProductModel.nullish(),
  subscription: SubscriptionModel.nullish(),
}))
