package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSeatsUpdateuOccupantPathParams {
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=seatId")
    public String seatId;
    public MutationSeatsUpdateuOccupantPathParams withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=subscriptionId")
    public String subscriptionId;
    public MutationSeatsUpdateuOccupantPathParams withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
