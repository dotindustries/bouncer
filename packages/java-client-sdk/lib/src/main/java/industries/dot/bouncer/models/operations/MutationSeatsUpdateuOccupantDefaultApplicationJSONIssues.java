package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues {
    @JsonProperty("message")
    public String message;
    public MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues withMessage(String message) {
        this.message = message;
        return this;
    }
}
