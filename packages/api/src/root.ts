import { createTRPCRouter } from "./trpc";
import { productsRouter } from "./router/products";
import { authRouter } from "./router/auth";
import { adminRouter } from "./router/admin";
import { seatsRouter } from "./router/seats";
import { subscriptionRouter } from "./router/subscriptions";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  admin: adminRouter,
  products: productsRouter,
  seats: seatsRouter,
  subscriptions: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
