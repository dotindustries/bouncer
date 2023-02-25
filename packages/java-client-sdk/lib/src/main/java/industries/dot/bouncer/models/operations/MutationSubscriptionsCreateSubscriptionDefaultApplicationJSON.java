package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues[] issues;
    public MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON withIssues(MutationSubscriptionsCreateSubscriptionDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
