package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationProductsUpdateRequestBodyProductConfigSeatingConfig {
    @JsonProperty("default_low_seat_warning_level_percent")
    public Double defaultLowSeatWarningLevelPercent;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withDefaultLowSeatWarningLevelPercent(Double defaultLowSeatWarningLevelPercent) {
        this.defaultLowSeatWarningLevelPercent = defaultLowSeatWarningLevelPercent;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("default_seat_expiry_in_days")
    public Double defaultSeatExpiryInDays;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withDefaultSeatExpiryInDays(Double defaultSeatExpiryInDays) {
        this.defaultSeatExpiryInDays = defaultSeatExpiryInDays;
        return this;
    }
    @JsonProperty("limited_overflow_seating_enabled")
    public Boolean limitedOverflowSeatingEnabled;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withLimitedOverflowSeatingEnabled(Boolean limitedOverflowSeatingEnabled) {
        this.limitedOverflowSeatingEnabled = limitedOverflowSeatingEnabled;
        return this;
    }
    @JsonProperty("low_seat_warning_level_pct")
    public Double lowSeatWarningLevelPct;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withLowSeatWarningLevelPct(Double lowSeatWarningLevelPct) {
        this.lowSeatWarningLevelPct = lowSeatWarningLevelPct;
        return this;
    }
    @JsonProperty("owner_id")
    public String ownerId;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("seat_reservation_expiry_in_days")
    public Double seatReservationExpiryInDays;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withSeatReservationExpiryInDays(Double seatReservationExpiryInDays) {
        this.seatReservationExpiryInDays = seatReservationExpiryInDays;
        return this;
    }
    @JsonProperty("seating_strategy_name")
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum seatingStrategyName;
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig withSeatingStrategyName(MutationProductsUpdateRequestBodyProductConfigSeatingConfigSeatingStrategyNameEnum seatingStrategyName) {
        this.seatingStrategyName = seatingStrategyName;
        return this;
    }
}
