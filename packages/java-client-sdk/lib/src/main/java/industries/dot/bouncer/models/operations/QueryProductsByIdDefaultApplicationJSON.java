package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QueryProductsByIdDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QueryProductsByIdDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QueryProductsByIdDefaultApplicationJSONIssues[] issues;
    public QueryProductsByIdDefaultApplicationJSON withIssues(QueryProductsByIdDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QueryProductsByIdDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
