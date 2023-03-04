package operations

import (
	"time"
)

type QuerySubscriptionsByIDPathParams struct {
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type QuerySubscriptionsByIDRequest struct {
	PathParams QuerySubscriptionsByIDPathParams
}

type QuerySubscriptionsByIDDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type QuerySubscriptionsByIDDefaultApplicationJSON struct {
	Code    string                                               `json:"code"`
	Issues  []QuerySubscriptionsByIDDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                               `json:"message"`
}

type QuerySubscriptionsByID200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	QuerySubscriptionsByID200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    QuerySubscriptionsByID200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	QuerySubscriptionsByID200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed QuerySubscriptionsByID200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type QuerySubscriptionsByID200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                      `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                     `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                         `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                      `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                       `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                     `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               QuerySubscriptionsByID200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type QuerySubscriptionsByID200ApplicationJSONStateEnum string

const (
	QuerySubscriptionsByID200ApplicationJSONStateEnumPurchased QuerySubscriptionsByID200ApplicationJSONStateEnum = "purchased"
	QuerySubscriptionsByID200ApplicationJSONStateEnumActive    QuerySubscriptionsByID200ApplicationJSONStateEnum = "active"
	QuerySubscriptionsByID200ApplicationJSONStateEnumSuspended QuerySubscriptionsByID200ApplicationJSONStateEnum = "suspended"
	QuerySubscriptionsByID200ApplicationJSONStateEnumCanceled  QuerySubscriptionsByID200ApplicationJSONStateEnum = "canceled"
)

type QuerySubscriptionsByID200ApplicationJSON struct {
	AdminEmail          string                                                `json:"admin_email"`
	AdminName           string                                                `json:"admin_name"`
	AdminRoleName       string                                                `json:"admin_role_name"`
	CreatedUtc          time.Time                                             `json:"created_utc"`
	ID                  string                                                `json:"id"`
	IsBeingConfigured   bool                                                  `json:"is_being_configured"`
	IsFreeTrial         bool                                                  `json:"is_free_trial"`
	IsSetupComplete     bool                                                  `json:"is_setup_complete"`
	IsTestSubscription  bool                                                  `json:"is_test_subscription"`
	ManagementUrls      *interface{}                                          `json:"management_urls,omitempty"`
	OfferID             string                                                `json:"offer_id"`
	PlanID              string                                                `json:"plan_id"`
	ProductID           string                                                `json:"product_id"`
	SeatingConfig       QuerySubscriptionsByID200ApplicationJSONSeatingConfig `json:"seatingConfig"`
	SourceSubscription  *interface{}                                          `json:"source_subscription,omitempty"`
	State               QuerySubscriptionsByID200ApplicationJSONStateEnum     `json:"state"`
	StateLastUpdatedUtc time.Time                                             `json:"state_last_updated_utc"`
	SubscriberInfo      *interface{}                                          `json:"subscriber_info,omitempty"`
	SubscriptionName    string                                                `json:"subscription_name"`
	TenantID            string                                                `json:"tenant_id"`
	TenantName          string                                                `json:"tenant_name"`
	TotalSeats          int64                                                 `json:"total_seats"`
	UserRoleName        string                                                `json:"user_role_name"`
}

type QuerySubscriptionsByIDResponse struct {
	ContentType                                        string
	StatusCode                                         int64
	QuerySubscriptionsByID200ApplicationJSONObject     *QuerySubscriptionsByID200ApplicationJSON
	QuerySubscriptionsByIDDefaultApplicationJSONObject *QuerySubscriptionsByIDDefaultApplicationJSON
}
