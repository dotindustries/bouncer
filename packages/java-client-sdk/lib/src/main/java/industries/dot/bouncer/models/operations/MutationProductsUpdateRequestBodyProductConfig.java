package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MutationProductsUpdateRequestBodyProductConfig {
    @JsonProperty("contact_page_url")
    public String contactPageUrl;
    public MutationProductsUpdateRequestBodyProductConfig withContactPageUrl(String contactPageUrl) {
        this.contactPageUrl = contactPageUrl;
        return this;
    }
    @JsonProperty("contact_sales_email")
    public String contactSalesEmail;
    public MutationProductsUpdateRequestBodyProductConfig withContactSalesEmail(String contactSalesEmail) {
        this.contactSalesEmail = contactSalesEmail;
        return this;
    }
    @JsonProperty("contact_sales_url")
    public String contactSalesUrl;
    public MutationProductsUpdateRequestBodyProductConfig withContactSalesUrl(String contactSalesUrl) {
        this.contactSalesUrl = contactSalesUrl;
        return this;
    }
    @JsonProperty("contact_support_email")
    public String contactSupportEmail;
    public MutationProductsUpdateRequestBodyProductConfig withContactSupportEmail(String contactSupportEmail) {
        this.contactSupportEmail = contactSupportEmail;
        return this;
    }
    @JsonProperty("contact_support_url")
    public String contactSupportUrl;
    public MutationProductsUpdateRequestBodyProductConfig withContactSupportUrl(String contactSupportUrl) {
        this.contactSupportUrl = contactSupportUrl;
        return this;
    }
    @JsonProperty("home_page_url")
    public String homePageUrl;
    public MutationProductsUpdateRequestBodyProductConfig withHomePageUrl(String homePageUrl) {
        this.homePageUrl = homePageUrl;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationProductsUpdateRequestBodyProductConfig withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("is_setup_complete")
    public Boolean isSetupComplete;
    public MutationProductsUpdateRequestBodyProductConfig withIsSetupComplete(Boolean isSetupComplete) {
        this.isSetupComplete = isSetupComplete;
        return this;
    }
    @JsonProperty("on_access_denied_url")
    public String onAccessDeniedUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnAccessDeniedUrl(String onAccessDeniedUrl) {
        this.onAccessDeniedUrl = onAccessDeniedUrl;
        return this;
    }
    @JsonProperty("on_access_granted_url")
    public String onAccessGrantedUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnAccessGrantedUrl(String onAccessGrantedUrl) {
        this.onAccessGrantedUrl = onAccessGrantedUrl;
        return this;
    }
    @JsonProperty("on_no_seat_available_url")
    public String onNoSeatAvailableUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnNoSeatAvailableUrl(String onNoSeatAvailableUrl) {
        this.onNoSeatAvailableUrl = onNoSeatAvailableUrl;
        return this;
    }
    @JsonProperty("on_no_subscriptions_found_url")
    public String onNoSubscriptionsFoundUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnNoSubscriptionsFoundUrl(String onNoSubscriptionsFoundUrl) {
        this.onNoSubscriptionsFoundUrl = onNoSubscriptionsFoundUrl;
        return this;
    }
    @JsonProperty("on_subscription_canceled_url")
    public String onSubscriptionCanceledUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnSubscriptionCanceledUrl(String onSubscriptionCanceledUrl) {
        this.onSubscriptionCanceledUrl = onSubscriptionCanceledUrl;
        return this;
    }
    @JsonProperty("on_subscription_not_found_url")
    public String onSubscriptionNotFoundUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnSubscriptionNotFoundUrl(String onSubscriptionNotFoundUrl) {
        this.onSubscriptionNotFoundUrl = onSubscriptionNotFoundUrl;
        return this;
    }
    @JsonProperty("on_subscription_not_ready_url")
    public String onSubscriptionNotReadyUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnSubscriptionNotReadyUrl(String onSubscriptionNotReadyUrl) {
        this.onSubscriptionNotReadyUrl = onSubscriptionNotReadyUrl;
        return this;
    }
    @JsonProperty("on_subscription_suspended_url")
    public String onSubscriptionSuspendedUrl;
    public MutationProductsUpdateRequestBodyProductConfig withOnSubscriptionSuspendedUrl(String onSubscriptionSuspendedUrl) {
        this.onSubscriptionSuspendedUrl = onSubscriptionSuspendedUrl;
        return this;
    }
    @JsonProperty("owner_id")
    public String ownerId;
    public MutationProductsUpdateRequestBodyProductConfig withOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
    @JsonProperty("privacy_notice_page_url")
    public String privacyNoticePageUrl;
    public MutationProductsUpdateRequestBodyProductConfig withPrivacyNoticePageUrl(String privacyNoticePageUrl) {
        this.privacyNoticePageUrl = privacyNoticePageUrl;
        return this;
    }
    @JsonProperty("product_name")
    public String productName;
    public MutationProductsUpdateRequestBodyProductConfig withProductName(String productName) {
        this.productName = productName;
        return this;
    }
    @JsonProperty("publisher_name")
    public String publisherName;
    public MutationProductsUpdateRequestBodyProductConfig withPublisherName(String publisherName) {
        this.publisherName = publisherName;
        return this;
    }
    @JsonProperty("seatingConfig")
    public MutationProductsUpdateRequestBodyProductConfigSeatingConfig seatingConfig;
    public MutationProductsUpdateRequestBodyProductConfig withSeatingConfig(MutationProductsUpdateRequestBodyProductConfigSeatingConfig seatingConfig) {
        this.seatingConfig = seatingConfig;
        return this;
    }
}
