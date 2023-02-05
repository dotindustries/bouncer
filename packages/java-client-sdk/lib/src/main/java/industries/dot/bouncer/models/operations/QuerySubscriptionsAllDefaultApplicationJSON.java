package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QuerySubscriptionsAllDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QuerySubscriptionsAllDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QuerySubscriptionsAllDefaultApplicationJSONIssues[] issues;
    public QuerySubscriptionsAllDefaultApplicationJSON withIssues(QuerySubscriptionsAllDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QuerySubscriptionsAllDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
