import { ctx } from "./../context";
import { configApi } from "@dotinc/bouncer-core";
import { repo } from "../db";

export const configRouter = ctx.router(configApi);

configRouter.get("/publisher/:publisherId/configuration", async (req, res) => {
  if (typeof req.params.publisherId !== "string") {
    return res.status(400).json({
      code: 400,
      message: "Invalid publisherId",
    });
  }
  const pc = await repo.getPublisher(req.params.publisherId);
  if (!pc) {
    return res.status(404).json({
      code: 404,
      message: `Publisher [${req.params.publisherId}] not found.`,
      id: req.params.publisherId,
    });
  }

  return pc;
});

configRouter.get("/publisher", (req, res) => {});

configRouter.put("/publisher/:publisherId/configuration", (req, res) => {});
