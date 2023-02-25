import {
  generateOpenApiDocument,
  createOpenApiNextHandler as createOpenApiNextHandlerOG,
} from "trpc-openapi";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

export const createOpenApiNextHandler = () =>
  createOpenApiNextHandlerOG({
    router: appRouter,
    createContext: createTRPCContext,
  });

// https://github.com/jlalmes/trpc-openapi/issues/239
const doc = generateOpenApiDocument(appRouter, {
  title: "Bouncer API",
  version: "1.0.0",
  description: "SaaS seat management API",
  baseUrl: "http://localhost:3000",
  docsUrl: "https://bouncer.mintlify.com",
});

// Remove bearer auth from the openapi document
delete doc.components?.securitySchemes?.Authorization;

// Insert API key auth into the openapi document
doc.components!.securitySchemes!.api_key = {
  type: "apiKey",
  name: "X-API-KEY",
  in: "header",
};

doc.components!.securitySchemes!.speakeasy_api_key = {
  type: "oauth2",
  flows: {
    implicit: {
      authorizationUrl: "",
      scopes: {},
      // TODO speakeasy security scheme extension
      // "x-google-issuer": `https://app.speakeasyapi.dev/v1/auth/oauth/${speakeasyWorkspaceId}`,
      // "x-google-jwks_uri": `https://app.speakeasyapi.dev/v1/auth/oauth/${speakeasyWorkspaceId}/.well-known/jwks.json`,
      // "x-google-audiences": "dot-industries",
    },
  },
};

export const openApiDocument = doc;
