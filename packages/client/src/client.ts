import { Zodios, ZodiosOptions } from "@zodios/core";

import {
  seatsApi,
  Reservation,
  SeatsByIdInput,
  User,
  user,
} from "@dotinc/bouncer-core";

export interface BouncerClientOptions extends ZodiosOptions {
  apiKey: string;
  attr?: User;
}

export const createClient = (options: BouncerClientOptions) => {
  const { apiKey, axiosConfig, axiosInstance, validate, attr } = options;

  let _attr = attr && user.parse(attr);

  const zodiosOptions: ZodiosOptions = {
    axiosInstance,
    validate,
    axiosConfig: {
      ...axiosConfig,
      headers: {
        ...axiosConfig?.headers,
        "x-api-key": apiKey,
      },
    },
  };

  const seatsClientApi = new Zodios("/api/v1", seatsApi, zodiosOptions);

  const seats = {
    redeem: async (params: SeatsByIdInput) => {
      const attr = user.parse(_attr);
      return seatsClientApi.redeemSeat(attr, {
        params,
      });
    },
    request: async (params: SeatsByIdInput) => {
      const attr = user.parse(_attr);
      return seatsClientApi.requestSeat(attr, {
        params,
      });
    },
    reserve: (reservation: Reservation) => {
      return seatsClientApi.reserveSeat(reservation);
    },
    release: (params: SeatsByIdInput) => {
      return seatsClientApi.releaseSeat(undefined, {
        params,
      });
    },
  };

  return {
    identify: (attr: Attr) => {
      _attr = user.parse(attr);
    },
    seats,
  };
};
