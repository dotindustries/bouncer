import z from "zod";

export const user = z.object({
  user_id: z.string(),
  user_name: z.string().optional(),
  tenant_id: z.string(),
  email: z.string().optional(),
});

export type User = z.infer<typeof user>;
