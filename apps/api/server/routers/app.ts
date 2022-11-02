import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";
import { repo } from "../db";
import { keysRouter } from "./keys";

export const app = ctx.nextApp();

// TODO: supertokens middleware that adds the user to the context
// app.use(userMiddleware);

// repository middleware
app.use((req, res, next) => {
  req.repo = repo;
  const apiKeyHeader = req.headers["x-api-key"];
  if (!apiKeyHeader || typeof apiKeyHeader !== "string")
    return res.status(401).json({ message: "Unauthorized request" });
  req.apiKey = apiKeyHeader;

  return next(); // passing arg hits http-500
});

app.use("/api/v1", seatsRouter);
app.use("/api/v1", configRouter);
app.use("/api/v1", subscriptionsRouter);
app.use("/api/v1", keysRouter);
