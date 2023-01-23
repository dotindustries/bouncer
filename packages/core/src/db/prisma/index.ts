import type { Repository } from "../index";
import {
  prisma,
  Seat,
  SeatingStrategyName,
  SeatOccupant,
  SeatReservation,
  SeatType,
} from "@dotinc/bouncer-db";
import { getMysqlFormattedDateTime, SeatingSummary } from "../../common";

export const PrismaRepository: Repository = {
  getProduct: (productId) => {
    return prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        seatingConfig: true,
      },
    });
  },
  getProducts: () => {
    return prisma.product.findMany({
      include: {
        seatingConfig: true,
      },
    });
  },
  updateProduct: (update) => {
    return prisma.product.update({
      include: {
        seatingConfig: true,
      },
      data: {
        product_name: update.product_name,
        publisher_name: update.publisher_name,
        home_page_url: update.home_page_url,
        contact_page_url: update.contact_page_url,
        privacy_notice_page_url: update.privacy_notice_page_url,
        contact_sales_email: update.contact_sales_email,
        contact_sales_url: update.contact_sales_url,
        contact_support_email: update.contact_support_email,
        contact_support_url: update.contact_support_url,
        is_setup_complete: update.is_setup_complete,
        on_access_denied_url: update.on_access_denied_url,
        on_access_granted_url: update.on_access_granted_url,
        on_no_seat_available_url: update.on_no_seat_available_url,
        on_no_subscriptions_found_url: update.on_no_subscriptions_found_url,
        on_subscription_canceled_url: update.on_subscription_canceled_url,
        on_subscription_not_found_url: update.on_subscription_not_found_url,
        on_subscription_not_ready_url: update.on_subscription_not_ready_url,
        on_subscription_suspended_url: update.on_subscription_suspended_url,
        seatingConfig: {
          update: {
            default_seat_expiry_in_days:
              update.seatingConfig.default_seat_expiry_in_days,
            default_low_seat_warning_level_percent:
              update.seatingConfig.default_low_seat_warning_level_percent,
            limited_overflow_seating_enabled:
              update.seatingConfig.limited_overflow_seating_enabled,
            low_seat_warning_level_pct:
              update.seatingConfig.low_seat_warning_level_pct,
            seat_reservation_expiry_in_days:
              update.seatingConfig.seat_reservation_expiry_in_days,
            seating_strategy_name: update.seatingConfig
              .seating_strategy_name as unknown as SeatingStrategyName,
          },
        },
      },
      where: {
        id: update.id,
      },
    });
  },
  createProduct: async (config, ownerId) => {
    console.log("creating configuration", config.id);
    const created = await prisma.$transaction([
      prisma.seatingConfig.create({
        data: {
          owner_id: ownerId,
          default_low_seat_warning_level_percent:
            config.seatingConfig.default_low_seat_warning_level_percent,
          seating_strategy_name: config.seatingConfig.seating_strategy_name,
          low_seat_warning_level_pct:
            config.seatingConfig.low_seat_warning_level_pct,
          limited_overflow_seating_enabled:
            config.seatingConfig.limited_overflow_seating_enabled,
          seat_reservation_expiry_in_days:
            config.seatingConfig.seat_reservation_expiry_in_days,
          default_seat_expiry_in_days:
            config.seatingConfig.default_seat_expiry_in_days,
        },
      }),
      prisma.product.create({
        include: {
          seatingConfig: true,
        },
        data: {
          id: config.id,
          product_name: config.product_name,
          on_access_denied_url: config.on_access_denied_url,
          on_access_granted_url: config.on_access_granted_url,
          on_no_seat_available_url: config.on_no_seat_available_url,
          on_no_subscriptions_found_url: config.on_no_subscriptions_found_url,
          on_subscription_canceled_url: config.on_subscription_canceled_url,
          on_subscription_not_found_url: config.on_subscription_not_found_url,
          on_subscription_not_ready_url: config.on_subscription_not_ready_url,
          on_subscription_suspended_url: config.on_subscription_suspended_url,
          publisher_name: config.publisher_name,
          home_page_url: config.home_page_url,
          contact_page_url: config.contact_page_url,
          privacy_notice_page_url: config.privacy_notice_page_url,
          contact_sales_email: config.contact_sales_email,
          contact_sales_url: config.contact_sales_url,
          contact_support_email: config.contact_support_email,
          contact_support_url: config.contact_support_url,
          is_setup_complete: config.is_setup_complete,
          owner_id: ownerId,
        },
      }),
    ]);

    return created[1];
  },
  getSeat: (seatId, subscriptionId) => {
    return prisma.seat.findFirst({
      include: {
        occupant: true,
        reservation: true,
      },
      where: {
        id: seatId,
        subscription_id: subscriptionId,
      },
    });
  },
  getSeats: async (subscriptionId, byUserId, byEmail) => {
    return prisma.seat.findMany({
      include: {
        occupant: true,
        reservation: true,
      },
      where: {
        AND: [
          {
            subscription_id: subscriptionId,
          },
          {
            OR: [
              {
                expires_utc: null,
              },
              { expires_utc: { gt: getMysqlFormattedDateTime() } },
            ],
          },
          {
            ...(byUserId
              ? {
                  OR: [
                    {
                      occupant: {
                        user_id: byUserId,
                      },
                    },
                    {
                      reservation: {
                        user_id: byUserId,
                      },
                    },
                  ],
                }
              : byEmail
              ? {
                  OR: [
                    {
                      occupant: {
                        email: byEmail,
                      },
                    },
                    {
                      reservation: {
                        email: byEmail,
                      },
                    },
                  ],
                }
              : {}),
          },
        ],
      },
    });
  },
  replaceSeat: async (update) => {
    const tx = [
      // if there's no reservation present in the update
      //   try to delete it
      !update.reservation
        ? prisma.seatReservation.delete({
            where: {
              seat_id: update.id,
            },
          })
        : prisma.seatReservation.upsert({
            create: {
              seat_id: update.id,
              tenant_id: update.reservation.tenant_id,
              user_id: update.reservation.user_id,
              invite_url: update.reservation.invite_url,
              email: update.reservation.email,
            },
            update: {
              tenant_id: update.reservation.tenant_id,
              user_id: update.reservation.user_id,
              invite_url: update.reservation.invite_url,
              email: update.reservation.email,
            },
            where: { seat_id: update.id },
          }),
      // if there's no occupant present in the update
      //   try to delete it
      !update.occupant
        ? prisma.seatOccupant.delete({ where: { seat_id: update.id } })
        : prisma.seatOccupant.upsert({
            create: {
              seat_id: update.id,
              user_id: update.occupant.user_id,
              tenant_id: update.occupant.tenant_id,
              email: update.occupant.email,
              user_name: update.occupant.user_name,
            },
            update: {
              user_id: update.occupant.user_id,
              tenant_id: update.occupant.tenant_id,
              email: update.occupant.email,
              user_name: update.occupant.user_name,
            },
            where: { seat_id: update.id },
          }),
      prisma.seat.upsert({
        include: {
          occupant: true,
          reservation: true,
        },
        create: {
          id: update.id,
          created_utc: update.created_utc,
          subscription_id: update.subscription_id,
          expires_utc: update.expires_utc,
          redeemed_utc: update.redeemed_utc,
          seat_type: update.seat_type,
          seating_strategy_name: update.seating_strategy_name,
        },
        update: {
          expires_utc: update.expires_utc,
          redeemed_utc: update.redeemed_utc,
          seat_type: update.seat_type,
          seating_strategy_name: update.seating_strategy_name,
        },
        where: {
          id: update.id,
        },
      }),
    ];

    const updated = await prisma.$transaction(tx);

    return updated[updated.length - 1] as Seat & {
      reservation: SeatReservation | null;
      occupant: SeatOccupant | null;
    }; // the last item is the seat
  },
  createSeat: async (seat, subscription) => {
    const actualSeatSummaryRows = await prisma.seat.groupBy({
      _count: { seat_type: true },
      by: ["seat_type"],
      where: {
        AND: [
          { subscription_id: subscription.id },
          {
            OR: [
              { expires_utc: null },
              { expires_utc: { gt: getMysqlFormattedDateTime() } },
            ],
          },
        ],
      },
    });

    const actualSeatSummary: SeatingSummary = {
      standardSeatCount:
        actualSeatSummaryRows.find((r) => r.seat_type === SeatType.standard)
          ?._count.seat_type ?? 0,
      limitedSeatCount:
        actualSeatSummaryRows.find((r) => r.seat_type === SeatType.limited)
          ?._count.seat_type ?? 0,
    };

    console.log("seat_summary", JSON.stringify({ actualSeatSummary }));

    if (seat.seat_type === SeatType.standard) {
      if (
        subscription.total_seats &&
        subscription.total_seats <= actualSeatSummary.standardSeatCount
      ) {
        return {
          isSeatCreated: false,
          seatingSummary: actualSeatSummary,
        };
      }

      actualSeatSummary.standardSeatCount =
        actualSeatSummary.standardSeatCount + 1;
    } else {
      actualSeatSummary.limitedSeatCount =
        actualSeatSummary.limitedSeatCount + 1;
    }
    console.log("modified seat_summary", JSON.stringify(actualSeatSummary));

    await prisma.$transaction([
      prisma.seatSummary.upsert({
        create: {
          subscription_id: subscription.id,
          standard_seat_count: actualSeatSummary.standardSeatCount,
          limited_seat_count: actualSeatSummary.limitedSeatCount,
        },
        update: {
          standard_seat_count: actualSeatSummary.standardSeatCount,
          limited_seat_count: actualSeatSummary.limitedSeatCount,
        },
        where: {
          subscription_id: subscription.id,
        },
      }),
      prisma.seat.create({
        data: {
          id: seat.id,
          created_utc: seat.created_utc,
          subscription_id: seat.subscription_id,
          expires_utc: seat.expires_utc,
          redeemed_utc: seat.redeemed_utc,
          seat_type: seat.seat_type,
          seating_strategy_name: seat.seating_strategy_name,
          ...(seat.occupant
            ? {
                occupant: {
                  create: {
                    user_id: seat.occupant.user_id,
                    tenant_id: seat.occupant.tenant_id,
                    email: seat.occupant.email,
                    user_name: seat.occupant.user_name,
                  },
                },
              }
            : {}),
          ...(seat.reservation
            ? {
                reservation: {
                  create: {
                    tenant_id: seat.reservation.tenant_id,
                    user_id: seat.reservation.user_id,
                    invite_url: seat.reservation.invite_url,
                    email: seat.reservation.email,
                  },
                },
              }
            : {}),
        },
      }),
    ]);

    const createdSeat = await PrismaRepository.getSeat(
      seat.id,
      subscription.id
    );
    if (!createdSeat) {
      console.error(
        "we failed to get a subscription which we just updated... wtf?"
      );
      throw new Error(
        "we failed to find the just updated subscription, please call us."
      );
    }

    return {
      isSeatCreated: true,
      seatingSummary: actualSeatSummary,
      createdSeat,
    };
  },
  deleteSeat: async (seatId, _subscriptionId) => {
    await prisma.$transaction([
      prisma.seatOccupant.delete({ where: { seat_id: seatId } }),
      prisma.seatReservation.delete({ where: { seat_id: seatId } }),
      prisma.seat.delete({ where: { id: seatId } }), // FIXME: composite key add subscriptionId?
    ]);
  },
  getSubscription: (subscriptionId) => {
    return prisma.subscription.findFirst({
      include: { seatingConfig: true },
      where: {
        id: subscriptionId,
      },
    });
  },
  getSubscriptions: async (productId) => {
    return prisma.subscription.findMany({
      include: { seatingConfig: true },
      where: { product_id: productId },
    });
  },
  createSubscription: async (productId, sub) => {
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
          created_utc: sub.created_utc ?? getMysqlFormattedDateTime(now),
          state_last_updated_utc:
            sub.state_last_updated_utc ?? getMysqlFormattedDateTime(now),
        },
      }),
    ]);
    return created[1];
  },
  updateSubscription: async (patch) => {
    const sub = await prisma.subscription.findFirst({
      where: { id: patch.subscription_id },
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
        // TODO: state might not change,
        //   we should consider only updating the timestamp if state is different.
        state: patch.state,
        state_last_updated_utc: getMysqlFormattedDateTime(),
        ...(patch.seating_config
          ? {
              seatingConfig: {
                update: {
                  seat_reservation_expiry_in_days:
                    patch.seating_config.seat_reservation_expiry_in_days ??
                    defaultSeatingConfig.seat_reservation_expiry_in_days,
                  default_seat_expiry_in_days:
                    patch.seating_config.default_seat_expiry_in_days ??
                    defaultSeatingConfig.default_seat_expiry_in_days,
                  seating_strategy_name:
                    patch.seating_config.seating_strategy_name ??
                    defaultSeatingConfig.seating_strategy_name,
                  limited_overflow_seating_enabled:
                    patch.seating_config.limited_overflow_seating_enabled ??
                    defaultSeatingConfig.limited_overflow_seating_enabled,
                  // these were originally not updated on patch
                  default_low_seat_warning_level_percent:
                    patch.seating_config
                      .default_low_seat_warning_level_percent ??
                    defaultSeatingConfig.default_low_seat_warning_level_percent,
                  low_seat_warning_level_pct:
                    patch.seating_config.low_seat_warning_level_pct ??
                    defaultSeatingConfig.low_seat_warning_level_pct,
                },
              },
            }
          : {}),
      },
      where: {
        id: patch.subscription_id,
      },
    });
  },
};
