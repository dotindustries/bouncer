package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsUpdateSubscriptionRequestBody {
    @JsonProperty("subscription")
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription subscription;
    public MutationSubscriptionsUpdateSubscriptionRequestBody withSubscription(MutationSubscriptionsUpdateSubscriptionRequestBodySubscription subscription) {
        this.subscription = subscription;
        return this;
    }
}
