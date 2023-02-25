package industries.dot.bouncer.models.operations;



public class QueryProductsByIdResponse {
    public String contentType;
    public QueryProductsByIdResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QueryProductsByIdResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QueryProductsById200ApplicationJSON queryProductsById200ApplicationJSONObject;
    public QueryProductsByIdResponse withQueryProductsById200ApplicationJSONObject(QueryProductsById200ApplicationJSON queryProductsById200ApplicationJSONObject) {
        this.queryProductsById200ApplicationJSONObject = queryProductsById200ApplicationJSONObject;
        return this;
    }
    public QueryProductsByIdDefaultApplicationJSON queryProductsByIdDefaultApplicationJSONObject;
    public QueryProductsByIdResponse withQueryProductsByIdDefaultApplicationJSONObject(QueryProductsByIdDefaultApplicationJSON queryProductsByIdDefaultApplicationJSONObject) {
        this.queryProductsByIdDefaultApplicationJSONObject = queryProductsByIdDefaultApplicationJSONObject;
        return this;
    }
}
