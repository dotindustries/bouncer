import { ctx } from "./../context";
import {
  User,
  Seat,
  seatsApi,
  SeatingConfiguration,
  validateSeatRequest,
  validateSeatReservation,
  getMysqlFormattedDateTime,
} from "@dotinc/bouncer-core";
import { add, endOfMonth } from "date-fns";

export const seatsRouter = ctx.router(seatsApi);

seatsRouter.get(
  "/subscriptions/:subscriptionId/seats/:seatId",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const seatId = req.params.seatId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof seatId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid seatId",
      });
    }

    const seat = await req.repo.getSeat(seatId, subscriptionId);
    if (!seat) {
      return res.status(404).json({
        code: 400,
        message: `Seat [${seatId} at ${subscriptionId}] not found.`,
        id: seatId,
      });
    }

    return res.status(200).json(seat);
  }
);

seatsRouter.get("/subscriptions/:subscriptionId/seats", async (req, res) => {
  if (typeof req.params.subscriptionId === "number") {
    return res.status(400).json({
      code: 400,
      message: "Invalid subscriptionId",
    });
  }

  const seats = await req.repo.getSeats(
    req.params.subscriptionId,
    req.query.userId,
    req.query.userEmail
  );

  return res.status(200).json(seats);
});

seatsRouter.get(
  "/subscriptions/:subscriptionId/user-seat/:tenantId/:userId",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const tenantId = req.params.tenantId;
    const userId = req.params.userId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof tenantId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid tenantId",
      });
    }
    if (typeof userId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid userId",
      });
    }

    const seats = await req.repo.getSeats(subscriptionId, userId);

    const userSeat = seats.find(
      (s) =>
        s.occupant?.user_id === userId && s.occupant?.tenant_id === tenantId
    );

    if (!userSeat) {
      return res.status(404).json({
        code: 404,
        message: `No seat found for user [${tenantId}/${userId}] in subscription [${subscriptionId}].`,
        id: userId,
      });
    }

    return res.status(200).json(userSeat);
  }
);

seatsRouter.patch(
  "/subscriptions/:subscriptionId/seats/:seatId",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const seatId = req.params.seatId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof seatId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid seatId",
      });
    }

    const user = req.body;

    if (!user.user_id || !user.tenant_id) {
      return res.status(400).json({
        code: 400,
        message: "[tenant_id] and [user_id] are required.",
      });
    }

    const subscription = await req.repo.getSubscription(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        code: 404,
        message: `Subscription [${subscriptionId}] not found.`,
        id: subscriptionId,
      });
    }

    const seat = await req.repo.getSeat(seatId, subscriptionId);
    if (!seat) {
      return res.status(404).json({
        code: 404,
        message: `Seat [${seatId}] not found.`,
        id: seatId,
      });
    }

    if (
      seat.occupant?.user_id !== user.user_id ||
      seat.occupant?.tenant_id !== user.tenant_id
    ) {
      return res.status(400).json({
        code: 400,
        message: `Seat [${seatId}] is not currently occupied by user [${user.tenant_id}/${user.user_id}].`,
      });
    }

    if (user.email !== null && seat.occupant) {
      seat.occupant.email = user.email;
    }

    if (user.user_name !== null && seat.occupant) {
      seat.occupant.user_name = user.user_name;
    }

    const update = await req.repo.replaceSeat(seat);

    return res.status(200).json(update);
  }
);

