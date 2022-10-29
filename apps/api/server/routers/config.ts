import { ctx } from "./../context";
import { configApi } from "@dotinc/bouncer-core";

export const configRouter = ctx.router(configApi);

configRouter.get("/publisher/:publisherId/configuration", async (req, res) => {
  // TODO: API Keys access: sys_ and pub_
  if (typeof req.params.publisherId !== "string") {
    return res.status(400).json({
      code: 400,
      message: "Invalid publisherId",
    });
  }
  try {
    const pc = await req.repo.getPublisher(req.params.publisherId);
    if (!pc) {
      return res.status(404).json({
        code: 404,
        message: `Publisher [${req.params.publisherId}] not found.`,
        id: req.params.publisherId,
      });
    }
    return res.status(200).json(pc);
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to get publisher configuration [${req.params.publisherId}]: ${e.message}`,
    });
  }
});

configRouter.get("/publishers", async (req, res) => {
  // TODO: API Keys access: sys_
  try {
    return res.status(200).json(await req.repo.getPublishers());
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to get publisher configurations: ${e.message}`,
    });
  }
});

configRouter.put("/publisher/:publisherId/configuration", async (req, res) => {
  // TODO: API Keys access: sys_ and pub_
  const config = req.body;

  if (req.params.publisherId !== config.id) {
    return res.status(400).json({
      code: 400,
      message: `Invalid publisher configuration [${req.params.publisherId}] doesn't match id in patch [${config.id}]`,
    });
  }
  try {
    return res.status(200).json(await req.repo.updatePublisher(config));
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to save publisher configuration [${config.id}]: ${e.message}`,
    });
  }
});

configRouter.post("/publisher/:publisherId/configuration", (req, res) => {});
