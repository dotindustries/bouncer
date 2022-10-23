import { createSqliteRepository } from "@dotinc/bouncer-sql";
import Database from "better-sqlite3";
import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";

export const app = ctx.nextApp();

// TODO: middleware that adds the user to the context
// app.use(userMiddleware);

app.use((req, _, next) => {
  req.repo = createSqliteRepository({
    database: new Database("bouncer.db", { verbose: console.log }),
  });
  return next({
    req,
  });
});

// TODO: load appropriate backend and it's vars from environment
// if (env.planetscale_database_url) {
// app.use((req, _, next) => {
//   req.repo = createPlanetscaleRepository({
//     url: "env.database_url",
//   });
//   return next({
//     req,
//   });
// });
// app.use(
//   planetscalePlugin({
//     url: "env.database_url",
//   })
// );
// }

app.use("/api/v1", seatsRouter);
app.use("/api/v1", configRouter);
app.use("/api/v1", subscriptionsRouter);
