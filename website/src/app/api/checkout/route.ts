import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { z } from "zod";

const schema = z.object({
  tier: z.enum(["full", "subscription"]),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { tier, email } = parsed.data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const session = await createCheckoutSession({
      tier,
      customerEmail: email,
      successUrl: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/book?tier=${tier}&canceled=1`,
      metadata: { tier, email },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
