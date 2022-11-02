import { z } from "zod";
import { makeApi } from "@zodios/core";
import { noContentResult, error } from "./shared";

export const createApiKey = z.object({
  owner_id: z.string(),
  type: z.enum(["publisher_public", "publisher_private"]),
});

export const apiKey = z.object({
  owner_id: z.string(),
  type: z.enum(["publisher_public", "publisher_private"]),
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
        schema: z.string().max(20),
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
        schema: z.string().max(20),
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
