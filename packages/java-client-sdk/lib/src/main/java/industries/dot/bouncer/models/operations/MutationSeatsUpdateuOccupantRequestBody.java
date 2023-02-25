package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsUpdateuOccupantRequestBody {
    @JsonProperty("user")
    public MutationSeatsUpdateuOccupantRequestBodyUser user;
    public MutationSeatsUpdateuOccupantRequestBody withUser(MutationSeatsUpdateuOccupantRequestBodyUser user) {
        this.user = user;
        return this;
    }
}
