import { Zodios, ZodiosOptions } from '@zodios/core'

import { seatsApi, Reservation, User, user } from '@dotinc/bouncer-core'

import type { InferParams } from './types'

export interface BouncerClientOptions extends ZodiosOptions {
  apiKey: string
  baseUrl?: string
  attr?: User
}

export const createClient = (options: BouncerClientOptions) => {
  const {
    apiKey,
    baseUrl = '/api/v1',
    axiosConfig,
    axiosInstance,
    validate,
    attr,
  } = options

  let _attr = attr && user.parse(attr)

  const zodiosOptions: ZodiosOptions = {
    axiosInstance,
    validate,
    axiosConfig: {
      ...axiosConfig,
      headers: {
        ...axiosConfig?.headers,
        'x-api-key': apiKey,
      },
    },
  }

  const api = new Zodios(baseUrl, seatsApi, zodiosOptions)

  const { redeemSeat, requestSeat, reserveSeat, releaseSeat } = api

  const seats = {
    redeem: async (params: InferParams<typeof redeemSeat>) => {
      const attr = user.parse(_attr)
      return redeemSeat(attr, {
        params,
      })
    },
    request: async (params: InferParams<typeof requestSeat>) => {
      const attr = user.parse(_attr)
      return requestSeat(attr, {
        params,
      })
    },
    reserve: (
      params: InferParams<typeof reserveSeat>,
      reservation: Reservation
    ) => {
      return reserveSeat(reservation, {
        params,
      })
    },
    release: (params: InferParams<typeof releaseSeat>) => {
      return releaseSeat(undefined, {
        params,
      })
    },
  }

  return {
    identify: (attr: User) => {
      _attr = user.parse(attr)
    },
    seats,
  }
}
