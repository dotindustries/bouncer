import type { SeatCreationContext, SubscriptionPatch } from "./../common";
import type {
  SeatOccupant,
  Seat,
  Product,
  SeatingConfig,
  SeatReservation,
  Subscription,
} from "@dotinc/bouncer-db";

export interface Repository {
  createProduct(
    config: Product & { seatingConfig: SeatingConfig },
    ownerId: string
  ): Promise<Product & { seatingConfig: SeatingConfig }>;
  getProduct(
    productId: string
  ): Promise<(Product & { seatingConfig: SeatingConfig }) | null>;
  getProducts(): Promise<(Product & { seatingConfig: SeatingConfig })[]>;
  updateProduct(
    update: Product & { seatingConfig: SeatingConfig }
  ): Promise<Product & { seatingConfig: SeatingConfig }>;
  getSeat(
    seatId: string,
    subscriptionId: string
  ): Promise<
    | (Seat & {
        reservation: SeatReservation | null;
        occupant: SeatOccupant | null;
      })
    | null
  >;
  getSeats(
    subscriptionId: string,
    byUserId?: string,
    byEmail?: string
  ): Promise<
    (Seat & {
      reservation: SeatReservation | null;
      occupant: SeatOccupant | null;
    })[]
  >;
  replaceSeat(
    update: Seat & {
      reservation: SeatReservation | null;
      occupant: SeatOccupant | null;
    }
  ): Promise<
    Seat & {
      reservation: SeatReservation | null;
      occupant: SeatOccupant | null;
    }
  >;
  createSeat(
    seat: Seat & {
      reservation: SeatReservation | null;
      occupant: SeatOccupant | null;
    },
    subscription: Subscription
  ): Promise<SeatCreationContext>;
  deleteSeat(seatId: string, subscriptionId: string): Promise<void>;
  getSubscription(
    id: string
  ): Promise<(Subscription & { seatingConfig: SeatingConfig }) | null>;
  getSubscriptions(
    productId: string
  ): Promise<(Subscription & { seatingConfig: SeatingConfig })[]>;
  createSubscription(
    productId: string,
    sub: Subscription & { seatingConfig: SeatingConfig | null }
  ): Promise<Subscription & { seatingConfig: SeatingConfig }>;
  updateSubscription(
    sub: SubscriptionPatch
  ): Promise<Subscription & { seatingConfig: SeatingConfig }>;
}
