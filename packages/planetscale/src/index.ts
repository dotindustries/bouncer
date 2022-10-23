import type { Repository } from "@dotinc/bouncer-core";
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale";
import type { ZodiosPlugin } from "@zodios/core";
import { createDatabase } from "@dotinc/bouncer-sql";

export const createPlanetscaleRepository = (
  config: PlanetScaleDialectConfig
): Repository => {
  return createDatabase({
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
        repo: createPlanetscaleRepository(dbConfig),
      };
    },
  };
};
