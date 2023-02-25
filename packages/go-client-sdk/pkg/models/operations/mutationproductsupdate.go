package operations

type MutationProductsUpdatePathParams struct {
	ProductID string `pathParam:"style=simple,explode=false,name=productId"`
}

type MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum string

const (
	MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationProductsUpdateRequestBodyProductConfigSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                            `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                           `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                               `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                            `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                             `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                           `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationProductsUpdateRequestBodyProductConfig struct {
	ContactPageURL             string                                                      `json:"contact_page_url"`
	ContactSalesEmail          string                                                      `json:"contact_sales_email"`
	ContactSalesURL            string                                                      `json:"contact_sales_url"`
	ContactSupportEmail        string                                                      `json:"contact_support_email"`
	ContactSupportURL          string                                                      `json:"contact_support_url"`
	HomePageURL                string                                                      `json:"home_page_url"`
	ID                         string                                                      `json:"id"`
	IsSetupComplete            bool                                                        `json:"is_setup_complete"`
	OnAccessDeniedURL          string                                                      `json:"on_access_denied_url"`
	OnAccessGrantedURL         string                                                      `json:"on_access_granted_url"`
	OnNoSeatAvailableURL       string                                                      `json:"on_no_seat_available_url"`
	OnNoSubscriptionsFoundURL  string                                                      `json:"on_no_subscriptions_found_url"`
	OnSubscriptionCanceledURL  string                                                      `json:"on_subscription_canceled_url"`
	OnSubscriptionNotFoundURL  string                                                      `json:"on_subscription_not_found_url"`
	OnSubscriptionNotReadyURL  string                                                      `json:"on_subscription_not_ready_url"`
	OnSubscriptionSuspendedURL string                                                      `json:"on_subscription_suspended_url"`
	OwnerID                    string                                                      `json:"owner_id"`
	PrivacyNoticePageURL       string                                                      `json:"privacy_notice_page_url"`
	ProductName                string                                                      `json:"product_name"`
	PublisherName              string                                                      `json:"publisher_name"`
	SeatingConfig              MutationProductsUpdateRequestBodyProductConfigSeatingConfig `json:"seatingConfig"`
}

type MutationProductsUpdateRequestBody struct {
	ProductConfig MutationProductsUpdateRequestBodyProductConfig `json:"productConfig"`
}

type MutationProductsUpdateRequest struct {
	PathParams MutationProductsUpdatePathParams
	Request    MutationProductsUpdateRequestBody `request:"mediaType=application/json"`
}

type MutationProductsUpdateDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationProductsUpdateDefaultApplicationJSON struct {
	Code    string                                               `json:"code"`
	Issues  []MutationProductsUpdateDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                               `json:"message"`
}

type MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationProductsUpdate200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                      `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                     `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                         `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                      `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                       `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                     `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationProductsUpdate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationProductsUpdate200ApplicationJSON struct {
	ContactPageURL             string                                                `json:"contact_page_url"`
	ContactSalesEmail          string                                                `json:"contact_sales_email"`
	ContactSalesURL            string                                                `json:"contact_sales_url"`
	ContactSupportEmail        string                                                `json:"contact_support_email"`
	ContactSupportURL          string                                                `json:"contact_support_url"`
	HomePageURL                string                                                `json:"home_page_url"`
	ID                         string                                                `json:"id"`
	IsSetupComplete            bool                                                  `json:"is_setup_complete"`
	OnAccessDeniedURL          string                                                `json:"on_access_denied_url"`
	OnAccessGrantedURL         string                                                `json:"on_access_granted_url"`
	OnNoSeatAvailableURL       string                                                `json:"on_no_seat_available_url"`
	OnNoSubscriptionsFoundURL  string                                                `json:"on_no_subscriptions_found_url"`
	OnSubscriptionCanceledURL  string                                                `json:"on_subscription_canceled_url"`
	OnSubscriptionNotFoundURL  string                                                `json:"on_subscription_not_found_url"`
	OnSubscriptionNotReadyURL  string                                                `json:"on_subscription_not_ready_url"`
	OnSubscriptionSuspendedURL string                                                `json:"on_subscription_suspended_url"`
	OwnerID                    string                                                `json:"owner_id"`
	PrivacyNoticePageURL       string                                                `json:"privacy_notice_page_url"`
	ProductName                string                                                `json:"product_name"`
	PublisherName              string                                                `json:"publisher_name"`
	SeatingConfig              MutationProductsUpdate200ApplicationJSONSeatingConfig `json:"seatingConfig"`
}

type MutationProductsUpdateResponse struct {
	ContentType                                        string
	StatusCode                                         int64
	MutationProductsUpdate200ApplicationJSONObject     *MutationProductsUpdate200ApplicationJSON
	MutationProductsUpdateDefaultApplicationJSONObject *MutationProductsUpdateDefaultApplicationJSON
}
