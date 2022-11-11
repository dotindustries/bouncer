import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { middleware } from "supertokens-node/framework/express";
import { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";
import supertokens from "supertokens-node";
import { backendConfig } from "@dotinc/bouncer-admin";
import NextCors from "nextjs-cors";

import { env } from "~/env/server.mjs";

supertokens.init(
  backendConfig({
    supertokens: env.SUPER_TOKENS_URI
      ? {
          connectionURI: env.SUPER_TOKENS_URI,
          apiKey: env.SUPER_TOKENS_API_KEY,
        }
      : undefined,
  })
);

export default async function superTokens(
  req: NextApiRequest & Request,
  res: NextApiResponse & Response
) {
  // NOTE: We need CORS only if we are querying the APIs from a different origin
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    credentials: true,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  });

  await superTokensNextWrapper(
    async (next) => {
      // This is needed for production deployments with Vercel
      res.setHeader(
        "Cache-Control",
        "no-cache, no-store, max-age=0, must-revalidate"
      );
      await middleware()(req, res, next);
    },
    req,
    res
  );
  if (!res.writableEnded) {
    res.status(404).send("Not found");
  }
}
