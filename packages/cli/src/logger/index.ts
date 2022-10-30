import { env } from "../env/server.js";
import { pino } from "pino";

export const logger = pino({
  level: env.PINO_LOG_LEVEL || "info",
});

export default logger;
