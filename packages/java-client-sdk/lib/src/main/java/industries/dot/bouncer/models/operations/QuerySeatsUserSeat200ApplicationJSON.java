package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class QuerySeatsUserSeat200ApplicationJSON {
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public QuerySeatsUserSeat200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("expires_utc")
    public OffsetDateTime expiresUtc;
    public QuerySeatsUserSeat200ApplicationJSON withExpiresUtc(OffsetDateTime expiresUtc) {
        this.expiresUtc = expiresUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public QuerySeatsUserSeat200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("occupant")
    public QuerySeatsUserSeat200ApplicationJSONOccupant occupant;
    public QuerySeatsUserSeat200ApplicationJSON withOccupant(QuerySeatsUserSeat200ApplicationJSONOccupant occupant) {
        this.occupant = occupant;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("redeemed_utc")
    public OffsetDateTime redeemedUtc;
    public QuerySeatsUserSeat200ApplicationJSON withRedeemedUtc(OffsetDateTime redeemedUtc) {
        this.redeemedUtc = redeemedUtc;
        return this;
    }
    @JsonProperty("reservation")
    public QuerySeatsUserSeat200ApplicationJSONReservation reservation;
    public QuerySeatsUserSeat200ApplicationJSON withReservation(QuerySeatsUserSeat200ApplicationJSONReservation reservation) {
        this.reservation = reservation;
        return this;
    }
    @JsonProperty("seat_type")
    public QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum seatType;
    public QuerySeatsUserSeat200ApplicationJSON withSeatType(QuerySeatsUserSeat200ApplicationJSONSeatTypeEnum seatType) {
        this.seatType = seatType;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName;
    public QuerySeatsUserSeat200ApplicationJSON withSeatingStrategyName(QuerySeatsUserSeat200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
    @JsonProperty("subscription_id")
    public String subscriptionId;
    public QuerySeatsUserSeat200ApplicationJSON withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
