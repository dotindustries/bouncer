import { Repository } from "@dotinc/bouncer-core";
import {
  createRepository,
  migrateToLatest as planetscaleMigrateToLastest,
} from "@dotinc/bouncer-planetscale";
import {
  createSqliteDatabase,
  createSqliteRepository,
  sqliteMigrateToLatest,
} from "@dotinc/bouncer-sql";
import { env } from "../../env/server.mjs";

export const repo: Repository = env.SQLITE_DB
  ? createSqliteRepository({
      database: createSqliteDatabase(env.SQLITE_DB),
    })
  : env.PSCALE_DATABASE_HOST
  ? createRepository({
      host: env.PSCALE_DATABASE_HOST,
      username: env.PSCALE_DATABASE_USERNAME,
      password: env.PSCALE_DATABASE_PASSWORD,
    })
  : ({} as Repository);

if (typeof repo.getSeat === "undefined") {
  console.error(
    "❌ Missing database configuration in env:\n",
    JSON.stringify(env)
  );
  throw new Error("Missing database configuration");
}

// Run migrations if needed
if (env.SQLITE_DB && env.DB_MIGRATE)
  sqliteMigrateToLatest({
    database: createSqliteDatabase(env.SQLITE_DB), // this instance will be closed after the migrations
  });

if (env.DB_MIGRATE && env.PSCALE_DATABASE_HOST)
  planetscaleMigrateToLastest({
    host: env.PSCALE_DATABASE_HOST,
    username: env.PSCALE_DATABASE_USERNAME,
    password: env.PSCALE_DATABASE_PASSWORD,
  });
