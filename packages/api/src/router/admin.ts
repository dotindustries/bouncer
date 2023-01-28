import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
  eventPortal: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.svix.authentication.appPortalAccess(input.productId, {});
    }),
});
