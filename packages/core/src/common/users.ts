import z from "zod";

export const user = z.object({
  user_id: z.string(),
  user_name: z.string().nullable(),
  tenant_id: z.string(),
  email: z.string().nullable(),
});

export type User = z.infer<typeof user>;
