package industries.dot.bouncer.models.operations;



public class QuerySubscriptionsAllRequest {
    public QuerySubscriptionsAllQueryParams queryParams;
    public QuerySubscriptionsAllRequest withQueryParams(QuerySubscriptionsAllQueryParams queryParams) {
        this.queryParams = queryParams;
        return this;
    }
}
