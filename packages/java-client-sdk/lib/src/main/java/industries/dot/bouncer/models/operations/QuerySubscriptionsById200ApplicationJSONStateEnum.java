package industries.dot.bouncer.models.operations;


public enum QuerySubscriptionsById200ApplicationJSONStateEnum {
    PURCHASED("purchased"),
    ACTIVE("active"),
    SUSPENDED("suspended"),
    CANCELED("canceled");

    public final String value;

    private QuerySubscriptionsById200ApplicationJSONStateEnum(String value) {
        this.value = value;
    }
}
