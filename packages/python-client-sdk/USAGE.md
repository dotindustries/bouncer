<!-- Start SDK Example Usage -->
```python
import sdk
from sdk.models import operations, shared

s = sdk.SDK()
   
req = operations.MutationProductsCreateRequest(
    request=operations.MutationProductsCreateRequestBody(
        contact_page_url="unde",
        contact_sales_email="deserunt",
        contact_sales_url="porro",
        contact_support_email="nulla",
        contact_support_url="id",
        home_page_url="vero",
        id="perspiciatis",
        is_setup_complete=True,
        on_access_denied_url="nihil",
        on_access_granted_url="fuga",
        on_no_seat_available_url="facilis",
        on_no_subscriptions_found_url="eum",
        on_subscription_canceled_url="iusto",
        on_subscription_not_found_url="ullam",
        on_subscription_not_ready_url="saepe",
        on_subscription_suspended_url="inventore",
        privacy_notice_page_url="sapiente",
        product_name="enim",
        publisher_name="eum",
        seating_config=operations.MutationProductsCreateRequestBodySeatingConfig(
            default_low_seat_warning_level_percent=4776.65,
            default_seat_expiry_in_days=7917.25,
            limited_overflow_seating_enabled=False,
            low_seat_warning_level_pct=5288.95,
            owner_id="deleniti",
            seat_reservation_expiry_in_days=5680.45,
            seating_strategy_name="first_come_first_served",
        ),
    ),
)
    
res = s.mutation_products_create(req)

if res.mutation_products_create_200_application_json_object is not None:
    # handle response
```
<!-- End SDK Example Usage -->