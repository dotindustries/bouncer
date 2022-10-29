import { ctx } from "./../context";
import { seatsApi } from "@dotinc/bouncer-core";

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
  (req, res) => {}
);

seatsRouter.post(
  "/subscriptions/:subscriptionId/seats/:seatId/request",
  (req, res) => {}
);

seatsRouter.delete(
  "/subscriptions/:subscriptionId/seats/:seatId",
  (req, res) => {}
);

seatsRouter.post(
  "/subscriptions/{subscriptionId}/seats/{seatId}/reserve",
  (req, res) => {}
);
