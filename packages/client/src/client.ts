import { Zodios, ZodiosOptions } from "@zodios/core";

import {
  seatsApi,
  Reservation,
  User,
  user,
  subscriptionApi,
  Subscription,
} from "@dotinc/bouncer-core";

import type { InferParams, InferQueries, InferQueryParams } from "./types";

export interface BouncerClientOptions extends ZodiosOptions {
  apiKey: string;
  baseUrl?: string;
  attr?: User;
}

export const createClient = (options: BouncerClientOptions) => {
  const {
    apiKey,
    baseUrl = "/api/v1",
    axiosConfig,
    axiosInstance,
    validate,
    attr,
  } = options;

  let _attr = attr && user.parse(attr);

  const zodiosOptions: ZodiosOptions = {
    axiosInstance,
    validate,
    axiosConfig: {
      ...axiosConfig,
      headers: {
        ...axiosConfig?.headers,
        "x-api-key": apiKey,
      },
    },
  };

  const api = new Zodios(baseUrl, seatsApi, zodiosOptions);

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
