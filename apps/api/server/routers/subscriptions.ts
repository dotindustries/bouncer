import { ctx } from "./../context";
import { subscriptionApi } from "@dotinc/bouncer-core";

export const subscriptionsRouter = ctx.router(subscriptionApi);

subscriptionsRouter.get("/v1/subscriptions", (req, res) => {});
subscriptionsRouter.get("/v1/subscriptions/:subscriptionId", (req, res) => {});
subscriptionsRouter.patch(
  "/v1/subscriptions/:subscriptionId",
  (req, res) => {}
);
subscriptionsRouter.post("/v1/subscriptions/:subscriptionId", (req, res) => {});
