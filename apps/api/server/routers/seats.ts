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
        message: "invalid ids",
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
      message: "invalid subscription id",
    });
  }

  const seats = await req.repo.getSeats(
    req.params.subscriptionId,
    req.query.user_id ?? undefined,
    req.query.user_email ?? undefined
  );

  return res.status(200).json(seats);
});

seatsRouter.get(
  "/subscriptions/:subscriptionId/user-seat/:tenantId/:userId",
  (req, res) => {}
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
