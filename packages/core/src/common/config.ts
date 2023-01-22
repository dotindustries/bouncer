import type { Product, SeatingConfig } from "@dotinc/bouncer-db";

import { makeApi } from "@zodios/core";
import { z } from "zod";
import { error, error404 } from "./shared";

// TODO: add SeatingConfig validation logic back in
// defaul_low_seat_warning_level_percent: z.number().optional(),
//   seating_strategy_name: z
//     .enum(["monthly_active_user", "first_come_first_served"])
//     .nullable(),
//   low_seat_warning_level_pct: z
//     .number()
//     .gt(0, {
//       message: `if provided, seating configuration [low_seat_warning_level_pct] must be > 0 (0%) and < 1 (100%).`,
//     })
//     .max(1, {
//       message: `if provided, seating configuration [low_seat_warning_level_pct] must be > 0 (0%) and < 1 (100%).`,
//     })
//     .nullish(),
//   limited_overflow_seating_enabled: z.boolean().nullish(),
//   seat_reservation_expiry_in_days: z.number().min(1).default(1).nullable(),
//   default_seat_expiry_in_days: z.number().min(1).default(1).nullable(),
export const seatingConfiguration = z.custom<SeatingConfig>();

export type SeatingConfiguration = z.infer<typeof seatingConfiguration>;

export const productConfiguration = z.custom<
  Product & { seatingConfig: SeatingConfiguration }
>();

export type ProductConfiguration = z.infer<typeof productConfiguration>;

export const configApi = makeApi([
  {
    method: "get",
    alias: "productById",
    path: "/products/:productId/config",
    parameters: [
      {
        name: "productId",
        type: "Path",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: 404,
        schema: error404,
      },
      {
        status: "default", // default status code will be used if error is not 404
        schema: error,
      },
    ],
    response: productConfiguration,
  },
  {
    method: "get",
    alias: "products",
    path: "/products",
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: z.array(productConfiguration),
  },
  {
    method: "put",
    alias: "updateProductConfig",
    path: "/products/:productId/config",
    parameters: [
      {
        name: "productConfig",
        schema: productConfiguration,
        type: "Body",
      },
      {
        name: "productId",
        type: "Path",
        schema: z.string(),
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: productConfiguration,
  },
  {
    method: "post",
    alias: "createProductConfig",
    path: "/products",
    parameters: [
      {
        name: "productConfiguration",
        schema: productConfiguration,
        type: "Body",
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: productConfiguration,
  },
]);
