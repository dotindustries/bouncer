import { ctx } from "./../context";
import {
  subscriptionApi,
  validateSubscriptionPatch,
} from "@dotinc/bouncer-core";

export const subscriptionsRouter = ctx.router(subscriptionApi);

subscriptionsRouter.get("/subscriptions/:subscriptionId", async (req, res) => {
  // TODO: API Keys access: sys_ and pub_
  if (typeof req.params.subscriptionId !== "string") {
    return res.status(400).json({
      code: 400,
      message: "Invalid subscriptionId",
    });
  }
  try {
    const sub = await req.repo.getSubscription(req.params.subscriptionId);
    if (!sub) {
      return res.status(404).json({
        code: 404,
        message: `Subscription [${req.params.subscriptionId}] not found.`,
        id: req.params.subscriptionId,
      });
    }
    return res.status(200).json(sub);
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to get subscription [${req.params.subscriptionId}]: ${e.message}`,
    });
  }
});

subscriptionsRouter.get("/subscriptions", async (req, res) => {
  // TODO: API Keys access: sys_ and pub_
  try {
    const sub = await req.repo.getSubscriptions(req.query.publisherId);
    return res.status(200).json(sub);
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to get subscriptions for publisher [${req.query.publisherId}]: ${e.message}`,
    });
  }
});

subscriptionsRouter.post(
  "/subscriptions/:publisherId/:subscriptionId",
  async (req, res) => {
    // TODO: API Keys access: sys_ and pub_
    if (typeof req.params.publisherId !== "string") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    const sub = req.body;

    try {
      return res
        .status(200)
        .json(await req.repo.createSubscription(req.params.publisherId, sub));
    } catch (e: any) {
      return res.status(500).json({
        code: 500,
        message: `Failed to save subscription [${sub.id}]: ${e.message}`,
      });
    }
  }
);

subscriptionsRouter.patch(
  "/subscriptions/:subscriptionId",
  async (req, res) => {
    // TODO: API Keys access: sys_ and pub_
    const patch = req.body;

    if (req.params.subscriptionId !== patch.id) {
      return res.status(400).json({
        code: 400,
        message: `Invalid subscrition [${req.params.subscriptionId}] doesn't match id in patch [${patch.id}]`,
      });
    }

    const sub = await req.repo.getSubscription(req.params.subscriptionId);
    if (!sub) {
      return res.status(404).json({
        code: 404,
        message: `Subscription [${req.params.subscriptionId}] not found.`,
        id: req.params.subscriptionId,
      });
    }

    const validationError = validateSubscriptionPatch(sub, patch);
    if (validationError) {
      return res.status(400).json({
        code: 400,
        message: validationError,
      });
    }

    try {
      return res.status(200).json(await req.repo.updateSubscription(patch));
    } catch (e: any) {
      return res.status(500).json({
        code: 500,
        message: `Failed to update subscription [${sub.id}]: ${e.message}`,
      });
    }
  }
);
