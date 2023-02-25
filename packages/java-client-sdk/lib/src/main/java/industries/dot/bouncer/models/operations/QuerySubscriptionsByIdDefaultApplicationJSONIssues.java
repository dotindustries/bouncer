package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySubscriptionsByIdDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QuerySubscriptionsByIdDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
