package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySeatsBySubscription200ApplicationJSONOccupant {
    @JsonProperty("email")
    public String email;
    public QuerySeatsBySubscription200ApplicationJSONOccupant withEmail(String email) {
        this.email = email;
        return this;
    }
    @JsonProperty("seat_id")
    public String seatId;
    public QuerySeatsBySubscription200ApplicationJSONOccupant withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public QuerySeatsBySubscription200ApplicationJSONOccupant withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("user_id")
    public String userId;
    public QuerySeatsBySubscription200ApplicationJSONOccupant withUserId(String userId) {
        this.userId = userId;
        return this;
    }
    @JsonProperty("user_name")
    public String userName;
    public QuerySeatsBySubscription200ApplicationJSONOccupant withUserName(String userName) {
        this.userName = userName;
        return this;
    }
}