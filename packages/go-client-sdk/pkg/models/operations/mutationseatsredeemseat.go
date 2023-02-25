package operations

import (
	"time"
)

type MutationSeatsRedeemSeatPathParams struct {
	SeatID         string `pathParam:"style=simple,explode=false,name=seatId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSeatsRedeemSeatRequestBodyUser struct {
	Email    *string `json:"email,omitempty"`
	TenantID string  `json:"tenant_id"`
	UserID   string  `json:"user_id"`
	UserName *string `json:"user_name,omitempty"`
}

type MutationSeatsRedeemSeatRequestBody struct {
	User MutationSeatsRedeemSeatRequestBodyUser `json:"user"`
}

type MutationSeatsRedeemSeatRequest struct {
	PathParams MutationSeatsRedeemSeatPathParams
	Request    MutationSeatsRedeemSeatRequestBody `request:"mediaType=application/json"`
}

type MutationSeatsRedeemSeatDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSeatsRedeemSeatDefaultApplicationJSON struct {
	Code    string                                                `json:"code"`
	Issues  []MutationSeatsRedeemSeatDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                `json:"message"`
}

type MutationSeatsRedeemSeat200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type MutationSeatsRedeemSeat200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum string

const (
	MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnumStandard MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum = "standard"
	MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnumLimited  MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum = "limited"
)

type MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum string

const (
	MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSeatsRedeemSeat200ApplicationJSON struct {
	CreatedUtc          time.Time                                                        `json:"created_utc"`
	ExpiresUtc          time.Time                                                        `json:"expires_utc"`
	ID                  string                                                           `json:"id"`
	Occupant            MutationSeatsRedeemSeat200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                                        `json:"redeemed_utc"`
	Reservation         MutationSeatsRedeemSeat200ApplicationJSONReservation             `json:"reservation"`
	SeatType            MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                           `json:"subscription_id"`
}

type MutationSeatsRedeemSeatResponse struct {
	ContentType                                         string
	StatusCode                                          int64
	MutationSeatsRedeemSeat200ApplicationJSONObject     *MutationSeatsRedeemSeat200ApplicationJSON
	MutationSeatsRedeemSeatDefaultApplicationJSONObject *MutationSeatsRedeemSeatDefaultApplicationJSON
}
