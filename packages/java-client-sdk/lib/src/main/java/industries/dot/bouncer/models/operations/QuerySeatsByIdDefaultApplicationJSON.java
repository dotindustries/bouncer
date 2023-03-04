package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QuerySeatsByIdDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QuerySeatsByIdDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QuerySeatsByIdDefaultApplicationJSONIssues[] issues;
    public QuerySeatsByIdDefaultApplicationJSON withIssues(QuerySeatsByIdDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QuerySeatsByIdDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
