package operations

type QueryProductsAllDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type QueryProductsAllDefaultApplicationJSON struct {
	Code    string                                         `json:"code"`
	Issues  []QueryProductsAllDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                         `json:"message"`
}

type QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type QueryProductsAll200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                               `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                   `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                 `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                               `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type QueryProductsAll200ApplicationJSON struct {
	ContactPageURL             string                                          `json:"contact_page_url"`
	ContactSalesEmail          string                                          `json:"contact_sales_email"`
	ContactSalesURL            string                                          `json:"contact_sales_url"`
	ContactSupportEmail        string                                          `json:"contact_support_email"`
	ContactSupportURL          string                                          `json:"contact_support_url"`
	HomePageURL                string                                          `json:"home_page_url"`
	ID                         string                                          `json:"id"`
	IsSetupComplete            bool                                            `json:"is_setup_complete"`
	OnAccessDeniedURL          string                                          `json:"on_access_denied_url"`
	OnAccessGrantedURL         string                                          `json:"on_access_granted_url"`
	OnNoSeatAvailableURL       string                                          `json:"on_no_seat_available_url"`
	OnNoSubscriptionsFoundURL  string                                          `json:"on_no_subscriptions_found_url"`
	OnSubscriptionCanceledURL  string                                          `json:"on_subscription_canceled_url"`
	OnSubscriptionNotFoundURL  string                                          `json:"on_subscription_not_found_url"`
	OnSubscriptionNotReadyURL  string                                          `json:"on_subscription_not_ready_url"`
	OnSubscriptionSuspendedURL string                                          `json:"on_subscription_suspended_url"`
	OwnerID                    string                                          `json:"owner_id"`
	PrivacyNoticePageURL       string                                          `json:"privacy_notice_page_url"`
	ProductName                string                                          `json:"product_name"`
	PublisherName              string                                          `json:"publisher_name"`
	SeatingConfig              QueryProductsAll200ApplicationJSONSeatingConfig `json:"seatingConfig"`
}

type QueryProductsAllResponse struct {
	ContentType                                  string
	StatusCode                                   int64
	QueryProductsAll200ApplicationJSONObjects    []QueryProductsAll200ApplicationJSON
	QueryProductsAllDefaultApplicationJSONObject *QueryProductsAllDefaultApplicationJSON
}
