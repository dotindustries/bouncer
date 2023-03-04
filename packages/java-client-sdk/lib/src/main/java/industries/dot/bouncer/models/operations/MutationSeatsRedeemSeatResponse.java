package industries.dot.bouncer.models.operations;



public class MutationSeatsRedeemSeatResponse {
    public String contentType;
    public MutationSeatsRedeemSeatResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationSeatsRedeemSeatResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationSeatsRedeemSeat200ApplicationJSON mutationSeatsRedeemSeat200ApplicationJSONObject;
    public MutationSeatsRedeemSeatResponse withMutationSeatsRedeemSeat200ApplicationJSONObject(MutationSeatsRedeemSeat200ApplicationJSON mutationSeatsRedeemSeat200ApplicationJSONObject) {
        this.mutationSeatsRedeemSeat200ApplicationJSONObject = mutationSeatsRedeemSeat200ApplicationJSONObject;
        return this;
    }
    public MutationSeatsRedeemSeatDefaultApplicationJSON mutationSeatsRedeemSeatDefaultApplicationJSONObject;
    public MutationSeatsRedeemSeatResponse withMutationSeatsRedeemSeatDefaultApplicationJSONObject(MutationSeatsRedeemSeatDefaultApplicationJSON mutationSeatsRedeemSeatDefaultApplicationJSONObject) {
        this.mutationSeatsRedeemSeatDefaultApplicationJSONObject = mutationSeatsRedeemSeatDefaultApplicationJSONObject;
        return this;
    }
}
