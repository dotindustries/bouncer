import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationProductsUpdatePathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=productId" })
  productId: string;
}
export enum MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationProductsUpdateRequestBodyProductConfigSeatingConfig extends SpeakeasyBase {
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
  seatingStrategyName: MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum;
}

export class MutationProductsUpdateRequestBodyProductConfig extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=contact_page_url" })
  contactPageUrl: string;

  @SpeakeasyMetadata({ data: "json, name=contact_sales_email" })
  contactSalesEmail: string;

  @SpeakeasyMetadata({ data: "json, name=contact_sales_url" })
  contactSalesUrl: string;

  @SpeakeasyMetadata({ data: "json, name=contact_support_email" })
  contactSupportEmail: string;

  @SpeakeasyMetadata({ data: "json, name=contact_support_url" })
  contactSupportUrl: string;

  @SpeakeasyMetadata({ data: "json, name=home_page_url" })
  homePageUrl: string;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=is_setup_complete" })
  isSetupComplete: boolean;

  @SpeakeasyMetadata({ data: "json, name=on_access_denied_url" })
  onAccessDeniedUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_access_granted_url" })
  onAccessGrantedUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_no_seat_available_url" })
  onNoSeatAvailableUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_no_subscriptions_found_url" })
  onNoSubscriptionsFoundUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_canceled_url" })
  onSubscriptionCanceledUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_not_found_url" })
  onSubscriptionNotFoundUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_not_ready_url" })
  onSubscriptionNotReadyUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_suspended_url" })
  onSubscriptionSuspendedUrl: string;

  @SpeakeasyMetadata({ data: "json, name=owner_id" })
  ownerId: string;

  @SpeakeasyMetadata({ data: "json, name=privacy_notice_page_url" })
  privacyNoticePageUrl: string;

  @SpeakeasyMetadata({ data: "json, name=product_name" })
  productName: string;

  @SpeakeasyMetadata({ data: "json, name=publisher_name" })
  publisherName: string;

  @SpeakeasyMetadata({ data: "json, name=seatingConfig" })
  seatingConfig: MutationProductsUpdateRequestBodyProductConfigSeatingConfig;
}

export class MutationProductsUpdateRequestBody extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=productConfig" })
  productConfig: MutationProductsUpdateRequestBodyProductConfig;
}

export class MutationProductsUpdateRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationProductsUpdatePathParams;

  @SpeakeasyMetadata({ data: "request, media_type=application/json" })
  request: MutationProductsUpdateRequestBody;
}

export class MutationProductsUpdateDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationProductsUpdateDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationProductsUpdateDefaultApplicationJSONIssues })
  issues?: MutationProductsUpdateDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}
export enum MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum {
    MonthlyActiveUser = "monthly_active_user",
    FirstComeFirstServed = "first_come_first_served"
}

export class MutationProductsUpdate200ApplicationJSONSeatingConfig extends SpeakeasyBase {
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
  seatingStrategyName: MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum;
}

export class MutationProductsUpdate200ApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=contact_page_url" })
  contactPageUrl: string;

  @SpeakeasyMetadata({ data: "json, name=contact_sales_email" })
  contactSalesEmail: string;

  @SpeakeasyMetadata({ data: "json, name=contact_sales_url" })
  contactSalesUrl: string;

  @SpeakeasyMetadata({ data: "json, name=contact_support_email" })
  contactSupportEmail: string;

  @SpeakeasyMetadata({ data: "json, name=contact_support_url" })
  contactSupportUrl: string;

  @SpeakeasyMetadata({ data: "json, name=home_page_url" })
  homePageUrl: string;

  @SpeakeasyMetadata({ data: "json, name=id" })
  id: string;

  @SpeakeasyMetadata({ data: "json, name=is_setup_complete" })
  isSetupComplete: boolean;

  @SpeakeasyMetadata({ data: "json, name=on_access_denied_url" })
  onAccessDeniedUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_access_granted_url" })
  onAccessGrantedUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_no_seat_available_url" })
  onNoSeatAvailableUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_no_subscriptions_found_url" })
  onNoSubscriptionsFoundUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_canceled_url" })
  onSubscriptionCanceledUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_not_found_url" })
  onSubscriptionNotFoundUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_not_ready_url" })
  onSubscriptionNotReadyUrl: string;

  @SpeakeasyMetadata({ data: "json, name=on_subscription_suspended_url" })
  onSubscriptionSuspendedUrl: string;

  @SpeakeasyMetadata({ data: "json, name=owner_id" })
  ownerId: string;

  @SpeakeasyMetadata({ data: "json, name=privacy_notice_page_url" })
  privacyNoticePageUrl: string;

  @SpeakeasyMetadata({ data: "json, name=product_name" })
  productName: string;

  @SpeakeasyMetadata({ data: "json, name=publisher_name" })
  publisherName: string;

  @SpeakeasyMetadata({ data: "json, name=seatingConfig" })
  seatingConfig: MutationProductsUpdate200ApplicationJSONSeatingConfig;
}

export class MutationProductsUpdateResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationProductsUpdate200ApplicationJSONObject?: MutationProductsUpdate200ApplicationJSON;

  @SpeakeasyMetadata()
  mutationProductsUpdateDefaultApplicationJSONObject?: MutationProductsUpdateDefaultApplicationJSON;
}