package operations

import (
	"time"
)

type QuerySubscriptionsAllQueryParams struct {
	ProductID string `queryParam:"style=form,explode=true,name=productId"`
}

type QuerySubscriptionsAllRequest struct {
	QueryParams QuerySubscriptionsAllQueryParams
}

type QuerySubscriptionsAllDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type QuerySubscriptionsAllDefaultApplicationJSON struct {
	Code    string                                              `json:"code"`
	Issues  []QuerySubscriptionsAllDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                              `json:"message"`
}

type QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type QuerySubscriptionsAll200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                     `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                    `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                        `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                     `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                      `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                    `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type QuerySubscriptionsAll200ApplicationJSONStateEnum string

const (
	QuerySubscriptionsAll200ApplicationJSONStateEnumPurchased QuerySubscriptionsAll200ApplicationJSONStateEnum = "purchased"
	QuerySubscriptionsAll200ApplicationJSONStateEnumActive    QuerySubscriptionsAll200ApplicationJSONStateEnum = "active"
	QuerySubscriptionsAll200ApplicationJSONStateEnumSuspended QuerySubscriptionsAll200ApplicationJSONStateEnum = "suspended"
	QuerySubscriptionsAll200ApplicationJSONStateEnumCanceled  QuerySubscriptionsAll200ApplicationJSONStateEnum = "canceled"
)

type QuerySubscriptionsAll200ApplicationJSON struct {
	AdminEmail          string                                               `json:"admin_email"`
	AdminName           string                                               `json:"admin_name"`
	AdminRoleName       string                                               `json:"admin_role_name"`
	CreatedUtc          time.Time                                            `json:"created_utc"`
	ID                  string                                               `json:"id"`
	IsBeingConfigured   bool                                                 `json:"is_being_configured"`
	IsFreeTrial         bool                                                 `json:"is_free_trial"`
	IsSetupComplete     bool                                                 `json:"is_setup_complete"`
	IsTestSubscription  bool                                                 `json:"is_test_subscription"`
	ManagementUrls      *interface{}                                         `json:"management_urls,omitempty"`
	OfferID             string                                               `json:"offer_id"`
	PlanID              string                                               `json:"plan_id"`
	ProductID           string                                               `json:"product_id"`
	SeatingConfig       QuerySubscriptionsAll200ApplicationJSONSeatingConfig `json:"seatingConfig"`
	SourceSubscription  *interface{}                                         `json:"source_subscription,omitempty"`
	State               QuerySubscriptionsAll200ApplicationJSONStateEnum     `json:"state"`
	StateLastUpdatedUtc time.Time                                            `json:"state_last_updated_utc"`
	SubscriberInfo      *interface{}                                         `json:"subscriber_info,omitempty"`
	SubscriptionName    string                                               `json:"subscription_name"`
	TenantID            string                                               `json:"tenant_id"`
	TenantName          string                                               `json:"tenant_name"`
	TotalSeats          int64                                                `json:"total_seats"`
	UserRoleName        string                                               `json:"user_role_name"`
}

type QuerySubscriptionsAllResponse struct {
	ContentType                                       string
	StatusCode                                        int64
	QuerySubscriptionsAll200ApplicationJSONObjects    []QuerySubscriptionsAll200ApplicationJSON
	QuerySubscriptionsAllDefaultApplicationJSONObject *QuerySubscriptionsAllDefaultApplicationJSON
}
