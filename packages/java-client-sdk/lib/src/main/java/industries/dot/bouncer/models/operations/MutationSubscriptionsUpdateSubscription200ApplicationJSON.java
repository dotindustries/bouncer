package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class MutationSubscriptionsUpdateSubscription200ApplicationJSON {
    @JsonProperty("admin_email")
    public String adminEmail;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
        return this;
    }
    @JsonProperty("admin_name")
    public String adminName;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withAdminName(String adminName) {
        this.adminName = adminName;
        return this;
    }
    @JsonProperty("admin_role_name")
    public String adminRoleName;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withAdminRoleName(String adminRoleName) {
        this.adminRoleName = adminRoleName;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("is_being_configured")
    public Boolean isBeingConfigured;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withIsBeingConfigured(Boolean isBeingConfigured) {
        this.isBeingConfigured = isBeingConfigured;
        return this;
    }
    @JsonProperty("is_free_trial")
    public Boolean isFreeTrial;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withIsFreeTrial(Boolean isFreeTrial) {
        this.isFreeTrial = isFreeTrial;
        return this;
    }
    @JsonProperty("is_setup_complete")
    public Boolean isSetupComplete;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withIsSetupComplete(Boolean isSetupComplete) {
        this.isSetupComplete = isSetupComplete;
        return this;
    }
    @JsonProperty("is_test_subscription")
    public Boolean isTestSubscription;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withIsTestSubscription(Boolean isTestSubscription) {
        this.isTestSubscription = isTestSubscription;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("management_urls")
    public Object managementUrls;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withManagementUrls(Object managementUrls) {
        this.managementUrls = managementUrls;
        return this;
    }
    @JsonProperty("offer_id")
    public String offerId;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withOfferId(String offerId) {
        this.offerId = offerId;
        return this;
    }
    @JsonProperty("plan_id")
    public String planId;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withPlanId(String planId) {
        this.planId = planId;
        return this;
    }
    @JsonProperty("product_id")
    public String productId;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withProductId(String productId) {
        this.productId = productId;
        return this;
    }
    @JsonProperty("seatingConfig")
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig seatingConfig;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withSeatingConfig(MutationSubscriptionsUpdateSubscription200ApplicationJSONSeatingConfig seatingConfig) {
        this.seatingConfig = seatingConfig;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("source_subscription")
    public Object sourceSubscription;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withSourceSubscription(Object sourceSubscription) {
        this.sourceSubscription = sourceSubscription;
        return this;
    }
    @JsonProperty("state")
    public MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum state;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withState(MutationSubscriptionsUpdateSubscription200ApplicationJSONStateEnum state) {
        this.state = state;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("state_last_updated_utc")
    public OffsetDateTime stateLastUpdatedUtc;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withStateLastUpdatedUtc(OffsetDateTime stateLastUpdatedUtc) {
        this.stateLastUpdatedUtc = stateLastUpdatedUtc;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("subscriber_info")
    public Object subscriberInfo;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withSubscriberInfo(Object subscriberInfo) {
        this.subscriberInfo = subscriberInfo;
        return this;
    }
    @JsonProperty("subscription_name")
    public String subscriptionName;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withSubscriptionName(String subscriptionName) {
        this.subscriptionName = subscriptionName;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("tenant_name")
    public String tenantName;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withTenantName(String tenantName) {
        this.tenantName = tenantName;
        return this;
    }
    @JsonProperty("total_seats")
    public Long totalSeats;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withTotalSeats(Long totalSeats) {
        this.totalSeats = totalSeats;
        return this;
    }
    @JsonProperty("user_role_name")
    public String userRoleName;
    public MutationSubscriptionsUpdateSubscription200ApplicationJSON withUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
        return this;
    }
}
