package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationProductsUpdateRequestBody {
    @JsonProperty("productConfig")
    public MutationProductsUpdateRequestBodyProductConfig productConfig;
    public MutationProductsUpdateRequestBody withProductConfig(MutationProductsUpdateRequestBodyProductConfig productConfig) {
        this.productConfig = productConfig;
        return this;
    }
}
