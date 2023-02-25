package industries.dot.bouncer.models.operations;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import industries.dot.bouncer.utils.DateTimeDeserializer;
import industries.dot.bouncer.utils.DateTimeSerializer;
import java.time.OffsetDateTime;

public class QuerySubscriptionsById200ApplicationJSON {
    @JsonProperty("admin_email")
    public String adminEmail;
    public QuerySubscriptionsById200ApplicationJSON withAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
        return this;
    }
    @JsonProperty("admin_name")
    public String adminName;
    public QuerySubscriptionsById200ApplicationJSON withAdminName(String adminName) {
        this.adminName = adminName;
        return this;
    }
    @JsonProperty("admin_role_name")
    public String adminRoleName;
    public QuerySubscriptionsById200ApplicationJSON withAdminRoleName(String adminRoleName) {
        this.adminRoleName = adminRoleName;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("created_utc")
    public OffsetDateTime createdUtc;
    public QuerySubscriptionsById200ApplicationJSON withCreatedUtc(OffsetDateTime createdUtc) {
        this.createdUtc = createdUtc;
        return this;
    }
    @JsonProperty("id")
    public String id;
    public QuerySubscriptionsById200ApplicationJSON withId(String id) {
        this.id = id;
        return this;
    }
    @JsonProperty("is_being_configured")
    public Boolean isBeingConfigured;
    public QuerySubscriptionsById200ApplicationJSON withIsBeingConfigured(Boolean isBeingConfigured) {
        this.isBeingConfigured = isBeingConfigured;
        return this;
    }
    @JsonProperty("is_free_trial")
    public Boolean isFreeTrial;
    public QuerySubscriptionsById200ApplicationJSON withIsFreeTrial(Boolean isFreeTrial) {
        this.isFreeTrial = isFreeTrial;
        return this;
    }
    @JsonProperty("is_setup_complete")
    public Boolean isSetupComplete;
    public QuerySubscriptionsById200ApplicationJSON withIsSetupComplete(Boolean isSetupComplete) {
        this.isSetupComplete = isSetupComplete;
        return this;
    }
    @JsonProperty("is_test_subscription")
    public Boolean isTestSubscription;
    public QuerySubscriptionsById200ApplicationJSON withIsTestSubscription(Boolean isTestSubscription) {
        this.isTestSubscription = isTestSubscription;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("management_urls")
    public Object managementUrls;
    public QuerySubscriptionsById200ApplicationJSON withManagementUrls(Object managementUrls) {
        this.managementUrls = managementUrls;
        return this;
    }
    @JsonProperty("offer_id")
    public String offerId;
    public QuerySubscriptionsById200ApplicationJSON withOfferId(String offerId) {
        this.offerId = offerId;
        return this;
    }
    @JsonProperty("plan_id")
    public String planId;
    public QuerySubscriptionsById200ApplicationJSON withPlanId(String planId) {
        this.planId = planId;
        return this;
    }
    @JsonProperty("product_id")
    public String productId;
    public QuerySubscriptionsById200ApplicationJSON withProductId(String productId) {
        this.productId = productId;
        return this;
    }
    @JsonProperty("seatingConfig")
    public QuerySubscriptionsById200ApplicationJSONSeatingConfig seatingConfig;
    public QuerySubscriptionsById200ApplicationJSON withSeatingConfig(QuerySubscriptionsById200ApplicationJSONSeatingConfig seatingConfig) {
        this.seatingConfig = seatingConfig;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("source_subscription")
    public Object sourceSubscription;
    public QuerySubscriptionsById200ApplicationJSON withSourceSubscription(Object sourceSubscription) {
        this.sourceSubscription = sourceSubscription;
        return this;
    }
    @JsonProperty("state")
    public QuerySubscriptionsById200ApplicationJSONStateEnum state;
    public QuerySubscriptionsById200ApplicationJSON withState(QuerySubscriptionsById200ApplicationJSONStateEnum state) {
        this.state = state;
        return this;
    }
    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonProperty("state_last_updated_utc")
    public OffsetDateTime stateLastUpdatedUtc;
    public QuerySubscriptionsById200ApplicationJSON withStateLastUpdatedUtc(OffsetDateTime stateLastUpdatedUtc) {
        this.stateLastUpdatedUtc = stateLastUpdatedUtc;
        return this;
    }
    @JsonInclude(Include.NON_ABSENT)
    @JsonProperty("subscriber_info")
    public Object subscriberInfo;
    public QuerySubscriptionsById200ApplicationJSON withSubscriberInfo(Object subscriberInfo) {
        this.subscriberInfo = subscriberInfo;
        return this;
    }
    @JsonProperty("subscription_name")
    public String subscriptionName;
    public QuerySubscriptionsById200ApplicationJSON withSubscriptionName(String subscriptionName) {
        this.subscriptionName = subscriptionName;
        return this;
    }
    @JsonProperty("tenant_id")
    public String tenantId;
    public QuerySubscriptionsById200ApplicationJSON withTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }
    @JsonProperty("tenant_name")
    public String tenantName;
    public QuerySubscriptionsById200ApplicationJSON withTenantName(String tenantName) {
        this.tenantName = tenantName;
        return this;
    }
    @JsonProperty("total_seats")
    public Long totalSeats;
    public QuerySubscriptionsById200ApplicationJSON withTotalSeats(Long totalSeats) {
        this.totalSeats = totalSeats;
        return this;
    }
    @JsonProperty("user_role_name")
    public String userRoleName;
    public QuerySubscriptionsById200ApplicationJSON withUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
        return this;
    }
}
