import type {
  PublisherConfiguration,
  Seat,
  Subscription,
  SeatCreationContext,
  SubscriptionPatch,
  ApiKey,
} from "../common/index";

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
  replaceSeat(update: Seat): Promise<Seat>;
  createSeat(
    seat: Seat,
    subscription: Subscription
  ): Promise<SeatCreationContext>;
  deleteSeat(seatId: string, subscriptionId: string): Promise<void>;
  getSubscription(id: string): Promise<Subscription | undefined>;
  getSubscriptions(publisherId: string): Promise<Subscription[]>;
  createSubscription(
    publisherId: string,
    sub: Subscription
  ): Promise<Subscription>;
  updateSubscription(sub: SubscriptionPatch): Promise<Subscription>;
  createApiKey(key: ApiKey): Promise<ApiKey>;
  deleteApiKey(key: ApiKey): Promise<void>;
}
