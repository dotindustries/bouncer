import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import styles from "../styles/Home.module.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { seatsApi } from "@dotinc/bouncer-core";

const queryClient = new QueryClient();
const seatsClientApi = new Zodios("/api/v1", seatsApi);
const userClientHooks = new ZodiosHooks("seats", seatsClientApi);

const Users = () => {
  const [count, setCount] = useState(1);
  const {
    data: seats,
    error,
    isLoading,
    invalidate,
  } = userClientHooks.useSeats({
    params: {
      subscriptionId: "asdf",
    },
  });
  const { mutate } = userClientHooks.useMutation(
    "post",
    "/subscriptions/:subscriptionId/seats/:seatId/request",
    undefined,
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
      {seats?.map((seat) => (
        <div key={seat.seat_id}>
          {seat.seat_type} - {seat.occupant?.email}
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
          <title>Zodios Example App</title>
          <meta name="description" content="Zodios app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Users</h1>
        <Users />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
