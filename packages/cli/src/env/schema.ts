// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]),
	DEBUG: z.string().nullish(),
	PINO_LOG_LEVEL: z.string().optional(),
	LOGTAIL_SOURCE_TOKEN: z.string().optional(),
});
