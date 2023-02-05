package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class QueryProductsByIdPathParams {
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=productId")
    public String productId;
    public QueryProductsByIdPathParams withProductId(String productId) {
        this.productId = productId;
        return this;
    }
}
