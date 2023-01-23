import { Repository } from "@dotinc/bouncer-core";
import { PrismaRepository } from "@dotinc/bouncer-core/src/db/prisma/index";
import { env } from "../../env/server.mjs";

export const repo: Repository = PrismaRepository ?? ({} as Repository); // fallback to no-op repository

if (typeof repo.getSeat === "undefined") {
  console.error(
    "❌ Missing database configuration in env:\n",
    JSON.stringify(env)
  );
  throw new Error("Missing database configuration");
}
