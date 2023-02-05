import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "@dotinc/bouncer-api";
import { renderTrpcPanel } from "@dotinc/bouncer-api/debug";
import { env } from "~/env/server.mjs";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  if (env.NODE_ENV !== "development") {
    return res.status(403).send("Debug access forbidden");
  }
  res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/api/trpc",
      transformer: "superjson",
    })
  );
}
