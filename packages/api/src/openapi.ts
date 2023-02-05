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

// TODO .addSecurityScheme(
//   "speakeasy_api_key",
//   oauth2Scheme({
//     implicit: {
//       authorizationUrl: "",
//       scopes: {},
//       // until action is taken https://github.com/ecyrbe/zodios-openapi/issues/96
//       // @ts-ignore
//       "x-google-issuer": `https://app.speakeasyapi.dev/v1/auth/oauth/${speakeasyWorkspaceId}`,
//       "x-google-jwks_uri": `https://app.speakeasyapi.dev/v1/auth/oauth/${speakeasyWorkspaceId}/.well-known/jwks.json`,
//       "x-google-audiences": "dot-industries",
//     },
//   })
// )
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Bouncer API",
  version: "1.0.0",
  description: "SaaS seat management API",
  baseUrl: "http://localhost:3000",
  docsUrl: "https://bouncer.mintlify.com",
});
