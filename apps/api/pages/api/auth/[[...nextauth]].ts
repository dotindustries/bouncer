import NextAuth from "next-auth";

import { authOptions } from "@dotinc/bouncer-auth/src/server";
import { getBaseDomain } from "~/util/getBaseDomain";
import { env } from "~/env/server.mjs";

const domain = getBaseDomain()
  .replace(/(http|https):\/\//g, "")
  .replace(":3000", "");

export default NextAuth(authOptions({ domain, origin: env.NEXTAUTH_URL }));
