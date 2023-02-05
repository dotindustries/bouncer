package industries.dot.bouncer.models.operations;



public class MutationSubscriptionsUpdateSubscriptionResponse {
    public String contentType;
    public MutationSubscriptionsUpdateSubscriptionResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public MutationSubscriptionsUpdateSubscriptionResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON mutationSubscriptionsUpdateSubscription200ApplicationJSONObject;
    public MutationSubscriptionsUpdateSubscriptionResponse withMutationSubscriptionsUpdateSubscription200ApplicationJSONObject(MutationSubscriptionsUpdateSubscription200ApplicationJSON mutationSubscriptionsUpdateSubscription200ApplicationJSONObject) {
        this.mutationSubscriptionsUpdateSubscription200ApplicationJSONObject = mutationSubscriptionsUpdateSubscription200ApplicationJSONObject;
        return this;
    }
    public MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject;
    public MutationSubscriptionsUpdateSubscriptionResponse withMutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject(MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject) {
        this.mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject = mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject;
        return this;
    }
}
