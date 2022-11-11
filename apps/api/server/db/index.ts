import { Repository } from "@dotinc/bouncer-core";
import {
  createRepository,
  migrateToLatest as planetscaleMigrateToLastest,
} from "@dotinc/bouncer-planetscale/dist/index";
import {
  createSqliteDatabase,
  createSqliteRepository,
  sqliteMigrateToLatest,
} from "@dotinc/bouncer-sql";
import { env } from "../../env/server.mjs";
import fs from "fs";

if (env.SQLITE_DB && env.DEV && fs.existsSync(env.SQLITE_DB)) {
  console.log(`dev mode: clearing database at ${env.SQLITE_DB}`);
  fs.rmSync(env.SQLITE_DB);
}

export const repo: Repository = env.SQLITE_DB
  ? (() => {
      console.log(
        "creating sqlite database at",
        process.cwd() + "/" + env.SQLITE_DB
      );
      return createSqliteRepository({
        database: createSqliteDatabase(process.cwd() + "/" + env.SQLITE_DB),
      });
    })()
  : env.PSCALE_DATABASE_HOST
  ? createRepository({
      host: env.PSCALE_DATABASE_HOST,
      username: env.PSCALE_DATABASE_USERNAME,
      password: env.PSCALE_DATABASE_PASSWORD,
    })
  : ({} as Repository); // no-op repository

if (typeof repo.getSeat === "undefined") {
  console.error(
    "❌ Missing database configuration in env:\n",
    JSON.stringify(env)
  );
  throw new Error("Missing database configuration");
}

// Run migrations if needed
if (env.SQLITE_DB) {
  // if (env.DEV && fs.existsSync(env.SQLITE_DB)) {
  //   console.log(`dev mode: clearing database at ${env.SQLITE_DB}`);
  //   fs.rmSync(env.SQLITE_DB);
  // }

  if (env.DB_MIGRATE) {
    console.log(`migrations: running migrations for ${env.SQLITE_DB}`);
    sqliteMigrateToLatest({
      database: createSqliteDatabase(env.SQLITE_DB), // this instance will be closed after the migrations
    });
  }
}

if (env.DB_MIGRATE && env.PSCALE_DATABASE_HOST)
  planetscaleMigrateToLastest({
    host: env.PSCALE_DATABASE_HOST,
    username: env.PSCALE_DATABASE_USERNAME,
    password: env.PSCALE_DATABASE_PASSWORD,
  });
