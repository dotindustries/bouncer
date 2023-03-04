package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

public class MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON {
    @JsonProperty("code")
    public String code;
    public MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON withCode(String code) {
        this.code = code;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("issues")
    public MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONIssues[] issues;
    public MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON withIssues(MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONIssues[] issues) {
        this.issues = issues;
        return this;
    }
    @JsonProperty("message")
    public String message;
    public MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON withMessage(String message) {
        this.message = message;
        return this;
    }
}
