package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsRedeemSeatRequestBodyUser {
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("email")
    public String email;
    public MutationSeatsRedeemSeatRequestBodyUser withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public MutationSeatsRedeemSeatRequestBodyUser withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public MutationSeatsRedeemSeatRequestBodyUser withUserId(String userId) {
        this.userId = userId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("user_name")
    public String userName;
    public MutationSeatsRedeemSeatRequestBodyUser withUserName(String userName) {
        this.userName = userName;
        return this;
    }
}
