__doc__ = """ SDK Documentation: https://bouncer.mintlify.com"""
import requests
from . import utils
from sdk.models import operations
from typing import Optional

SERVERS = [
	"https://bouncer.dot.industries/api/v1",
]


class SDK:
    r"""SDK Documentation: https://bouncer.mintlify.com"""

    _client: requests.Session
    _security_client: requests.Session
    
    _server_url: str = SERVERS[0]
    _language: str = "python"
    _sdk_version: str = "0.1.0"
    _gen_version: str = "1.0.0"

    def __init__(self) -> None:
        self._client = requests.Session()
        self._security_client = requests.Session()
        


    def config_server_url(self, server_url: str, params: dict[str, str]):
        if params is not None:
            self._server_url = utils.replace_parameters(server_url, params)
        else:
            self._server_url = server_url

        
    

    def config_client(self, client: requests.Session):
        self._client = client
        
    
    
    def mutation_products_create(self, request: operations.MutationProductsCreateRequest) -> operations.MutationProductsCreateResponse:
        base_url = self._server_url
        
        url = base_url.removesuffix("/") + "/products"
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("POST", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationProductsCreateResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationProductsCreate200ApplicationJSON])
                res.mutation_products_create_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationProductsCreateDefaultApplicationJSON])
                res.mutation_products_create_default_application_json_object = out

        return res

    def mutation_products_update(self, request: operations.MutationProductsUpdateRequest) -> operations.MutationProductsUpdateResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/products/{productId}/config", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("PUT", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationProductsUpdateResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationProductsUpdate200ApplicationJSON])
                res.mutation_products_update_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationProductsUpdateDefaultApplicationJSON])
                res.mutation_products_update_default_application_json_object = out

        return res

    def mutation_seats_redeem_seat(self, request: operations.MutationSeatsRedeemSeatRequest) -> operations.MutationSeatsRedeemSeatResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats/{seatId}/redeem", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("POST", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSeatsRedeemSeatResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsRedeemSeat200ApplicationJSON])
                res.mutation_seats_redeem_seat_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsRedeemSeatDefaultApplicationJSON])
                res.mutation_seats_redeem_seat_default_application_json_object = out

        return res

    def mutation_seats_release_seat(self, request: operations.MutationSeatsReleaseSeatRequest) -> operations.MutationSeatsReleaseSeatResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats/{seatId}", request.path_params)
        
        
        client = self._client
        
        r = client.request("DELETE", url)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSeatsReleaseSeatResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[Any])
                res.mutation_seats_release_seat_200_application_json_any = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsReleaseSeatDefaultApplicationJSON])
                res.mutation_seats_release_seat_default_application_json_object = out

        return res

    def mutation_seats_request_seat(self, request: operations.MutationSeatsRequestSeatRequest) -> operations.MutationSeatsRequestSeatResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats/{seatId}/request", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("POST", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSeatsRequestSeatResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsRequestSeat200ApplicationJSON])
                res.mutation_seats_request_seat_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsRequestSeatDefaultApplicationJSON])
                res.mutation_seats_request_seat_default_application_json_object = out

        return res

    def mutation_seats_reserve_seat(self, request: operations.MutationSeatsReserveSeatRequest) -> operations.MutationSeatsReserveSeatResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats/{seatId}/reserve", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("POST", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSeatsReserveSeatResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsReserveSeat200ApplicationJSON])
                res.mutation_seats_reserve_seat_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsReserveSeatDefaultApplicationJSON])
                res.mutation_seats_reserve_seat_default_application_json_object = out

        return res

    def mutation_seats_updateu_occupant(self, request: operations.MutationSeatsUpdateuOccupantRequest) -> operations.MutationSeatsUpdateuOccupantResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats/{seatId}", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("PATCH", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSeatsUpdateuOccupantResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsUpdateuOccupant200ApplicationJSON])
                res.mutation_seats_updateu_occupant_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSeatsUpdateuOccupantDefaultApplicationJSON])
                res.mutation_seats_updateu_occupant_default_application_json_object = out

        return res

    def mutation_subscriptions_create_subscription(self, request: operations.MutationSubscriptionsCreateSubscriptionRequest) -> operations.MutationSubscriptionsCreateSubscriptionResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{productId}/{subscriptionId}", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("POST", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSubscriptionsCreateSubscriptionResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSubscriptionsCreateSubscription200ApplicationJSON])
                res.mutation_subscriptions_create_subscription_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSubscriptionsCreateSubscriptionDefaultApplicationJSON])
                res.mutation_subscriptions_create_subscription_default_application_json_object = out

        return res

    def mutation_subscriptions_update_subscription(self, request: operations.MutationSubscriptionsUpdateSubscriptionRequest) -> operations.MutationSubscriptionsUpdateSubscriptionResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{productId}/{subscriptionId}", request.path_params)
        
        headers = {}
        req_content_type, data, json, files = utils.serialize_request_body(request)
        if req_content_type != "multipart/form-data" and req_content_type != "multipart/mixed":
            headers["content-type"] = req_content_type
        if data is None and json is None:
           raise Exception('request body is required')
        
        client = self._client
        
        r = client.request("PATCH", url, data=data, json=json, files=files, headers=headers)
        content_type = r.headers.get("Content-Type")

        res = operations.MutationSubscriptionsUpdateSubscriptionResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSubscriptionsUpdateSubscription200ApplicationJSON])
                res.mutation_subscriptions_update_subscription_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.MutationSubscriptionsUpdateSubscriptionDefaultApplicationJSON])
                res.mutation_subscriptions_update_subscription_default_application_json_object = out

        return res

    def query_products_all(self) -> operations.QueryProductsAllResponse:
        base_url = self._server_url
        
        url = base_url.removesuffix("/") + "/products"
        
        
        client = self._client
        
        r = client.request("GET", url)
        content_type = r.headers.get("Content-Type")

        res = operations.QueryProductsAllResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[list[operations.QueryProductsAll200ApplicationJSON]])
                res.query_products_all_200_application_json_objects = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QueryProductsAllDefaultApplicationJSON])
                res.query_products_all_default_application_json_object = out

        return res

    def query_products_by_id(self, request: operations.QueryProductsByIDRequest) -> operations.QueryProductsByIDResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/products/{productId}/config", request.path_params)
        
        
        client = self._client
        
        r = client.request("GET", url)
        content_type = r.headers.get("Content-Type")

        res = operations.QueryProductsByIDResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QueryProductsByID200ApplicationJSON])
                res.query_products_by_id_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QueryProductsByIDDefaultApplicationJSON])
                res.query_products_by_id_default_application_json_object = out

        return res

    def query_seats_by_id(self, request: operations.QuerySeatsByIDRequest) -> operations.QuerySeatsByIDResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats/{seatId}", request.path_params)
        
        
        client = self._client
        
        r = client.request("GET", url)
        content_type = r.headers.get("Content-Type")

        res = operations.QuerySeatsByIDResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySeatsByID200ApplicationJSON])
                res.query_seats_by_id_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySeatsByIDDefaultApplicationJSON])
                res.query_seats_by_id_default_application_json_object = out

        return res

    def query_seats_by_subscription(self, request: operations.QuerySeatsBySubscriptionRequest) -> operations.QuerySeatsBySubscriptionResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/seats", request.path_params)
        
        query_params = utils.get_query_params(request.query_params)
        
        client = self._client
        
        r = client.request("GET", url, params=query_params)
        content_type = r.headers.get("Content-Type")

        res = operations.QuerySeatsBySubscriptionResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[list[operations.QuerySeatsBySubscription200ApplicationJSON]])
                res.query_seats_by_subscription_200_application_json_objects = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySeatsBySubscriptionDefaultApplicationJSON])
                res.query_seats_by_subscription_default_application_json_object = out

        return res

    def query_seats_user_seat(self, request: operations.QuerySeatsUserSeatRequest) -> operations.QuerySeatsUserSeatResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}/user-seat/{tenantId}/{userId}", request.path_params)
        
        
        client = self._client
        
        r = client.request("GET", url)
        content_type = r.headers.get("Content-Type")

        res = operations.QuerySeatsUserSeatResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySeatsUserSeat200ApplicationJSON])
                res.query_seats_user_seat_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySeatsUserSeatDefaultApplicationJSON])
                res.query_seats_user_seat_default_application_json_object = out

        return res

    def query_subscriptions_all(self, request: operations.QuerySubscriptionsAllRequest) -> operations.QuerySubscriptionsAllResponse:
        base_url = self._server_url
        
        url = base_url.removesuffix("/") + "/subscriptions"
        
        query_params = utils.get_query_params(request.query_params)
        
        client = self._client
        
        r = client.request("GET", url, params=query_params)
        content_type = r.headers.get("Content-Type")

        res = operations.QuerySubscriptionsAllResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[list[operations.QuerySubscriptionsAll200ApplicationJSON]])
                res.query_subscriptions_all_200_application_json_objects = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySubscriptionsAllDefaultApplicationJSON])
                res.query_subscriptions_all_default_application_json_object = out

        return res

    def query_subscriptions_by_id(self, request: operations.QuerySubscriptionsByIDRequest) -> operations.QuerySubscriptionsByIDResponse:
        base_url = self._server_url
        
        url = utils.generate_url(base_url, "/subscriptions/{subscriptionId}", request.path_params)
        
        
        client = self._client
        
        r = client.request("GET", url)
        content_type = r.headers.get("Content-Type")

        res = operations.QuerySubscriptionsByIDResponse(status_code=r.status_code, content_type=content_type)
        
        if r.status_code == 200:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySubscriptionsByID200ApplicationJSON])
                res.query_subscriptions_by_id_200_application_json_object = out
        else:
            if utils.match_content_type(content_type, "application/json"):
                out = utils.unmarshal_json(r.text, Optional[operations.QuerySubscriptionsByIDDefaultApplicationJSON])
                res.query_subscriptions_by_id_default_application_json_object = out

        return res

    