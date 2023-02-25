<!-- Start SDK Example Usage -->
```go
package main

import (
    "dot.industries/bouncer-sdk"
    "dot.industries/bouncer-sdk/pkg/models/shared"
    "dot.industries/bouncer-sdk/pkg/models/operations"
)

func main() {
    s := sdk.New()
    
    req := operations.MutationProductsCreateRequest{
        Request: operations.MutationProductsCreateRequestBody{
            ContactPageURL: "unde",
            ContactSalesEmail: "deserunt",
            ContactSalesURL: "porro",
            ContactSupportEmail: "nulla",
            ContactSupportURL: "id",
            HomePageURL: "vero",
            ID: "perspiciatis",
            IsSetupComplete: true,
            OnAccessDeniedURL: "nihil",
            OnAccessGrantedURL: "fuga",
            OnNoSeatAvailableURL: "facilis",
            OnNoSubscriptionsFoundURL: "eum",
            OnSubscriptionCanceledURL: "iusto",
            OnSubscriptionNotFoundURL: "ullam",
            OnSubscriptionNotReadyURL: "saepe",
            OnSubscriptionSuspendedURL: "inventore",
            PrivacyNoticePageURL: "sapiente",
            ProductName: "enim",
            PublisherName: "eum",
            SeatingConfig: operations.MutationProductsCreateRequestBodySeatingConfig{
                DefaultLowSeatWarningLevelPercent: 4776.65,
                DefaultSeatExpiryInDays: 7917.25,
                LimitedOverflowSeatingEnabled: false,
                LowSeatWarningLevelPct: 5288.95,
                OwnerID: "deleniti",
                SeatReservationExpiryInDays: 5680.45,
                SeatingStrategyName: "first_come_first_served",
            },
        },
    }
    
    res, err := s.MutationProductsCreate(ctx, req)
    if err != nil {
        log.Fatal(err)
    }

    if res.MutationProductsCreate200ApplicationJSONObject != nil {
        // handle response
    }
```
<!-- End SDK Example Usage -->