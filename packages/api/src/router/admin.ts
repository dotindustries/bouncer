import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { add } from "date-fns";
import { zodToJsonSchema } from "zod-to-json-schema";
import { EmbedAccessTokenRequest } from "@speakeasy-api/speakeasy-schemas/registry/embedaccesstoken/embedaccesstoken_pb";
import {
  getLogger,
  lowSeatWarningLevelReachedEvent,
  noSeatAvailableEvent,
  seatProvidedEvent,
  seatRedeemedEvent,
  seatReleasedEvent,
  seatReservedEvent,
} from "@dotinc/bouncer-core";
import { validateEmailWithACL } from "../utils";

const logger = getLogger("trpc");

export const adminRouter = createTRPCRouter({
  setUpEventTypes: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.svix) return;

    // only admins can set up event types
    if (!ctx.auth.email || !validateEmailWithACL(ctx.auth.email)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Only site admins can set up event types.",
      });
    }

    const noSeatAvailableSchema = zodToJsonSchema(noSeatAvailableEvent);
    const lowSeatWarningSchema = zodToJsonSchema(
      lowSeatWarningLevelReachedEvent
    );
    const seatProvidedSchema = zodToJsonSchema(seatProvidedEvent);
    const seatReservedSchema = zodToJsonSchema(seatReservedEvent);
    const seatRedeemedSchema = zodToJsonSchema(seatRedeemedEvent);
    const seatReleasedSchema = zodToJsonSchema(seatReleasedEvent);

    const creates = [
      ctx.svix.eventType.create({
        name: "no_seat_available",
        description:
          "Event fired when there are no available seats left on the subscription.",
        schemas: {
          "1": noSeatAvailableSchema,
        },
      }),
      ctx.svix.eventType.create({
        name: "low_seat_warning_level_reached",
        description:
          "Event fired when the low seat level for a subscription is reached.",
        schemas: {
          "1": lowSeatWarningSchema,
        },
      }),
      ctx.svix.eventType.create({
        name: "seat_provided",
        description:
          "Event fired when a seat has been allocated on a subscription.",
        schemas: {
          "1": seatProvidedSchema,
        },
      }),
      ctx.svix.eventType.create({
        name: "seat_reserved",
        description:
          "Event fired when a seat has been reserved on a subscription.",
        schemas: {
          "1": seatReservedSchema,
        },
      }),
      ctx.svix.eventType.create({
        name: "seat_redeemed",
        description:
          "Event fired when a seat has been redeemed on a subscription.",
        schemas: {
          "1": seatRedeemedSchema,
        },
      }),
      ctx.svix.eventType.create({
        name: "seat_released",
        description:
          "Event fired when a seat has been released on a subscription.",
        schemas: {
          "1": seatReleasedSchema,
        },
      }),
    ];

    const results = await Promise.all(creates);

    logger.info(
      {
        schemas: [
          noSeatAvailableSchema,
          lowSeatWarningSchema,
          seatProvidedSchema,
          seatReservedSchema,
          seatRedeemedSchema,
          seatReleasedSchema,
        ],
        results,
      },
      "Event types created in svix"
    );
  }),
  eventPortal: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.svix?.authentication.appPortalAccess(input.productId, {});
    }),
  // method based on
  // https://docs.speakeasyapi.dev/docs/integrate-speakeasy/manage-api-keys/#setting-custom-jwt-claims
  speakeasyPortalLoginToken: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.productId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid product id",
        });
      }
      // String customerId="some-customer-id";
      const customerId = `${input.productId}${ctx.auth.id}`;
      const product = await ctx.prisma.product.findFirst({
        where: { id: input.productId },
        select: { product_name: true },
      });
      if (!product) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid product",
        });
      }
      const displayName = `${product?.product_name} - ${
        ctx.auth.name ?? ctx.auth.email ?? ctx.auth.id
      }`;

      logger.info(
        {
          displayName,
          customerId,
        },
        "Creating speakeasy portal login token"
      );
      const req = new EmbedAccessTokenRequest();

      if (!ctx.req.controller) {
        return "";
      }
      // Restrict data by time (last 24 hours)
      // Instant startTime=Instant.now().minusSeconds(60*60*24);
      // filterBuilder.withTimeFilter(startTime,SpeakeasyAccessTokenFilterOperator.GreaterThan);
      const timeFilter = new EmbedAccessTokenRequest.Filter();
      timeFilter.setKey("time");
      timeFilter.setOperator(">");
      timeFilter.setValue(
        add(Date.now(), {
          days: -1,
        }).toISOString()
      );

      req.setCustomerId(customerId);
      req.setDisplayName(displayName);

      // Populate with any custom claims you want added to your created API keys
      // Map<String, String> jwtCustomClaims = new HashMap<>();
      // jwtCustomClaims.put("user_id", "your-desired-user_id")
      // jwtCustomClaims.put("email", "your-desired-email")
      const jwtClaimsMap = req.getJwtCustomClaimsMap();
      jwtClaimsMap.set("productId", input.productId);
      jwtClaimsMap.set("userId", ctx.auth.id);

      req.setFiltersList([timeFilter]);

      // Populate with any permissions you want enabled/disabled for the user
      // Map<String, Boolean> permissions = new HashMap<>();
      // permissions.put("end_user:api_keys:read", true)

      const permissionsMap = req.getPermissionsMap();
      // https://docs.speakeasyapi.dev/docs/integrate-speakeasy/manage-api-keys/#setting-custom-permissions-for-portal-users
      permissionsMap.set("end_user:api_keys:write", true);
      permissionsMap.set("end_user:api_keys:read", true);

      // String accessToken=controller.getPortalLoginToken(customerId, "Some User Display Name", jwtCustomClaims,
      //          permissions, filterBuilder.build());
      // build response
      return ctx.req.controller.getSDKInstance().getEmbedAccessToken(req);
    }),
});
