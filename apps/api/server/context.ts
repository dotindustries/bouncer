import z from "zod";
import { zodiosContext } from "@zodios/express";
import { Repository } from "@dotinc/bouncer-core";

const user = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const repo = z.custom<Repository>();

export const ctx = zodiosContext(z.object({ user, repo }));
