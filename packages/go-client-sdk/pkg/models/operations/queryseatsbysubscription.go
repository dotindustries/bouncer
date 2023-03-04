package operations

import (
	"time"
)

type QuerySeatsBySubscriptionPathParams struct {
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type QuerySeatsBySubscriptionQueryParams struct {
	UserEmail *string `queryParam:"style=form,explode=true,name=userEmail"`
	UserID    *string `queryParam:"style=form,explode=true,name=userId"`
}

type QuerySeatsBySubscriptionRequest struct {
	PathParams  QuerySeatsBySubscriptionPathParams
	QueryParams QuerySeatsBySubscriptionQueryParams
}

type QuerySeatsBySubscriptionDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type QuerySeatsBySubscriptionDefaultApplicationJSON struct {
	Code    string                                                 `json:"code"`
	Issues  []QuerySeatsBySubscriptionDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                 `json:"message"`
}

type QuerySeatsBySubscription200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type QuerySeatsBySubscription200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum string

const (
	QuerySeatsBySubscription200ApplicationJSONSeatTypeEnumStandard QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum = "standard"
	QuerySeatsBySubscription200ApplicationJSONSeatTypeEnumLimited  QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum = "limited"
)

type QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum string

const (
	QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type QuerySeatsBySubscription200ApplicationJSON struct {
	CreatedUtc          time.Time                                                         `json:"created_utc"`
	ExpiresUtc          time.Time                                                         `json:"expires_utc"`
	ID                  string                                                            `json:"id"`
	Occupant            QuerySeatsBySubscription200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                                         `json:"redeemed_utc"`
	Reservation         QuerySeatsBySubscription200ApplicationJSONReservation             `json:"reservation"`
	SeatType            QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                            `json:"subscription_id"`
}

type QuerySeatsBySubscriptionResponse struct {
	ContentType                                          string
	StatusCode                                           int64
	QuerySeatsBySubscription200ApplicationJSONObjects    []QuerySeatsBySubscription200ApplicationJSON
	QuerySeatsBySubscriptionDefaultApplicationJSONObject *QuerySeatsBySubscriptionDefaultApplicationJSON
}
