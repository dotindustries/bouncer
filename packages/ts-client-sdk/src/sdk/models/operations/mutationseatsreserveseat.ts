import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationSeatsReserveSeatPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=seatId" })
  seatId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}

export class MutationSeatsReserveSeatRequestBodyReservation extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=email" })
  email: string;

  @SpeakeasyMetadata({ data: "json, name=invite_url" })
  inviteUrl: string;

  @SpeakeasyMetadata({ data: "json, name=seat_id" })
  seatId: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=user_id" })
  userId: string;
}

export class MutationSeatsReserveSeatRequestBody extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: MutationSeatsReserveSeatRequestBodyReservation;
}

export class MutationSeatsReserveSeatRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationSeatsReserveSeatPathParams;

  @SpeakeasyMetadata({ data: "request, media_type=application/json" })
  request: MutationSeatsReserveSeatRequestBody;
}

export class MutationSeatsReserveSeatDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsReserveSeatDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationSeatsReserveSeatDefaultApplicationJSONIssues })
  issues?: MutationSeatsReserveSeatDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsReserveSeat200ApplicationJSONOccupant extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=email" })
  email: string;

  @SpeakeasyMetadata({ data: "json, name=seat_id" })
  seatId: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=user_id" })
  userId: string;

  @SpeakeasyMetadata({ data: "json, name=user_name" })
  userName: string;
}

export class MutationSeatsReserveSeat200ApplicationJSONReservation extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=email" })
  email: string;

  @SpeakeasyMetadata({ data: "json, name=invite_url" })
  inviteUrl: string;

  @SpeakeasyMetadata({ data: "json, name=seat_id" })
  seatId: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=user_id" })
  userId: string;
}
export enum MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum {
    Standard = "standard",
    Limited = "limited"
}
export enum MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationSeatsReserveSeat200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=expires_utc" })
  expiresUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=occupant" })
  occupant: MutationSeatsReserveSeat200ApplicationJSONOccupant;

  @SpeakeasyMetadata({ data: "json, name=redeemed_utc" })
  redeemedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: MutationSeatsReserveSeat200ApplicationJSONReservation;

  @SpeakeasyMetadata({ data: "json, name=seat_type" })
  seatType: MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum;

  @SpeakeasyMetadata({ data: "json, name=subscription_id" })
  subscriptionId: string;
}

export class MutationSeatsReserveSeatResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationSeatsReserveSeat200ApplicationJSONObject?: MutationSeatsReserveSeat200ApplicationJSON;

  @SpeakeasyMetadata()
  mutationSeatsReserveSeatDefaultApplicationJSONObject?: MutationSeatsReserveSeatDefaultApplicationJSON;
}