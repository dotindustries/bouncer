package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsUpdateuOccupant200ApplicationJSONReservation {
    @JsonProperty("email")
    public String email;
    public MutationSeatsUpdateuOccupant200ApplicationJSONReservation withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("invite_url")
    public String inviteUrl;
    public MutationSeatsUpdateuOccupant200ApplicationJSONReservation withInviteUrl(String inviteUrl) {
        this.inviteUrl = inviteUrl;
        return this;
    }
    @JsonProperty("seat_id")
    public String seatId;
    public MutationSeatsUpdateuOccupant200ApplicationJSONReservation withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public MutationSeatsUpdateuOccupant200ApplicationJSONReservation withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public MutationSeatsUpdateuOccupant200ApplicationJSONReservation withUserId(String userId) {
        this.userId = userId;
        return this;
    }
}
