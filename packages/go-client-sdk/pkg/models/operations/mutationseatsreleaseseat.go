package operations

type MutationSeatsReleaseSeatPathParams struct {
	SeatID         string `pathParam:"style=simple,explode=false,name=seatId"`
	SubscriptionID string `pathParam:"style=simple,explode=false,name=subscriptionId"`
}

type MutationSeatsReleaseSeatRequest struct {
	PathParams MutationSeatsReleaseSeatPathParams
}

type MutationSeatsReleaseSeatDefaultApplicationJSONIssues struct {
	Message string `json:"message"`
}

type MutationSeatsReleaseSeatDefaultApplicationJSON struct {
	Code    string                                                 `json:"code"`
	Issues  []MutationSeatsReleaseSeatDefaultApplicationJSONIssues `json:"issues,omitempty"`
	Message string                                                 `json:"message"`
}

type MutationSeatsReleaseSeatResponse struct {
	ContentType                                          string
	StatusCode                                           int64
	MutationSeatsReleaseSeat200ApplicationJSONAny        *interface{}
	MutationSeatsReleaseSeatDefaultApplicationJSONObject *MutationSeatsReleaseSeatDefaultApplicationJSON
}
