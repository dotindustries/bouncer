import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";
import { repo } from "../db";
import NextCors from "nextjs-cors";

import { getServerSession } from "@dotinc/bouncer-auth/src/server";
import { env } from "~/env/server.mjs";
import micromatch from "micromatch";

export const app = ctx.nextApp();

// auth middleware that adds the user or apiKey to the context
app.use(async (req, res, next) => {
  // check if we hav a request with an api key
  const apiKeyHeader = req.headers["x-api-key"];

  if (apiKeyHeader && typeof apiKeyHeader === "string") {
    const split = apiKeyHeader.split(" ");
    if (split.length != 2) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    req.auth = split[1];
  }
  // check if we have a direct user from the web ui instead
  else {
    // future me, do better. this is ugly af
    await NextCors(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse,
      {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        credentials: true,
        allowedHeaders: ["content-type"],
      }
    );

    const sessh = await getServerSession({ req, res });

    if (!sessh || !sessh.user) {
      return res.status(500).json({ message: "User not available" });
    }
    req.auth = sessh.user;
  }

  // if we have no auth set, reject
  if (!req.auth) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  return next();
});

// authZ middleware
const apiKeys = env.API_KEYS.split(",");

export const validateEmailWithACL = (email: string) => {
  const authAcl = env.AUTH_ACL || undefined;

  if (!authAcl) {
    return false;
  }

  const acl = authAcl.split(",");

  return micromatch.isMatch(email, acl);
};

app.use((req, res, next) => {
  if (typeof req.auth === "string" && !apiKeys.includes(req.auth)) {
    // api key is not valid
    return res.status(403).json({ message: "Access denied" });
  } else if (typeof req.auth !== "string" && req.auth.email) {
    if (!validateEmailWithACL(req.auth.email)) {
      return res.status(403).json({ message: "Access denied" });
    }
  } else {
    // no e-mail set
    return res.status(403).json({ message: "Access denied" });
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
