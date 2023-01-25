import { api } from "@dotinc/bouncer-core";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env/server.mjs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json(api(env.SPEAKEASY_WORKSPACE_ID ?? "your-speakeasy-workspace-id"));
}
