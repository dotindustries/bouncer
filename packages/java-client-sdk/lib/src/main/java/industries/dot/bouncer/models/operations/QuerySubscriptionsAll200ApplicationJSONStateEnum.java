package industries.dot.bouncer.models.operations;


public enum QuerySubscriptionsAll200ApplicationJSONStateEnum {
    PURCHASED("purchased"),
    ACTIVE("active"),
    SUSPENDED("suspended"),
    CANCELED("canceled");

    public final String value;

    private QuerySubscriptionsAll200ApplicationJSONStateEnum(String value) {
        this.value = value;
    }
}
