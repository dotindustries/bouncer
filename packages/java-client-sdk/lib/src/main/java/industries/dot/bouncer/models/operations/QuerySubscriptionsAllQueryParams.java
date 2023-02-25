package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class QuerySubscriptionsAllQueryParams {
    @SpeakeasyMetadata("queryParam:style=form,explode=true,name=productId")
    public String productId;
    public QuerySubscriptionsAllQueryParams withProductId(String productId) {
        this.productId = productId;
        return this;
    }
}
