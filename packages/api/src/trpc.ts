import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
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
import speakeasy, {
  MiddlewareController,
} from "@speakeasy-api/speakeasy-typescript-sdk";

import { getServerSession } from "@dotinc/bouncer-auth/src/server";
import type { Session, User } from "@dotinc/bouncer-auth";
import { svix } from "@dotinc/bouncer-events";
import { prisma } from "@dotinc/bouncer-db";
import { getLogger } from "@dotinc/bouncer-core";

// Configure the global speakeasy SDK instance
if (env.SPEAKEASY_API_KEY) {
  speakeasy.configure({
    apiKey: env.SPEAKEASY_API_KEY, // retrieve from Speakeasy API dashboard.
    apiID: env.SPEAKEASY_API_ID ?? "development", // enter a name that you'd like to associate captured requests with.
    // This name will show up in the Speakeasy dashboard. e.g. "PetStore" might be a good ApiID for a Pet Store's API.
    // No spaces allowed.
    versionID: env.SPEAKEASY_APP_VERSION_ID ?? "development", // enter a version that you would like to associate captured requests with.
    // The combination of ApiID (name) and VersionID will uniquely identify your requests in the Speakeasy Dashboard.
    // e.g. "v1.0.0". You can have multiple versions for the same ApiID (if running multiple versions of your API)
    port: 3000, // The port number your express app is listening on (required to build full URLs on non-standard ports)
  });
}

const logger = getLogger("trpc");

type ApiAuthUser = User & { productId?: string };

type CreateContextOptions = {
  session: Session | null;
  auth: string | ApiAuthUser | null;
  req: NextApiRequest & { controller?: MiddlewareController };
  res: NextApiResponse;
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
    ...opts,
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

  let auth: string | ApiAuthUser | null;
  // check if we hav a request with an api key
  const apiKeyHeader = req.headers["x-api-key"];

  if (apiKeyHeader && typeof apiKeyHeader === "string") {
    auth = apiKeyHeader;
  }
  // check if we have a direct user from the web ui instead
  else {
    auth = session?.user ?? null;
  }

  return createInnerTRPCContext({
    session,
    auth,
    req,
    res,
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
import { validateEmailWithACL } from "./utils";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

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

const speakeasyMiddleware = t.middleware(({ ctx, next }) => {
  if (env.SPEAKEASY_API_KEY) {
    const handler = speakeasy.expressMiddleware();
    handler(ctx.req as any, ctx.res as any, next);
  } else {
    logger.warn(
      { key: env.SPEAKEASY_API_KEY, id: env.SPEAKEASY_API_ID },
      "Speakeasy config not ready, controller is not set up"
    );
  }
  return next();
});

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

// https://mojoauth.com/blog/jwt-validation-with-jwks-nodejs/
const speakeasyClaimsByApiKey = async (apiKey: string) => {
  if (!env.SPEAKEASY_WORKSPACE_ID) {
    logger.error("SPEAKEASY_WORKSPACE_ID is not set and cannot accept api key");
    return null;
  }

  // process jwt token
  const decodedToken = jwt.decode(apiKey, { complete: true });
  if (!decodedToken) {
    logger.error({ apiKey }, "Failed to decode jwt");
    return null;
  }
  const kid = decodedToken.header.kid;
  logger.debug({ jwtHeader: decodedToken.header }, "Decoded jwt headers");

  const issuer = `https://app.speakeasyapi.dev/v1/auth/oauth/${env.SPEAKEASY_WORKSPACE_ID}`;
  const audience = env.SPEAKEASY_WORKSPACE_ID;

  const client = jwksClient({
    jwksUri: `https://app.speakeasyapi.dev/v1/auth/oauth/${env.SPEAKEASY_WORKSPACE_ID}/.well-known/jwks.json`,
    requestHeaders: {}, // Optional
    cache: true,
    cacheMaxAge: 300000, // cache for 5 min -- vercel will throw away the function anyhow
    timeout: 30000, // Defaults to 30s
  });

  const signingKey = await client.getSigningKey(kid);
  const publicKey = signingKey.getPublicKey();

  const decoded = jwt.verify(apiKey, publicKey, {
    issuer,
    audience,
  });

  if (typeof decoded === "string") {
    logger.error({ decoded }, "We failed to properly decode the claim");
    return null;
  }

  logger.debug(
    { productId: decoded.productId, userId: decoded.userId },
    "We decoded the api key successfully"
  );

  return {
    productId: decoded.productId as string,
    userId: decoded.userId as string,
  };
};

/**
 * An array of the root API_KEY list, the root api keys resolve to the first user of the validateEmailWithACL list
 */
const apiKeys = env.API_KEYS.split(",");

const userByApiKey = async (apiKey: string) => {
  const isRootApiKey = apiKeys.includes(apiKey);

  if (isRootApiKey) {
    const emails = env.AUTH_ACL.split(",");
    if (emails.length < 1) {
      logger.error(
        { acl: env.AUTH_ACL },
        "AUTH_ACL is not configured properly"
      );
      return null;
    }

    return prisma.user.findFirst({
      where: {
        email: emails[0],
      },
    });
  }

  const speakeasyUserData = await speakeasyClaimsByApiKey(apiKey);

  if (speakeasyUserData) {
    const user = await prisma.user.findFirst({
      where: {
        id: speakeasyUserData.userId,
      },
    });
    if (!user) {
      logger.error(
        { speakeasyUserData },
        "The user from the valid jwt is not a user of the system."
      );
      return null;
    }
    return {
      productId: speakeasyUserData.productId,
      ...user,
    };
  }

  logger.error(
    { apiKey },
    "request x-api-key is not a valid root key and not a speakeasy api key"
  );
  return null;
};

/**
 * Reusable middleware that enforces a valid API_KEY is present or that
 * the current user is authorized
 */
export const enforceApiKeyOrACL = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth) {
    logger.error(
      "UNAUTHORIZED: Session is not available and x-api-key is not defined"
    );
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  let auth: ApiAuthUser;

  if (typeof ctx.auth === "string") {
    logger.info({ token: ctx.auth }, "Verifying x-api-key");
    // speakeasy API Key is a JWT token
    // jwks: input token to library to verify signature of jwt via uri of speakeasy
    // decode JWT
    // look up custom claims
    //    product_id
    //    user_id

    // only run db query if the key is whitelisted
    const apiKeyUser = await userByApiKey(ctx.auth);
    if (!apiKeyUser) {
      logger.error(
        { apiKey: ctx.auth },
        "FORBIDDEN: x-api-key is not bound to user"
      );
      // api key is not bound to user
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    auth = apiKeyUser; // pass the valid user
  } else {
    // coming from a session, a user is already present
    // check if the user is a valid admin
    if (!ctx.auth.email || !validateEmailWithACL(ctx.auth.email)) {
      logger.error(
        { email: ctx.auth.email },
        "FORBIDDEN: current user e-mail is not set or not whitelisted"
      );
      // user is not whitelisted
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    auth = ctx.auth; // pass the valid user
  }

  return next({
    ctx: {
      auth /* auth as non-nullable user */,
    },
  });
});

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies that either a session is valid and guarantees ctx.auth is not
 * null and set to a user.
 *
 * Checks against the whitelisting of the server config (API_KEYS and AUTH_ACL)
 * An API_KEY is always tied to a user
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(speakeasyMiddleware) // --> load trace headers
  // .use(enforceUserIsAuthed) --> session is indirectly checked via ACL
  .use(enforceApiKeyOrACL);
