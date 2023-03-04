package operations

type MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnum string

const (
	MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationProductsCreateRequestBodySeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                               `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                              `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                  `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                               `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                              `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationProductsCreateRequestBody struct {
	ContactPageURL             string                                         `json:"contact_page_url"`
	ContactSalesEmail          string                                         `json:"contact_sales_email"`
	ContactSalesURL            string                                         `json:"contact_sales_url"`
	ContactSupportEmail        string                                         `json:"contact_support_email"`
	ContactSupportURL          string                                         `json:"contact_support_url"`
	HomePageURL                string                                         `json:"home_page_url"`
	ID                         string                                         `json:"id"`
	IsSetupComplete            bool                                           `json:"is_setup_complete"`
	OnAccessDeniedURL          string                                         `json:"on_access_denied_url"`
	OnAccessGrantedURL         string                                         `json:"on_access_granted_url"`
	OnNoSeatAvailableURL       string                                         `json:"on_no_seat_available_url"`
	OnNoSubscriptionsFoundURL  string                                         `json:"on_no_subscriptions_found_url"`
	OnSubscriptionCanceledURL  string                                         `json:"on_subscription_canceled_url"`
	OnSubscriptionNotFoundURL  string                                         `json:"on_subscription_not_found_url"`
	OnSubscriptionNotReadyURL  string                                         `json:"on_subscription_not_ready_url"`
	OnSubscriptionSuspendedURL string                                         `json:"on_subscription_suspended_url"`
	PrivacyNoticePageURL       string                                         `json:"privacy_notice_page_url"`
	ProductName                string                                         `json:"product_name"`
	PublisherName              string                                         `json:"publisher_name"`
	SeatingConfig              MutationProductsCreateRequestBodySeatingConfig `json:"seatingConfig"`
}

type MutationProductsCreateRequest struct {
	Request MutationProductsCreateRequestBody `request:"mediaType=application/json"`
}

type MutationProductsCreateDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationProductsCreateDefaultApplicationJSON struct {
	Code    string                                               `json:"code"`
	Issues  []MutationProductsCreateDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                               `json:"message"`
}

type MutationProductsCreate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	MutationProductsCreate200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationProductsCreate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationProductsCreate200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationProductsCreate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationProductsCreate200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                      `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                     `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                         `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                      `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                       `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                     `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationProductsCreate200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationProductsCreate200ApplicationJSON struct {
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
	SeatingConfig              MutationProductsCreate200ApplicationJSONSeatingConfig `json:"seatingConfig"`
}

type MutationProductsCreateResponse struct {
	ContentType                                        string
	StatusCode                                         int64
	MutationProductsCreate200ApplicationJSONObject     *MutationProductsCreate200ApplicationJSON
	MutationProductsCreateDefaultApplicationJSONObject *MutationProductsCreateDefaultApplicationJSON
}
