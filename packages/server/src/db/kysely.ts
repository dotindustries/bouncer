import {
  DummyDriver,
  // Generated,
  Kysely,
  MysqlAdapter,
  MysqlIntrospector,
  MysqlQueryCompiler,
} from "kysely";

interface SeatsTable {
  seatId: number;
  subscriptionId: number;
  value: string | null;
}

interface Database {
  Seats: SeatsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: {
    createAdapter() {
      return new MysqlAdapter();
    },
    createDriver() {
      return new DummyDriver();
    },
    createIntrospector(db: Kysely<Database>) {
      return new MysqlIntrospector(db);
    },
    createQueryCompiler() {
      return new MysqlQueryCompiler();
    },
  },
});
