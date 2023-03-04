package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig {
    @JsonProperty("default_low_seat_warning_level_percent")
    public Double defaultLowSeatWarningLevelPercent;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withDefaultLowSeatWarningLevelPercent(Double defaultLowSeatWarningLevelPercent) {
        this.defaultLowSeatWarningLevelPercent = defaultLowSeatWarningLevelPercent;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("default_seat_expiry_in_days")
    public Double defaultSeatExpiryInDays;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withDefaultSeatExpiryInDays(Double defaultSeatExpiryInDays) {
        this.defaultSeatExpiryInDays = defaultSeatExpiryInDays;
        return this;
    }
    @JsonProperty("limited_overflow_seating_enabled")
    public Boolean limitedOverflowSeatingEnabled;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withLimitedOverflowSeatingEnabled(Boolean limitedOverflowSeatingEnabled) {
        this.limitedOverflowSeatingEnabled = limitedOverflowSeatingEnabled;
        return this;
    }
    @JsonProperty("low_seat_warning_level_pct")
    public Double lowSeatWarningLevelPct;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withLowSeatWarningLevelPct(Double lowSeatWarningLevelPct) {
        this.lowSeatWarningLevelPct = lowSeatWarningLevelPct;
        return this;
    }
    @JsonProperty("owner_id")
    public String ownerId;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("seat_reservation_expiry_in_days")
    public Double seatReservationExpiryInDays;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withSeatReservationExpiryInDays(Double seatReservationExpiryInDays) {
        this.seatReservationExpiryInDays = seatReservationExpiryInDays;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum seatingStrategyName;
    public MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfig withSeatingStrategyName(MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
}
