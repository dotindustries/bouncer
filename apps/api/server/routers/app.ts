import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";
import { repo } from "../db";

export const app = ctx.nextApp();

// TODO: middleware that adds the user to the context
// app.use(userMiddleware);

// repository middleware
app.use((req, _, next) => {
  req.repo = repo;

  return next(); // passing arg hits http-500
});

app.use("/api/v1", seatsRouter);
app.use("/api/v1", configRouter);
app.use("/api/v1", subscriptionsRouter);
