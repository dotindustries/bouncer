import { ctx } from "./../context";
import { seatsApi } from "@dotinc/bouncer-core";

export const seatsRouter = ctx.router(seatsApi);
seatsRouter.get(
  "/v1/subscriptions/:subscriptionId/seats/:seatId",
  (req, res) => {
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
  }
);

seatsRouter.get("/v1/subscriptions/:subscriptionId/seats", (req, res) => {});

seatsRouter.get(
  "/v1/subscriptions/:subscriptionId/user-seat/:tenantId/:userId",
  (req, res) => {}
);
