package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationSeatsRequestSeatDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationSeatsRequestSeatDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationSeatsRequestSeatDefaultApplicationJSONIssues[] issues;
    public MutationSeatsRequestSeatDefaultApplicationJSON withIssues(MutationSeatsRequestSeatDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationSeatsRequestSeatDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}