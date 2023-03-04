import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteSubscription, SubscriptionModel } from "./index"

export const _SeatSummaryModel = z.object({
  subscription_id: z.string(),
  standard_seat_count: z.number().int(),
  limited_seat_count: z.number().int(),
})

export interface CompleteSeatSummary extends z.infer<typeof _SeatSummaryModel> {
  subscription: CompleteSubscription
}

/**
 * SeatSummaryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SeatSummaryModel: z.ZodSchema<CompleteSeatSummary> = z.lazy(() => _SeatSummaryModel.extend({
  subscription: SubscriptionModel,
}))
