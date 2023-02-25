package industries.dot.bouncer.models.operations;

import java.time.OffsetDateTime;

public class QueryProductsAllResponse {
    public String contentType;
    public QueryProductsAllResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QueryProductsAllResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QueryProductsAll200ApplicationJSON[] queryProductsAll200ApplicationJSONObjects;
    public QueryProductsAllResponse withQueryProductsAll200ApplicationJSONObjects(QueryProductsAll200ApplicationJSON[] queryProductsAll200ApplicationJSONObjects) {
        this.queryProductsAll200ApplicationJSONObjects = queryProductsAll200ApplicationJSONObjects;
        return this;
    }
    public QueryProductsAllDefaultApplicationJSON queryProductsAllDefaultApplicationJSONObject;
    public QueryProductsAllResponse withQueryProductsAllDefaultApplicationJSONObject(QueryProductsAllDefaultApplicationJSON queryProductsAllDefaultApplicationJSONObject) {
        this.queryProductsAllDefaultApplicationJSONObject = queryProductsAllDefaultApplicationJSONObject;
        return this;
    }
}
