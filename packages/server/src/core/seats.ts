import { queryBuilder } from "@src/db/index.js";
import type { CreateContextOptions } from "@src/trpc/context.js";
import type { inferAsyncReturnType } from "@src/utils/async.js";
import { z } from "zod";

const seatsByIdInputSchema = z.object({
  subscriptionId: z.string(),
  seatId: z.string(),
});

type SeatsByIdInput = z.infer<typeof seatsByIdInputSchema>;

export const seatsById = {
  input: seatsByIdInputSchema,
  exec: async (
    ctx: CreateContextOptions,
    { seatId, subscriptionId }: SeatsByIdInput
  ) => {
    const query = queryBuilder.selectFrom("Seats").selectAll();
    type AllSeats = inferAsyncReturnType<typeof query.execute>;
    const sql = query.compile().sql;

    const results = await ctx.db.execute(sql, [seatId, subscriptionId]);

    return results.rows as AllSeats;
  },
};
