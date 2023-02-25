package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsCreateSubscriptionRequestBody {
    @JsonProperty("subscription")
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscription subscription;
    public MutationSubscriptionsCreateSubscriptionRequestBody withSubscription(MutationSubscriptionsCreateSubscriptionRequestBodySubscription subscription) {
        this.subscription = subscription;
        return this;
    }
}
