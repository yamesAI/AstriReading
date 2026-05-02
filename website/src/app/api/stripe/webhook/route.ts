import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = session.customer_email;
  const tier = session.metadata?.tier as "full" | "subscription" | undefined;

  if (!email || !tier) return;

  let user = await db.user.findUnique({ where: { email } });
  if (!user) {
    user = await db.user.create({
      data: {
        email,
        stripeCustomerId: session.customer as string,
      },
    });
  } else if (!user.stripeCustomerId && session.customer) {
    await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: session.customer as string },
    });
  }

  if (tier === "full") {
    // Create a reading record awaiting birth data
    await db.reading.create({
      data: {
        userId: user.id,
        tier: "FULL",
        status: "PENDING",
        birthName: "",
        birthDate: "",
        birthPlace: "",
        birthData: {},
        stripePaymentIntentId: session.payment_intent as string,
      },
    });
  }

  if (tier === "subscription" && session.subscription) {
    const sub = await stripe.subscriptions.retrieve(session.subscription as string);
    await db.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeSubscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
      update: {
        stripeSubscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
    });
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const stripeCustomerId = subscription.customer as string;
  const user = await db.user.findUnique({ where: { stripeCustomerId } });
  if (!user) return;

  await db.subscription.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
    update: {
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}
