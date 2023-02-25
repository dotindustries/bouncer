package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class MutationSeatsUpdateuOccupant200ApplicationJSON {
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("expires_utc")
    public OffsetDateTime expiresUtc;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withExpiresUtc(OffsetDateTime expiresUtc) {
        this.expiresUtc = expiresUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("occupant")
    public MutationSeatsUpdateuOccupant200ApplicationJSONOccupant occupant;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withOccupant(MutationSeatsUpdateuOccupant200ApplicationJSONOccupant occupant) {
        this.occupant = occupant;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("redeemed_utc")
    public OffsetDateTime redeemedUtc;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withRedeemedUtc(OffsetDateTime redeemedUtc) {
        this.redeemedUtc = redeemedUtc;
        return this;
    }
    @JsonProperty("reservation")
    public MutationSeatsUpdateuOccupant200ApplicationJSONReservation reservation;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withReservation(MutationSeatsUpdateuOccupant200ApplicationJSONReservation reservation) {
        this.reservation = reservation;
        return this;
    }
    @JsonProperty("seat_type")
    public MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum seatType;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withSeatType(MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum seatType) {
        this.seatType = seatType;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withSeatingStrategyName(MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
    @JsonProperty("subscription_id")
    public String subscriptionId;
    public MutationSeatsUpdateuOccupant200ApplicationJSON withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
