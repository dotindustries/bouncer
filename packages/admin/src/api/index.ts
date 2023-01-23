import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import type {} from "zod";

import { seatsApi, productApi } from "@dotinc/bouncer-core";

export const seatsClientApi = new Zodios("/api/v1", seatsApi);
export const configClientApi = new Zodios("/api/v1", productApi);

export const seats = new ZodiosHooks("seats", seatsClientApi);
export const config = new ZodiosHooks("config", configClientApi);
