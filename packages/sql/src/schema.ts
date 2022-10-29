import type {
  Seat,
  Subscription,
  PublisherConfiguration,
  ProductConfiguration,
  SeatingConfiguration,
} from "@dotinc/bouncer-core";

export type Intersect<T> = T extends { [K in keyof T]: infer E } ? E : T;

export type PublisherConfigTable = Omit<
  PublisherConfiguration,
  "default_seating_config" | "product_config"
>;

export type SeatingConfigTable = SeatingConfiguration & {
  owner_id: PublisherConfiguration["id"];
};

export type ProductConfigTable = ProductConfiguration & {
  publisher_id: PublisherConfiguration["id"];
};

export type SeatTable = Omit<Seat, "reservation" | "occupant">;

export type SeatReservationTable = {
  seat_id: string;
  tenant_id: string | null;
  user_id: string | null;
  email: string | null;
  invite_url: string | null;
};

export type SeatOccupantTable = Intersect<Pick<Seat, "occupant">> & {
  seat_id: string;
};

export type SubscriptionTable = Omit<Subscription, "seating_config">;

export interface Database {
  publishers: PublisherConfigTable;
  seating_config: SeatingConfigTable;
  product_config: ProductConfigTable;
  seats: SeatTable;
  seat_reservations: SeatReservationTable;
  seat_occupants: SeatOccupantTable;
  subscriptions: SubscriptionTable;
}
