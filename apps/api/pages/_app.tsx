import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { AppProvider, AuthProvider, Layout } from "@dotinc/bouncer-admin";

import { env } from "~/env/client.mjs";
import Script from "next/script";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "@dotinc/bouncer-auth/src/server";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("did we get a session", pageProps.session);
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

      <AuthProvider session={pageProps.session}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </AppProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
