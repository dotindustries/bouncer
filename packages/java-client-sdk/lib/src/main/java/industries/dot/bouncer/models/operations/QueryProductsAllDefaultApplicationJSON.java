package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class QueryProductsAllDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public QueryProductsAllDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public QueryProductsAllDefaultApplicationJSONIssues[] issues;
    public QueryProductsAllDefaultApplicationJSON withIssues(QueryProductsAllDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public QueryProductsAllDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
