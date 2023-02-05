package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QuerySubscriptionsByIdDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QuerySubscriptionsByIdDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QuerySubscriptionsByIdDefaultApplicationJSONIssues[] issues;
    public QuerySubscriptionsByIdDefaultApplicationJSON withIssues(QuerySubscriptionsByIdDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QuerySubscriptionsByIdDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
