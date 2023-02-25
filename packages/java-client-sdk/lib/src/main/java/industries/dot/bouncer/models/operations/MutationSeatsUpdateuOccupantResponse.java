package industries.dot.bouncer.models.operations;



public class MutationSeatsUpdateuOccupantResponse {
    public String contentType;
    public MutationSeatsUpdateuOccupantResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationSeatsUpdateuOccupantResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationSeatsUpdateuOccupant200ApplicationJSON mutationSeatsUpdateuOccupant200ApplicationJSONObject;
    public MutationSeatsUpdateuOccupantResponse withMutationSeatsUpdateuOccupant200ApplicationJSONObject(MutationSeatsUpdateuOccupant200ApplicationJSON mutationSeatsUpdateuOccupant200ApplicationJSONObject) {
        this.mutationSeatsUpdateuOccupant200ApplicationJSONObject = mutationSeatsUpdateuOccupant200ApplicationJSONObject;
        return this;
    }
    public MutationSeatsUpdateuOccupantDefaultApplicationJSON mutationSeatsUpdateuOccupantDefaultApplicationJSONObject;
    public MutationSeatsUpdateuOccupantResponse withMutationSeatsUpdateuOccupantDefaultApplicationJSONObject(MutationSeatsUpdateuOccupantDefaultApplicationJSON mutationSeatsUpdateuOccupantDefaultApplicationJSONObject) {
        this.mutationSeatsUpdateuOccupantDefaultApplicationJSONObject = mutationSeatsUpdateuOccupantDefaultApplicationJSONObject;
        return this;
    }
}
