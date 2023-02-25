package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySeatsBySubscriptionDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QuerySeatsBySubscriptionDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
