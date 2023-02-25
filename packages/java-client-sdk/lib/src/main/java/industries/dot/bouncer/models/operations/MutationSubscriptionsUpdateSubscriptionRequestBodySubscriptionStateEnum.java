package industries.dot.bouncer.models.operations;


public enum MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum {
    PURCHASED("purchased"),
    ACTIVE("active"),
    SUSPENDED("suspended"),
    CANCELED("canceled");

    public final String value;

    private MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum(String value) {
        this.value = value;
    }
}
