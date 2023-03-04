import { User, user } from "@dotinc/bouncer-core";

export interface BouncerClientOptions {
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
  attr?: Record<string, any>;
}

export const createClient = (options: BouncerClientOptions) => {
  const { apiKey, baseUrl = "https://localhost:3000/api/v1", attr } = options;

  const fetchImpl = options.fetch || fetch;

  let _attr = attr && user.parse(attr);

  const request = async (path: string, method = "GET", data: any) => {
    return fetchImpl(`${baseUrl}/${path}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
    });
  };

  const seats = {
    userSeat: async (params: any) => {
      const attr = user.parse(_attr);
      return request("/seats/user", "GET", {
        ...params,
        userId: attr.user_id,
        tenantId: attr.tenant_id,
      });
    },
    redeem: async (params: any) => {
      const attr = user.parse(_attr);
      return request("/seats/redeem", "POST", {
        attr,
        ...params,
      });
    },
    request: async (params: any) => {
      const attr = user.parse(_attr);
      return request("/seats/request", "POST", {
        attr,
        ...params,
      });
    },
    reserve: (params: any, reservation: any) => {
      return request("/seats/reserve", "POST", {
        reservation,
        ...params,
      });
    },
    release: (params: any) => {
      return request("/seats/request", "POST", params);
    },
  };

  const subscriptions = {
    subscriptions: async (params: any) => {
      return request("/subscriptions", "GET", params);
    },
    createSubscription: async (params: any, subscription: any) => {
      return request("/subscriptions", "POST", {
        params,
        subscription,
      });
    },
    updateSubscription: async (params: any, subscription: any) => {
      return request("/subscriptions", "POST", {
        params,
        subscription,
      });
    },
  };

  return {
    identify: (attr: User) => {
      _attr = user.parse(attr);
    },
    seats,
    subscriptions,
  };
};
