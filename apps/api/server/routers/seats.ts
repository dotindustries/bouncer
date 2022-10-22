import { ctx } from "./../context";
import { seatsApi } from "@dotinc/bouncer-core";

export const seatsRouter = ctx.router(seatsApi);

seatsRouter.get("/subscriptions/:subscriptionId/seats/:seatId", (req, res) => {
  //   const user = users.find((u) => u.id === req.params.id);
  //   if (!user) {
  //     return res.status(404).json({
  //       error: {
  //         code: 404,
  //         message: "User not found",
  //       },
  //     });
  //   }
  //   return res.status(200).json(user);
});

seatsRouter.get("/subscriptions/:subscriptionId/seats", (req, res) => {
  res.status(200).json([]);
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
