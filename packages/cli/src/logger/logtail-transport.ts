import { env } from "../env/server";
import build from "pino-abstract-transport";
// import pino from "pino";
import { Logtail } from "@logtail/node";
import { LogLevel } from "@logtail/types";

// const levels = pino.levels.labels;

const logtailToken = env.LOGTAIL_SOURCE_TOKEN || "";
if (!logtailToken) {
  console.warn("Missing Logtail API Token. Set LOGTAIL_SOURCE_TOKEN=xxxx");
  process.exit();
}

// TODO think about flushing logs before exiting
//   https://github.com/BetterStackHQ/logtail-vercel-nextjs-example/issues/1#issuecomment-1140220789
const logtail = new Logtail(logtailToken);

export const pinoLevelToLogtailLevel = (level: number): LogLevel => {
  if (level == 60) {
    // fatal
    return LogLevel.Error;
  }
  if (level >= 50) {
    // error
    return LogLevel.Error;
  }
  if (level >= 40) {
    // warn
    return LogLevel.Warn;
  }
  if (level >= 30) {
    // log
    return LogLevel.Info;
  }
  if (level >= 20) {
    // info
    return LogLevel.Info;
  }
  return LogLevel.Debug;
};

export interface PinoLogtailOptions {
  minLevel?: number;
}

export class ExtendedError extends Error {
  public constructor(message: string, stack: string) {
    super(message);

    this.name = "Error";
    this.stack = stack || undefined;
  }
}

console.log("logtail created", logtail);

export default async function (opts: PinoLogtailOptions) {
  return build(async function (source) {
    for await (const obj of source) {
      const stack = obj?.err?.stack;
      // const errorMessage = obj?.err?.message;
      const level = obj.level;
      if (level > (opts.minLevel || 0)) {
        if (stack) {
          await logtail.error(obj?.msg, obj?.err);
        } else {
          await logtail.log(
            obj?.msg,
            pinoLevelToLogtailLevel(level) || "info",
            obj
          );
        }
      }
    }
  });
}
