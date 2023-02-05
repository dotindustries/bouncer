import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationSeatsUpdateuOccupantPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=seatId" })
  seatId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}

export class MutationSeatsUpdateuOccupantRequestBodyUser extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=email" })
  email?: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=user_id" })
  userId: string;

  @SpeakeasyMetadata({ data: "json, name=user_name" })
  userName?: string;
}

export class MutationSeatsUpdateuOccupantRequestBody extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=user" })
  user: MutationSeatsUpdateuOccupantRequestBodyUser;
}

export class MutationSeatsUpdateuOccupantRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationSeatsUpdateuOccupantPathParams;

  @SpeakeasyMetadata({ data: "request, media_type=application/json" })
  request: MutationSeatsUpdateuOccupantRequestBody;
}

export class MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsUpdateuOccupantDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues })
  issues?: MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsUpdateuOccupant200ApplicationJSONOccupant extends SpeakeasyBase {
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

export class MutationSeatsUpdateuOccupant200ApplicationJSONReservation extends SpeakeasyBase {
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
export enum MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum {
    Standard = "standard",
    Limited = "limited"
}
export enum MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationSeatsUpdateuOccupant200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=expires_utc" })
  expiresUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=occupant" })
  occupant: MutationSeatsUpdateuOccupant200ApplicationJSONOccupant;

  @SpeakeasyMetadata({ data: "json, name=redeemed_utc" })
  redeemedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=reservation" })
  reservation: MutationSeatsUpdateuOccupant200ApplicationJSONReservation;

  @SpeakeasyMetadata({ data: "json, name=seat_type" })
  seatType: MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum;

  @SpeakeasyMetadata({ data: "json, name=subscription_id" })
  subscriptionId: string;
}

export class MutationSeatsUpdateuOccupantResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationSeatsUpdateuOccupant200ApplicationJSONObject?: MutationSeatsUpdateuOccupant200ApplicationJSON;

  @SpeakeasyMetadata()
  mutationSeatsUpdateuOccupantDefaultApplicationJSONObject?: MutationSeatsUpdateuOccupantDefaultApplicationJSON;
}