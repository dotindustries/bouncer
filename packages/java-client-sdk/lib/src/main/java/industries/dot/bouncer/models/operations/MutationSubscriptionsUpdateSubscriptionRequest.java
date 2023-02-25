package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSubscriptionsUpdateSubscriptionRequest {
    public MutationSubscriptionsUpdateSubscriptionPathParams pathParams;
    public MutationSubscriptionsUpdateSubscriptionRequest withPathParams(MutationSubscriptionsUpdateSubscriptionPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    @SpeakeasyMetadata("request:mediaType=application/json")
    public MutationSubscriptionsUpdateSubscriptionRequestBody request;
    public MutationSubscriptionsUpdateSubscriptionRequest withRequest(MutationSubscriptionsUpdateSubscriptionRequestBody request) {
        this.request = request;
        return this;
    }
}
