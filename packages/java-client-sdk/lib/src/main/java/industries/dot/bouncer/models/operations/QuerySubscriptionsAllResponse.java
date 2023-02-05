package industries.dot.bouncer.models.operations;

import java.time.OffsetDateTime;

public class QuerySubscriptionsAllResponse {
    public String contentType;
    public QuerySubscriptionsAllResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QuerySubscriptionsAllResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QuerySubscriptionsAll200ApplicationJSON[] querySubscriptionsAll200ApplicationJSONObjects;
    public QuerySubscriptionsAllResponse withQuerySubscriptionsAll200ApplicationJSONObjects(QuerySubscriptionsAll200ApplicationJSON[] querySubscriptionsAll200ApplicationJSONObjects) {
        this.querySubscriptionsAll200ApplicationJSONObjects = querySubscriptionsAll200ApplicationJSONObjects;
        return this;
    }
    public QuerySubscriptionsAllDefaultApplicationJSON querySubscriptionsAllDefaultApplicationJSONObject;
    public QuerySubscriptionsAllResponse withQuerySubscriptionsAllDefaultApplicationJSONObject(QuerySubscriptionsAllDefaultApplicationJSON querySubscriptionsAllDefaultApplicationJSONObject) {
        this.querySubscriptionsAllDefaultApplicationJSONObject = querySubscriptionsAllDefaultApplicationJSONObject;
        return this;
    }
}
