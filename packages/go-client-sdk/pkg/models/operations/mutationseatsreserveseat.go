package operations

import (
	"time"
)

type MutationSeatsReserveSeatPathParams struct {
	SeatID         string `pathParam:"style=simple,explode=false,name=seatId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSeatsReserveSeatRequestBodyReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type MutationSeatsReserveSeatRequestBody struct {
	Reservation MutationSeatsReserveSeatRequestBodyReservation `json:"reservation"`
}

type MutationSeatsReserveSeatRequest struct {
	PathParams MutationSeatsReserveSeatPathParams
	Request    MutationSeatsReserveSeatRequestBody `request:"mediaType=application/json"`
}

type MutationSeatsReserveSeatDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSeatsReserveSeatDefaultApplicationJSON struct {
	Code    string                                                 `json:"code"`
	Issues  []MutationSeatsReserveSeatDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                 `json:"message"`
}

type MutationSeatsReserveSeat200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type MutationSeatsReserveSeat200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum string

const (
	MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnumStandard MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum = "standard"
	MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnumLimited  MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum = "limited"
)

type MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum string

const (
	MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSeatsReserveSeat200ApplicationJSON struct {
	CreatedUtc          time.Time                                                         `json:"created_utc"`
	ExpiresUtc          time.Time                                                         `json:"expires_utc"`
	ID                  string                                                            `json:"id"`
	Occupant            MutationSeatsReserveSeat200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                                         `json:"redeemed_utc"`
	Reservation         MutationSeatsReserveSeat200ApplicationJSONReservation             `json:"reservation"`
	SeatType            MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                            `json:"subscription_id"`
}

type MutationSeatsReserveSeatResponse struct {
	ContentType                                          string
	StatusCode                                           int64
	MutationSeatsReserveSeat200ApplicationJSONObject     *MutationSeatsReserveSeat200ApplicationJSON
	MutationSeatsReserveSeatDefaultApplicationJSONObject *MutationSeatsReserveSeatDefaultApplicationJSON
}
