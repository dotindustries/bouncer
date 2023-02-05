import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { user } from "@dotinc/bouncer-api";
import type { AppRouter, User } from "@dotinc/bouncer-api";
import type { InferParams, InferQueries, InferQueryParams } from "./types";

export interface BouncerClientOptions {
  apiKey: string;
  baseUrl?: string;
  attr?: User;
}

export const createClient = (options: BouncerClientOptions) => {
  const { apiKey, baseUrl = "https://localhost:3000/api/v1", attr } = options;

  let _attr = attr && user.parse(attr);

  const api = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: baseUrl,
        maxURLLength: 2083,
      }),
    ],
  });

  const { redeemSeat, requestSeat, reserveSeat, releaseSeat, userSeat } = api;

  const seats = {
    userSeat: async (
      params: Omit<InferQueryParams<typeof userSeat>, "userId" | "tenantId">
    ) => {
      const attr = user.parse(_attr);
      return userSeat({
        params: {
          ...params,
          userId: attr.user_id,
          tenantId: attr.tenant_id,
        },
      });
    },
    redeem: async (params: InferParams<typeof redeemSeat>) => {
      const attr = user.parse(_attr);
      return redeemSeat(attr, {
        params,
      });
    },
    request: async (params: InferParams<typeof requestSeat>) => {
      const attr = user.parse(_attr);
      return requestSeat(attr, {
        params,
      });
    },
    reserve: (
      params: InferParams<typeof reserveSeat>,
      reservation: Reservation
    ) => {
      return reserveSeat(reservation, {
        params,
      });
    },
    release: (params: InferParams<typeof releaseSeat>) => {
      return releaseSeat(undefined, {
        params,
      });
    },
  };

  const subApi = new Zodios(baseUrl, subscriptionApi, zodiosOptions);

  const {
    subscriptions: allSubscriptions,
    createSubscription,
    updateSubscription,
  } = subApi;

  const subscriptions = {
    subscriptions: async (queries: InferQueries<typeof allSubscriptions>) => {
      return allSubscriptions({ queries });
    },
    createSubscription: async (
      params: InferParams<typeof createSubscription>,
      subscription: Subscription
    ) => {
      return createSubscription(subscription, { params });
    },
    updateSubscription: async (
      params: InferParams<typeof updateSubscription>,
      subscription: Subscription
    ) => {
      return updateSubscription(subscription, { params });
    },
  };

  return {
    identify: (attr: User) => {
      _attr = user.parse(attr);
    },
    seats,
    subscriptions,
  };
};
