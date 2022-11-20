import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { initFrontend } from "@dotinc/bouncer-admin";
import { getBaseDomain } from "~/util/getBaseDomain";

import { env } from "~/env/client.mjs";

initFrontend({
  appInfo: {
    appName: env.NEXT_PUBLIC_SUPER_TOKENS_APP_NAME,
    apiDomain: getBaseDomain(),
    websiteDomain: getBaseDomain(),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
