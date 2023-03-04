package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSeatsRedeemSeatRequest {
    public MutationSeatsRedeemSeatPathParams pathParams;
    public MutationSeatsRedeemSeatRequest withPathParams(MutationSeatsRedeemSeatPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationSeatsRedeemSeatRequestBody request;
    public MutationSeatsRedeemSeatRequest withRequest(MutationSeatsRedeemSeatRequestBody request) {
        this.request = request;
        return this;
    }
}
