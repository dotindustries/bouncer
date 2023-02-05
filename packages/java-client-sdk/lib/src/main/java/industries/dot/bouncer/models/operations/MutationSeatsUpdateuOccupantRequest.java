package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSeatsUpdateuOccupantRequest {
    public MutationSeatsUpdateuOccupantPathParams pathParams;
    public MutationSeatsUpdateuOccupantRequest withPathParams(MutationSeatsUpdateuOccupantPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationSeatsUpdateuOccupantRequestBody request;
    public MutationSeatsUpdateuOccupantRequest withRequest(MutationSeatsUpdateuOccupantRequestBody request) {
        this.request = request;
        return this;
    }
}
