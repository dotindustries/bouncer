import { ctx } from "../context";
import { subscriptionsRouter } from "./subscriptions";
import { configRouter } from "./config";
import { seatsRouter } from "./seats";

export const app = ctx.nextApp();

app.use("/api", seatsRouter);
app.use("/api", configRouter);
app.use("/api", subscriptionsRouter);
