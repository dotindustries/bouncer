import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "@src/trpc/context.js";
import { seatsRouter } from "@src/trpc/seat-router.js";
import { subscriptionsRouter } from "@src/trpc/subscription-router.js";

export const t = initTRPC<{ ctx: Context }>()({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const appRouter = t.router({
  seats: seatsRouter,
  subscriptions: subscriptionsRouter,
});
