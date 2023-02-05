package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsRedeemSeatDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSeatsRedeemSeatDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
