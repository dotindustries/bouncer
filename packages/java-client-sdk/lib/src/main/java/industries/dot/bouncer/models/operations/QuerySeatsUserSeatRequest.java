package industries.dot.bouncer.models.operations;



public class QuerySeatsUserSeatRequest {
    public QuerySeatsUserSeatPathParams pathParams;
    public QuerySeatsUserSeatRequest withPathParams(QuerySeatsUserSeatPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
}
