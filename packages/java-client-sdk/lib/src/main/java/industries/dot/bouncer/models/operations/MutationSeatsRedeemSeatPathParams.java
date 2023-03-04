package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class MutationSeatsRedeemSeatPathParams {
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=seatId")
    public String seatId;
    public MutationSeatsRedeemSeatPathParams withSeatId(String seatId) {
        this.seatId = seatId;
        return this;
    }
    @SpeakeasyMetadata("pathParam:style=simple,explode=false,name=subscriptionId")
    public String subscriptionId;
    public MutationSeatsRedeemSeatPathParams withSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
        return this;
    }
}
