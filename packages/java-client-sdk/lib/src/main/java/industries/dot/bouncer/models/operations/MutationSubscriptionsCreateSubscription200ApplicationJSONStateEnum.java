package industries.dot.bouncer.models.operations;


public enum MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum {
    PURCHASED("purchased"),
    ACTIVE("active"),
    SUSPENDED("suspended"),
    CANCELED("canceled");

    public final String value;

    private MutationSubscriptionsCreateSubscription200ApplicationJSONStateEnum(String value) {
        this.value = value;
    }
}
