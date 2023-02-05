package industries.dot.bouncer.models.operations;



public class QueryProductsByIdRequest {
    public QueryProductsByIdPathParams pathParams;
    public QueryProductsByIdRequest withPathParams(QueryProductsByIdPathParams pathParams) {
        this.pathParams = pathParams;
        return this;
    }
}
