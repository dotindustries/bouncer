package operations

import (
	"time"
)

type MutationSubscriptionsUpdateSubscriptionPathParams struct {
	ProductID      string `pathParam:"style=simple,explode=false,name=productId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum string

const (
	MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent *float64                                                                                            `json:"default_low_seat_warning_level_percent,omitempty"`
	DefaultSeatExpiryInDays           *float64                                                                                            `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     *bool                                                                                               `json:"limited_overflow_seating_enabled,omitempty"`
	LowSeatWarningLevelPct            *float64                                                                                            `json:"low_seat_warning_level_pct,omitempty"`
	OwnerID                           *string                                                                                             `json:"owner_id,omitempty"`
	SeatReservationExpiryInDays       *float64                                                                                            `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               *MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name,omitempty"`
}

type MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum string

const (
	MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnumPurchased MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum = "purchased"
	MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnumActive    MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum = "active"
	MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnumSuspended MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum = "suspended"
	MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnumCanceled  MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum = "canceled"
)

type MutationSubscriptionsUpdateSubscriptionRequestBodySubscription struct {
	AdminEmail          *string                                                                     `json:"admin_email,omitempty"`
	AdminName           *string                                                                     `json:"admin_name,omitempty"`
	AdminRoleName       *string                                                                     `json:"admin_role_name,omitempty"`
	CreatedUtc          *time.Time                                                                  `json:"created_utc,omitempty"`
	ID                  string                                                                      `json:"id"`
	IsBeingConfigured   *bool                                                                       `json:"is_being_configured,omitempty"`
	IsFreeTrial         *bool                                                                       `json:"is_free_trial,omitempty"`
	IsSetupComplete     *bool                                                                       `json:"is_setup_complete,omitempty"`
	IsTestSubscription  *bool                                                                       `json:"is_test_subscription,omitempty"`
	ManagementUrls      *interface{}                                                                `json:"management_urls,omitempty"`
	PlanID              *string                                                                     `json:"plan_id,omitempty"`
	ProductID           *string                                                                     `json:"product_id,omitempty"`
	SeatingConfig       MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig `json:"seatingConfig"`
	SourceSubscription  *interface{}                                                                `json:"source_subscription,omitempty"`
	State               *MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum    `json:"state,omitempty"`
	StateLastUpdatedUtc *time.Time                                                                  `json:"state_last_updated_utc,omitempty"`
	SubscriberInfo      *interface{}                                                                `json:"subscriber_info,omitempty"`
	SubscriptionName    *string                                                                     `json:"subscription_name,omitempty"`
	TenantName          *string                                                                     `json:"tenant_name,omitempty"`
	TotalSeats          *int64                                                                      `json:"total_seats,omitempty"`
	UserRoleName        *string                                                                     `json:"user_role_name,omitempty"`
}

type MutationSubscriptionsUpdateSubscriptionRequestBody struct {
	Subscription MutationSubscriptionsUpdateSubscriptionRequestBodySubscription `json:"subscription"`
}

type MutationSubscriptionsUpdateSubscriptionRequest struct {
	PathParams MutationSubscriptionsUpdateSubscriptionPathParams
	Request    MutationSubscriptionsUpdateSubscriptionRequestBody `request:"mediaType=application/json"`
}

type MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON struct {
	Code    string                                                                `json:"code"`
	Issues  []MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                                `json:"message"`
}

type MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum string

const (
	MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnumMonthlyActiveUser    MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "monthly_active_user"
	MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnumFirstComeFirstServed MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig struct {
	DefaultLowSeatWarningLevelPercent float64                                                                                       `json:"default_low_seat_warning_level_percent"`
	DefaultSeatExpiryInDays           *float64                                                                                      `json:"default_seat_expiry_in_days,omitempty"`
	LimitedOverflowSeatingEnabled     bool                                                                                          `json:"limited_overflow_seating_enabled"`
	LowSeatWarningLevelPct            float64                                                                                       `json:"low_seat_warning_level_pct"`
	OwnerID                           string                                                                                        `json:"owner_id"`
	SeatReservationExpiryInDays       *float64                                                                                      `json:"seat_reservation_expiry_in_days,omitempty"`
	SeatingStrategyName               MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum `json:"seating_strategy_name"`
}

type MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum string

const (
	MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnumPurchased MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum = "purchased"
	MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnumActive    MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum = "active"
	MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnumSuspended MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum = "suspended"
	MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnumCanceled  MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum = "canceled"
)

type MutationSubscriptionsUpdateSubscription200ApplicationJSON struct {
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
	SeatingConfig       MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig `json:"seatingConfig"`
	SourceSubscription  *interface{}                                                           `json:"source_subscription,omitempty"`
	State               MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum     `json:"state"`
	StateLastUpdatedUtc time.Time                                                              `json:"state_last_updated_utc"`
	SubscriberInfo      *interface{}                                                           `json:"subscriber_info,omitempty"`
	SubscriptionName    string                                                                 `json:"subscription_name"`
	TenantID            string                                                                 `json:"tenant_id"`
	TenantName          string                                                                 `json:"tenant_name"`
	TotalSeats          int64                                                                  `json:"total_seats"`
	UserRoleName        string                                                                 `json:"user_role_name"`
}

type MutationSubscriptionsUpdateSubscriptionResponse struct {
	ContentType                                                         string
	StatusCode                                                          int64
	MutationSubscriptionsUpdateSubscription200ApplicationJSONObject     *MutationSubscriptionsUpdateSubscription200ApplicationJSON
	MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject *MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON
}
