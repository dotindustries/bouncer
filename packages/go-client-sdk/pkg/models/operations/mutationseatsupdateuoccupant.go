package operations

import (
	"time"
)

type MutationSeatsUpdateuOccupantPathParams struct {
	SeatID         string `pathParam:"style=simple,explode=false,name=seatId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSeatsUpdateuOccupantRequestBodyUser struct {
	Email    *string `json:"email,omitempty"`
	TenantID string  `json:"tenant_id"`
	UserID   string  `json:"user_id"`
	UserName *string `json:"user_name,omitempty"`
}

type MutationSeatsUpdateuOccupantRequestBody struct {
	User MutationSeatsUpdateuOccupantRequestBodyUser `json:"user"`
}

type MutationSeatsUpdateuOccupantRequest struct {
	PathParams MutationSeatsUpdateuOccupantPathParams
	Request    MutationSeatsUpdateuOccupantRequestBody `request:"mediaType=application/json"`
}

type MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSeatsUpdateuOccupantDefaultApplicationJSON struct {
	Code    string                                                     `json:"code"`
	Issues  []MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                     `json:"message"`
}

type MutationSeatsUpdateuOccupant200ApplicationJSONOccupant struct {
	Email    string `json:"email"`
	SeatID   string `json:"seat_id"`
	TenantID string `json:"tenant_id"`
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
}

type MutationSeatsUpdateuOccupant200ApplicationJSONReservation struct {
	Email     string `json:"email"`
	InviteURL string `json:"invite_url"`
	SeatID    string `json:"seat_id"`
	TenantID  string `json:"tenant_id"`
	UserID    string `json:"user_id"`
}

type MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum string

const (
	MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnumStandard MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum = "standard"
	MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnumLimited  MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum = "limited"
)

type MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum string

const (
	MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnumMonthlyActiveUser    MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum = "monthly_active_user"
	MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnumFirstComeFirstServed MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum = "first_come_first_served"
)

type MutationSeatsUpdateuOccupant200ApplicationJSON struct {
	CreatedUtc          time.Time                                                             `json:"created_utc"`
	ExpiresUtc          time.Time                                                             `json:"expires_utc"`
	ID                  string                                                                `json:"id"`
	Occupant            MutationSeatsUpdateuOccupant200ApplicationJSONOccupant                `json:"occupant"`
	RedeemedUtc         time.Time                                                             `json:"redeemed_utc"`
	Reservation         MutationSeatsUpdateuOccupant200ApplicationJSONReservation             `json:"reservation"`
	SeatType            MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum            `json:"seat_type"`
	SeatingStrategyName MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum `json:"seating_strategy_name"`
	SubscriptionID      string                                                                `json:"subscription_id"`
}

type MutationSeatsUpdateuOccupantResponse struct {
	ContentType                                              string
	StatusCode                                               int64
	MutationSeatsUpdateuOccupant200ApplicationJSONObject     *MutationSeatsUpdateuOccupant200ApplicationJSON
	MutationSeatsUpdateuOccupantDefaultApplicationJSONObject *MutationSeatsUpdateuOccupantDefaultApplicationJSON
}
