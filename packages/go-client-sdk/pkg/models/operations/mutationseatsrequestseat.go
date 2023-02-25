package operations

import (
	"time"
)

type MutationSeatsRequestSeatPathParams struct {
	SeatID         string `pathParam:"style=simple,explode=false,name=seatId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSeatsRequestSeatRequestBodyUser struct {
	Email    *string `json:"email,omitempty"`
	TenantID string  `json:"tenant_id"`
	UserID   string  `json:"user_id"`
	UserName *string `json:"user_name,omitempty"`
}

type MutationSeatsRequestSeatRequestBody struct {
	User MutationSeatsRequestSeatRequestBodyUser `json:"user"`
}

type MutationSeatsRequestSeatRequest struct {
	PathParams MutationSeatsRequestSeatPathParams
	Request    MutationSeatsRequestSeatRequestBody `request:"mediaType=application/json"`
}

type MutationSeatsRequestSeatDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSeatsRequestSeatDefaultApplicationJSON struct {
	Code    string                                                 `json:"code"`
	Issues  []MutationSeatsRequestSeatDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                 `json:"message"`
}

type MutationSeatsRequestSeat200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type MutationSeatsRequestSeat200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnum string

const (
	MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnumStandard MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnum = "standard"
	MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnumLimited  MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnum = "limited"
)

type MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnum string

const (
	MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSeatsRequestSeat200ApplicationJSON struct {
	CreatedUtc          time.Time                                                         `json:"created_utc"`
	ExpiresUtc          time.Time                                                         `json:"expires_utc"`
	ID                  string                                                            `json:"id"`
	Occupant            MutationSeatsRequestSeat200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                                         `json:"redeemed_utc"`
	Reservation         MutationSeatsRequestSeat200ApplicationJSONReservation             `json:"reservation"`
	SeatType            MutationSeatsRequestSeat200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName MutationSeatsRequestSeat200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                            `json:"subscription_id"`
}

type MutationSeatsRequestSeatResponse struct {
	ContentType                                          string
	StatusCode                                           int64
	MutationSeatsRequestSeat200ApplicationJSONObject     *MutationSeatsRequestSeat200ApplicationJSON
	MutationSeatsRequestSeatDefaultApplicationJSONObject *MutationSeatsRequestSeatDefaultApplicationJSON
}
