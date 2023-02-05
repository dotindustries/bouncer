package industries.dot.bouncer.models.operations;



public class QuerySubscriptionsByIdRequest {
    public QuerySubscriptionsByIdPathParams pathParams;
    public QuerySubscriptionsByIdRequest withPathParams(QuerySubscriptionsByIdPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
}
