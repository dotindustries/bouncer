import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationSubscriptionsCreateSubscriptionPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=productId" })
  productId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}
export enum MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=default_low_seat_warning_level_percent" })
  defaultLowSeatWarningLevelPercent: number;

  @SpeakeasyMetadata({ data: "json, name=default_seat_expiry_in_days" })
  defaultSeatExpiryInDays?: number;

  @SpeakeasyMetadata({ data: "json, name=limited_overflow_seating_enabled" })
  limitedOverflowSeatingEnabled: boolean;

  @SpeakeasyMetadata({ data: "json, name=low_seat_warning_level_pct" })
  lowSeatWarningLevelPct: number;

  @SpeakeasyMetadata({ data: "json, name=owner_id" })
  ownerId: string;

  @SpeakeasyMetadata({ data: "json, name=seat_reservation_expiry_in_days" })
  seatReservationExpiryInDays?: number;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum;
}
export enum MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum {
    Purchased = "purchased",
    Active = "active",
    Suspended = "suspended",
    Canceled = "canceled"
}

export class MutationSubscriptionsCreateSubscriptionRequestBodySubscription extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=admin_email" })
  adminEmail: string;

  @SpeakeasyMetadata({ data: "json, name=admin_name" })
  adminName: string;

  @SpeakeasyMetadata({ data: "json, name=admin_role_name" })
  adminRoleName: string;

  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=is_being_configured" })
  isBeingConfigured: boolean;

  @SpeakeasyMetadata({ data: "json, name=is_free_trial" })
  isFreeTrial: boolean;

  @SpeakeasyMetadata({ data: "json, name=is_setup_complete" })
  isSetupComplete: boolean;

  @SpeakeasyMetadata({ data: "json, name=is_test_subscription" })
  isTestSubscription: boolean;

  @SpeakeasyMetadata({ data: "json, name=management_urls" })
  managementUrls?: any;

  @SpeakeasyMetadata({ data: "json, name=offer_id" })
  offerId: string;

  @SpeakeasyMetadata({ data: "json, name=plan_id" })
  planId: string;

  @SpeakeasyMetadata({ data: "json, name=product_id" })
  productId: string;

  @SpeakeasyMetadata({ data: "json, name=seatingConfig" })
  seatingConfig: MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig;

  @SpeakeasyMetadata({ data: "json, name=source_subscription" })
  sourceSubscription?: any;

  @SpeakeasyMetadata({ data: "json, name=state" })
  state: MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum;

  @SpeakeasyMetadata({ data: "json, name=state_last_updated_utc" })
  stateLastUpdatedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=subscriber_info" })
  subscriberInfo?: any;

  @SpeakeasyMetadata({ data: "json, name=subscription_name" })
  subscriptionName: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_name" })
  tenantName: string;

  @SpeakeasyMetadata({ data: "json, name=total_seats" })
  totalSeats: number;

  @SpeakeasyMetadata({ data: "json, name=user_role_name" })
  userRoleName: string;
}

export class MutationSubscriptionsCreateSubscriptionRequestBody extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=subscription" })
  subscription: MutationSubscriptionsCreateSubscriptionRequestBodySubscription;
}

export class MutationSubscriptionsCreateSubscriptionRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationSubscriptionsCreateSubscriptionPathParams;

  @SpeakeasyMetadata({ data: "request, media_type=application/json" })
  request: MutationSubscriptionsCreateSubscriptionRequestBody;
}

export class MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues })
  issues?: MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}
export enum MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfig extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=default_low_seat_warning_level_percent" })
  defaultLowSeatWarningLevelPercent: number;

  @SpeakeasyMetadata({ data: "json, name=default_seat_expiry_in_days" })
  defaultSeatExpiryInDays?: number;

  @SpeakeasyMetadata({ data: "json, name=limited_overflow_seating_enabled" })
  limitedOverflowSeatingEnabled: boolean;

  @SpeakeasyMetadata({ data: "json, name=low_seat_warning_level_pct" })
  lowSeatWarningLevelPct: number;

  @SpeakeasyMetadata({ data: "json, name=owner_id" })
  ownerId: string;

  @SpeakeasyMetadata({ data: "json, name=seat_reservation_expiry_in_days" })
  seatReservationExpiryInDays?: number;

  @SpeakeasyMetadata({ data: "json, name=seating_strategy_name" })
  seatingStrategyName: MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum;
}
export enum MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum {
    Purchased = "purchased",
    Active = "active",
    Suspended = "suspended",
    Canceled = "canceled"
}

export class MutationSubscriptionsCreateSubscription200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=admin_email" })
  adminEmail: string;

  @SpeakeasyMetadata({ data: "json, name=admin_name" })
  adminName: string;

  @SpeakeasyMetadata({ data: "json, name=admin_role_name" })
  adminRoleName: string;

  @SpeakeasyMetadata({ data: "json, name=created_utc" })
  createdUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=is_being_configured" })
  isBeingConfigured: boolean;

  @SpeakeasyMetadata({ data: "json, name=is_free_trial" })
  isFreeTrial: boolean;

  @SpeakeasyMetadata({ data: "json, name=is_setup_complete" })
  isSetupComplete: boolean;

  @SpeakeasyMetadata({ data: "json, name=is_test_subscription" })
  isTestSubscription: boolean;

  @SpeakeasyMetadata({ data: "json, name=management_urls" })
  managementUrls?: any;

  @SpeakeasyMetadata({ data: "json, name=offer_id" })
  offerId: string;

  @SpeakeasyMetadata({ data: "json, name=plan_id" })
  planId: string;

  @SpeakeasyMetadata({ data: "json, name=product_id" })
  productId: string;

  @SpeakeasyMetadata({ data: "json, name=seatingConfig" })
  seatingConfig: MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfig;

  @SpeakeasyMetadata({ data: "json, name=source_subscription" })
  sourceSubscription?: any;

  @SpeakeasyMetadata({ data: "json, name=state" })
  state: MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum;

  @SpeakeasyMetadata({ data: "json, name=state_last_updated_utc" })
  stateLastUpdatedUtc: Date;

  @SpeakeasyMetadata({ data: "json, name=subscriber_info" })
  subscriberInfo?: any;

  @SpeakeasyMetadata({ data: "json, name=subscription_name" })
  subscriptionName: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_id" })
  tenantId: string;

  @SpeakeasyMetadata({ data: "json, name=tenant_name" })
  tenantName: string;

  @SpeakeasyMetadata({ data: "json, name=total_seats" })
  totalSeats: number;

  @SpeakeasyMetadata({ data: "json, name=user_role_name" })
  userRoleName: string;
}

export class MutationSubscriptionsCreateSubscriptionResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationSubscriptionsCreateSubscription200ApplicationJSONObject?: MutationSubscriptionsCreateSubscription200ApplicationJSON;

  @SpeakeasyMetadata()
  mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject?: MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON;
}