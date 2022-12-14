import { makeApi } from "@zodios/core";
import { z } from "zod";
import { error, error404 } from "./shared";

export const seatingConfiguration = z.object({
  defaultLowSeatWarningLevelPercent: z.number().optional(),
  seating_strategy_name: z
    .enum(["monthly_active_user", "first_come_first_served"])
    .nullable(),
  low_seat_warning_level_pct: z
    .number()
    .gt(0, {
      message: `if provided, seating configuration [low_seat_warning_level_pct] must be > 0 (0%) and < 1 (100%).`,
    })
    .max(1, {
      message: `if provided, seating configuration [low_seat_warning_level_pct] must be > 0 (0%) and < 1 (100%).`,
    })
    .nullish(),
  limited_overflow_seating_enabled: z.boolean().nullish(),
  seat_reservation_expiry_in_days: z.number().min(1).default(1).optional(),
  default_seat_expiry_in_days: z.number().min(1).default(1).optional(),
});

export type SeatingConfiguration = z.infer<typeof seatingConfiguration>;

export const productConfiguration = z.object({
  on_access_denied_url: z.string().nullable(),
  on_access_granted_url: z.string(),
  on_no_seat_available_url: z.string().nullable(),
  on_subscription_not_ready_url: z.string().nullable(),
  on_subscription_canceled_url: z.string().nullable(),
  on_subscription_suspended_url: z.string().nullable(),
  on_subscription_not_found_url: z.string().nullable(),
  on_no_subscriptions_found_url: z.string().nullable(),
});

export type ProductConfiguration = z.infer<typeof productConfiguration>;

export const publisherConfiguration = z.object({
  id: z.string(),
  product_name: z.string(),
  publisher_name: z.string(),
  home_page_url: z.string().nullable(),
  contact_page_url: z.string().nullable(),
  privacy_notice_page_url: z.string().nullable(),
  contact_sales_email: z.string().nullable(),
  contact_sales_url: z.string().nullable(),
  contact_support_email: z.string().nullable(),
  contact_support_url: z.string().nullable(),
  mona_base_storage_url: z.string().nullable(),
  mona_subscription_state: z.string().nullable(),
  mona_subscription_is_being_configured: z.boolean(),
  is_setup_complete: z.boolean(),
  default_seating_config: seatingConfiguration,
  product_config: productConfiguration,
});

export type PublisherConfiguration = z.infer<typeof publisherConfiguration>;

export const configApi = makeApi([
  {
    method: "get",
    alias: "publisherConfigurationById",
    path: "/publisher/:publisherId/configuration",
    parameters: [
      {
        name: "publisherId",
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
    response: publisherConfiguration,
  },
  {
    method: "get",
    alias: "publisherConfigurations",
    path: "/publishers",
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: z.array(publisherConfiguration),
  },
  {
    method: "put",
    alias: "updatePublisherConfiguration",
    path: "/publisher/:publisherId/configuration",
    parameters: [
      {
        name: "publisherConfiguration",
        schema: publisherConfiguration,
        type: "Body",
      },
      {
        name: "publisherId",
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
    response: publisherConfiguration,
  },
  {
    method: "post",
    alias: "publisherConfiguration",
    path: "/publisher",
    parameters: [
      {
        name: "publisherConfiguration",
        schema: publisherConfiguration,
        type: "Body",
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: publisherConfiguration,
  },
]);
