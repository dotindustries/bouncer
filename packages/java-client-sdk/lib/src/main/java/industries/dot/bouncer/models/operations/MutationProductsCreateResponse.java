package industries.dot.bouncer.models.operations;



public class MutationProductsCreateResponse {
    public String contentType;
    public MutationProductsCreateResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationProductsCreateResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationProductsCreate200ApplicationJSON mutationProductsCreate200ApplicationJSONObject;
    public MutationProductsCreateResponse withMutationProductsCreate200ApplicationJSONObject(MutationProductsCreate200ApplicationJSON mutationProductsCreate200ApplicationJSONObject) {
        this.mutationProductsCreate200ApplicationJSONObject = mutationProductsCreate200ApplicationJSONObject;
        return this;
    }
    public MutationProductsCreateDefaultApplicationJSON mutationProductsCreateDefaultApplicationJSONObject;
    public MutationProductsCreateResponse withMutationProductsCreateDefaultApplicationJSONObject(MutationProductsCreateDefaultApplicationJSON mutationProductsCreateDefaultApplicationJSONObject) {
        this.mutationProductsCreateDefaultApplicationJSONObject = mutationProductsCreateDefaultApplicationJSONObject;
        return this;
    }
}
