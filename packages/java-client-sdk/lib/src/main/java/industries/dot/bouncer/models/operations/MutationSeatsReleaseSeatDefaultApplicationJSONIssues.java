package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsReleaseSeatDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSeatsReleaseSeatDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
