package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsReserveSeatRequestBodyReservation {
    @JsonProperty("email")
    public String email;
    public MutationSeatsReserveSeatRequestBodyReservation withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("invite_url")
    public String inviteUrl;
    public MutationSeatsReserveSeatRequestBodyReservation withInviteUrl(String inviteUrl) {
        this.inviteUrl = inviteUrl;
        return this;
    }
    @JsonProperty("seat_id")
    public String seatId;
    public MutationSeatsReserveSeatRequestBodyReservation withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public MutationSeatsReserveSeatRequestBodyReservation withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public MutationSeatsReserveSeatRequestBodyReservation withUserId(String userId) {
        this.userId = userId;
        return this;
    }
}
