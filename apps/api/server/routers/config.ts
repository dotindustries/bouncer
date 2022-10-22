import { ctx } from "./../context";
import { configApi } from "@dotinc/bouncer-core";

export const configRouter = ctx.router(configApi);

configRouter.get("/v1/publisher/:publisherId/configuration", (req, res) => {});

configRouter.put("/v1/publisher/:publisherId/configuration", (req, res) => {});
