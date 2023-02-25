package industries.dot.bouncer;

import com.fasterxml.jackson.databind.ObjectMapper;
import industries.dot.bouncer.utils.HTTPClient;
import industries.dot.bouncer.utils.HTTPRequest;
import industries.dot.bouncer.utils.SerializedBody;
import industries.dot.bouncer.utils.SpeakeasyHTTPClient;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import org.apache.http.NameValuePair;

/** SDK Documentation: https://bouncer.mintlify.com**/
public class SDK {
	public static final String[] SERVERS = {
		"https://bouncer.dot.industries/api/v1",
	};
  		

	private HTTPClient _defaultClient;
	private HTTPClient _securityClient;
	
	private String _serverUrl;
	private String _language = "java";
	private String _sdkVersion = "0.1.0";
	private String _genVersion = "1.0.0";

	public static class Builder {
		private HTTPClient client;
		
		private String serverUrl;
		private java.util.Map<String, String> params = new java.util.HashMap<String, String>();

		private Builder() {
		}

		public Builder setClient(HTTPClient client) {
			this.client = client;
			return this;
		}
		
		public Builder setServerURL(String serverUrl) {
			this.serverUrl = serverUrl;
			return this;
		}
		
		public Builder setServerURL(String serverUrl, java.util.Map<String, String> params) {
			this.serverUrl = serverUrl;
			this.params = params;
			return this;
		}
		
		public SDK build() throws Exception {
			return new SDK(this.client, this.serverUrl, this.params);
		}
	}

	public static Builder builder() {
		return new Builder();
	}

	private SDK(HTTPClient client, String serverUrl, java.util.Map<String, String> params) throws Exception {
		this._defaultClient = client;
		
		if (this._defaultClient == null) {
			this._defaultClient = new SpeakeasyHTTPClient();
		}
		
		if (this._securityClient == null) {
			this._securityClient = this._defaultClient;
		}

		if (serverUrl != null && !serverUrl.isBlank()) {
			this._serverUrl = industries.dot.bouncer.utils.Utils.replaceParameters(serverUrl, params);
		}
		
		if (this._serverUrl == null) {
			this._serverUrl = SERVERS[0];
		}
	}
    
