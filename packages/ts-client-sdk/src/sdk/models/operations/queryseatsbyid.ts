import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class QuerySeatsByIdPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=seatId" })
  seatId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}

export class QuerySeatsByIdRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: QuerySeatsByIdPathParams;
}

export class QuerySeatsByIdDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class QuerySeatsByIdDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: QuerySeatsByIdDefaultApplicationJSONIssues })
  issues?: QuerySeatsByIdDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class QuerySeatsById200ApplicationJSONOccupant extends SpeakeasyBase {
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

export class QuerySeatsById200ApplicationJSONReservation extends SpeakeasyBase {
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
export enum QuerySeatsById200ApplicationJSONSeatTypeEnum {
    Standard = "standard",
    Limited = "limited"
}
export enum QuerySeatsById200ApplicationJSONSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class QuerySeatsById200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=expires_utc" })
  expiresUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=occupant" })
  occupant: QuerySeatsById200ApplicationJSONOccupant;

  @SpeakeasyMetadata({ data: "json, name=redeemed_utc" })
  redeemedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: QuerySeatsById200ApplicationJSONReservation;

  @SpeakeasyMetadata({ data: "json, name=seat_type" })
  seatType: QuerySeatsById200ApplicationJSONSeatTypeEnum;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: QuerySeatsById200ApplicationJSONSeatingStrategyNameEnum;

  @SpeakeasyMetadata({ data: "json, name=subscription_id" })
  subscriptionId: string;
}

export class QuerySeatsByIdResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  querySeatsById200ApplicationJSONObject?: QuerySeatsById200ApplicationJSON;

  @SpeakeasyMetadata()
  querySeatsByIdDefaultApplicationJSONObject?: QuerySeatsByIdDefaultApplicationJSON;
}