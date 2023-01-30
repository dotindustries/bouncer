/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { getServerSession } from "@dotinc/bouncer-auth/src/server";
import type { Session, User } from "@dotinc/bouncer-auth";
import { svix } from "@dotinc/bouncer-events";
import { prisma } from "@dotinc/bouncer-db";
import micromatch from "micromatch";

type CreateContextOptions = {
  session: Session | null;
  auth: string | User | undefined;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    auth: opts.auth,
    prisma,
    svix,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerSession({ req, res });

  let auth: string | User | undefined;
  // check if we hav a request with an api key
  const apiKeyHeader = req.headers["x-api-key"];

  if (apiKeyHeader && typeof apiKeyHeader === "string") {
    const split = apiKeyHeader.split(" ");
    auth = split[1];
  }
  // check if we have a direct user from the web ui instead
  else {
    auth = session?.user;
  }

  return createInnerTRPCContext({
    session,
    auth,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import superjson from "superjson";
import { env } from "./env.mjs";

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createTRPCContext>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  // if we have no auth set, reject
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      // infers auth as non-nullable
      auth: ctx.auth,
    },
  });
});

/**
 *
 */
const apiKeys = env.API_KEYS.split(",");

const validateEmailWithACL = (email: string) => {
  const authAcl = env.AUTH_ACL || undefined;

  if (!authAcl) {
    return false;
  }

  const acl = authAcl.split(",");

  return micromatch.isMatch(email, acl);
};

/**
 * Reusable middleware that enforces a valid API_KEY is present or that
 * the current user is authorized
 */
export const enforceRootApiKeyOrACL = t.middleware(({ ctx, next }) => {
  if (!ctx.auth) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  if (typeof ctx.auth === "string" && !apiKeys.includes(ctx.auth)) {
    // api key is not valid
    throw new TRPCError({ code: "FORBIDDEN" });
  } else if (typeof ctx.auth !== "string" && ctx.auth?.email) {
    if (!validateEmailWithACL(ctx.auth.email)) {
      // user is not whitelisted
      throw new TRPCError({ code: "FORBIDDEN" });
    }
  } else {
    // user e-mail is not set or  -- should be unreachable
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  // TODO: api key should return a user

  return next({
    ctx: {
      auth: ctx.auth /* 👈 TODO: this should return a auth as non-nullable */,
    },
  });
});

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users and permissions
 * to be checked against the whitelisting of the server config (API_KEYS and AUTH_ACL), use this.
 * It verifies that either a session is valid and guarantees
 */
export const rootAdminProcedure = t.procedure
  .use(enforceUserIsAuthed)
  .use(enforceRootApiKeyOrACL);
