// @ts-check
import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DEV: z.string().optional(),
  SQLITE_DB: z.string().optional(),
  DB_MIGRATE: z.string().optional(),
  PSCALE_DATABASE_HOST: z.string().optional(),
  PSCALE_DATABASE_USERNAME: z.string().optional(),
  PSCALE_DATABASE_PASSWORD: z.string().optional(),
  SUPER_TOKENS_URI: isProduction ? z.string() : z.string().optional(),
  SUPER_TOKENS_API_KEY: isProduction ? z.string() : z.string().optional(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_MID: z.string().optional(),
  NEXT_PUBLIC_SUPER_TOKENS_APP_NAME: z.string().optional(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_MID:
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MID,
};
