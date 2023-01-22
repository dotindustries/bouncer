import { prisma } from "@dotinc/bouncer-db";
import { WebauthnRegister } from "@dotinc/bouncer-auth/src/server";
import { env } from "~/env/server.mjs";
import { getBaseDomain } from "~/util/getBaseDomain";

const domain = getBaseDomain()
  .replace(/(http|https):\/\//g, "")
  .replace(":3000", "");

export default WebauthnRegister({
  domain,
  origin: env.NEXTAUTH_URL,
  appName: env.APP_NAME,
  repo: prisma,
});
