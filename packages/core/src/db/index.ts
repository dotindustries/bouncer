import type { PublisherConfiguration } from "..";
import type { Seat } from "./../common/seats";

export interface Repository {
  getPublisher(
    publisherId: string
  ): Promise<PublisherConfiguration | undefined>;
  getSeat(seatId: string, subscriptionId: string): Promise<Seat | undefined>;
  getSeats(
    subscriptionId: string,
    byUserId?: string,
    byEmail?: string
  ): Promise<Seat[]>;
}
