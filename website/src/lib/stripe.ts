import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
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
