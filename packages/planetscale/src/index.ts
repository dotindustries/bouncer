import { getMysqlFormattedDateTime } from "./../../sql/src/index";
import type { Repository } from "@dotinc/bouncer-core";
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale";
import type { ZodiosPlugin } from "@zodios/core";
import { createRepository as createBaseRepository } from "@dotinc/bouncer-sql";
import { parseJSON } from "date-fns";
import { cast } from "@planetscale/database";

export { migrateToLatest } from "./migration";

export const createRepository = (
  config: PlanetScaleDialectConfig
): Repository => {
  return createBaseRepository({
    dialect: new PlanetScaleDialect({
      cast: (field, value) => {
        // we want a mysql formatted date, because zod validates against it
        if (field.type === "DATETIME" && value)
          return getMysqlFormattedDateTime(parseJSON(value));
        if (field.type === "TIMESTAMP" && value)
          return getMysqlFormattedDateTime(parseJSON(value));

        // kysely default for boolean in mysql is tinyint
        if (field.type === "INT8" && value !== null && value !== undefined)
          return parseInt(value) === 1 ? true : false;
        return cast(field, value);
      },
      ...config, // allow for override
    }),
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
