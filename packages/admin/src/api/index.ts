import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import type {} from "zod";

import { seatsApi, productApi, subscriptionApi } from "@dotinc/bouncer-core";

export const seatsClientApi = new Zodios("/api/v1", seatsApi);
export const productsClientApi = new Zodios("/api/v1", productApi);
export const subscriptionsClientApi = new Zodios("/api/v1", subscriptionApi);

export const seats = new ZodiosHooks("seats", seatsClientApi);
export const products = new ZodiosHooks("products", productsClientApi);
export const subscriptions = new ZodiosHooks(
  "subscriptions",
  subscriptionsClientApi
);
