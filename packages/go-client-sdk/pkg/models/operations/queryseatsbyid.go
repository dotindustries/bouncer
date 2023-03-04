package operations

import (
	"time"
)

type QuerySeatsByIDPathParams struct {
	SeatID         string `pathParam:"style=simple,explode=false,name=seatId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type QuerySeatsByIDRequest struct {
	PathParams QuerySeatsByIDPathParams
}

type QuerySeatsByIDDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type QuerySeatsByIDDefaultApplicationJSON struct {
	Code    string                                       `json:"code"`
	Issues  []QuerySeatsByIDDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                       `json:"message"`
}

type QuerySeatsByID200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type QuerySeatsByID200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type QuerySeatsByID200ApplicationJSONSeatTypeEnum string

const (
	QuerySeatsByID200ApplicationJSONSeatTypeEnumStandard QuerySeatsByID200ApplicationJSONSeatTypeEnum = "standard"
	QuerySeatsByID200ApplicationJSONSeatTypeEnumLimited  QuerySeatsByID200ApplicationJSONSeatTypeEnum = "limited"
)

type QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnum string

const (
	QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type QuerySeatsByID200ApplicationJSON struct {
	CreatedUtc          time.Time                                               `json:"created_utc"`
	ExpiresUtc          time.Time                                               `json:"expires_utc"`
	ID                  string                                                  `json:"id"`
	Occupant            QuerySeatsByID200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                               `json:"redeemed_utc"`
	Reservation         QuerySeatsByID200ApplicationJSONReservation             `json:"reservation"`
	SeatType            QuerySeatsByID200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                  `json:"subscription_id"`
}

type QuerySeatsByIDResponse struct {
	ContentType                                string
	StatusCode                                 int64
	QuerySeatsByID200ApplicationJSONObject     *QuerySeatsByID200ApplicationJSON
	QuerySeatsByIDDefaultApplicationJSONObject *QuerySeatsByIDDefaultApplicationJSON
}
