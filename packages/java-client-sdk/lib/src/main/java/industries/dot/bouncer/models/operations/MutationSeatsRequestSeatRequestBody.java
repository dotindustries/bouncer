package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsRequestSeatRequestBody {
    @JsonProperty("user")
    public MutationSeatsRequestSeatRequestBodyUser user;
    public MutationSeatsRequestSeatRequestBody withUser(MutationSeatsRequestSeatRequestBodyUser user) {
        this.user = user;
        return this;
    }
}
