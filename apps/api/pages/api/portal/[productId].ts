import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "@dotinc/bouncer-auth/src/server/get-session";
import { env } from "~/env/server.mjs";
import { getStripeCustomerIdFromUserId } from "@dotinc/bouncer-payment/src/server";
import stripe from "@dotinc/bouncer-payment/src/server/sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const { referer } = req.headers;
  if (!referer) return res.status(400).json({ message: "Missing referrer" });

  const { productId } = req.query;
  if (!productId || typeof productId !== "string")
    return res.status(400).json({ message: "Missing productId" });

  const session = await getServerSession({ req, res });

  if (!session?.user?.id)
    return res.status(401).json({ message: "Not authenticated" });

  // If accessing a user's portal
  const customerId = await getStripeCustomerIdFromUserId(productId);
  if (!customerId)
    return res.status(400).json({ message: "CustomerId not found in stripe" });

  let return_url = `${env.NEXTAUTH_URL}/settings/billing`;

  if (typeof req.query.returnTo === "string") {
    const target = `${env.NEXTAUTH_URL}/${req.query.returnTo}`;
    const safeRedirectUrl = getSafeRedirectUrl(target);
    if (safeRedirectUrl) return_url = safeRedirectUrl;
  }

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url,
  });

  res.redirect(302, stripeSession.url);
}

// It ensures that redirection URL safe where it is accepted through a query params or other means where user can change it.
export const getSafeRedirectUrl = (url = "") => {
  if (!url) {
    return null;
  }

  //It is important that this fn is given absolute URL because urls that don't start with HTTP can still deceive browser into redirecting to another domain
  if (url.search(/^https?:\/\//) === -1) {
    console.error("not an absolute url", url);
    throw new Error("Pass an absolute URL");
  }

  console.log("parsing url", url);
  const urlParsed = new URL(url);

  // Avoid open redirection security vulnerability
  if (![env.NEXTAUTH_URL].some((u) => new URL(u).origin === urlParsed.origin)) {
    url = `${env.NEXTAUTH_URL}/`;
  }

  return url;
};
