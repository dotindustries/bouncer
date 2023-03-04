package industries.dot.bouncer.models.operations;


public enum MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum {
    PURCHASED("purchased"),
    ACTIVE("active"),
    SUSPENDED("suspended"),
    CANCELED("canceled");

    public final String value;

    private MutationSubscriptionsCreateSubscriptionRequestBodySubscriptionStateEnum(String value) {
        this.value = value;
    }
}
