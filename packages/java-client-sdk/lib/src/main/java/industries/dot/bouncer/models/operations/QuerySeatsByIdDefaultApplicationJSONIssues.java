package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySeatsByIdDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QuerySeatsByIdDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
