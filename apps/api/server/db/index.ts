import {
  createSqliteRepository,
  sqliteMigrateToLatest,
} from "@dotinc/bouncer-sql";
import Database from "better-sqlite3";

const sqlite = new Database("bouncer.db", { verbose: console.log });

export const repo = createSqliteRepository({
  database: sqlite,
});

sqliteMigrateToLatest({
  database: new Database("bouncer.db", { verbose: console.log }), // this instance will be closed after the migrations
});
