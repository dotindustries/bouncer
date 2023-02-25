package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationSeatsReserveSeatRequestBody {
    @JsonProperty("reservation")
    public MutationSeatsReserveSeatRequestBodyReservation reservation;
    public MutationSeatsReserveSeatRequestBody withReservation(MutationSeatsReserveSeatRequestBodyReservation reservation) {
        this.reservation = reservation;
        return this;
    }
}
