import type { Product, SeatingConfig } from "@dotinc/bouncer-db";

import { makeApi } from "@zodios/core";
import { z } from "zod";
import { error, error404, schemaForType } from "./shared";

export const seatingConfiguration = schemaForType<SeatingConfig>()(
  z.object({
    owner_id: z.string(),
    default_low_seat_warning_level_percent: z.number(),
    seating_strategy_name: z.enum([
      "monthly_active_user",
      "first_come_first_served",
    ]),
    low_seat_warning_level_pct: z.number().nullable(),
    limited_overflow_seating_enabled: z.boolean().nullable(),
    seat_reservation_expiry_in_days: z.number().nullable(),
    default_seat_expiry_in_days: z.number().nullable(),
  })
);

export type SeatingConfiguration = z.infer<typeof seatingConfiguration>;

export const productConfiguration = schemaForType<
  Product & { seatingConfig: SeatingConfiguration }
>()(
  z.object({
    id: z.string(),
    owner_id: z.string(),
    product_name: z.string(),
    publisher_name: z.string(),
    home_page_url: z.string().nullable(),
    contact_page_url: z.string().nullable(),
    privacy_notice_page_url: z.string().nullable(),
    contact_sales_email: z.string().nullable(),
    contact_sales_url: z.string().nullable(),
    contact_support_email: z.string().nullable(),
    contact_support_url: z.string().nullable(),
    is_setup_complete: z.boolean().nullable(),
    on_access_denied_url: z.string().nullable(),
    on_access_granted_url: z.string().nullable(),
    on_no_seat_available_url: z.string().nullable(),
    on_subscription_not_ready_url: z.string().nullable(),
    on_subscription_canceled_url: z.string().nullable(),
    on_subscription_suspended_url: z.string().nullable(),
    on_subscription_not_found_url: z.string().nullable(),
    on_no_subscriptions_found_url: z.string().nullable(),
    seatingConfig: seatingConfiguration,
  })
);

export type ProductConfiguration = z.infer<typeof productConfiguration>;

export const validateProduct = (_inProduct: ProductConfiguration) => {
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
};

export const productApi = makeApi([
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
        schema: productConfiguration.omit({ owner_id: true }),
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
