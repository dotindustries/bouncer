import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import styles from "../styles/Home.module.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { seatsApi, configApi } from "@dotinc/bouncer-core";

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
        <h1>Publishers</h1>
        <Publishers />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
