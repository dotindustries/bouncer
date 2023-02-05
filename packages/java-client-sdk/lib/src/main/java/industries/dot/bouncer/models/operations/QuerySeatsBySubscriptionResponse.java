package industries.dot.bouncer.models.operations;

import java.time.OffsetDateTime;

public class QuerySeatsBySubscriptionResponse {
    public String contentType;
    public QuerySeatsBySubscriptionResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QuerySeatsBySubscriptionResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QuerySeatsBySubscription200ApplicationJSON[] querySeatsBySubscription200ApplicationJSONObjects;
    public QuerySeatsBySubscriptionResponse withQuerySeatsBySubscription200ApplicationJSONObjects(QuerySeatsBySubscription200ApplicationJSON[] querySeatsBySubscription200ApplicationJSONObjects) {
        this.querySeatsBySubscription200ApplicationJSONObjects = querySeatsBySubscription200ApplicationJSONObjects;
        return this;
    }
    public QuerySeatsBySubscriptionDefaultApplicationJSON querySeatsBySubscriptionDefaultApplicationJSONObject;
    public QuerySeatsBySubscriptionResponse withQuerySeatsBySubscriptionDefaultApplicationJSONObject(QuerySeatsBySubscriptionDefaultApplicationJSON querySeatsBySubscriptionDefaultApplicationJSONObject) {
        this.querySeatsBySubscriptionDefaultApplicationJSONObject = querySeatsBySubscriptionDefaultApplicationJSONObject;
        return this;
    }
}
