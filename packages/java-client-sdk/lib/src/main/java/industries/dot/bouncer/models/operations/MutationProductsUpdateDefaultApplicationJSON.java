package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationProductsUpdateDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationProductsUpdateDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationProductsUpdateDefaultApplicationJSONIssues[] issues;
    public MutationProductsUpdateDefaultApplicationJSON withIssues(MutationProductsUpdateDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationProductsUpdateDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
