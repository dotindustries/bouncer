import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class QuerySeatsUserSeatPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=tenantId" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=userId" })
  userId: string;
}

export class QuerySeatsUserSeatRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: QuerySeatsUserSeatPathParams;
}

export class QuerySeatsUserSeatDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class QuerySeatsUserSeatDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: QuerySeatsUserSeatDefaultApplicationJSONIssues })
  issues?: QuerySeatsUserSeatDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class QuerySeatsUserSeat200ApplicationJSONOccupant extends SpeakeasyBase {
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

export class QuerySeatsUserSeat200ApplicationJSONReservation extends SpeakeasyBase {
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
export enum QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum {
    Standard = "standard",
    Limited = "limited"
}
export enum QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class QuerySeatsUserSeat200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=expires_utc" })
  expiresUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=occupant" })
  occupant: QuerySeatsUserSeat200ApplicationJSONOccupant;

  @SpeakeasyMetadata({ data: "json, name=redeemed_utc" })
  redeemedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: QuerySeatsUserSeat200ApplicationJSONReservation;

  @SpeakeasyMetadata({ data: "json, name=seat_type" })
  seatType: QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum;

  @SpeakeasyMetadata({ data: "json, name=subscription_id" })
  subscriptionId: string;
}

export class QuerySeatsUserSeatResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  querySeatsUserSeat200ApplicationJSONObject?: QuerySeatsUserSeat200ApplicationJSON;

  @SpeakeasyMetadata()
  querySeatsUserSeatDefaultApplicationJSONObject?: QuerySeatsUserSeatDefaultApplicationJSON;
}