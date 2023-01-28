import { createTRPCRouter } from "./trpc";
import { productsRouter } from "./router/products";
import { authRouter } from "./router/auth";
import { adminRouter } from "./router/admin";

export const appRouter = createTRPCRouter({
  admin: adminRouter,
  products: productsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
