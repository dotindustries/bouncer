// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema";
import type { ZodFormattedError } from "zod";

export const formatErrors = (
	errors: ZodFormattedError<Map<string, string>, string>
) =>
	Object.entries(errors)
		.map(([name, value]) => {
			if (value && "_errors" in value)
				return `${name}: ${value._errors.join(", ")}\n`;
			return undefined;
		})
		.filter(Boolean);

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
	console.error(
		"❌ Invalid environment variables:\n",
		...formatErrors(_serverEnv.error.format())
	);
	throw new Error("Invalid environment variables");
}

export const env = { ..._serverEnv.data };
