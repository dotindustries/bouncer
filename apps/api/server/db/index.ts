import { createSqliteRepository } from "@dotinc/bouncer-sql";
import Database from "better-sqlite3";

const sqlite = new Database("bouncer.db", { verbose: console.log });

export const repo = createSqliteRepository({
  database: sqlite,
});
