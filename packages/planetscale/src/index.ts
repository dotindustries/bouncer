import { Kysely } from "kysely";
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale";
import type {
  Seat,
  Subscription,
  Repository,
  PublisherConfiguration,
  ProductConfiguration,
  SeatingConfiguration,
} from "@dotinc/bouncer-core";
import type { ZodiosPlugin } from "@zodios/core";

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

type SeatReservationTable = Pick<Seat, "reservation"> & {
  seat_id: string;
};

type SeatOccupantTable = Pick<Seat, "occupant"> & {
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

export const createPlanetscaleRepository = (
  config: PlanetScaleDialectConfig
): Repository => {
  const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect(config),
  });

  return {
    getSeat: async (seatId, subscriptionId) => {
      const seat = await db
        .selectFrom("Seats")
        .leftJoin("SeatOccupants", "SeatOccupants.seat_id", "Seats.seat_id")
        .leftJoin(
          "SeatReservations",
          "SeatReservations.seat_id",
          "Seats.seat_id"
        )
        .select("Seats.seat_id") // explicitly select the non-nullable seat_id to make typescript happy
        .selectAll()
        .where("seat_id", "=", seatId)
        .where("subscription_id", "=", subscriptionId)
        .executeTakeFirst();
      return seat;
    },
  };
};

export const planetscaleMiddleware = (url: string): ZodiosPlugin => {
  return {
    name: "planetscale",
    request: async (_, config) => {
      return {
        ...config,
        repo: createPlanetscaleRepository({
          url,
        }),
      };
    },
  };
};
