import { ctx } from "./../context";
import { configApi } from "@dotinc/bouncer-core";

export const configRouter = ctx.router(configApi);

configRouter.get("/publisher/:publisherId/configuration", (req, res) => {});

configRouter.put("/publisher/:publisherId/configuration", (req, res) => {});
