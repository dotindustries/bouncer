import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider, Layout, api } from "@dotinc/bouncer-admin";
import { env } from "~/env/client.mjs";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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

      <SessionProvider session={session}>
        <AppProvider>
          <Layout>
            {/* TODO: Speakeasy login redirect should display product selector modal if we got here from speakeasy */}
            {/* <SpeakeasyLoginRedirect /> */}
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </AppProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
