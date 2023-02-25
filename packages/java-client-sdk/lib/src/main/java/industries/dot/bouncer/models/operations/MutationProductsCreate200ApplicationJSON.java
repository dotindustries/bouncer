package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationProductsCreate200ApplicationJSON {
    @JsonProperty("contact_page_url")
    public String contactPageUrl;
    public MutationProductsCreate200ApplicationJSON withContactPageUrl(String contactPageUrl) {
        this.contactPageUrl = contactPageUrl;
        return this;
    }
    @JsonProperty("contact_sales_email")
    public String contactSalesEmail;
    public MutationProductsCreate200ApplicationJSON withContactSalesEmail(String contactSalesEmail) {
        this.contactSalesEmail = contactSalesEmail;
        return this;
    }
    @JsonProperty("contact_sales_url")
    public String contactSalesUrl;
    public MutationProductsCreate200ApplicationJSON withContactSalesUrl(String contactSalesUrl) {
        this.contactSalesUrl = contactSalesUrl;
        return this;
    }
    @JsonProperty("contact_support_email")
    public String contactSupportEmail;
    public MutationProductsCreate200ApplicationJSON withContactSupportEmail(String contactSupportEmail) {
        this.contactSupportEmail = contactSupportEmail;
        return this;
    }
    @JsonProperty("contact_support_url")
    public String contactSupportUrl;
    public MutationProductsCreate200ApplicationJSON withContactSupportUrl(String contactSupportUrl) {
        this.contactSupportUrl = contactSupportUrl;
        return this;
    }
    @JsonProperty("home_page_url")
    public String homePageUrl;
    public MutationProductsCreate200ApplicationJSON withHomePageUrl(String homePageUrl) {
        this.homePageUrl = homePageUrl;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationProductsCreate200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("is_setup_complete")
    public Boolean isSetupComplete;
    public MutationProductsCreate200ApplicationJSON withIsSetupComplete(Boolean isSetupComplete) {
        this.isSetupComplete = isSetupComplete;
        return this;
    }
    @JsonProperty("on_access_denied_url")
    public String onAccessDeniedUrl;
    public MutationProductsCreate200ApplicationJSON withOnAccessDeniedUrl(String onAccessDeniedUrl) {
        this.onAccessDeniedUrl = onAccessDeniedUrl;
        return this;
    }
    @JsonProperty("on_access_granted_url")
    public String onAccessGrantedUrl;
    public MutationProductsCreate200ApplicationJSON withOnAccessGrantedUrl(String onAccessGrantedUrl) {
        this.onAccessGrantedUrl = onAccessGrantedUrl;
        return this;
    }
    @JsonProperty("on_no_seat_available_url")
    public String onNoSeatAvailableUrl;
    public MutationProductsCreate200ApplicationJSON withOnNoSeatAvailableUrl(String onNoSeatAvailableUrl) {
        this.onNoSeatAvailableUrl = onNoSeatAvailableUrl;
        return this;
    }
    @JsonProperty("on_no_subscriptions_found_url")
    public String onNoSubscriptionsFoundUrl;
    public MutationProductsCreate200ApplicationJSON withOnNoSubscriptionsFoundUrl(String onNoSubscriptionsFoundUrl) {
        this.onNoSubscriptionsFoundUrl = onNoSubscriptionsFoundUrl;
        return this;
    }
    @JsonProperty("on_subscription_canceled_url")
    public String onSubscriptionCanceledUrl;
    public MutationProductsCreate200ApplicationJSON withOnSubscriptionCanceledUrl(String onSubscriptionCanceledUrl) {
        this.onSubscriptionCanceledUrl = onSubscriptionCanceledUrl;
        return this;
    }
    @JsonProperty("on_subscription_not_found_url")
    public String onSubscriptionNotFoundUrl;
    public MutationProductsCreate200ApplicationJSON withOnSubscriptionNotFoundUrl(String onSubscriptionNotFoundUrl) {
        this.onSubscriptionNotFoundUrl = onSubscriptionNotFoundUrl;
        return this;
    }
    @JsonProperty("on_subscription_not_ready_url")
    public String onSubscriptionNotReadyUrl;
    public MutationProductsCreate200ApplicationJSON withOnSubscriptionNotReadyUrl(String onSubscriptionNotReadyUrl) {
        this.onSubscriptionNotReadyUrl = onSubscriptionNotReadyUrl;
        return this;
    }
    @JsonProperty("on_subscription_suspended_url")
    public String onSubscriptionSuspendedUrl;
    public MutationProductsCreate200ApplicationJSON withOnSubscriptionSuspendedUrl(String onSubscriptionSuspendedUrl) {
        this.onSubscriptionSuspendedUrl = onSubscriptionSuspendedUrl;
        return this;
    }
    @JsonProperty("owner_id")
    public String ownerId;
    public MutationProductsCreate200ApplicationJSON withOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    @JsonProperty("privacy_notice_page_url")
    public String privacyNoticePageUrl;
    public MutationProductsCreate200ApplicationJSON withPrivacyNoticePageUrl(String privacyNoticePageUrl) {
        this.privacyNoticePageUrl = privacyNoticePageUrl;
        return this;
    }
    @JsonProperty("product_name")
    public String productName;
    public MutationProductsCreate200ApplicationJSON withProductName(String productName) {
        this.productName = productName;
        return this;
    }
    @JsonProperty("publisher_name")
    public String publisherName;
    public MutationProductsCreate200ApplicationJSON withPublisherName(String publisherName) {
        this.publisherName = publisherName;
        return this;
    }
    @JsonProperty("seatingConfig")
    public MutationProductsCreate200ApplicationJSONSeatingConfig seatingConfig;
    public MutationProductsCreate200ApplicationJSON withSeatingConfig(MutationProductsCreate200ApplicationJSONSeatingConfig seatingConfig) {
        this.seatingConfig = seatingConfig;
        return this;
    }
}
