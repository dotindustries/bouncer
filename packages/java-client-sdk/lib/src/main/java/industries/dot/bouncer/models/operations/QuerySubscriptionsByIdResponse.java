package industries.dot.bouncer.models.operations;



public class QuerySubscriptionsByIdResponse {
    public String contentType;
    public QuerySubscriptionsByIdResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QuerySubscriptionsByIdResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QuerySubscriptionsById200ApplicationJSON querySubscriptionsById200ApplicationJSONObject;
    public QuerySubscriptionsByIdResponse withQuerySubscriptionsById200ApplicationJSONObject(QuerySubscriptionsById200ApplicationJSON querySubscriptionsById200ApplicationJSONObject) {
        this.querySubscriptionsById200ApplicationJSONObject = querySubscriptionsById200ApplicationJSONObject;
        return this;
    }
    public QuerySubscriptionsByIdDefaultApplicationJSON querySubscriptionsByIdDefaultApplicationJSONObject;
    public QuerySubscriptionsByIdResponse withQuerySubscriptionsByIdDefaultApplicationJSONObject(QuerySubscriptionsByIdDefaultApplicationJSON querySubscriptionsByIdDefaultApplicationJSONObject) {
        this.querySubscriptionsByIdDefaultApplicationJSONObject = querySubscriptionsByIdDefaultApplicationJSONObject;
        return this;
    }
}
