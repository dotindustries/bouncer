package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationSeatsRedeemSeatDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationSeatsRedeemSeatDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationSeatsRedeemSeatDefaultApplicationJSONIssues[] issues;
    public MutationSeatsRedeemSeatDefaultApplicationJSON withIssues(MutationSeatsRedeemSeatDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationSeatsRedeemSeatDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
