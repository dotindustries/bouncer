import { z } from "zod";

export const error404 = z.object({
  code: z.number(),
  message: z.string(),
  id: z.number().or(z.string()),
});

export const error = z.object({
  code: z.number(),
  message: z.string(),
});
