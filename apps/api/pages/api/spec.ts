import { openApiDocument } from "@dotinc/bouncer-api";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env/server.mjs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(openApiDocument);
}
