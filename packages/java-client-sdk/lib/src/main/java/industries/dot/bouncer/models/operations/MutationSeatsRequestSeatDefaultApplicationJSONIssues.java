package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsRequestSeatDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSeatsRequestSeatDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
