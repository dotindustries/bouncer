package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationSeatsReserveSeatDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationSeatsReserveSeatDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationSeatsReserveSeatDefaultApplicationJSONIssues[] issues;
    public MutationSeatsReserveSeatDefaultApplicationJSON withIssues(MutationSeatsReserveSeatDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationSeatsReserveSeatDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
