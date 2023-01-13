import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";
import { repo } from "../db";

export const app = ctx.nextApp();

// auth middleware that adds the user to the context
app.use((req, res, next) => {
  // check if we hav a request with an api key
  const apiKeyHeader = req.headers["x-api-key"];

  if (typeof apiKeyHeader === "string") {
    const split = apiKeyHeader.split(" ");
    if (split.length != 2) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    req.apiKey = split[1];
  }

  // check if we have a direct user from the web ui instead
  if (!req.apiKey) {
    const user = undefined;
    // TODO add supertokens read-out
    req.user = user;
  }

  // if we have no auth set, reject
  if (!req.user && !req.apiKey) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  return next();
});

// repository middleware
app.use((req, res, next) => {
  req.repo = repo;

  return next(); // passing arg hits http-500
});

app.use("/api/v1", seatsRouter);
app.use("/api/v1", configRouter);
app.use("/api/v1", subscriptionsRouter);
