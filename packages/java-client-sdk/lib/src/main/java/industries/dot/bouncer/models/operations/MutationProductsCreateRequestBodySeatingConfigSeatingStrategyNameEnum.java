package industries.dot.bouncer.models.operations;


public enum MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnum {
    MONTHLY_ACTIVE_USER("monthly_active_user"),
    FIRST_COME_FIRST_SERVED("first_come_first_served");

    public final String value;

    private MutationProductsCreateRequestBodySeatingConfigSeatingStrategyNameEnum(String value) {
        this.value = value;
    }
}
