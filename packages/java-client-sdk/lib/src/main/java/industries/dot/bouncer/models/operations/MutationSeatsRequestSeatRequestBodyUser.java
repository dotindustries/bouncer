package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsRequestSeatRequestBodyUser {
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("email")
    public String email;
    public MutationSeatsRequestSeatRequestBodyUser withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public MutationSeatsRequestSeatRequestBodyUser withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public MutationSeatsRequestSeatRequestBodyUser withUserId(String userId) {
        this.userId = userId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("user_name")
    public String userName;
    public MutationSeatsRequestSeatRequestBodyUser withUserName(String userName) {
        this.userName = userName;
        return this;
    }
}
