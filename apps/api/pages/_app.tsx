import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { initFrontend, AppProvider, Layout } from "@dotinc/bouncer-admin";
import { getBaseDomain } from "~/util/getBaseDomain";

import { env } from "~/env/client.mjs";
import Script from "next/script";

initFrontend({
  appInfo: {
    appName: env.NEXT_PUBLIC_SUPER_TOKENS_APP_NAME ?? "bouncer",
    apiDomain: getBaseDomain(),
    websiteDomain: getBaseDomain(),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google tag (gtag.js) - Google Analytics */}
      {env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MID && (
        <>
          <Script
            async
            id="gtm"
            src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MID}`}
          ></Script>
          <Script
            id="gtms"
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MID}', {
    page_path: window.location.pathname,
  });`,
            }}
          />
        </>
      )}

      <AppProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
