package industries.dot.bouncer.models.operations;



public class MutationSeatsRequestSeatResponse {
    public String contentType;
    public MutationSeatsRequestSeatResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationSeatsRequestSeatResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationSeatsRequestSeat200ApplicationJSON mutationSeatsRequestSeat200ApplicationJSONObject;
    public MutationSeatsRequestSeatResponse withMutationSeatsRequestSeat200ApplicationJSONObject(MutationSeatsRequestSeat200ApplicationJSON mutationSeatsRequestSeat200ApplicationJSONObject) {
        this.mutationSeatsRequestSeat200ApplicationJSONObject = mutationSeatsRequestSeat200ApplicationJSONObject;
        return this;
    }
    public MutationSeatsRequestSeatDefaultApplicationJSON mutationSeatsRequestSeatDefaultApplicationJSONObject;
    public MutationSeatsRequestSeatResponse withMutationSeatsRequestSeatDefaultApplicationJSONObject(MutationSeatsRequestSeatDefaultApplicationJSON mutationSeatsRequestSeatDefaultApplicationJSONObject) {
        this.mutationSeatsRequestSeatDefaultApplicationJSONObject = mutationSeatsRequestSeatDefaultApplicationJSONObject;
        return this;
    }
}
