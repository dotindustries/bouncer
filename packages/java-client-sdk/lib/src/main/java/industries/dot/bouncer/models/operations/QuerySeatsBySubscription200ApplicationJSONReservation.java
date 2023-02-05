package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySeatsBySubscription200ApplicationJSONReservation {
    @JsonProperty("email")
    public String email;
    public QuerySeatsBySubscription200ApplicationJSONReservation withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("invite_url")
    public String inviteUrl;
    public QuerySeatsBySubscription200ApplicationJSONReservation withInviteUrl(String inviteUrl) {
        this.inviteUrl = inviteUrl;
        return this;
    }
    @JsonProperty("seat_id")
    public String seatId;
    public QuerySeatsBySubscription200ApplicationJSONReservation withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public QuerySeatsBySubscription200ApplicationJSONReservation withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public QuerySeatsBySubscription200ApplicationJSONReservation withUserId(String userId) {
        this.userId = userId;
        return this;
    }
}
