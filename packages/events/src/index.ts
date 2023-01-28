import { Svix } from "svix";
import { env } from "./env.mjs";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var svix: Svix | undefined;
}

export const svix =
  global.svix ||
  new Svix(env.SVIX_TOKEN, {
    serverUrl: env.SVIX_SERVER_URL,
  });

export type {} from "svix";

if (process.env.NODE_ENV !== "production") {
  global.svix = svix;
}
