package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QueryProductsAllDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public QueryProductsAllDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
