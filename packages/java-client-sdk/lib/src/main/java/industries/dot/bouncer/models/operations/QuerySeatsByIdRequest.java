package industries.dot.bouncer.models.operations;



public class QuerySeatsByIdRequest {
    public QuerySeatsByIdPathParams pathParams;
    public QuerySeatsByIdRequest withPathParams(QuerySeatsByIdPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
}
