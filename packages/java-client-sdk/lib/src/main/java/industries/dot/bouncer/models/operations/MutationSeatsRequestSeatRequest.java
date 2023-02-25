package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSeatsRequestSeatRequest {
    public MutationSeatsRequestSeatPathParams pathParams;
    public MutationSeatsRequestSeatRequest withPathParams(MutationSeatsRequestSeatPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationSeatsRequestSeatRequestBody request;
    public MutationSeatsRequestSeatRequest withRequest(MutationSeatsRequestSeatRequestBody request) {
        this.request = request;
        return this;
    }
}
