package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QueryProductsByIdDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QueryProductsByIdDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
