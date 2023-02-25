package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class MutationSeatsReserveSeat200ApplicationJSON {
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public MutationSeatsReserveSeat200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("expires_utc")
    public OffsetDateTime expiresUtc;
    public MutationSeatsReserveSeat200ApplicationJSON withExpiresUtc(OffsetDateTime expiresUtc) {
        this.expiresUtc = expiresUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationSeatsReserveSeat200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("occupant")
    public MutationSeatsReserveSeat200ApplicationJSONOccupant occupant;
    public MutationSeatsReserveSeat200ApplicationJSON withOccupant(MutationSeatsReserveSeat200ApplicationJSONOccupant occupant) {
        this.occupant = occupant;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("redeemed_utc")
    public OffsetDateTime redeemedUtc;
    public MutationSeatsReserveSeat200ApplicationJSON withRedeemedUtc(OffsetDateTime redeemedUtc) {
        this.redeemedUtc = redeemedUtc;
        return this;
    }
    @JsonProperty("reservation")
    public MutationSeatsReserveSeat200ApplicationJSONReservation reservation;
    public MutationSeatsReserveSeat200ApplicationJSON withReservation(MutationSeatsReserveSeat200ApplicationJSONReservation reservation) {
        this.reservation = reservation;
        return this;
    }
    @JsonProperty("seat_type")
    public MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum seatType;
    public MutationSeatsReserveSeat200ApplicationJSON withSeatType(MutationSeatsReserveSeat200ApplicationJSONSeatTypeEnum seatType) {
        this.seatType = seatType;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName;
    public MutationSeatsReserveSeat200ApplicationJSON withSeatingStrategyName(MutationSeatsReserveSeat200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
    @JsonProperty("subscription_id")
    public String subscriptionId;
    public MutationSeatsReserveSeat200ApplicationJSON withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
