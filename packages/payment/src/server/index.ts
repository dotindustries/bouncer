import { Prisma, prisma } from "@dotinc/bouncer-db";
import stripe from "./sdk";

export async function getStripeCustomerIdFromUserId(productId: string) {
  // Get user
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      billing_manager_email: true,
      metadata: true,
    },
  });

  if (!product?.billing_manager_email)
    throw new Error("billing manager e-mail not found");

  const customerId = await getStripeCustomerId(product);

  return customerId;
}

const productType = Prisma.validator<Prisma.ProductArgs>()({
  select: {
    id: true,
    billing_manager_email: true,
    metadata: true,
  },
});

type ProductType = Prisma.ProductGetPayload<typeof productType>;
/** This will retrieve the customer ID from Stripe or create it if it doesn't exists yet. */
export async function getStripeCustomerId(
  product: ProductType
): Promise<string> {
  let customerId: string | null = null;

  if (
    product?.metadata &&
    typeof product.metadata === "object" &&
    "stripeCustomerId" in product.metadata
  ) {
    customerId = (product?.metadata as Prisma.JsonObject)
      .stripeCustomerId as string;
  } else {
    /* We fallback to finding the customer by email (which is not optimal) */
    const customersResponse = await stripe.customers.list({
      email: product.billing_manager_email,
      limit: 1,
    });
    if (customersResponse.data[0]?.id) {
      customerId = customersResponse.data[0].id;
    } else {
      /* Creating customer on Stripe and saving it on prisma */
      const customer = await stripe.customers.create({
        email: product.billing_manager_email,
      });
      customerId = customer.id;
    }

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        metadata: {
          ...(product.metadata as Prisma.JsonObject),
          stripeCustomerId: customerId,
        },
      },
    });
  }

  return customerId;
}

export async function deleteStripeCustomer(
  product: ProductType
): Promise<string | null> {
  const customerId = await getStripeCustomerId(product);

  if (!customerId) {
    console.warn(
      "No stripe customer found for user:" + product.billing_manager_email
    );
    return null;
  }

  //delete stripe customer
  const deletedCustomer = await stripe.customers.del(customerId);

  return deletedCustomer.id;
}
