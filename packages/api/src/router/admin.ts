import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { add } from "date-fns";
import { EmbedAccessTokenRequest } from "@speakeasy-api/speakeasy-schemas/registry/embedaccesstoken/embedaccesstoken_pb";

export const adminRouter = createTRPCRouter({
  eventPortal: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.svix.authentication.appPortalAccess(input.productId, {});
    }),
  // method based on
  // https://docs.speakeasyapi.dev/docs/integrate-speakeasy/manage-api-keys/#setting-custom-jwt-claims
  speakeasyPortalLoginToken: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.productId) {
        return "";
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

      const req = new EmbedAccessTokenRequest();

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

      // String accessToken=controller.getPortalLoginToken(customerId, "Some User Display Name", jwtCustomClaims,
      //          permissions, filterBuilder.build());
      // build response
      return ctx.req.controller?.getSDKInstance().getEmbedAccessToken(req);
    }),
});
