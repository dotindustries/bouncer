package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationProductsCreateDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationProductsCreateDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationProductsCreateDefaultApplicationJSONIssues[] issues;
    public MutationProductsCreateDefaultApplicationJSON withIssues(MutationProductsCreateDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationProductsCreateDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
