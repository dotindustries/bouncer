import z from "zod";
import { zodiosContext } from "@zodios/express";
import { Repository } from "@dotinc/bouncer-core";
import Passwordless from "supertokens-node/recipe/passwordless";

const user = z.custom<Passwordless.User>();

const repo = z.custom<Repository>();

export const ctx = zodiosContext(
  z.object({
    auth: z.union([user, z.string()]),
    user: user.optional(),
    repo,
    apiKey: z.string().optional(),
  })
);
