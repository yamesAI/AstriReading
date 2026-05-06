import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as never)[prop as keyof Stripe];
  },
});

export const PRICES = {
  FULL_READING: process.env.STRIPE_FULL_READING_PRICE_ID!,
  SUBSCRIPTION: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!,
} as const;

export async function createCheckoutSession({
  tier,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata,
}: {
  tier: "full" | "subscription";
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}) {
  const isSubscription = tier === "subscription";

  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price: isSubscription ? PRICES.SUBSCRIPTION : PRICES.FULL_READING,
        quantity: 1,
      },
    ],
    mode: isSubscription ? "subscription" : "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
}
