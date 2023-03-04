package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsRedeemSeatRequestBody {
    @JsonProperty("user")
    public MutationSeatsRedeemSeatRequestBodyUser user;
    public MutationSeatsRedeemSeatRequestBody withUser(MutationSeatsRedeemSeatRequestBodyUser user) {
        this.user = user;
        return this;
    }
}
