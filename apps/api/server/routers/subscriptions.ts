import { ctx } from "./../context";
import { subscriptionApi } from "@dotinc/bouncer-core";

export const subscriptionsRouter = ctx.router(subscriptionApi);

subscriptionsRouter.get("/subscriptions", (req, res) => {});
subscriptionsRouter.get("/subscriptions/:subscriptionId", (req, res) => {});
subscriptionsRouter.patch("/subscriptions/:subscriptionId", (req, res) => {});
subscriptionsRouter.post("/subscriptions/:subscriptionId", (req, res) => {});
