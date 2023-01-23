import z from "zod";
import { zodiosContext } from "@zodios/express";
import { Repository } from "@dotinc/bouncer-core";
import type { User } from "@dotinc/bouncer-auth";

const user = z.custom<User>();

const repo = z.custom<Repository>();

export const ctx = zodiosContext(
  z.object({
    auth: z.union([user, z.string()]),
    user: user.optional(),
    repo,
    apiKey: z.string().optional(),
  })
);
