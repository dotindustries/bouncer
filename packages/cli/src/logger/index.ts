import { env } from "../env/server";
import pino from "pino";

const transport = env.LOGTAIL_SOURCE_TOKEN
	? {
			target: "./logtail-transport.ts",
	  }
	: undefined;

export const logger = pino({
	level: env.PINO_LOG_LEVEL || "info",
	transport,
});

export default logger;
