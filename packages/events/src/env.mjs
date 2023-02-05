/* eslint-disable no-undef */
// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const server = z.object({
  SVIX_TOKEN: z.string(),
  SVIX_SERVER_URL: z.string().url().optional(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * edge runtimes (e.g. middlewares) or client-side so we need to destruct manually.
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  SVIX_SERVER_URL: process.env.SVIX_SERVER_URL,
  SVIX_TOKEN: process.env.SVIX_TOKEN,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

// Don't touch the part below
// --------------------------

const formatErrors = (
  /** @type {z.ZodFormattedError<Map<string,string>,string>} */
  errors
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

const isServer = typeof window === "undefined";

const merged = server.merge(client);
const parsed = isServer
  ? merged.safeParse(processEnv) // on server we can validate all env vars
  : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsed.error.format())
  );
  throw new Error("Invalid environment variables");
}

/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
export const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    // Throw a descriptive error if a server-side env var is accessed on the client
    // Otherwise it would just be returning `undefined` and be annoying to debug
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
      throw new Error(
        `❌ Attempted to access server-side environment variable '${prop}' on the client`
      );

    // @ts-ignore - can't type this properly in jsdoc
    return target[prop];
  },
});
