import { openApiBuilder, apiKeyAuthScheme } from "@zodios/openapi";
import type { OpenAPIV3 } from "openapi-types";
import { seatsApi } from "./seats";
import { subscriptionApi } from "./subscriptions";
import { productApi } from "./products";

const securityScheme = apiKeyAuthScheme({ name: "x-api-key", in: "header" });

export const api: OpenAPIV3.Document<{}> = openApiBuilder({
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
  .addSecurityScheme("api_key", securityScheme)
  .addProtectedApi("api_key", productApi)
  .addProtectedApi("api_key", seatsApi)
  .addProtectedApi("api_key", subscriptionApi)
  .build();
