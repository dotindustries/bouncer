import type { PublisherConfiguration } from "..";
import type { Seat } from "./../common/seats";

export interface Repository {
  createPublisher(
    config: PublisherConfiguration
  ): Promise<PublisherConfiguration>;
  getPublisher(
    publisherId: string
  ): Promise<PublisherConfiguration | undefined>;
  getPublishers(): Promise<PublisherConfiguration[]>;
  updatePublisher(
    update: PublisherConfiguration
  ): Promise<PublisherConfiguration>;
  getSeat(seatId: string, subscriptionId: string): Promise<Seat | undefined>;
  getSeats(
    subscriptionId: string,
    byUserId?: string,
    byEmail?: string
  ): Promise<Seat[]>;
}
