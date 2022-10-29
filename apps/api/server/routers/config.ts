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

  const pcs = await req.repo.getPublishers();

  return res.status(200).json(pcs);
configRouter.get("/publishers", async (req, res) => {
});

configRouter.put("/publisher/:publisherId/configuration", (req, res) => {
  const config = req.body;

  if (req.params.publisherId !== config.id) {
    return res.status(400).json({
      code: 400,
      message: `Invalid publisher configuration [${req.params.publisherId}] doesn't match id in patch [${config.id}]`,
    });
  }
  return req.repo.updatePublisher(config);
});

configRouter.post("/publisher/:publisherId/configuration", (req, res) => {});
