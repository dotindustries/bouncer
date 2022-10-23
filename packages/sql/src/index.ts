import {
  Kysely,
  KyselyConfig,
  SqliteDialect,
  SqliteDialectConfig,
} from "kysely";
import type {
  Seat,
  Subscription,
  Repository,
  PublisherConfiguration,
  ProductConfiguration,
  SeatingConfiguration,
} from "@dotinc/bouncer-core";

type Intersect<T> = T extends { [K in keyof T]: infer E } ? E : T;

type PublisherConfigTable = Omit<
  PublisherConfiguration,
  "default_seating_config" | "product_config"
>;

type SeatingConfigTable = SeatingConfiguration & {
  config_owner: Pick<PublisherConfiguration, "publisher_name">;
};

type ProductConfigTable = ProductConfiguration & {
  publisher_name: Pick<PublisherConfiguration, "publisher_name">;
};

type SeatTable = Omit<Seat, "reservation" | "occupant">;

type SeatReservationTable = {
  seat_id: string;
  tenant_id: string | null;
  user_id: string | null;
  email: string | null;
  invite_url: string | null;
};

type SeatOccupantTable = Intersect<Pick<Seat, "occupant">> & {
  seat_id: string;
};

type SubscriptionTable = Omit<Subscription, "seating_config">;

// TODO: create DBOs and translate to table level to support joins and stuff
export interface Database {
  Publishers: PublisherConfigTable;
  SeatingConfig: SeatingConfigTable;
  ProductConfig: ProductConfigTable;
  Seats: SeatTable;
  SeatReservations: SeatReservationTable;
  SeatOccupants: SeatOccupantTable;
  Subscriptions: SubscriptionTable;
}

export const createDatabase = (args: KyselyConfig): Repository => {
  const db = new Kysely<Database>(args);

  return {
    getSeat: async (seatId, subscriptionId) => {
      const row = await db
        .selectFrom("Seats")
        .leftJoin("SeatOccupants", "SeatOccupants.seat_id", "Seats.seat_id")
        .leftJoin(
          "SeatReservations",
          "SeatReservations.seat_id",
          "Seats.seat_id"
        )
        .select([
          "Seats.subscription_id",
          "Seats.seat_id",
          "Seats.seat_type",
          "Seats.seating_strategy_name",
          "Seats.redeemed_utc",
          "Seats.created_utc",
          "Seats.expires_utc",
          "SeatOccupants.user_id as occupant_user_id",
          "SeatOccupants.user_name as occupant_user_name",
          "SeatOccupants.tenant_id as occupant_tenant_id",
          "SeatOccupants.email as occupant_email",
          "SeatReservations.email as reservation_email",
          "SeatReservations.invite_url as reservation_invite_url",
          "SeatReservations.tenant_id as reservation_tenant_id",
          "SeatReservations.user_id as reservation_user_id",
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
    getSeats: async (_subscriptionId, byUserId, byEmail) => {
      const q = db
        .selectFrom("Seats")
        .leftJoin("SeatOccupants", "SeatOccupants.seat_id", "Seats.seat_id")
        .leftJoin(
          "SeatReservations",
          "SeatReservations.seat_id",
          "Seats.seat_id"
        )
        .select([
          "Seats.subscription_id",
          "Seats.seat_id",
          "Seats.seat_type",
          "Seats.seating_strategy_name",
          "Seats.redeemed_utc",
          "Seats.created_utc",
          "Seats.expires_utc",
          "SeatOccupants.user_id as occupant_user_id",
          "SeatOccupants.user_name as occupant_user_name",
          "SeatOccupants.tenant_id as occupant_tenant_id",
          "SeatOccupants.email as occupant_email",
          "SeatReservations.email as reservation_email",
          "SeatReservations.invite_url as reservation_invite_url",
          "SeatReservations.tenant_id as reservation_tenant_id",
          "SeatReservations.user_id as reservation_user_id",
        ]) // explicitly select the non-nullable seat_id to make typescript happy
        .selectAll();
      q.where("expires_utc", "is", null).orWhere(
        "expires_utc",
        ">",
        new Date()
      );
      if (byUserId) {
        q.where((qb) =>
          qb
            .where("SeatOccupants.user_id", "=", byUserId)
            .orWhere("SeatReservations.user_id", "=", byUserId)
        );
      }
      if (byEmail) {
        q.where((qb) =>
          qb
            .where("SeatOccupants.email", "=", byEmail)
            .orWhere("SeatReservations.email", "=", byEmail)
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
  });
};
