package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySubscriptionsAllDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QuerySubscriptionsAllDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