seatsRouter.post(
  "/subscriptions/:subscriptionId/seats/:seatId/redeem",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const seatId = req.params.seatId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof seatId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid seatId",
      });
    }

    const user = req.body;

    if (!user.email || !user.user_id || !user.tenant_id) {
      return res.status(400).json({
        code: 400,
        message: "[email], [tenant_id] and [user_id] are required.",
      });
    }

    // default username
    user.user_name ??= user.email;

    const subscription = await req.repo.getSubscription(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        code: 404,
        message: `Subscription [${subscriptionId}] not found.`,
        id: subscriptionId,
      });
    }

    const seat = await req.repo.getSeat(seatId, subscriptionId);
    if (!seat) {
      return res.status(404).json({
        code: 404,
        message: `Seat [${seatId}] not found.`,
        id: seatId,
      });
    }

    if (isReservedFor(seat, user)) {
      if (!subscription.seating_config) {
        return res.status(404).json({
          code: 404,
          message: `Seating configuration [${subscriptionId}] not found.`,
          id: subscriptionId,
        });
      }
      // update object to be saved
      seat.reservation = null;
      seat.occupant = user;
      seat.expires_utc = getMysqlFormattedDateTime(
        calculateRedeemedSeatExpirationDate(subscription.seating_config)
      );
      seat.redeemed_utc = getMysqlFormattedDateTime(new Date());
      seat.seat_type = "standard";

      // What happens if between the time a seat is reserved and the time it's redeemed
      // the subscription's seating strategy (or seating configuration for that matter) is changed? Right now, we honor
      // the subscription's current seating strategy but it's definitely open for discussion...

      seat.seating_strategy_name =
        subscription.seating_config.seating_strategy_name;

      const updatedSeat = await req.repo.replaceSeat(seat);

      console.log(
        `Seat [${seatId}] reservation succesfully redeemed in subscription [${subscriptionId}] by user [${user.user_id}]. ` +
          `This seat expires at [${updatedSeat.expires_utc}].`
      );

      // TODO: push event seat_redeemed[subscription, seat]

      return res.status(200).json(updatedSeat);
    } else {
      return res.status(404).json({
        code: 404,
        message: `Seat [${seatId}] is not reserved for this user.`,
        id: subscriptionId,
      });
    }
  }
);

const isReservedFor = (seat: Seat, user: User) =>
  seat.reservation &&
  (isReservedForUserId(seat, user) || isReservedForEmail(seat, user));

const equalsNotNil = (a: string | null, b: string | null) =>
  a && a.toLowerCase() === b?.toLowerCase();

const isReservedForUserId = (seat: Seat, user: User) => {
  const identifier = seat.reservation?.identifier;

  return (
    identifier &&
    "user_id" in identifier &&
    equalsNotNil(identifier.user_id, user.user_id) &&
    equalsNotNil(identifier.tenant_id, user.tenant_id)
  );
};

const isReservedForEmail = (seat: Seat, user: User) => {
  const reservation = seat.reservation;
  return (
    reservation &&
    "email" in reservation.identifier &&
    equalsNotNil(reservation.identifier.email, user.email)
  );
};

const calculateRedeemedSeatExpirationDate = (config: SeatingConfiguration) => {
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

seatsRouter.post(
  "/subscriptions/:subscriptionId/seats/:seatId/request",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const seatId = req.params.seatId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof seatId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid seatId",
      });
    }

    const user = req.body;

    const subscription = await req.repo.getSubscription(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        code: 404,
        message: `Subscription [${subscriptionId}] not found.`,
        id: subscriptionId,
      });
    }

    const validationError = validateSeatRequest(subscription);
    if (validationError !== undefined) {
      return res.status(400).json({
        code: 400,
        message: validationError,
      });
    }

    const existingSeat = await req.repo.getSeat(seatId, subscriptionId);
    if (existingSeat) {
      return res.status(409).json({
        code: 409,
        message: `Seat [${seatId}] already exists.`,
      });
    }

    if (!subscription.seating_config) {
      return res.status(404).json({
        code: 404,
        message: `Seating configuration [${subscriptionId}] not found.`,
        id: subscriptionId,
      });
    }

    // default username
    user.user_name ??= user.email;

    const seat: Seat = {
      created_utc: getMysqlFormattedDateTime(new Date()),
      expires_utc: getMysqlFormattedDateTime(
        calculateNewSeatExpirationDate(subscription.seating_config)
      ),
      occupant: user,
      seat_id: seatId,
      seating_strategy_name: subscription.seating_config.seating_strategy_name,
      seat_type: "standard",
      subscription_id: subscriptionId,
      reservation: null,
      redeemed_utc: null,
    };

    const createSeat = await req.repo.createSeat(seat, subscription);

    // TODO: publish seat warning events
    // await req.events.publishSeatWarningEvents(subscription, createSeat.seatingSummary)

    if (createSeat.isSeatCreated) {
      console.log(
        `Seat [${seatId}] successfully provided in subscription [${subscriptionId}] to user [${user.user_id}]. ` +
          `This seat expires at [${seat.expires_utc}].`
      );
      // TODO: push event seat_provided[subscription, seat, createSeat.seatingSummary]
      return res.status(200).json(seat);
    } else if (subscription.seating_config.limited_overflow_seating_enabled) {
      // try it again without a total seats count to create a limited seat
      seat.expires_utc = getMysqlFormattedDateTime(
        add(new Date(), { days: 1 })
      ); // limited seats only last for one day
      seat.seat_type = "limited";

      const createLimitedSeat = await req.repo.createSeat(seat, subscription);

      if (createLimitedSeat.isSeatCreated) {
        console.log(
          `Limited seat [${seatId}] successfully provided in subscription [${subscriptionId}] to user [${user.user_id}]. ` +
            `This seat expires at [${seat.expires_utc}].`
        );
        // TODO: push event seat_provided[subscription, seat, createLimitedSeat.seatingSummary]
        return res.status(200).json(seat);
      }
    }

    // at this point, we were'nt able to get a seat within the provided subscription
    console.log(
      `Could not provide seat in subscription [${subscriptionId}]. No more seats available.`
    );

    return res.status(404).json({
      code: 404,
      message: `No seats available in subscription [${subscriptionId}]`,
      id: subscriptionId,
    });
  }
);

