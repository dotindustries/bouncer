import { z } from "zod";
import { makeApi, ZodiosPlugin } from "@zodios/core";
import { noContentResult, error } from "./shared";

export const createApiKey = z.object({
  owner_id: z.string(),
  type: z.enum(["publisher_public", "publisher_private"]),
});

export const apiKeyType = z.enum([
  "system",
  "publisher_public",
  "publisher_private",
]);
export type ApiKeyType = z.infer<typeof apiKeyType>;

export const apiKeyPrefixes: Record<ApiKeyType, string> = {
  publisher_public: "ppp",
  publisher_private: "ppr",
  system: "sts",
};

export const apiKey = z.object({
  owner_id: z.string(),
  type: apiKeyType,
  key: z.string().length(32),
});

export type ApiKey = z.infer<typeof apiKey>;

export const keysApi = makeApi([
  {
    alias: "createApiKey",
    method: "post",
    path: "keys/:type/:ownerId",
    parameters: [
      {
        name: "type",
        type: "Path",
        schema: apiKeyType,
      },
      {
        name: "ownerId",
        type: "Path",
        schema: z.string().max(30),
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: apiKey,
  },
  {
    alias: "deleteApiKey",
    method: "delete",
    path: "keys/:type/:ownerId",
    parameters: [
      {
        name: "type",
        type: "Path",
        schema: apiKeyType,
      },
      {
        name: "ownerId",
        type: "Path",
        schema: z.string().max(30),
      },
      {
        name: "key",
        type: "Body",
        schema: apiKey,
      },
    ],
    errors: [
      {
        status: "default",
        schema: error,
      },
    ],
    response: noContentResult,
  },
]);

export interface ApiKeyPluginConfig {
  getApiKey: () => Promise<string>;
}

export const pluginApiKey = (provider: ApiKeyPluginConfig): ZodiosPlugin => {
  return {
    request: async (_, config) => {
      return {
        ...config,
        headers: {
          ...config.headers,
          "x-api-key": await provider.getApiKey(),
        },
      };
    },
  };
};
