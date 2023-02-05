package industries.dot.bouncer.models.operations;



public class MutationProductsUpdateResponse {
    public String contentType;
    public MutationProductsUpdateResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationProductsUpdateResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationProductsUpdate200ApplicationJSON mutationProductsUpdate200ApplicationJSONObject;
    public MutationProductsUpdateResponse withMutationProductsUpdate200ApplicationJSONObject(MutationProductsUpdate200ApplicationJSON mutationProductsUpdate200ApplicationJSONObject) {
        this.mutationProductsUpdate200ApplicationJSONObject = mutationProductsUpdate200ApplicationJSONObject;
        return this;
    }
    public MutationProductsUpdateDefaultApplicationJSON mutationProductsUpdateDefaultApplicationJSONObject;
    public MutationProductsUpdateResponse withMutationProductsUpdateDefaultApplicationJSONObject(MutationProductsUpdateDefaultApplicationJSON mutationProductsUpdateDefaultApplicationJSONObject) {
        this.mutationProductsUpdateDefaultApplicationJSONObject = mutationProductsUpdateDefaultApplicationJSONObject;
        return this;
    }
}
