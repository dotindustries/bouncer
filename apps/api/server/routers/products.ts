import { ctx } from "../context";
import { productApi } from "@dotinc/bouncer-core";

export const configRouter = ctx.router(productApi);

configRouter.get("/products/:productId/config", async (req, res) => {
  // TODO: API Keys access: sys_ and pub_
  if (typeof req.params.productId !== "string") {
    return res.status(400).json({
      code: 400,
      message: "Invalid publisherId",
    });
  }
  try {
    const pc = await req.repo.getProduct(req.params.productId);
    if (!pc) {
      return res.status(404).json({
        code: 404,
        message: `Publisher [${req.params.productId}] not found.`,
        id: req.params.productId,
      });
    }
    return res.status(200).json(pc);
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to get publisher configuration [${req.params.productId}]: ${e.message}`,
    });
  }
});

configRouter.get("/products", async (req, res) => {
  // TODO: API Keys access: sys_
  try {
    return res.status(200).json(await req.repo.getProducts());
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to get publisher configurations: ${e.message}`,
    });
  }
});

configRouter.put("/products/:productId/config", async (req, res) => {
  // TODO: API Keys access: sys_ and pub_
  const product = req.body;

  if (req.params.productId !== product.id) {
    return res.status(400).json({
      code: 400,
      message: `Invalid publisher configuration [${req.params.productId}] doesn't match id in patch [${product.id}]`,
    });
  }
  try {
    return res.status(200).json(await req.repo.updateProduct(product));
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to save publisher configuration [${product.id}]: ${e.message}`,
    });
  }
});

configRouter.post("/products", async (req, res) => {
  // TODO: API Keys access: sys_
  const product = req.body;

  let ownerId = "";
  if (typeof req.auth === "string") {
    ownerId = req.auth; // TODO: find userId associated to api_key
  } else {
    ownerId = req.auth.id;
  }

  try {
    return res
      .status(200)
      .json(
        await req.repo.createProduct({ ...product, owner_id: ownerId }, ownerId)
      );
  } catch (e: any) {
    return res.status(500).json({
      code: 500,
      message: `Failed to save publisher configuration [${product.id}]: ${e.message}`,
    });
  }
});
