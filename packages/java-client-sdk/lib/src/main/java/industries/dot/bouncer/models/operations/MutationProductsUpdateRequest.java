package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationProductsUpdateRequest {
    public MutationProductsUpdatePathParams pathParams;
    public MutationProductsUpdateRequest withPathParams(MutationProductsUpdatePathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationProductsUpdateRequestBody request;
    public MutationProductsUpdateRequest withRequest(MutationProductsUpdateRequestBody request) {
        this.request = request;
        return this;
    }
}
