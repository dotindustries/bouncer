package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig {
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("default_low_seat_warning_level_percent")
    public Double defaultLowSeatWarningLevelPercent;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withDefaultLowSeatWarningLevelPercent(Double defaultLowSeatWarningLevelPercent) {
        this.defaultLowSeatWarningLevelPercent = defaultLowSeatWarningLevelPercent;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("default_seat_expiry_in_days")
    public Double defaultSeatExpiryInDays;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withDefaultSeatExpiryInDays(Double defaultSeatExpiryInDays) {
        this.defaultSeatExpiryInDays = defaultSeatExpiryInDays;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("limited_overflow_seating_enabled")
    public Boolean limitedOverflowSeatingEnabled;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withLimitedOverflowSeatingEnabled(Boolean limitedOverflowSeatingEnabled) {
        this.limitedOverflowSeatingEnabled = limitedOverflowSeatingEnabled;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("low_seat_warning_level_pct")
    public Double lowSeatWarningLevelPct;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withLowSeatWarningLevelPct(Double lowSeatWarningLevelPct) {
        this.lowSeatWarningLevelPct = lowSeatWarningLevelPct;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("owner_id")
    public String ownerId;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("seat_reservation_expiry_in_days")
    public Double seatReservationExpiryInDays;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withSeatReservationExpiryInDays(Double seatReservationExpiryInDays) {
        this.seatReservationExpiryInDays = seatReservationExpiryInDays;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("seating_strategy_name")
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum seatingStrategyName;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig withSeatingStrategyName(MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfigSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
}
