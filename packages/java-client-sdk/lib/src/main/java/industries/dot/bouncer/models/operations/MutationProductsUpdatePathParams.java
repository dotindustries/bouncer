package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationProductsUpdatePathParams {
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=productId")
    public String productId;
    public MutationProductsUpdatePathParams withProductId(String productId) {
        this.productId = productId;
        return this;
    }
}
