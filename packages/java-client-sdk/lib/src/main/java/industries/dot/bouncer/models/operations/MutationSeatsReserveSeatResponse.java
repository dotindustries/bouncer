package industries.dot.bouncer.models.operations;



public class MutationSeatsReserveSeatResponse {
    public String contentType;
    public MutationSeatsReserveSeatResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationSeatsReserveSeatResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationSeatsReserveSeat200ApplicationJSON mutationSeatsReserveSeat200ApplicationJSONObject;
    public MutationSeatsReserveSeatResponse withMutationSeatsReserveSeat200ApplicationJSONObject(MutationSeatsReserveSeat200ApplicationJSON mutationSeatsReserveSeat200ApplicationJSONObject) {
        this.mutationSeatsReserveSeat200ApplicationJSONObject = mutationSeatsReserveSeat200ApplicationJSONObject;
        return this;
    }
    public MutationSeatsReserveSeatDefaultApplicationJSON mutationSeatsReserveSeatDefaultApplicationJSONObject;
    public MutationSeatsReserveSeatResponse withMutationSeatsReserveSeatDefaultApplicationJSONObject(MutationSeatsReserveSeatDefaultApplicationJSON mutationSeatsReserveSeatDefaultApplicationJSONObject) {
        this.mutationSeatsReserveSeatDefaultApplicationJSONObject = mutationSeatsReserveSeatDefaultApplicationJSONObject;
        return this;
    }
}
