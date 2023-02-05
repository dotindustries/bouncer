import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@dotinc/bouncer-db";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  subscription,
  Subscription,
  subscriptionPatch,
  SubscriptionPatch,
  subscriptionStates,
} from "../../schemas";

export const validateSubscriptionPatch = (
  sub: Subscription,
  patch: SubscriptionPatch
) => {
  if (
    !patch.subscription_name &&
    !patch.plan_id &&
    !patch.state &&
    !patch.admin_role_name &&
    !patch.user_role_name &&
    !patch.admin_name &&
    !patch.admin_email &&
    !patch.management_urls &&
    !patch.total_seats &&
    patch.is_being_configured === undefined &&
    patch.is_setup_complete === undefined &&
    !patch.seatingConfig &&
    !patch.subscriber_info &&
    !patch.tenant_name &&
    !patch.source_subscription
  ) {
    return (
      "No subscription properties have been patched; patchable subscription properties are " +
      `[subscription_name], [plan_id], [state] (must be ${Object.values(
        subscriptionStates._def.values
      )}), [tenant_name], ` +
      "[admin_role_name], [user_role_name], [management_urls], [total_seats] (if [total_seats] has already been set), " +
      "[is_being_configured], [is_setup_complete], [seating_config], [subscriber_info], [source_subscription], [admin_name], and [admin_email]."
    );
  } else {
    if (patch.total_seats != null) {
      if (sub.total_seats == null) {
        return "[total_seats] can be patched only on subscriptions that already have [total_seats] configured.";
      } else if (patch.total_seats <= sub.total_seats) {
        return `Patched [total_seats] (${patch.total_seats}) must be > existing total seats (${sub.total_seats}).`;
      }
    }
  }

  return undefined;
};

export const getSubscription = (
  prisma: PrismaClient,
  subscriptionId: string
) => {
  return prisma.subscription.findFirst({
    include: { seatingConfig: true },
    where: {
      id: subscriptionId,
    },
  });
};

const updateSubscription = async (
  prisma: PrismaClient,
  patch: SubscriptionPatch
) => {
  const sub = await prisma.subscription.findFirst({
    where: { id: patch.id },
    select: { product_id: true },
  });
  if (!sub) {
    throw new Error("Subscription not found");
  }

  const defaultSeatingConfig = await prisma.seatingConfig.findFirst({
    where: {
      owner_id: sub.product_id,
    },
  });

  if (!defaultSeatingConfig) {
    throw new Error("Product seating configuration not found");
  }

  return await prisma.subscription.update({
    include: {
      seatingConfig: true,
    },
    data: {
      plan_id: patch.plan_id,
      is_being_configured: patch.is_being_configured,
      source_subscription: JSON.stringify(patch.source_subscription),
      subscriber_info: JSON.stringify(patch.subscriber_info),
      subscription_name: patch.subscription_name,
      total_seats: patch.total_seats,
      admin_role_name: patch.admin_role_name,
      user_role_name: patch.user_role_name,
      is_setup_complete: patch.is_setup_complete,
      management_urls: JSON.stringify(patch.management_urls),
      admin_name: patch.admin_name,
      admin_email: patch.admin_email,
      tenant_name: patch.tenant_name,
      // FIXME: state might not change,
      //   we should consider only updating the timestamp if state is different.
      state: patch.state,
      state_last_updated_utc: new Date(),
      ...(patch.seatingConfig
        ? {
            seatingConfig: {
              update: {
                seat_reservation_expiry_in_days:
                  patch.seatingConfig.seat_reservation_expiry_in_days ??
                  defaultSeatingConfig.seat_reservation_expiry_in_days,
                default_seat_expiry_in_days:
                  patch.seatingConfig.default_seat_expiry_in_days ??
                  defaultSeatingConfig.default_seat_expiry_in_days,
                seating_strategy_name:
                  patch.seatingConfig.seating_strategy_name ??
                  defaultSeatingConfig.seating_strategy_name,
                limited_overflow_seating_enabled:
                  patch.seatingConfig.limited_overflow_seating_enabled ??
                  defaultSeatingConfig.limited_overflow_seating_enabled,
                // these were originally not updated on patch
                default_low_seat_warning_level_percent:
                  patch.seatingConfig.default_low_seat_warning_level_percent ??
                  defaultSeatingConfig.default_low_seat_warning_level_percent,
                low_seat_warning_level_pct:
                  patch.seatingConfig.low_seat_warning_level_pct ??
                  defaultSeatingConfig.low_seat_warning_level_pct,
              },
            },
          }
        : {}),
    },
    where: {
      id: patch.id,
    },
  });
};

