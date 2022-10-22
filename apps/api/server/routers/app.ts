import { ctx } from "../context";
import { seatsRouter } from "./seats";

export const app = ctx.nextApp();
app.use("/api", seatsRouter);
