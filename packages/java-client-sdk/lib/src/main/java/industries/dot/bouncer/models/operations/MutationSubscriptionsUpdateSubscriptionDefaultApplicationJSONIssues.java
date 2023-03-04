package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
