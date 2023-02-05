<!-- Start SDK Example Usage -->
```java
package hello.world;

import industries.dot.bouncer.SDK;
import industries.dot.bouncer.models.shared.Security;

public class Application {
    public static void main(String[] args) {
        try {
            SDK.Builder builder = SDK.builder();

            SDK sdk = builder.build();

            MutationProductsCreateRequest req = new MutationProductsCreateRequest() {{
                request = new MutationProductsCreateRequestBody() {{
                    contactPageUrl = "unde";
                    contactSalesEmail = "deserunt";
                    contactSalesUrl = "porro";
                    contactSupportEmail = "nulla";
                    contactSupportUrl = "id";
                    homePageUrl = "vero";
                    id = "perspiciatis";
                    isSetupComplete = true;
                    onAccessDeniedUrl = "nihil";
                    onAccessGrantedUrl = "fuga";
                    onNoSeatAvailableUrl = "facilis";
                    onNoSubscriptionsFoundUrl = "eum";
                    onSubscriptionCanceledUrl = "iusto";
                    onSubscriptionNotFoundUrl = "ullam";
                    onSubscriptionNotReadyUrl = "saepe";
                    onSubscriptionSuspendedUrl = "inventore";
                    privacyNoticePageUrl = "sapiente";
                    productName = "enim";
                    publisherName = "eum";
                    seatingConfig = new MutationProductsCreateRequestBodySeatingConfig() {{
                        defaultLowSeatWarningLevelPercent = 4776.65;
                        defaultSeatExpiryInDays = 7917.25;
                        limitedOverflowSeatingEnabled = false;
                        lowSeatWarningLevelPct = 5288.95;
                        ownerId = "deleniti";
                        seatReservationExpiryInDays = 5680.45;
                        seatingStrategyName = "first_come_first_served";
                    }};
                }};
            }};

            MutationProductsCreateResponse res = sdk.mutationProductsCreate(req);

            if (res.mutationProductsCreate200ApplicationJSONObject.isPresent()) {
                // handle response
            }
        } catch (Exception e) {
            // handle exception
        }
```
<!-- End SDK Example Usage -->