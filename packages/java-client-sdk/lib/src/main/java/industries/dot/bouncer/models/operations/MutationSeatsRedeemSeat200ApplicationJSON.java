package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class MutationSeatsRedeemSeat200ApplicationJSON {
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public MutationSeatsRedeemSeat200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("expires_utc")
    public OffsetDateTime expiresUtc;
    public MutationSeatsRedeemSeat200ApplicationJSON withExpiresUtc(OffsetDateTime expiresUtc) {
        this.expiresUtc = expiresUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationSeatsRedeemSeat200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("occupant")
    public MutationSeatsRedeemSeat200ApplicationJSONOccupant occupant;
    public MutationSeatsRedeemSeat200ApplicationJSON withOccupant(MutationSeatsRedeemSeat200ApplicationJSONOccupant occupant) {
        this.occupant = occupant;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("redeemed_utc")
    public OffsetDateTime redeemedUtc;
    public MutationSeatsRedeemSeat200ApplicationJSON withRedeemedUtc(OffsetDateTime redeemedUtc) {
        this.redeemedUtc = redeemedUtc;
        return this;
    }
    @JsonProperty("reservation")
    public MutationSeatsRedeemSeat200ApplicationJSONReservation reservation;
    public MutationSeatsRedeemSeat200ApplicationJSON withReservation(MutationSeatsRedeemSeat200ApplicationJSONReservation reservation) {
        this.reservation = reservation;
        return this;
    }
    @JsonProperty("seat_type")
    public MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum seatType;
    public MutationSeatsRedeemSeat200ApplicationJSON withSeatType(MutationSeatsRedeemSeat200ApplicationJSONSeatTypeEnum seatType) {
        this.seatType = seatType;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName;
    public MutationSeatsRedeemSeat200ApplicationJSON withSeatingStrategyName(MutationSeatsRedeemSeat200ApplicationJSONSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
    @JsonProperty("subscription_id")
    public String subscriptionId;
    public MutationSeatsRedeemSeat200ApplicationJSON withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
