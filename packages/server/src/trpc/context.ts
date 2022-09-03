// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { Connection } from "@planetscale/database";

export type CreateContextOptions = {
  db: Connection;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    db: opts.db,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = (ctxOpts: CreateContextOptions) => {
  return async (_opts: CreateNextContextOptions) => {
    return await createContextInner(ctxOpts);
  };
};

export type Context = inferAsyncReturnType<typeof createContextInner>;
