package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationSeatsUpdateuOccupantDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationSeatsUpdateuOccupantDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues[] issues;
    public MutationSeatsUpdateuOccupantDefaultApplicationJSON withIssues(MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationSeatsUpdateuOccupantDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
