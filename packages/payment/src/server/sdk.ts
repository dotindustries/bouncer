import Stripe from "stripe";
import { z } from "zod";
import { env } from "../env.mjs";

export type StripePaymentData = Stripe.Response<Stripe.PaymentIntent> & {
  stripe_publishable_key: string;
  stripeAccount: string;
};

export const stripeOAuthTokenSchema = z.object({
  access_token: z.string().optional(),
  scope: z.string().optional(),
  livemode: z.boolean().optional(),
  token_type: z.literal("bearer").optional(),
  refresh_token: z.string().optional(),
  stripe_user_id: z.string().optional(),
  stripe_publishable_key: z.string().optional(),
});

export const stripeDataSchema = stripeOAuthTokenSchema.extend({
  default_currency: z.string(),
});

export type StripeData = z.infer<typeof stripeDataSchema>;

const stripePrivateKey = env.STRIPE_PRIVATE_KEY;
const stripe = new Stripe(stripePrivateKey, {
  apiVersion: "2022-11-15",
});

export default stripe;
