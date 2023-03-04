import NextAuth from "next-auth";

import { authOptions } from "@dotinc/bouncer-auth/src/server";
import { env } from "~/env/server.mjs";
import { getBaseUrl } from "@dotinc/bouncer-admin";

const domain = getBaseUrl()
  .replace(/(http|https):\/\//g, "")
  .replace(":3000", "");

export default NextAuth(authOptions({ domain, origin: env.NEXTAUTH_URL }));
