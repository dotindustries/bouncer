package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationProductsCreateRequest {
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationProductsCreateRequestBody request;
    public MutationProductsCreateRequest withRequest(MutationProductsCreateRequestBody request) {
        this.request = request;
        return this;
    }
}
