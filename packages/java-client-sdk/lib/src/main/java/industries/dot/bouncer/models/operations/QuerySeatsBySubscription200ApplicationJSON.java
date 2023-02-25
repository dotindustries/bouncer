package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class QuerySeatsBySubscription200ApplicationJSON {
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public QuerySeatsBySubscription200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("expires_utc")
    public OffsetDateTime expiresUtc;
    public QuerySeatsBySubscription200ApplicationJSON withExpiresUtc(OffsetDateTime expiresUtc) {
        this.expiresUtc = expiresUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public QuerySeatsBySubscription200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("occupant")
    public QuerySeatsBySubscription200ApplicationJSONOccupant occupant;
    public QuerySeatsBySubscription200ApplicationJSON withOccupant(QuerySeatsBySubscription200ApplicationJSONOccupant occupant) {
        this.occupant = occupant;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("redeemed_utc")
    public OffsetDateTime redeemedUtc;
    public QuerySeatsBySubscription200ApplicationJSON withRedeemedUtc(OffsetDateTime redeemedUtc) {
        this.redeemedUtc = redeemedUtc;
        return this;
    }
    @JsonProperty("reservation")
    public QuerySeatsBySubscription200ApplicationJSONReservation reservation;
    public QuerySeatsBySubscription200ApplicationJSON withReservation(QuerySeatsBySubscription200ApplicationJSONReservation reservation) {
        this.reservation = reservation;
        return this;
    }
    @JsonProperty("seat_type")
    public QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum seatType;
    public QuerySeatsBySubscription200ApplicationJSON withSeatType(QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum seatType) {
        this.seatType = seatType;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName;
    public QuerySeatsBySubscription200ApplicationJSON withSeatingStrategyName(QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
    @JsonProperty("subscription_id")
    public String subscriptionId;
    public QuerySeatsBySubscription200ApplicationJSON withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
