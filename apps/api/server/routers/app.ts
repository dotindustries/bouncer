import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";
import { repo } from "../db";
import NextCors from "nextjs-cors";
import supertokens from "supertokens-node";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import Passwordless from "supertokens-node/recipe/passwordless";
import { backendConfig } from "@dotinc/bouncer-admin/backend";
import { env } from "~/env/server.mjs";
import { getBaseDomain } from "~/util/getBaseDomain";
import { SessionRequest } from "supertokens-node/framework/express";

export const app = ctx.nextApp();

supertokens.init(
  backendConfig({
    appInfo: {
      appName: env.NEXT_PUBLIC_SUPER_TOKENS_APP_NAME,
      apiDomain: getBaseDomain(),
      websiteDomain: getBaseDomain(),
    },
    supertokens: env.SUPER_TOKENS_URI
      ? {
          connectionURI: env.SUPER_TOKENS_URI,
          apiKey: env.SUPER_TOKENS_API_KEY,
        }
      : undefined,
  })
);

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
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      }
    );

    await superTokensNextWrapper(
      async (next) => {
        return await verifySession()(req, res, next);
      },
      req,
      res
    );
    // supertokens: if it comes here, it means that the session verification was successful

    const session = (req as unknown as SessionRequest).session!;
    const user = await Passwordless.getUserById({
      userId: session.getUserId(),
    });
    if (!user) {
      return res.status(500).json({ message: "User not available" });
    }
    req.auth = user;
  }

  // if we have no auth set, reject
  if (!req.auth) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  return next();
});

// authZ middleware
const apiKeys = env.API_KEYS.split(",");
const authAcl = env.AUTH_ACL.split(",");
app.use((req, res, next) => {
  if (typeof req.auth === "string" && !apiKeys.includes(req.auth)) {
    // api key is not valid
    return res.status(403).json({ message: "Access denied" });
  } else if (typeof req.auth !== "string" && req.auth.email) {
    authAcl.includes(req.auth.email);
    // auth acl check
    return res.status(403).json({ message: "Access denied" });
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
