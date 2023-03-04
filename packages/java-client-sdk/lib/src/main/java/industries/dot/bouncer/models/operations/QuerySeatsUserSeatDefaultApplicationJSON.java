package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QuerySeatsUserSeatDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QuerySeatsUserSeatDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QuerySeatsUserSeatDefaultApplicationJSONIssues[] issues;
    public QuerySeatsUserSeatDefaultApplicationJSON withIssues(QuerySeatsUserSeatDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QuerySeatsUserSeatDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
