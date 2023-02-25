package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QuerySeatsBySubscriptionDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QuerySeatsBySubscriptionDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QuerySeatsBySubscriptionDefaultApplicationJSONIssues[] issues;
    public QuerySeatsBySubscriptionDefaultApplicationJSON withIssues(QuerySeatsBySubscriptionDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QuerySeatsBySubscriptionDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
