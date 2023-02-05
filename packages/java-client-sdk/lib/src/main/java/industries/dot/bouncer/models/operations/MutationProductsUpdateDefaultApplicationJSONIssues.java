package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationProductsUpdateDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationProductsUpdateDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
