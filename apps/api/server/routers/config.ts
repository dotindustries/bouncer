import { ctx } from "./../context";
import { configApi } from "@dotinc/bouncer-core";

export const configRouter = ctx.router(configApi);

configRouter.get("/publisher/:publisherId/configuration", async (req, res) => {
  if (typeof req.params.publisherId !== "string") {
    return res.status(400).json({
      code: 400,
      message: "Invalid publisherId",
    });
  }
  const pc = await req.repo.getPublisher(req.params.publisherId);
  if (!pc) {
    return res.status(404).json({
      code: 404,
      message: `Publisher [${req.params.publisherId}] not found.`,
      id: req.params.publisherId,
    });
  }

  return pc;
});

configRouter.get("/publisher", async (req, res) => {
  const pcs = await req.repo.getPublishers();

  return res.status(200).json(pcs);
});

configRouter.put("/publisher/:publisherId/configuration", (req, res) => {});

configRouter.post("/publisher/:publisherId/configuration", (req, res) => {});
