package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationProductsCreateDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationProductsCreateDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
