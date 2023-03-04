package industries.dot.bouncer.models.operations;



public class QuerySeatsBySubscriptionRequest {
    public QuerySeatsBySubscriptionPathParams pathParams;
    public QuerySeatsBySubscriptionRequest withPathParams(QuerySeatsBySubscriptionPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
    public QuerySeatsBySubscriptionQueryParams queryParams;
    public QuerySeatsBySubscriptionRequest withQueryParams(QuerySeatsBySubscriptionQueryParams queryParams) {
        this.queryParams = queryParams;
        return this;
    }
}
