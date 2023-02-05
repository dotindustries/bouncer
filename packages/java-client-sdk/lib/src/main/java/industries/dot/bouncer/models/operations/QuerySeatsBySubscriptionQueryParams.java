package industries.dot.bouncer.models.operations;

import industries.dot.bouncer.utils.SpeakeasyMetadata;

public class QuerySeatsBySubscriptionQueryParams {
    @SpeakeasyMetadata("queryParam:style=form,explode=true,name=userEmail")
    public String userEmail;
    public QuerySeatsBySubscriptionQueryParams withUserEmail(String userEmail) {
        this.userEmail = userEmail;
        return this;
    }
    @SpeakeasyMetadata("queryParam:style=form,explode=true,name=userId")
    public String userId;
    public QuerySeatsBySubscriptionQueryParams withUserId(String userId) {
        this.userId = userId;
        return this;
    }
}
