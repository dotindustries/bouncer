import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationSeatsRequestSeatPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=seatId" })
  seatId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}

export class MutationSeatsRequestSeatRequestBodyUser extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=email" })
  email?: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=user_id" })
  userId: string;

  @SpeakeasyMetadata({ data: "json, name=user_name" })
  userName?: string;
}

export class MutationSeatsRequestSeatRequestBody extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=user" })
  user: MutationSeatsRequestSeatRequestBodyUser;
}

export class MutationSeatsRequestSeatRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationSeatsRequestSeatPathParams;

  @SpeakeasyMetadata({ data: "request, media_type=application/json" })
  request: MutationSeatsRequestSeatRequestBody;
}

export class MutationSeatsRequestSeatDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsRequestSeatDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationSeatsRequestSeatDefaultApplicationJSONIssues })
  issues?: MutationSeatsRequestSeatDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsRequestSeat200ApplicationJSONOccupant extends SpeakeasyBase {
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

export class MutationSeatsRequestSeat200ApplicationJSONReservation extends SpeakeasyBase {
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
export enum MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnum {
    Standard = "standard",
    Limited = "limited"
}
export enum MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationSeatsRequestSeat200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=expires_utc" })
  expiresUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=occupant" })
  occupant: MutationSeatsRequestSeat200ApplicationJSONOccupant;

  @SpeakeasyMetadata({ data: "json, name=redeemed_utc" })
  redeemedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: MutationSeatsRequestSeat200ApplicationJSONReservation;

  @SpeakeasyMetadata({ data: "json, name=seat_type" })
  seatType: MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnum;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnum;

  @SpeakeasyMetadata({ data: "json, name=subscription_id" })
  subscriptionId: string;
}

export class MutationSeatsRequestSeatResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationSeatsRequestSeat200ApplicationJSONObject?: MutationSeatsRequestSeat200ApplicationJSON;

  @SpeakeasyMetadata()
  mutationSeatsRequestSeatDefaultApplicationJSONObject?: MutationSeatsRequestSeatDefaultApplicationJSON;
}