const createSubscription = async (
  prisma: PrismaClient,
  sub: Subscription,
  productId: string
) => {
  const defaultSeatingConfig = await prisma.seatingConfig.findFirst({
    where: {
      owner_id: productId,
    },
  });

  if (!defaultSeatingConfig) {
    throw new Error("Product seating configuration not found");
  }

  const now = new Date();

  const seatConfig = !sub.seatingConfig
    ? defaultSeatingConfig
    : {
        ...defaultSeatingConfig,
        ...sub.seatingConfig,
      };

  const created = await prisma.$transaction([
    prisma.seatingConfig.create({
      data: {
        owner_id: sub.id,
        seat_reservation_expiry_in_days:
          seatConfig.seat_reservation_expiry_in_days,
        default_seat_expiry_in_days: seatConfig.default_seat_expiry_in_days,
        default_low_seat_warning_level_percent:
          seatConfig.default_low_seat_warning_level_percent,
        seating_strategy_name: seatConfig.seating_strategy_name,
        low_seat_warning_level_pct: seatConfig.low_seat_warning_level_pct,
        limited_overflow_seating_enabled:
          seatConfig.limited_overflow_seating_enabled,
      },
    }),
    prisma.subscription.create({
      include: {
        seatingConfig: true,
      },
      data: {
        id: sub.id,
        product_id: productId,
        subscriber_info: JSON.stringify(sub.subscriber_info),
        source_subscription: JSON.stringify(sub.source_subscription),
        is_setup_complete: sub.is_setup_complete ?? false,
        subscription_name: sub.subscription_name ?? sub.id,
        tenant_id: sub.tenant_id,
        tenant_name: sub.tenant_name,
        offer_id: sub.offer_id,
        plan_id: sub.plan_id,
        state: sub.state,
        admin_role_name: sub.admin_role_name,
        user_role_name: sub.user_role_name,
        management_urls: JSON.stringify(sub.management_urls),
        admin_name: sub.admin_name,
        admin_email: sub.admin_email,
        total_seats: sub.total_seats,
        is_being_configured: sub.is_being_configured,
        is_free_trial: sub.is_free_trial,
        is_test_subscription: sub.is_test_subscription,
        created_utc: sub.created_utc ?? now,
        state_last_updated_utc: sub.state_last_updated_utc ?? now,
      },
    }),
  ]);
  return created[1];
};

export const subscriptionRouter = createTRPCRouter({
  all: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/subscriptions" } })
    .input(z.object({ productId: z.string() }))
    .output(z.array(subscription))
    .query(({ ctx, input }) => {
      return ctx.prisma.subscription.findMany({
        include: { seatingConfig: true },
        where: { product_id: input.productId },
      });
    }),
  byId: protectedProcedure
    .meta({
      openapi: { method: "GET", path: "/subscriptions/{subscriptionId}" },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
      })
    )
    .output(subscription)
    .query(async ({ ctx, input }) => {
      try {
        const sub = await getSubscription(ctx.prisma, input.subscriptionId);
        if (!sub) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Subscription [${input.subscriptionId}] not found.`,
          });
        }
        return sub;
      } catch (e: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to get subscription [${input.subscriptionId}]: ${e.message}`,
        });
      }
    }),
  createSubscription: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/subscriptions/{productId}/{subscriptionId}",
      },
    })
    .input(
      z.object({
        productId: z.string(),
        subscriptionId: z.string(),
        subscription: subscription,
      })
    )
    .output(subscription)
    .mutation(async ({ ctx, input }) => {
      try {
        return await createSubscription(
          ctx.prisma,
          input.subscription,
          input.productId
        );
      } catch (e: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to save subscription [${input.subscription.id}]: ${e.message}`,
        });
      }
    }),
  updateSubscription: protectedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: "/subscriptions/{productId}/{subscriptionId}",
      },
    })
    .input(
      z.object({
        productId: z.string(),
        subscriptionId: z.string(),
        subscription: subscriptionPatch,
      })
    )
    .output(subscription)
    .mutation(async ({ ctx, input }) => {
      const sub = await getSubscription(ctx.prisma, input.subscriptionId);
      if (!sub) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Subscription [${input.subscriptionId}] not found.`,
        });
      }

      const validationError = validateSubscriptionPatch(
        sub,
        input.subscription
      );
      if (validationError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validationError,
        });
      }

      try {
        return await updateSubscription(ctx.prisma, input.subscription);
      } catch (e: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to update subscription [${sub.id}]: ${e.message}`,
        });
      }
    }),
});
