import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import styles from "../styles/Home.module.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { seatsApi, configApi } from "@dotinc/bouncer-core";
import Script from "next/script";
import { env } from "../env/client.mjs";

const queryClient = new QueryClient();
const seatsClientApi = new Zodios("/api/v1", seatsApi);
const configClientApi = new Zodios("/api/v1", configApi);
const userClientHooks = new ZodiosHooks("seats", seatsClientApi);
const configClientHooks = new ZodiosHooks("config", configClientApi);

const Publishers = () => {
  const [count, setCount] = useState(1);
  const {
    data: publisherConfigurations,
    error,
    isLoading,
    invalidate,
  } = configClientHooks.usePublisherConfigurations();
  const { mutate } = userClientHooks.useMutation(
    "post",
    "/subscriptions/:subscriptionId/seats/:seatId/request",
    {
      params: {
        subscriptionId: "<your subscription id>",
        seatId: "<your seat id>",
      },
    },
    {
      onSuccess: () => invalidate(),
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, "  ")}</pre>;
  }

  return (
    <div>
      <button
        onClick={() => {
          // mutate({
          //   tenant_id: `tenant${count}`,
          //   user_name: `user${count}`,
          //   email: `user${count}@test.com`,
          // });
          setCount((prev) => prev + 1);
        }}
      >
        Add User
      </button>
      {publisherConfigurations?.map((publisherConfig) => (
        <div key={publisherConfig.id}>
          <pre>{JSON.stringify(publisherConfig, null, "  ")}</pre>
        </div>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Head>
          <title>Bouncer</title>
          <meta name="description" content="SaaS seat management service" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
        <h1>Publishers</h1>
        <Publishers />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
