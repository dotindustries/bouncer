import { TRPCError } from "@trpc/server";
import { add, endOfMonth } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  PrismaClient,
  Seat as DbSeat,
  SeatOccupant as DbSeatOccupant,
  SeatReservation as DbSeatReservation,
  SeatType,
} from "@dotinc/bouncer-db";
import {
  user,
  SeatingConfig,
  User,
  Reservation,
  Subscription,
  reservation,
  SeatingSummary,
  Seat,
  seats,
  seat,
} from "../../schemas";
import { getSubscription } from "./subscriptions";

export const validateSeatReservation = (
  reservation: Reservation,
  inSubscription: Subscription
) => {
  if (!reservation.email || !reservation.tenant_id || !reservation.user_id) {
    return "Reservation ([user_id] and [tenant_id]) or [email] is required.";
  }
  if (inSubscription.state != "active")
    return (
      `Subscription [${inSubscription.id}] is currently [${inSubscription.state}]; ` +
      `seats can be reserved only in ['active'] subscriptions.`
    );
  return undefined;
};

export const validateSeatRequest = (inSubscription: Subscription) => {
  if (inSubscription.state != "active")
    return (
      `Subscription [${inSubscription.id}] is currently [${inSubscription.state}]; ` +
      `seats can be reserved only in ['active'] subscriptions.`
    );
  return undefined;
};

const getSeats = (
  prisma: PrismaClient,
  subscriptionId: string,
  byUserId?: string,
  byEmail?: string
) => {
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
            { expires_utc: { gt: new Date() } },
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
};

const getSeat = (
  prisma: PrismaClient,
  subscriptionId: string,
  seatId: string
) => {
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
};

const replaceSeat = async (prisma: PrismaClient, seat: Seat) => {
  const tx = [
    // if there's no reservation present in the update
    //   try to delete it
    !seat.reservation
      ? prisma.seatReservation.delete({
          where: {
            seat_id: seat.id,
          },
        })
      : prisma.seatReservation.upsert({
          create: {
            seat_id: seat.id,
            tenant_id: seat.reservation.tenant_id,
            user_id: seat.reservation.user_id,
            invite_url: seat.reservation.invite_url,
            email: seat.reservation.email,
          },
          update: {
            tenant_id: seat.reservation.tenant_id,
            user_id: seat.reservation.user_id,
            invite_url: seat.reservation.invite_url,
            email: seat.reservation.email,
          },
          where: { seat_id: seat.id },
        }),
    // if there's no occupant present in the update
    //   try to delete it
    !seat.occupant
      ? prisma.seatOccupant.delete({ where: { seat_id: seat.id } })
      : prisma.seatOccupant.upsert({
          create: {
            seat_id: seat.id,
            user_id: seat.occupant.user_id,
            tenant_id: seat.occupant.tenant_id,
            email: seat.occupant.email,
            user_name: seat.occupant.user_name,
          },
          update: {
            user_id: seat.occupant.user_id,
            tenant_id: seat.occupant.tenant_id,
            email: seat.occupant.email,
            user_name: seat.occupant.user_name,
          },
          where: { seat_id: seat.id },
        }),
    prisma.seat.upsert({
      include: {
        occupant: true,
        reservation: true,
      },
      create: {
        id: seat.id,
        created_utc: seat.created_utc,
        subscription_id: seat.subscription_id,
        expires_utc: seat.expires_utc,
        redeemed_utc: seat.redeemed_utc,
        seat_type: seat.seat_type,
        seating_strategy_name: seat.seating_strategy_name,
      },
      update: {
        expires_utc: seat.expires_utc,
        redeemed_utc: seat.redeemed_utc,
        seat_type: seat.seat_type,
        seating_strategy_name: seat.seating_strategy_name,
      },
      where: {
        id: seat.id,
      },
    }),
  ];

  const updated = await prisma.$transaction(tx);

  return updated[updated.length - 1] as Seat & {
    reservation: DbSeatReservation | null;
    occupant: DbSeatOccupant | null;
  }; // the last item is the seat
};

