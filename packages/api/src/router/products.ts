import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { SeatingStrategyName } from "@dotinc/bouncer-db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { productConfig } from "@dotinc/bouncer-core";
import { deployEventTypes } from "@dotinc/bouncer-events";

export const productsRouter = createTRPCRouter({
  all: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/products" } })
    .input(z.void())
    .output(z.array(productConfig))
    .query(({ ctx }) => {
      return ctx.prisma.product.findMany({
        include: {
          seatingConfig: true,
        },
      });
    }),
  byId: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/products/{productId}/config" } })
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .output(productConfig)
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findFirst({
        where: {
          id: input.productId,
        },
        include: {
          seatingConfig: true,
        },
      });
      if (!product) {
        throw new TRPCError({
          message: `Product [${input.productId}] not found.`,
          code: "NOT_FOUND",
        });
      }

      return product;
    }),
  update: protectedProcedure
    .meta({ openapi: { method: "PUT", path: "/products/{productId}/config" } })
    .input(
      z.object({
        productId: z.string(),
        productConfig,
      })
    )
    .output(productConfig)
    .mutation(({ ctx, input }) => {
      if (input.productId !== input.productConfig.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid product configuration [${input.productId}] doesn't match id in patch [${input.productConfig.id}]`,
        });
      }

      return ctx.prisma.product.update({
        include: {
          seatingConfig: true,
        },
        data: {
          product_name: input.productConfig.product_name,
          publisher_name: input.productConfig.publisher_name,
          home_page_url: input.productConfig.home_page_url,
          contact_page_url: input.productConfig.contact_page_url,
          privacy_notice_page_url: input.productConfig.privacy_notice_page_url,
          contact_sales_email: input.productConfig.contact_sales_email,
          contact_sales_url: input.productConfig.contact_sales_url,
          contact_support_email: input.productConfig.contact_support_email,
          contact_support_url: input.productConfig.contact_support_url,
          is_setup_complete: input.productConfig.is_setup_complete,
          on_access_denied_url: input.productConfig.on_access_denied_url,
          on_access_granted_url: input.productConfig.on_access_granted_url,
          on_no_seat_available_url:
            input.productConfig.on_no_seat_available_url,
          on_no_subscriptions_found_url:
            input.productConfig.on_no_subscriptions_found_url,
          on_subscription_canceled_url:
            input.productConfig.on_subscription_canceled_url,
          on_subscription_not_found_url:
            input.productConfig.on_subscription_not_found_url,
          on_subscription_not_ready_url:
            input.productConfig.on_subscription_not_ready_url,
          on_subscription_suspended_url:
            input.productConfig.on_subscription_suspended_url,
          seatingConfig: {
            update: {
              default_seat_expiry_in_days:
                input.productConfig.seatingConfig.default_seat_expiry_in_days,
              default_low_seat_warning_level_percent:
                input.productConfig.seatingConfig
                  .default_low_seat_warning_level_percent,
              limited_overflow_seating_enabled:
                input.productConfig.seatingConfig
                  .limited_overflow_seating_enabled,
              low_seat_warning_level_pct:
                input.productConfig.seatingConfig.low_seat_warning_level_pct,
              seat_reservation_expiry_in_days:
                input.productConfig.seatingConfig
                  .seat_reservation_expiry_in_days,
              seating_strategy_name: input.productConfig.seatingConfig
                .seating_strategy_name as unknown as SeatingStrategyName,
            },
          },
        },
        where: {
          id: input.productId,
        },
      });
    }),
  create: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/products" } })
    .input(productConfig.omit({ owner_id: true }))
    .output(productConfig)
    .mutation(async ({ ctx, input }) => {
      await deployEventTypes();

      console.log("creating configuration", input.id);
      const created = await ctx.prisma.$transaction([
        ctx.prisma.seatingConfig.create({
          data: {
            owner_id: input.id,
            default_low_seat_warning_level_percent:
              input.seatingConfig.default_low_seat_warning_level_percent,
            seating_strategy_name: input.seatingConfig.seating_strategy_name,
            low_seat_warning_level_pct:
              input.seatingConfig.low_seat_warning_level_pct,
            limited_overflow_seating_enabled:
              input.seatingConfig.limited_overflow_seating_enabled,
            seat_reservation_expiry_in_days:
              input.seatingConfig.seat_reservation_expiry_in_days,
            default_seat_expiry_in_days:
              input.seatingConfig.default_seat_expiry_in_days,
          },
        }),
        ctx.prisma.product.create({
          include: {
            seatingConfig: true,
          },
          data: {
            id: input.id,
            product_name: input.product_name,
            on_access_denied_url: input.on_access_denied_url,
            on_access_granted_url: input.on_access_granted_url,
            on_no_seat_available_url: input.on_no_seat_available_url,
            on_no_subscriptions_found_url: input.on_no_subscriptions_found_url,
            on_subscription_canceled_url: input.on_subscription_canceled_url,
            on_subscription_not_found_url: input.on_subscription_not_found_url,
            on_subscription_not_ready_url: input.on_subscription_not_ready_url,
            on_subscription_suspended_url: input.on_subscription_suspended_url,
            publisher_name: input.publisher_name,
            home_page_url: input.home_page_url,
            contact_page_url: input.contact_page_url,
            privacy_notice_page_url: input.privacy_notice_page_url,
            contact_sales_email: input.contact_sales_email,
            contact_sales_url: input.contact_sales_url,
            contact_support_email: input.contact_support_email,
            contact_support_url: input.contact_support_url,
            is_setup_complete: input.is_setup_complete,
            owner_id: ctx.auth.id,
          },
        }),
      ]);

      await ctx.svix.application.create({
        uid: input.id,
        name: input.product_name,
      });

      return created[1];
    }),
});
