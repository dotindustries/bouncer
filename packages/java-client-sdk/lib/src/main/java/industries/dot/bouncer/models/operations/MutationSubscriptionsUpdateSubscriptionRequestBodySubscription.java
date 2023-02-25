package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class MutationSubscriptionsUpdateSubscriptionRequestBodySubscription {
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("admin_email")
    public String adminEmail;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("admin_name")
    public String adminName;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withAdminName(String adminName) {
        this.adminName = adminName;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("admin_role_name")
    public String adminRoleName;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withAdminRoleName(String adminRoleName) {
        this.adminRoleName = adminRoleName;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonSerialize(contentUsing = DateTimeSerializer.class)
    @JsonDeserialize(contentUsing = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withId(String id) {
        this.id = id;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("is_being_configured")
    public Boolean isBeingConfigured;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withIsBeingConfigured(Boolean isBeingConfigured) {
        this.isBeingConfigured = isBeingConfigured;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("is_free_trial")
    public Boolean isFreeTrial;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withIsFreeTrial(Boolean isFreeTrial) {
        this.isFreeTrial = isFreeTrial;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("is_setup_complete")
    public Boolean isSetupComplete;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withIsSetupComplete(Boolean isSetupComplete) {
        this.isSetupComplete = isSetupComplete;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("is_test_subscription")
    public Boolean isTestSubscription;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withIsTestSubscription(Boolean isTestSubscription) {
        this.isTestSubscription = isTestSubscription;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("management_urls")
    public Object managementUrls;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withManagementUrls(Object managementUrls) {
        this.managementUrls = managementUrls;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("plan_id")
    public String planId;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withPlanId(String planId) {
        this.planId = planId;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("product_id")
    public String productId;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withProductId(String productId) {
        this.productId = productId;
        return this;
    }
    @JsonProperty("seatingConfig")
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig seatingConfig;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withSeatingConfig(MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionSeatingConfig seatingConfig) {
        this.seatingConfig = seatingConfig;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("source_subscription")
    public Object sourceSubscription;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withSourceSubscription(Object sourceSubscription) {
        this.sourceSubscription = sourceSubscription;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("state")
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum state;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withState(MutationSubscriptionsUpdateSubscriptionRequestBodySubscriptionStateEnum state) {
        this.state = state;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonSerialize(contentUsing = DateTimeSerializer.class)
    @JsonDeserialize(contentUsing = DateTimeDeserializer.class)
    @JsonProperty("state_last_updated_utc")
    public OffsetDateTime stateLastUpdatedUtc;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withStateLastUpdatedUtc(OffsetDateTime stateLastUpdatedUtc) {
        this.stateLastUpdatedUtc = stateLastUpdatedUtc;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("subscriber_info")
    public Object subscriberInfo;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withSubscriberInfo(Object subscriberInfo) {
        this.subscriberInfo = subscriberInfo;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("subscription_name")
    public String subscriptionName;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withSubscriptionName(String subscriptionName) {
        this.subscriptionName = subscriptionName;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("tenant_name")
    public String tenantName;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withTenantName(String tenantName) {
        this.tenantName = tenantName;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("total_seats")
    public Long totalSeats;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withTotalSeats(Long totalSeats) {
        this.totalSeats = totalSeats;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("user_role_name")
    public String userRoleName;
    public MutationSubscriptionsUpdateSubscriptionRequestBodySubscription withUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
        return this;
    }
}
