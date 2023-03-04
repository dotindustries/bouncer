package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsReserveSeatDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSeatsReserveSeatDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
