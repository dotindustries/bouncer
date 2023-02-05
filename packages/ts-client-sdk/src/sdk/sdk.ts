import * as utils from "../internal/utils";
import * as operations from "./models/operations";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ParamsSerializerOptions } from "axios";

export const ServerList = [
	"https://bouncer.dot.industries/api/v1",
] as const;



export type SDKProps = {
  defaultClient?: AxiosInstance;

  serverUrl?: string;
}

/* SDK Documentation: https://bouncer.mintlify.com*/
export class SDK {

  public _defaultClient: AxiosInstance;
  public _securityClient: AxiosInstance;
  public _serverURL: string;
  private _language = "typescript";
  private _sdkVersion = "0.0.1";
  private _genVersion = "1.0.0";

  constructor(props: SDKProps) {
    this._serverURL = props.serverUrl ?? ServerList[0];

    this._defaultClient = props.defaultClient ?? axios.create({ baseURL: this._serverURL });
    this._securityClient = this._defaultClient;
  }
  
  mutationProductsCreate(
    req: operations.MutationProductsCreateRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationProductsCreateResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationProductsCreateRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = baseURL.replace(/\/$/, "") + "/products";

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "post",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationProductsCreateResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationProductsCreate200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationProductsCreateDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationProductsUpdate(
    req: operations.MutationProductsUpdateRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationProductsUpdateResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationProductsUpdateRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/products/{productId}/config", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "put",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationProductsUpdateResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationProductsUpdate200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationProductsUpdateDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSeatsRedeemSeat(
    req: operations.MutationSeatsRedeemSeatRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSeatsRedeemSeatResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSeatsRedeemSeatRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats/{seatId}/redeem", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "post",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSeatsRedeemSeatResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsRedeemSeat200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsRedeemSeatDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSeatsReleaseSeat(
    req: operations.MutationSeatsReleaseSeatRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSeatsReleaseSeatResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSeatsReleaseSeatRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats/{seatId}", req.pathParams);
    
    const client: AxiosInstance = this._defaultClient!;
    
    const r = client.request({
      url: url,
      method: "delete",
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSeatsReleaseSeatResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsReleaseSeat200ApplicationJSONAny = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsReleaseSeatDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSeatsRequestSeat(
    req: operations.MutationSeatsRequestSeatRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSeatsRequestSeatResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSeatsRequestSeatRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats/{seatId}/request", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "post",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSeatsRequestSeatResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsRequestSeat200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsRequestSeatDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSeatsReserveSeat(
    req: operations.MutationSeatsReserveSeatRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSeatsReserveSeatResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSeatsReserveSeatRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats/{seatId}/reserve", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "post",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSeatsReserveSeatResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsReserveSeat200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsReserveSeatDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSeatsUpdateuOccupant(
    req: operations.MutationSeatsUpdateuOccupantRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSeatsUpdateuOccupantResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSeatsUpdateuOccupantRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats/{seatId}", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "patch",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSeatsUpdateuOccupantResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsUpdateuOccupant200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSeatsUpdateuOccupantDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSubscriptionsCreateSubscription(
    req: operations.MutationSubscriptionsCreateSubscriptionRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSubscriptionsCreateSubscriptionResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSubscriptionsCreateSubscriptionRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{productId}/{subscriptionId}", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "post",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSubscriptionsCreateSubscriptionResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSubscriptionsCreateSubscription200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSubscriptionsCreateSubscriptionDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  mutationSubscriptionsUpdateSubscription(
    req: operations.MutationSubscriptionsUpdateSubscriptionRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.MutationSubscriptionsUpdateSubscriptionResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.MutationSubscriptionsUpdateSubscriptionRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{productId}/{subscriptionId}", req.pathParams);

    let [reqBodyHeaders, reqBody]: [object, any] = [{}, {}];

    try {
      [reqBodyHeaders, reqBody] = utils.serializeRequestBody(req);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error serializing request body, cause: ${e.message}`);
      }
    }
    
    const client: AxiosInstance = this._defaultClient!;
    const headers = {...reqBodyHeaders, ...config?.headers};
    if (reqBody == null || Object.keys(reqBody).length === 0) throw new Error("request body is required");
    
    const r = client.request({
      url: url,
      method: "patch",
      headers: headers,
      data: reqBody, 
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.MutationSubscriptionsUpdateSubscriptionResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSubscriptionsUpdateSubscription200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.mutationSubscriptionsUpdateSubscriptionDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  queryProductsAll(
    config?: AxiosRequestConfig
  ): Promise<operations.QueryProductsAllResponse> {
    const baseURL: string = this._serverURL;
    const url: string = baseURL.replace(/\/$/, "") + "/products";
    
    const client: AxiosInstance = this._defaultClient!;
    
    const r = client.request({
      url: url,
      method: "get",
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QueryProductsAllResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.queryProductsAll200ApplicationJSONObjects = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.queryProductsAllDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  queryProductsById(
    req: operations.QueryProductsByIdRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.QueryProductsByIdResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.QueryProductsByIdRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/products/{productId}/config", req.pathParams);
    
    const client: AxiosInstance = this._defaultClient!;
    
    const r = client.request({
      url: url,
      method: "get",
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QueryProductsByIdResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.queryProductsById200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.queryProductsByIdDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  querySeatsById(
    req: operations.QuerySeatsByIdRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.QuerySeatsByIdResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.QuerySeatsByIdRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats/{seatId}", req.pathParams);
    
    const client: AxiosInstance = this._defaultClient!;
    
    const r = client.request({
      url: url,
      method: "get",
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QuerySeatsByIdResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySeatsById200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySeatsByIdDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  querySeatsBySubscription(
    req: operations.QuerySeatsBySubscriptionRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.QuerySeatsBySubscriptionResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.QuerySeatsBySubscriptionRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/seats", req.pathParams);
    
    const client: AxiosInstance = this._defaultClient!;
    const qpSerializer: ParamsSerializerOptions = utils.getQueryParamSerializer(req.queryParams);

    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: req.queryParams,
      paramsSerializer: qpSerializer,
    };
    
    
    const r = client.request({
      url: url,
      method: "get",
      ...requestConfig,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QuerySeatsBySubscriptionResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySeatsBySubscription200ApplicationJSONObjects = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySeatsBySubscriptionDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  querySeatsUserSeat(
    req: operations.QuerySeatsUserSeatRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.QuerySeatsUserSeatResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.QuerySeatsUserSeatRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}/user-seat/{tenantId}/{userId}", req.pathParams);
    
    const client: AxiosInstance = this._defaultClient!;
    
    const r = client.request({
      url: url,
      method: "get",
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QuerySeatsUserSeatResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySeatsUserSeat200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySeatsUserSeatDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  querySubscriptionsAll(
    req: operations.QuerySubscriptionsAllRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.QuerySubscriptionsAllResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.QuerySubscriptionsAllRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = baseURL.replace(/\/$/, "") + "/subscriptions";
    
    const client: AxiosInstance = this._defaultClient!;
    const qpSerializer: ParamsSerializerOptions = utils.getQueryParamSerializer(req.queryParams);

    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: req.queryParams,
      paramsSerializer: qpSerializer,
    };
    
    
    const r = client.request({
      url: url,
      method: "get",
      ...requestConfig,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QuerySubscriptionsAllResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySubscriptionsAll200ApplicationJSONObjects = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySubscriptionsAllDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

  querySubscriptionsById(
    req: operations.QuerySubscriptionsByIdRequest,
    config?: AxiosRequestConfig
  ): Promise<operations.QuerySubscriptionsByIdResponse> {
    if (!(req instanceof utils.SpeakeasyBase)) {
      req = new operations.QuerySubscriptionsByIdRequest(req);
    }
    
    const baseURL: string = this._serverURL;
    const url: string = utils.generateURL(baseURL, "/subscriptions/{subscriptionId}", req.pathParams);
    
    const client: AxiosInstance = this._defaultClient!;
    
    const r = client.request({
      url: url,
      method: "get",
      ...config,
    });
    
    return r.then((httpRes: AxiosResponse) => {
        const contentType: string = httpRes?.headers?.["content-type"] ?? "";

        if (httpRes?.status == null) throw new Error(`status code not found in response: ${httpRes}`);
        const res: operations.QuerySubscriptionsByIdResponse = {statusCode: httpRes.status, contentType: contentType};
        switch (true) {
          case httpRes?.status == 200:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySubscriptionsById200ApplicationJSONObject = httpRes?.data;
            }
            break;
          default:
            if (utils.matchContentType(contentType, `application/json`)) {
                res.querySubscriptionsByIdDefaultApplicationJSONObject = httpRes?.data;
            }
            break;
        }

        return res;
      })
  }

}