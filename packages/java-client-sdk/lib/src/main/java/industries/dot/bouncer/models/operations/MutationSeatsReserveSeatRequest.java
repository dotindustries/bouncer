package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSeatsReserveSeatRequest {
    public MutationSeatsReserveSeatPathParams pathParams;
    public MutationSeatsReserveSeatRequest withPathParams(MutationSeatsReserveSeatPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationSeatsReserveSeatRequestBody request;
    public MutationSeatsReserveSeatRequest withRequest(MutationSeatsReserveSeatRequestBody request) {
        this.request = request;
        return this;
    }
}
