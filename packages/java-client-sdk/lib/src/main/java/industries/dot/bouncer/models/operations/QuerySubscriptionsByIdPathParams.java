package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class QuerySubscriptionsByIdPathParams {
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=subscriptionId")
    public String subscriptionId;
    public QuerySubscriptionsByIdPathParams withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