const calculateNewSeatExpirationDate = (config: SeatingConfiguration) => {
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

seatsRouter.delete(
  "/subscriptions/:subscriptionId/seats/:seatId",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const seatId = req.params.seatId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof seatId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid seatId",
      });
    }

    const subscription = await req.repo.getSubscription(subscriptionId);

    const seat = await req.repo.getSeat(seatId, subscriptionId);
    if (seat && subscription) {
      await req.repo.deleteSeat(seatId, subscriptionId);
      // TODO: push event seat_released[subscription, seat]
    }

    return res.status(200).json({});
  }
);

seatsRouter.post(
  "/subscriptions/:subscriptionId/seats/:seatId/reserve",
  async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const seatId = req.params.seatId;

    if (typeof subscriptionId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid subscriptionId",
      });
    }
    if (typeof seatId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid seatId",
      });
    }
    const reservation = req.body;

    const subscription = await req.repo.getSubscription(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        code: 404,
        message: `Subscription [${subscriptionId}] not found.`,
        id: subscriptionId,
      });
    }

    const validationError = validateSeatReservation(reservation, subscription);
    if (validationError) {
      return res.status(400).json({
        code: 400,
        message: validationError,
      });
    }

    const existingSeat = await req.repo.getSeat(seatId, subscriptionId);
    if (existingSeat) {
      return res.status(409).json({
        code: 409,
        message: `Seat [${seatId}] already exists.`,
      });
    }

    if (!subscription.seating_config) {
      return res.status(404).json({
        code: 404,
        message: `Seating configuration [${subscriptionId}] not found.`,
        id: subscriptionId,
      });
    }

    const now = new Date();
    const seat: Seat = {
      expires_utc: getMysqlFormattedDateTime(
        add(now, {
          days:
            subscription.seating_config.seat_reservation_expiry_in_days ?? 1,
        })
      ),
      created_utc: getMysqlFormattedDateTime(now),
      subscription_id: subscriptionId,
      reservation: reservation,
      seat_id: seatId,
      seating_strategy_name: subscription.seating_config.seating_strategy_name,
      seat_type: "standard",
      redeemed_utc: null,
      occupant: null,
    };

    const createSeat = await req.repo.createSeat(seat, subscription);

    // TODO: publish seat warning events
    // await req.events.publishSeatWarningEvents(subscription, createSeat.seatingSummary)

    if (createSeat.isSeatCreated) {
      console.log(
        `Seat [${seatId}] successfully reserved in subscription [${subscriptionId}]. ` +
          `This reservation expires at [${seat.expires_utc}].`
      );
      // TODO: push event seat_reserved[subscription, seat, createSeat.seatingSummary]
      return res.status(200).json(seat);
    }

    console.log(
      `Can't reserve seat [${seatId}] in subscription [${subscriptionId}]. No more seats available.`
    );

    return res.status(404).json({
      code: 404,
      message: `No seats available to reserve in subscription [${subscriptionId}].`,
      id: subscriptionId,
    });
  }
);
