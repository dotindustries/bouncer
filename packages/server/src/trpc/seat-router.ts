import { seatsById } from "@src/core/seats.js";
import { t } from "@src/trpc/routers.js";

export const seatsRouter = t.router({
  seatById: t.procedure.input(seatsById.input).query(async ({ ctx, input }) => {
    return seatsById.exec(ctx, input);
  }),
  //   allSeats: t.procedure.input(z.object({})).query(async ({ ctx, input }) => {}),
  //   userSeat: t.procedure.input(z.object({})).query(async ({ ctx, input }) => {}),
  //   patchUserOccupant: t.procedure
  //     .input(z.object({}))
  //     .mutation(async ({ ctx, input }) => {}),
  //   redeemSeat: t.procedure
  //     .input(z.object({}))
  //     .mutation(async ({ ctx, input }) => {}),
  //   releaseSeat: t.procedure
  //     .input(z.object({}))
  //     .mutation(async ({ ctx, input }) => {}),
  //   requestSeat: t.procedure
  //     .input(z.object({}))
  //     .mutation(async ({ ctx, input }) => {}),
  //   reserveSeat: t.procedure
  //     .input(z.object({}))
  //     .mutation(async ({ ctx, input }) => {}),
});
