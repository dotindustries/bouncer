import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationSeatsRedeemSeatPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=seatId" })
  seatId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}

export class MutationSeatsRedeemSeatRequestBodyUser extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=email" })
  email?: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=user_id" })
  userId: string;

  @SpeakeasyMetadata({ data: "json, name=user_name" })
  userName?: string;
}

export class MutationSeatsRedeemSeatRequestBody extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=user" })
  user: MutationSeatsRedeemSeatRequestBodyUser;
}

export class MutationSeatsRedeemSeatRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationSeatsRedeemSeatPathParams;

  @SpeakeasyMetadata({ data: "request, media_type=application/json" })
  request: MutationSeatsRedeemSeatRequestBody;
}

export class MutationSeatsRedeemSeatDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsRedeemSeatDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationSeatsRedeemSeatDefaultApplicationJSONIssues })
  issues?: MutationSeatsRedeemSeatDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsRedeemSeat200ApplicationJSONOccupant extends SpeakeasyBase {
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

export class MutationSeatsRedeemSeat200ApplicationJSONReservation extends SpeakeasyBase {
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
export enum MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum {
    Standard = "standard",
    Limited = "limited"
}
export enum MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationSeatsRedeemSeat200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=expires_utc" })
  expiresUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=occupant" })
  occupant: MutationSeatsRedeemSeat200ApplicationJSONOccupant;

  @SpeakeasyMetadata({ data: "json, name=redeemed_utc" })
  redeemedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: MutationSeatsRedeemSeat200ApplicationJSONReservation;

  @SpeakeasyMetadata({ data: "json, name=seat_type" })
  seatType: MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum;

  @SpeakeasyMetadata({ data: "json, name=subscription_id" })
  subscriptionId: string;
}

export class MutationSeatsRedeemSeatResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationSeatsRedeemSeat200ApplicationJSONObject?: MutationSeatsRedeemSeat200ApplicationJSON;

  @SpeakeasyMetadata()
  mutationSeatsRedeemSeatDefaultApplicationJSONObject?: MutationSeatsRedeemSeatDefaultApplicationJSON;
}