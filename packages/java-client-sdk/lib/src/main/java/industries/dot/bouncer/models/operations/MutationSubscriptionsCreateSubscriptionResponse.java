package industries.dot.bouncer.models.operations;



public class MutationSubscriptionsCreateSubscriptionResponse {
    public String contentType;
    public MutationSubscriptionsCreateSubscriptionResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationSubscriptionsCreateSubscriptionResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationSubscriptionsCreateSubscription200ApplicationJSON mutationSubscriptionsCreateSubscription200ApplicationJSONObject;
    public MutationSubscriptionsCreateSubscriptionResponse withMutationSubscriptionsCreateSubscription200ApplicationJSONObject(MutationSubscriptionsCreateSubscription200ApplicationJSON mutationSubscriptionsCreateSubscription200ApplicationJSONObject) {
        this.mutationSubscriptionsCreateSubscription200ApplicationJSONObject = mutationSubscriptionsCreateSubscription200ApplicationJSONObject;
        return this;
    }
    public MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject;
    public MutationSubscriptionsCreateSubscriptionResponse withMutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject(MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject) {
        this.mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject = mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject;
        return this;
    }
}
