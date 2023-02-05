package operations

import (
	"time"
)

type MutationSubscriptionsCreateSubscriptionPathParams struct {
	ProductID      string `pathParam:"style=simple,explode=false,name=productId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum string

const (
	MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                                            `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                                           `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                                               `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                                            `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                                             `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                                           `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum string

const (
	MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnumPurchased MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum = "purchased"
	MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnumActive    MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum = "active"
	MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnumSuspended MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum = "suspended"
	MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnumCanceled  MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum = "canceled"
)

type MutationSubscriptionsCreateSubscriptionRequestBodySubscription struct {
	AdminEmail          string                                                                      `json:"admin_email"`
	AdminName           string                                                                      `json:"admin_name"`
	AdminRoleName       string                                                                      `json:"admin_role_name"`
	CreatedUtc          time.Time                                                                   `json:"created_utc"`
	ID                  string                                                                      `json:"id"`
	IsBeingConfigured   bool                                                                        `json:"is_being_configured"`
	IsFreeTrial         bool                                                                        `json:"is_free_trial"`
	IsSetupComplete     bool                                                                        `json:"is_setup_complete"`
	IsTestSubscription  bool                                                                        `json:"is_test_subscription"`
	ManagementUrls      *interface{}                                                                `json:"management_urls,omitempty"`
	OfferID             string                                                                      `json:"offer_id"`
	PlanID              string                                                                      `json:"plan_id"`
	ProductID           string                                                                      `json:"product_id"`
	SeatingConfig       MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig `json:"seatingConfig"`
	SourceSubscription  *interface{}                                                                `json:"source_subscription,omitempty"`
	State               MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum     `json:"state"`
	StateLastUpdatedUtc time.Time                                                                   `json:"state_last_updated_utc"`
	SubscriberInfo      *interface{}                                                                `json:"subscriber_info,omitempty"`
	SubscriptionName    string                                                                      `json:"subscription_name"`
	TenantID            string                                                                      `json:"tenant_id"`
	TenantName          string                                                                      `json:"tenant_name"`
	TotalSeats          int64                                                                       `json:"total_seats"`
	UserRoleName        string                                                                      `json:"user_role_name"`
}

type MutationSubscriptionsCreateSubscriptionRequestBody struct {
	Subscription MutationSubscriptionsCreateSubscriptionRequestBodySubscription `json:"subscription"`
}

type MutationSubscriptionsCreateSubscriptionRequest struct {
	PathParams MutationSubscriptionsCreateSubscriptionPathParams
	Request    MutationSubscriptionsCreateSubscriptionRequestBody `request:"mediaType=application/json"`
}

type MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON struct {
	Code    string                                                                `json:"code"`
	Issues  []MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                                `json:"message"`
}

type MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                                       `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                                      `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                                          `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                                       `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                                        `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                                      `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum string

const (
	MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnumPurchased MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum = "purchased"
	MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnumActive    MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum = "active"
	MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnumSuspended MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum = "suspended"
	MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnumCanceled  MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum = "canceled"
)

type MutationSubscriptionsCreateSubscription200ApplicationJSON struct {
	AdminEmail          string                                                                 `json:"admin_email"`
	AdminName           string                                                                 `json:"admin_name"`
	AdminRoleName       string                                                                 `json:"admin_role_name"`
	CreatedUtc          time.Time                                                              `json:"created_utc"`
	ID                  string                                                                 `json:"id"`
	IsBeingConfigured   bool                                                                   `json:"is_being_configured"`
	IsFreeTrial         bool                                                                   `json:"is_free_trial"`
	IsSetupComplete     bool                                                                   `json:"is_setup_complete"`
	IsTestSubscription  bool                                                                   `json:"is_test_subscription"`
	ManagementUrls      *interface{}                                                           `json:"management_urls,omitempty"`
	OfferID             string                                                                 `json:"offer_id"`
	PlanID              string                                                                 `json:"plan_id"`
	ProductID           string                                                                 `json:"product_id"`
	SeatingConfig       MutationSubscriptionsCreateSubscription200ApplicationJSONSeatingConfig `json:"seatingConfig"`
	SourceSubscription  *interface{}                                                           `json:"source_subscription,omitempty"`
	State               MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum     `json:"state"`
	StateLastUpdatedUtc time.Time                                                              `json:"state_last_updated_utc"`
	SubscriberInfo      *interface{}                                                           `json:"subscriber_info,omitempty"`
	SubscriptionName    string                                                                 `json:"subscription_name"`
	TenantID            string                                                                 `json:"tenant_id"`
	TenantName          string                                                                 `json:"tenant_name"`
	TotalSeats          int64                                                                  `json:"total_seats"`
	UserRoleName        string                                                                 `json:"user_role_name"`
}

type MutationSubscriptionsCreateSubscriptionResponse struct {
	ContentType                                                         string
	StatusCode                                                          int64
	MutationSubscriptionsCreateSubscription200ApplicationJSONObject     *MutationSubscriptionsCreateSubscription200ApplicationJSON
	MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject *MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON
}
