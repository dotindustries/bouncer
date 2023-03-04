package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSubscriptionsCreateSubscriptionRequest {
    public MutationSubscriptionsCreateSubscriptionPathParams pathParams;
    public MutationSubscriptionsCreateSubscriptionRequest withPathParams(MutationSubscriptionsCreateSubscriptionPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationSubscriptionsCreateSubscriptionRequestBody request;
    public MutationSubscriptionsCreateSubscriptionRequest withRequest(MutationSubscriptionsCreateSubscriptionRequestBody request) {
        this.request = request;
        return this;
    }
}
