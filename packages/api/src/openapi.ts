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

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Bouncer API",
  version: "1.0.0",
  description: "SaaS seat management API",
  baseUrl: "http://localhost:3000",
  docsUrl: "https://bouncer.mintlify.com",
});
