package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySeatsUserSeatDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QuerySeatsUserSeatDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