    public industries.dot.bouncer.models.operations.MutationProductsCreateResponse mutationProductsCreate(industries.dot.bouncer.models.operations.MutationProductsCreateRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/products");
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("POST");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationProductsCreateResponse res = new industries.dot.bouncer.models.operations.MutationProductsCreateResponse() {{
            mutationProductsCreate200ApplicationJSONObject = null;
            mutationProductsCreateDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationProductsCreate200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationProductsCreate200ApplicationJSON.class);
                res.mutationProductsCreate200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationProductsCreateDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationProductsCreateDefaultApplicationJSON.class);
                res.mutationProductsCreateDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationProductsUpdateResponse mutationProductsUpdate(industries.dot.bouncer.models.operations.MutationProductsUpdateRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/products/{productId}/config", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("PUT");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationProductsUpdateResponse res = new industries.dot.bouncer.models.operations.MutationProductsUpdateResponse() {{
            mutationProductsUpdate200ApplicationJSONObject = null;
            mutationProductsUpdateDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationProductsUpdate200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationProductsUpdate200ApplicationJSON.class);
                res.mutationProductsUpdate200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationProductsUpdateDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationProductsUpdateDefaultApplicationJSON.class);
                res.mutationProductsUpdateDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSeatsRedeemSeatResponse mutationSeatsRedeemSeat(industries.dot.bouncer.models.operations.MutationSeatsRedeemSeatRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats/{seatId}/redeem", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("POST");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSeatsRedeemSeatResponse res = new industries.dot.bouncer.models.operations.MutationSeatsRedeemSeatResponse() {{
            mutationSeatsRedeemSeat200ApplicationJSONObject = null;
            mutationSeatsRedeemSeatDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsRedeemSeat200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsRedeemSeat200ApplicationJSON.class);
                res.mutationSeatsRedeemSeat200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsRedeemSeatDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsRedeemSeatDefaultApplicationJSON.class);
                res.mutationSeatsRedeemSeatDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSeatsReleaseSeatResponse mutationSeatsReleaseSeat(industries.dot.bouncer.models.operations.MutationSeatsReleaseSeatRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats/{seatId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("DELETE");
        req.setURL(url);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSeatsReleaseSeatResponse res = new industries.dot.bouncer.models.operations.MutationSeatsReleaseSeatResponse() {{
            mutationSeatsReleaseSeat200ApplicationJSONAny = null;
            mutationSeatsReleaseSeatDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                Object out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), Object.class);
                res.mutationSeatsReleaseSeat200ApplicationJSONAny = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsReleaseSeatDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsReleaseSeatDefaultApplicationJSON.class);
                res.mutationSeatsReleaseSeatDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSeatsRequestSeatResponse mutationSeatsRequestSeat(industries.dot.bouncer.models.operations.MutationSeatsRequestSeatRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats/{seatId}/request", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("POST");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSeatsRequestSeatResponse res = new industries.dot.bouncer.models.operations.MutationSeatsRequestSeatResponse() {{
            mutationSeatsRequestSeat200ApplicationJSONObject = null;
            mutationSeatsRequestSeatDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsRequestSeat200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsRequestSeat200ApplicationJSON.class);
                res.mutationSeatsRequestSeat200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsRequestSeatDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsRequestSeatDefaultApplicationJSON.class);
                res.mutationSeatsRequestSeatDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSeatsReserveSeatResponse mutationSeatsReserveSeat(industries.dot.bouncer.models.operations.MutationSeatsReserveSeatRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats/{seatId}/reserve", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("POST");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSeatsReserveSeatResponse res = new industries.dot.bouncer.models.operations.MutationSeatsReserveSeatResponse() {{
            mutationSeatsReserveSeat200ApplicationJSONObject = null;
            mutationSeatsReserveSeatDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsReserveSeat200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsReserveSeat200ApplicationJSON.class);
                res.mutationSeatsReserveSeat200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsReserveSeatDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsReserveSeatDefaultApplicationJSON.class);
                res.mutationSeatsReserveSeatDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupantResponse mutationSeatsUpdateuOccupant(industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupantRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats/{seatId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("PATCH");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupantResponse res = new industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupantResponse() {{
            mutationSeatsUpdateuOccupant200ApplicationJSONObject = null;
            mutationSeatsUpdateuOccupantDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupant200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupant200ApplicationJSON.class);
                res.mutationSeatsUpdateuOccupant200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupantDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSeatsUpdateuOccupantDefaultApplicationJSON.class);
                res.mutationSeatsUpdateuOccupantDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscriptionResponse mutationSubscriptionsCreateSubscription(industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscriptionRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{productId}/{subscriptionId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("POST");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscriptionResponse res = new industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscriptionResponse() {{
            mutationSubscriptionsCreateSubscription200ApplicationJSONObject = null;
            mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscription200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscription200ApplicationJSON.class);
                res.mutationSubscriptionsCreateSubscription200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON.class);
                res.mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscriptionResponse mutationSubscriptionsUpdateSubscription(industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscriptionRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{productId}/{subscriptionId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("PATCH");
        req.setURL(url);
        SerializedBody serializedRequestBody = industries.dot.bouncer.utils.Utils.serializeRequestBody(request);
        if (serializedRequestBody == null) {
            throw new Exception("Request body is required");
        }
        req.setBody(serializedRequestBody);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscriptionResponse res = new industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscriptionResponse() {{
            mutationSubscriptionsUpdateSubscription200ApplicationJSONObject = null;
            mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscription200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscription200ApplicationJSON.class);
                res.mutationSubscriptionsUpdateSubscription200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON.class);
                res.mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QueryProductsAllResponse queryProductsAll() throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/products");
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QueryProductsAllResponse res = new industries.dot.bouncer.models.operations.QueryProductsAllResponse() {{
            queryProductsAll200ApplicationJSONObjects = null;
            queryProductsAllDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QueryProductsAll200ApplicationJSON[] out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QueryProductsAll200ApplicationJSON[].class);
                res.queryProductsAll200ApplicationJSONObjects = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QueryProductsAllDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QueryProductsAllDefaultApplicationJSON.class);
                res.queryProductsAllDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QueryProductsByIdResponse queryProductsById(industries.dot.bouncer.models.operations.QueryProductsByIdRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/products/{productId}/config", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QueryProductsByIdResponse res = new industries.dot.bouncer.models.operations.QueryProductsByIdResponse() {{
            queryProductsById200ApplicationJSONObject = null;
            queryProductsByIdDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QueryProductsById200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QueryProductsById200ApplicationJSON.class);
                res.queryProductsById200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QueryProductsByIdDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QueryProductsByIdDefaultApplicationJSON.class);
                res.queryProductsByIdDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QuerySeatsByIdResponse querySeatsById(industries.dot.bouncer.models.operations.QuerySeatsByIdRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats/{seatId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QuerySeatsByIdResponse res = new industries.dot.bouncer.models.operations.QuerySeatsByIdResponse() {{
            querySeatsById200ApplicationJSONObject = null;
            querySeatsByIdDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySeatsById200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySeatsById200ApplicationJSON.class);
                res.querySeatsById200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySeatsByIdDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySeatsByIdDefaultApplicationJSON.class);
                res.querySeatsByIdDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QuerySeatsBySubscriptionResponse querySeatsBySubscription(industries.dot.bouncer.models.operations.QuerySeatsBySubscriptionRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/seats", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        java.util.List<NameValuePair> queryParams = industries.dot.bouncer.utils.Utils.getQueryParams(request.queryParams);
        if (queryParams != null) {
            for (NameValuePair queryParam : queryParams) {
                req.addQueryParam(queryParam);
            }
        }
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QuerySeatsBySubscriptionResponse res = new industries.dot.bouncer.models.operations.QuerySeatsBySubscriptionResponse() {{
            querySeatsBySubscription200ApplicationJSONObjects = null;
            querySeatsBySubscriptionDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySeatsBySubscription200ApplicationJSON[] out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySeatsBySubscription200ApplicationJSON[].class);
                res.querySeatsBySubscription200ApplicationJSONObjects = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySeatsBySubscriptionDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySeatsBySubscriptionDefaultApplicationJSON.class);
                res.querySeatsBySubscriptionDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QuerySeatsUserSeatResponse querySeatsUserSeat(industries.dot.bouncer.models.operations.QuerySeatsUserSeatRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}/user-seat/{tenantId}/{userId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QuerySeatsUserSeatResponse res = new industries.dot.bouncer.models.operations.QuerySeatsUserSeatResponse() {{
            querySeatsUserSeat200ApplicationJSONObject = null;
            querySeatsUserSeatDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySeatsUserSeat200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySeatsUserSeat200ApplicationJSON.class);
                res.querySeatsUserSeat200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySeatsUserSeatDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySeatsUserSeatDefaultApplicationJSON.class);
                res.querySeatsUserSeatDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QuerySubscriptionsAllResponse querySubscriptionsAll(industries.dot.bouncer.models.operations.QuerySubscriptionsAllRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions");
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        java.util.List<NameValuePair> queryParams = industries.dot.bouncer.utils.Utils.getQueryParams(request.queryParams);
        if (queryParams != null) {
            for (NameValuePair queryParam : queryParams) {
                req.addQueryParam(queryParam);
            }
        }
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QuerySubscriptionsAllResponse res = new industries.dot.bouncer.models.operations.QuerySubscriptionsAllResponse() {{
            querySubscriptionsAll200ApplicationJSONObjects = null;
            querySubscriptionsAllDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySubscriptionsAll200ApplicationJSON[] out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySubscriptionsAll200ApplicationJSON[].class);
                res.querySubscriptionsAll200ApplicationJSONObjects = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySubscriptionsAllDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySubscriptionsAllDefaultApplicationJSON.class);
                res.querySubscriptionsAllDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
    
    public industries.dot.bouncer.models.operations.QuerySubscriptionsByIdResponse querySubscriptionsById(industries.dot.bouncer.models.operations.QuerySubscriptionsByIdRequest request) throws Exception {
        String baseUrl = this._serverUrl;
        String url = industries.dot.bouncer.utils.Utils.generateURL(baseUrl, "/subscriptions/{subscriptionId}", request.pathParams);
        
        HTTPRequest req = new HTTPRequest();
        req.setMethod("GET");
        req.setURL(url);
        
        
        HTTPClient client = this._defaultClient;
        HttpResponse<byte[]> httpRes = client.send(req);

        String contentType = httpRes.headers().allValues("Content-Type").get(0);

        industries.dot.bouncer.models.operations.QuerySubscriptionsByIdResponse res = new industries.dot.bouncer.models.operations.QuerySubscriptionsByIdResponse() {{
            querySubscriptionsById200ApplicationJSONObject = null;
            querySubscriptionsByIdDefaultApplicationJSONObject = null;
        }};
        res.statusCode = Long.valueOf(httpRes.statusCode());
        res.contentType = contentType;
        
        if (httpRes.statusCode() == 200) {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySubscriptionsById200ApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySubscriptionsById200ApplicationJSON.class);
                res.querySubscriptionsById200ApplicationJSONObject = out;
            }
        }
        else {
            if (industries.dot.bouncer.utils.Utils.matchContentType(contentType, "application/json")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.findAndRegisterModules();
                industries.dot.bouncer.models.operations.QuerySubscriptionsByIdDefaultApplicationJSON out = mapper.readValue(new String(httpRes.body(), StandardCharsets.UTF_8), industries.dot.bouncer.models.operations.QuerySubscriptionsByIdDefaultApplicationJSON.class);
                res.querySubscriptionsByIdDefaultApplicationJSONObject = out;
            }
        }

        return res;
    }
}