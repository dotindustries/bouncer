import type { Seat } from "./../common/seats";

export interface Repository {
  getSeat(seatId: string, subscriptionId: string): Promise<Seat | undefined>;
}
