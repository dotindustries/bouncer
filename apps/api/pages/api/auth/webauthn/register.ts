import { WebauthnRegister } from "@dotinc/bouncer-auth/src/server";
import { env } from "~/env/server.mjs";
import { getBaseUrl } from "@dotinc/bouncer-admin";

const domain = getBaseUrl()
  .replace(/(http|https):\/\//g, "")
  .replace(":3000", "");

export default WebauthnRegister({
  domain,
  origin: env.NEXTAUTH_URL,
  appName: env.APP_NAME,
});
