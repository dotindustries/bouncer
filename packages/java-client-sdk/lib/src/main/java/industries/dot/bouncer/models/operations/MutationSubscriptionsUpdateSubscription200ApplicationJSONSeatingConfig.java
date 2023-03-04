package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig {
    @JsonProperty("default_low_seat_warning_level_percent")
    public Double defaultLowSeatWarningLevelPercent;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withDefaultLowSeatWarningLevelPercent(Double defaultLowSeatWarningLevelPercent) {
        this.defaultLowSeatWarningLevelPercent = defaultLowSeatWarningLevelPercent;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("default_seat_expiry_in_days")
    public Double defaultSeatExpiryInDays;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withDefaultSeatExpiryInDays(Double defaultSeatExpiryInDays) {
        this.defaultSeatExpiryInDays = defaultSeatExpiryInDays;
        return this;
    }
    @JsonProperty("limited_overflow_seating_enabled")
    public Boolean limitedOverflowSeatingEnabled;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withLimitedOverflowSeatingEnabled(Boolean limitedOverflowSeatingEnabled) {
        this.limitedOverflowSeatingEnabled = limitedOverflowSeatingEnabled;
        return this;
    }
    @JsonProperty("low_seat_warning_level_pct")
    public Double lowSeatWarningLevelPct;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withLowSeatWarningLevelPct(Double lowSeatWarningLevelPct) {
        this.lowSeatWarningLevelPct = lowSeatWarningLevelPct;
        return this;
    }
    @JsonProperty("owner_id")
    public String ownerId;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("seat_reservation_expiry_in_days")
    public Double seatReservationExpiryInDays;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withSeatReservationExpiryInDays(Double seatReservationExpiryInDays) {
        this.seatReservationExpiryInDays = seatReservationExpiryInDays;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum seatingStrategyName;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig withSeatingStrategyName(MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfigSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
}