const createSeat = async (
  prisma: PrismaClient,
  seat: Seat,
  subscription: Subscription
) => {
  const actualSeatSummaryRows = await prisma.seat.groupBy({
    _count: { seat_type: true },
    by: ["seat_type"],
    where: {
      AND: [
        { subscription_id: subscription.id },
        {
          OR: [{ expires_utc: null }, { expires_utc: { gt: new Date() } }],
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
    actualSeatSummary.limitedSeatCount = actualSeatSummary.limitedSeatCount + 1;
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

  const createdSeat = await getSeat(prisma, subscription.id, seat.id);
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
};

const isReservedFor = (seat: Seat, user: User) =>
  seat.reservation &&
  (isReservedForUserId(seat, user) || isReservedForEmail(seat, user));

const equalsNotNil = (a: string | null, b: string | null) =>
  a && a.toLowerCase() === b?.toLowerCase();

const isReservedForUserId = (seat: Seat, user: User) => {
  const res = seat.reservation;

  return (
    res &&
    equalsNotNil(res.user_id, user.user_id) &&
    equalsNotNil(res.tenant_id, user.tenant_id)
  );
};

const isReservedForEmail = (seat: Seat, user: User) => {
  const res = seat.reservation;
  return res && equalsNotNil(res.email, user.email ?? null);
};

const calculateRedeemedSeatExpirationDate = (config: SeatingConfig) => {
  const now = new Date();

  switch (config.seating_strategy_name) {
    case "first_come_first_served":
      return add(now, { days: config.default_seat_expiry_in_days ?? 1 });
    case "monthly_active_user":
      return add(endOfMonth(now), { minutes: 1 }); // first day of next month
    default:
      throw new Error(
        `Seating strategy [${config.seating_strategy_name}] not supported.`
      );
  }
};

const calculateNewSeatExpirationDate = (config: SeatingConfig) => {
  const now = new Date();

  switch (config.seating_strategy_name) {
    case "first_come_first_served":
      return add(now, { days: config.default_seat_expiry_in_days ?? 1 });
    case "monthly_active_user":
      return add(endOfMonth(now), { minutes: 1 }); // first day of next month
    default:
      throw new Error(
        `Seating strategy [${config.seating_strategy_name}] not supported.`
      );
  }
};

export const seatsRouter = createTRPCRouter({
  bySubscription: protectedProcedure
    .meta({
      openapi: { method: "GET", path: "/subscriptions/{subscriptionId}/seats" },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        userId: z.string().optional(),
        userEmail: z.string().optional(),
      })
    )
    .output(seats)
    .query(({ ctx, input }) => {
      return getSeats(
        ctx.prisma,
        input.subscriptionId,
        input.userId,
        input.userEmail
      );
    }),
  byId: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/subscriptions/{subscriptionId}/seats/{seatId}",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        seatId: z.string(),
      })
    )
    .output(seat)
    .query(async ({ ctx, input }) => {
      const seat = await getSeat(
        ctx.prisma,
        input.subscriptionId,
        input.seatId
      );

      if (!seat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Seat [${input.seatId} at ${input.subscriptionId}] not found.`,
        });
      }

      return seat;
    }),
  userSeat: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/subscriptions/{subscriptionId}/user-seat/{tenantId}/{userId}",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        userId: z.string(),
        tenantId: z.string(),
      })
    )
    .output(seat)
    .query(async ({ ctx, input }) => {
      const seats = await getSeats(
        ctx.prisma,
        input.subscriptionId,
        input.userId
      );

      const userSeat = seats.find(
        (s) =>
          s.occupant?.user_id === input.userId &&
          s.occupant?.tenant_id === input.tenantId
      );

      if (!userSeat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No seat found for user [${input.tenantId}/${input.userId}] in subscription [${input.subscriptionId}].`,
        });
      }

      return userSeat;
    }),
  updateuOccupant: protectedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: "/subscriptions/{subscriptionId}/seats/{seatId}",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        seatId: z.string(),
        user,
      })
    )
    .output(seat)
    .mutation(async ({ ctx, input }) => {
      if (!input.user.user_id || !input.user.tenant_id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "[tenant_id] and [user_id] are required.",
        });
      }

      const subscription = await getSubscription(
        ctx.prisma,
        input.subscriptionId
      );
      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Subscription [${input.subscriptionId}] not found.`,
        });
      }

      const seatToUpdate = await getSeat(
        ctx.prisma,
        input.subscriptionId,
        input.seatId
      );
      if (!seatToUpdate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Seat [${input.seatId}] not found.`,
        });
      }

      if (
        seatToUpdate.occupant?.user_id !== input.user.user_id ||
        seatToUpdate.occupant?.tenant_id !== input.user.tenant_id
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Seat [${input.seatId}] is not currently occupied by user [${input.user.tenant_id}/${input.user.user_id}].`,
        });
      }

      if (input.user.email !== null && seatToUpdate.occupant) {
        seatToUpdate.occupant.email = input.user.email ?? null;
      }

      if (input.user.user_name !== null && seatToUpdate.occupant) {
        seatToUpdate.occupant.user_name = input.user.user_name ?? null;
      }

      return replaceSeat(ctx.prisma, seatToUpdate);
    }),
  redeemSeat: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/subscriptions/{subscriptionId}/seats/{seatId}/redeem",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        seatId: z.string(),
        user,
      })
    )
    .output(seat)
    .mutation(async ({ ctx, input }) => {
      if (!input.user.email || !input.user.user_id || !input.user.tenant_id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "[email], [tenant_id] and [user_id] are required.",
        });
      }

      // default username
      input.user.user_name ??= input.user.email;

      const subscription = await getSubscription(
        ctx.prisma,
        input.subscriptionId
      );
      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Subscription [${input.subscriptionId}] not found.`,
        });
      }

      const seatToUpdate = await getSeat(
        ctx.prisma,
        input.subscriptionId,
        input.seatId
      );
      if (!seatToUpdate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Seat [${input.seatId}] not found.`,
        });
      }

      if (isReservedFor(seatToUpdate, input.user)) {
        if (!subscription.seatingConfig) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Seating configuration [${input.subscriptionId}] not found.`,
          });
        }
        // update object to be saved
        seatToUpdate.reservation = null;
        seatToUpdate.occupant = {
          seat_id: input.seatId,
          email: input.user.email ?? null,
          tenant_id: input.user.tenant_id,
          user_id: input.user.user_id,
          user_name: input.user.user_name ?? null,
        };
        seatToUpdate.expires_utc = calculateRedeemedSeatExpirationDate(
          subscription.seatingConfig
        );
        seatToUpdate.redeemed_utc = new Date();
        seatToUpdate.seat_type = "standard";

        // What happens if between the time a seat is reserved and the time it's redeemed
        // the subscription's seating strategy (or seating configuration for that matter) is changed? Right now, we honor
        // the subscription's current seating strategy but it's definitely open for discussion...

        seatToUpdate.seating_strategy_name =
          subscription.seatingConfig.seating_strategy_name;

        const updatedSeat = await replaceSeat(ctx.prisma, seatToUpdate);

        console.log(
          `Seat [${input.seatId}] reservation succesfully redeemed in subscription [${input.subscriptionId}] by user [${input.user.user_id}]. ` +
            `This seat expires at [${updatedSeat.expires_utc}].`
        );

        // TODO: push event seat_redeemed[subscription, seat]

        return updatedSeat;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Seat [${input.seatId}] is not reserved for this user.`,
        });
      }
    }),
  releaseSeat: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/subscriptions/{subscriptionId}/seats/{seatId}",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        seatId: z.string(),
      })
    )
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      const subscription = await getSubscription(
        ctx.prisma,
        input.subscriptionId
      );

      const seat = await getSeat(
        ctx.prisma,
        input.subscriptionId,
        input.seatId
      );
      if (seat && subscription) {
        await ctx.prisma.$transaction([
          ctx.prisma.seatOccupant.delete({ where: { seat_id: input.seatId } }),
          ctx.prisma.seatReservation.delete({
            where: { seat_id: input.seatId },
          }),
          ctx.prisma.seat.delete({ where: { id: input.seatId } }), // FIXME: composite key add subscriptionId?
        ]);

        // TODO: push event seat_released[subscription, seat]
      }
    }),
  reserveSeat: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/subscriptions/{subscriptionId}/seats/{seatId}/reserve",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        seatId: z.string(),
        reservation,
      })
    )
    .output(seat)
    .mutation(async ({ ctx, input }) => {
      const subscription = await getSubscription(
        ctx.prisma,
        input.subscriptionId
      );
      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Subscription [${input.subscriptionId}] not found.`,
        });
      }

      const validationError = validateSeatReservation(
        input.reservation,
        subscription
      );
      if (validationError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validationError,
        });
      }

      const existingSeat = await getSeat(
        ctx.prisma,
        input.subscriptionId,
        input.seatId
      );
      if (existingSeat) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Seat [${input.seatId}] already exists.`,
        });
      }

      if (!subscription.seatingConfig) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Seating configuration [${input.subscriptionId}] not found.`,
        });
      }

      const now = new Date();
      const seat: Seat = {
        expires_utc: add(now, {
          days: subscription.seatingConfig.seat_reservation_expiry_in_days ?? 1,
        }),
        created_utc: now,
        subscription_id: input.subscriptionId,
        reservation: input.reservation,
        id: input.seatId,
        seating_strategy_name: subscription.seatingConfig.seating_strategy_name,
        seat_type: "standard",
        redeemed_utc: null,
        occupant: null,
      };

      const createdSeat = await createSeat(ctx.prisma, seat, subscription);

      // TODO: publish seat warning events
      // await req.events.publishSeatWarningEvents(subscription, createSeat.seatingSummary)

      if (createdSeat.isSeatCreated) {
        console.log(
          `Seat [${input.seatId}] successfully reserved in subscription [${input.subscriptionId}]. ` +
            `This reservation expires at [${seat.expires_utc}].`
        );
        // TODO: push event seat_reserved[subscription, seat, createSeat.seatingSummary]
        return seat;
      }

      console.log(
        `Can't reserve seat [${input.seatId}] in subscription [${input.subscriptionId}]. No more seats available.`
      );

      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No seats available to reserve in subscription [${input.subscriptionId}].`,
      });
    }),
  requestSeat: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/subscriptions/{subscriptionId}/seats/{seatId}/request",
      },
    })
    .input(
      z.object({
        subscriptionId: z.string(),
        seatId: z.string(),
        user,
      })
    )
    .output(seat)
    .mutation(async ({ ctx, input }) => {
      const subscription = await getSubscription(
        ctx.prisma,
        input.subscriptionId
      );
      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Subscription [${input.subscriptionId}] not found.`,
        });
      }

      const validationError = validateSeatRequest(subscription);
      if (validationError !== undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validationError,
        });
      }

      const existingSeat = await getSeat(
        ctx.prisma,
        input.subscriptionId,
        input.seatId
      );
      if (existingSeat) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Seat [${input.seatId}] already exists.`,
        });
      }

      if (!subscription.seatingConfig) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Seating configuration [${input.subscriptionId}] not found.`,
        });
      }

      // default username
      input.user.user_name ??= input.user.email;

      const seat: Seat = {
        created_utc: new Date(),
        expires_utc: calculateNewSeatExpirationDate(subscription.seatingConfig),
        occupant: {
          seat_id: input.seatId,
          tenant_id: input.user.tenant_id,
          email: input.user.email ?? null,
          user_id: input.user.user_id,
          user_name: input.user.user_name ?? null,
        },
        id: input.seatId,
        seating_strategy_name: subscription.seatingConfig.seating_strategy_name,
        seat_type: "standard",
        subscription_id: input.subscriptionId,
        reservation: null,
        redeemed_utc: null,
      };

      const createdSeat = await createSeat(ctx.prisma, seat, subscription);

      // TODO: publish seat warning events
      // await req.events.publishSeatWarningEvents(subscription, createSeat.seatingSummary)

      if (createdSeat.isSeatCreated) {
        console.log(
          `Seat [${input.seatId}] successfully provided in subscription [${input.subscriptionId}] to user [${input.user.user_id}]. ` +
            `This seat expires at [${seat.expires_utc}].`
        );
        // TODO: push event seat_provided[subscription, seat, createSeat.seatingSummary]
        return seat;
      } else if (subscription.seatingConfig.limited_overflow_seating_enabled) {
        // try it again without a total seats count to create a limited seat
        seat.expires_utc = add(new Date(), { days: 1 });
        // limited seats only last for one day
        seat.seat_type = "limited";

        const createLimitedSeat = await createSeat(
          ctx.prisma,
          seat,
          subscription
        );

        if (createLimitedSeat.isSeatCreated) {
          console.log(
            `Limited seat [${input.seatId}] successfully provided in subscription [${input.subscriptionId}] to user [${input.user.user_id}]. ` +
              `This seat expires at [${seat.expires_utc}].`
          );
          // TODO: push event seat_provided[subscription, seat, createLimitedSeat.seatingSummary]
          return seat;
        }
      }

      // at this point, we were'nt able to get a seat within the provided subscription
      console.log(
        `Could not provide seat in subscription [${input.subscriptionId}]. No more seats available.`
      );

      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No seats available in subscription [${input.subscriptionId}]`,
      });
    }),
});
