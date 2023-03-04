package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySeatsUserSeat200ApplicationJSONReservation {
    @JsonProperty("email")
    public String email;
    public QuerySeatsUserSeat200ApplicationJSONReservation withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("invite_url")
    public String inviteUrl;
    public QuerySeatsUserSeat200ApplicationJSONReservation withInviteUrl(String inviteUrl) {
        this.inviteUrl = inviteUrl;
        return this;
    }
    @JsonProperty("seat_id")
    public String seatId;
    public QuerySeatsUserSeat200ApplicationJSONReservation withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public QuerySeatsUserSeat200ApplicationJSONReservation withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public QuerySeatsUserSeat200ApplicationJSONReservation withUserId(String userId) {
        this.userId = userId;
        return this;
    }
}
