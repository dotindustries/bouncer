import {
  Kysely,
  KyselyConfig,
  SqliteDialect,
  SqliteDialectConfig,
} from "kysely";
import type { Seat, Repository } from "@dotinc/bouncer-core";
import type { Database } from "./schema";

export { sqliteMigrateToLatest } from "./migration";

export const createDatabase = (args: KyselyConfig): Repository => {
  const db = new Kysely<Database>(args);

  return {
    getSeat: async (seatId, subscriptionId) => {
      const row = await db
        .selectFrom("seats")
        .leftJoin("seat_occupants", "seat_occupants.seat_id", "seats.seat_id")
        .leftJoin(
          "seat_reservations",
          "seat_reservations.seat_id",
          "seats.seat_id"
        )
        .select([
          "seats.subscription_id",
          "seats.seat_id",
          "seats.seat_type",
          "seats.seating_strategy_name",
          "seats.redeemed_utc",
          "seats.created_utc",
          "seats.expires_utc",
          "seat_occupants.user_id as occupant_user_id",
          "seat_occupants.user_name as occupant_user_name",
          "seat_occupants.tenant_id as occupant_tenant_id",
          "seat_occupants.email as occupant_email",
          "seat_reservations.email as reservation_email",
          "seat_reservations.invite_url as reservation_invite_url",
          "seat_reservations.tenant_id as reservation_tenant_id",
          "seat_reservations.user_id as reservation_user_id",
        ]) // explicitly select the non-nullable seat_id to make typescript happy
        .where("seat_id", "=", seatId)
        .where("subscription_id", "=", subscriptionId)
        .executeTakeFirst();
      if (!row) return undefined;

      const seat: Seat = {
        subscription_id: row.subscription_id,
        seat_id: row.seat_id,
        seat_type: row.seat_type,
        seating_strategy_name: row.seating_strategy_name,
        redeemed_utc: row.redeemed_utc,
        created_utc: row.created_utc,
        expires_utc: row.expires_utc,
        occupant:
          row.occupant_user_id && row.occupant_tenant_id
            ? {
                tenant_id: row.occupant_tenant_id,
                user_id: row.occupant_user_id,
                user_name: row.occupant_user_name,
                email: row.occupant_email,
              }
            : null,
        reservation:
          row.reservation_tenant_id || row.reservation_email
            ? {
                identifier: row.reservation_tenant_id
                  ? {
                      user_id: row.reservation_user_id,
                      tenant_id: row.reservation_tenant_id as string | null, // ts wants to be smart
                    }
                  : {
                      email: row.reservation_email,
                    },
                invite_url: row.reservation_invite_url,
              }
            : null,
      };
      return seat;
    },
    getSeats: async (subscriptionId, byUserId, byEmail) => {
      const q = db
        .selectFrom("seats")
        .leftJoin("seat_occupants", "seat_occupants.seat_id", "seats.seat_id")
        .leftJoin(
          "seat_reservations",
          "seat_reservations.seat_id",
          "seats.seat_id"
        )
        .select([
          "seats.subscription_id",
          "seats.seat_id",
          "seats.seat_type",
          "seats.seating_strategy_name",
          "seats.redeemed_utc",
          "seats.created_utc",
          "seats.expires_utc",
          "seat_occupants.user_id as occupant_user_id",
          "seat_occupants.user_name as occupant_user_name",
          "seat_occupants.tenant_id as occupant_tenant_id",
          "seat_occupants.email as occupant_email",
          "seat_reservations.email as reservation_email",
          "seat_reservations.invite_url as reservation_invite_url",
          "seat_reservations.tenant_id as reservation_tenant_id",
          "seat_reservations.user_id as reservation_user_id",
        ]) // explicitly select the non-nullable seat_id to make typescript happy
        .selectAll()
        .where("seats.subscription_id", "=", subscriptionId)
        .where((qb) =>
          qb
            .where("expires_utc", "is", null)
            .orWhere("expires_utc", ">", new Date())
        );

      if (byUserId) {
        q.where((qb) =>
          qb
            .where("seat_occupants.user_id", "=", byUserId)
            .orWhere("seat_reservations.user_id", "=", byUserId)
        );
      }
      if (byEmail) {
        q.where((qb) =>
          qb
            .where("seat_occupants.email", "=", byEmail)
            .orWhere("seat_reservations.email", "=", byEmail)
        );
      }
      const rows = await q.execute();

      return rows.map((row) => ({
        subscription_id: row.subscription_id,
        seat_id: row.seat_id,
        seat_type: row.seat_type,
        seating_strategy_name: row.seating_strategy_name,
        redeemed_utc: row.redeemed_utc,
        created_utc: row.created_utc,
        expires_utc: row.expires_utc,
        occupant:
          row.occupant_user_id && row.occupant_tenant_id
            ? {
                tenant_id: row.occupant_tenant_id,
                user_id: row.occupant_user_id,
                user_name: row.occupant_user_name,
                email: row.occupant_email,
              }
            : null,
        reservation:
          row.reservation_tenant_id || row.reservation_email
            ? {
                identifier: row.reservation_tenant_id
                  ? {
                      user_id: row.reservation_user_id,
                      tenant_id: row.reservation_tenant_id as string | null, // ts wants to be smart
                    }
                  : {
                      email: row.reservation_email,
                    },
                invite_url: row.reservation_invite_url,
              }
            : null,
      }));
    },
  };
};

export const createSqliteRepository = (config: SqliteDialectConfig) => {
  return createDatabase({
    dialect: new SqliteDialect(config),
    log: ["query", "error"],
  });
};
