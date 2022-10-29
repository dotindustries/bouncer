import { ctx } from "./../context";
import { seatsApi } from "@dotinc/bouncer-core";

export const seatsRouter = ctx.router(seatsApi);

seatsRouter.get(
  "/subscriptions/:subscriptionId/seats/:seatId",
  async (req, res) => {
    if (
      typeof req.params.seatId === "number" ||
      typeof req.params.subscriptionId === "number"
    ) {
      return res.status(400).json({
        code: 400,
        message: "Invalid ids",
      });
    }

    const seat = await req.repo.getSeat(
      req.params.seatId,
      req.params.subscriptionId
    );
    if (!seat) {
      return res.status(404).json({
        code: 400,
        message: `Seat [${req.params.seatId} at ${req.params.subscriptionId}] not found.`,
        id: req.params.seatId,
      });
    }

    return res.status(200).json(seat);
  }
);

seatsRouter.get("/subscriptions/:subscriptionId/seats", async (req, res) => {
  if (typeof req.params.subscriptionId === "number") {
    return res.status(400).json({
      code: 400,
      message: "Invalid subscription id",
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
        message: "Invalid subscription id",
      });
    }
    if (typeof tenantId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid tenant id",
      });
    }
    if (typeof userId === "number") {
      return res.status(400).json({
        code: 400,
        message: "Invalid userId id",
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
  (req, res) => {}
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
