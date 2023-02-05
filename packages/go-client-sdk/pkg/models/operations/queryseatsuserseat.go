package operations

import (
	"time"
)

type QuerySeatsUserSeatPathParams struct {
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
	TenantID       string `pathParam:"style=simple,explode=false,name=tenantId"`
	UserID         string `pathParam:"style=simple,explode=false,name=userId"`
}

type QuerySeatsUserSeatRequest struct {
	PathParams QuerySeatsUserSeatPathParams
}

type QuerySeatsUserSeatDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type QuerySeatsUserSeatDefaultApplicationJSON struct {
	Code    string                                           `json:"code"`
	Issues  []QuerySeatsUserSeatDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                           `json:"message"`
}

type QuerySeatsUserSeat200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type QuerySeatsUserSeat200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum string

const (
	QuerySeatsUserSeat200ApplicationJSONSeatTypeEnumStandard QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum = "standard"
	QuerySeatsUserSeat200ApplicationJSONSeatTypeEnumLimited  QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum = "limited"
)

type QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum string

const (
	QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type QuerySeatsUserSeat200ApplicationJSON struct {
	CreatedUtc          time.Time                                                   `json:"created_utc"`
	ExpiresUtc          time.Time                                                   `json:"expires_utc"`
	ID                  string                                                      `json:"id"`
	Occupant            QuerySeatsUserSeat200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                                   `json:"redeemed_utc"`
	Reservation         QuerySeatsUserSeat200ApplicationJSONReservation             `json:"reservation"`
	SeatType            QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                      `json:"subscription_id"`
}

type QuerySeatsUserSeatResponse struct {
	ContentType                                    string
	StatusCode                                     int64
	QuerySeatsUserSeat200ApplicationJSONObject     *QuerySeatsUserSeat200ApplicationJSON
	QuerySeatsUserSeatDefaultApplicationJSONObject *QuerySeatsUserSeatDefaultApplicationJSON
}
