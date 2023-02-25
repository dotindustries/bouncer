<!-- Start SDK Example Usage -->
```typescript
import { SDK, withSecurity} from "@dotinc/bouncer-sdk";
import { MutationProductsCreateRequest, MutationProductsCreateResponse } from "@dotinc/bouncer-sdk/src/sdk/models/operations";
import { AxiosError } from "axios";


const sdk = new SDK();
    
const req: MutationProductsCreateRequest = {
  request: {
    contactPageUrl: "unde",
    contactSalesEmail: "deserunt",
    contactSalesUrl: "porro",
    contactSupportEmail: "nulla",
    contactSupportUrl: "id",
    homePageUrl: "vero",
    id: "perspiciatis",
    isSetupComplete: true,
    onAccessDeniedUrl: "nihil",
    onAccessGrantedUrl: "fuga",
    onNoSeatAvailableUrl: "facilis",
    onNoSubscriptionsFoundUrl: "eum",
    onSubscriptionCanceledUrl: "iusto",
    onSubscriptionNotFoundUrl: "ullam",
    onSubscriptionNotReadyUrl: "saepe",
    onSubscriptionSuspendedUrl: "inventore",
    privacyNoticePageUrl: "sapiente",
    productName: "enim",
    publisherName: "eum",
    seatingConfig: {
      defaultLowSeatWarningLevelPercent: 4776.65,
      defaultSeatExpiryInDays: 7917.25,
      limitedOverflowSeatingEnabled: false,
      lowSeatWarningLevelPct: 5288.95,
      ownerId: "deleniti",
      seatReservationExpiryInDays: 5680.45,
      seatingStrategyName: "first_come_first_served",
    },
  },
};

sdk.mutationProductsCreate(req).then((res: MutationProductsCreateResponse | AxiosError) => {
   // handle response
});
```
<!-- End SDK Example Usage -->