package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
