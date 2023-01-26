import {
  openApiBuilder,
  apiKeyAuthScheme,
  oauth2Scheme,
} from "@zodios/openapi";
import type { OpenAPIV3 } from "openapi-types";
import { seatsApi } from "./seats";
import { subscriptionApi } from "./subscriptions";
import { productApi } from "./products";

const securityScheme = apiKeyAuthScheme({ name: "x-api-key", in: "header" });

export const api: (seapeasyWorkspaceId: string) => OpenAPIV3.Document<{}> = (
  speakeasyWorkspaceId
) =>
  openApiBuilder({
    title: "Bouncer API",
    version: "1.0.0",
    description: "SaaS seat management API",
  })
    .addServer({
      url: "https://bouncer.dot.industries/api/v1",
      description: "Production",
    })
    .addServer({
      url: "/api/v1",
      description: "Localhost",
    })
    .addSecurityScheme(
      "speakeasy_api_key",
      oauth2Scheme({
        implicit: {
          authorizationUrl: "",
          scopes: {},
          // until action is taken https://github.com/ecyrbe/zodios-openapi/issues/96
          // @ts-ignore
          "x-google-issuer": `https://app.speakeasyapi.dev/v1/auth/oauth/${speakeasyWorkspaceId}`,
          "x-google-jwks_uri": `https://app.speakeasyapi.dev/v1/auth/oauth/${speakeasyWorkspaceId}/.well-known/jwks.json`,
          "x-google-audiences": "dot-industries",
        },
      })
    )
    .addSecurityScheme("api_key", securityScheme)
    .addProtectedApi("api_key", productApi)
    .addProtectedApi("api_key", seatsApi)
    .addProtectedApi("api_key", subscriptionApi)
    .build();
