import type { Repository } from "@dotinc/bouncer-core";
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale";
import type { ZodiosPlugin } from "@zodios/core";
import { createRepository as createBaseRepository } from "@dotinc/bouncer-sql";

export { migrateToLatest } from "./migration";

export const createRepository = (
  config: PlanetScaleDialectConfig
): Repository => {
  return createBaseRepository({
    dialect: new PlanetScaleDialect(config),
    log: ["query", "error"],
  });
};

export const planetscalePlugin = (
  dbConfig: PlanetScaleDialectConfig
): ZodiosPlugin => {
  return {
    name: "planetscale",
    request: async (_, config) => {
      return {
        ...config,
        repo: createRepository(dbConfig),
      };
    },
  };
};
