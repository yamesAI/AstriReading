"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const tierDetails = {
  full: {
    name: "Full Natal Reading",
    price: "$75",
    valueLine: "$806 in individual value",
    description:
      "A complete Renaissance natal reading covering every major life domain — career, income, relationships, health, and timing — in the tradition of William Lilly.",
    features: [
      "Temperament, manners & intelligence portrait",
      "Career path & vocation analysis",
      "Income strength & Bonatti life-thirds timing",
      "Marriage & relationship pattern",
      "Children & fertility indicators",
      "Health & constitution profile",
      "Firdaria: your current life chapter",
      "Key themes synthesis & action guide",
      "BONUS: 400-Year tradition method explainer",
    ],
    guarantee: "7-day accuracy guarantee — full refund if it's not specific to your life.",
    urgency: "Delivered within minutes of chart data submission.",
  },
  subscription: {
    name: "Timing Subscription",
    price: "$27/month",
    valueLine: "Cancel anytime · Instant access",
    description:
      "Monthly Firdaria + Solar Revolution timing updates. Navigate every chapter of your life before it unfolds.",
    features: [
      "Current Firdaria major & minor period reading",
      "Solar Revolution annual forecast",
      "Monthly practical guidance for your current period",
      "Access to all past readings",
      "Cancel anytime — no lock-in",
    ],
    guarantee: "Cancel anytime. No questions asked.",
    urgency: "First update delivered the day you subscribe.",
  },
};

const miniTestimonials = [
  {
    quote: "The career section alone was worth 10x the price.",
    author: "M.R., Architect",
  },
  {
    quote: "The most accurate document about my life I've ever read.",
    author: "S.L., Designer",
  },
  {
    quote: "I reference it every few months. Always more layers.",
    author: "R.M., Writer",
  },
];

function BookContent() {
  const params = useSearchParams();
  const rawTier = params.get("tier") as "full" | "subscription" | null;
  const tier = rawTier && rawTier in tierDetails ? rawTier : "full";
  const canceled = params.get("canceled") === "1";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<"full" | "subscription">(tier);

  const details = tierDetails[selectedTier];

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError("Please enter your email."); return; }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: selectedTier, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-12">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Secure Order</p>
        <h1 className="text-4xl font-serif text-stone-50 mb-2">Complete Your Reading</h1>
        <p className="text-stone-400 text-sm">
          3,400+ readings delivered · 4.9★ · &lt;2% refund rate
        </p>
      </div>

      {canceled && (
        <div className="bg-amber-950 border border-amber-800 text-amber-300 rounded-md px-4 py-3 text-sm mb-8 text-center">
          Your payment was canceled. No charge was made. Your spot is still available.
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-8">
        {/* Left: Tier + summary (3 cols) */}
        <div className="md:col-span-3 space-y-6">

          {/* Tier selector */}
          <div>
            <p className="label-field mb-3">Select Your Reading</p>
            <div className="space-y-3">
              {(Object.entries(tierDetails) as ["full" | "subscription", typeof tierDetails.full][]).map(
                ([key, t]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTier(key)}
                    className={`w-full text-left rounded-lg border p-4 transition-colors ${
                      selectedTier === key
                        ? "border-gold-500 bg-gold-900/20"
                        : "border-midnight-700 bg-midnight-900 hover:border-gold-800"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-serif text-stone-100">{t.name}</span>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-gold-400 font-serif">{t.price}</p>
                        <p className="text-stone-500 text-xs">{t.valueLine}</p>
                      </div>
                    </div>
                    <p className="text-stone-500 text-xs mt-1 leading-relaxed">{t.description}</p>
                  </button>
                )
              )}
            </div>
          </div>

          {/* What's included */}
          <div className="card-dark">
            <h3 className="text-gold-300 font-serif mb-4 flex items-center gap-2">
              <span className="text-gold-500">✦</span>
              What&apos;s Included
            </h3>
            <ul className="space-y-2">
              {details.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-stone-300 text-sm">
                  <span className="text-gold-500 mt-0.5 shrink-0">✦</span>
                  {f.startsWith("BONUS") ? (
                    <span>
                      <span className="text-gold-400 font-semibold text-xs uppercase tracking-wider mr-1">
                        Bonus:
                      </span>
                      {f.replace("BONUS: ", "")}
                    </span>
                  ) : (
                    f
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantee */}
          <div className="flex items-start gap-4 card-dark border-gold-800 border">
            <span className="text-3xl shrink-0">🛡</span>
            <div>
              <h4 className="text-stone-100 font-medium text-sm mb-1">
                Accuracy Guarantee
              </h4>
              <p className="text-stone-400 text-sm leading-relaxed">{details.guarantee}</p>
            </div>
          </div>

          {/* Mini testimonials */}
          <div className="space-y-3">
            {miniTestimonials.map((t) => (
              <div key={t.author} className="flex items-start gap-3">
                <div className="flex gap-0.5 shrink-0 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-400 text-xs">★</span>
                  ))}
                </div>
                <div>
                  <p className="text-stone-300 text-sm italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-stone-500 text-xs mt-0.5">— {t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Checkout form (2 cols) */}
        <div className="md:col-span-2">
          <div className="sticky top-8">
            <form onSubmit={handleCheckout} className="card-dark space-y-5">
              {/* Order summary header */}
              <div className="pb-4 border-b border-midnight-700">
                <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Your Order</p>
                <h3 className="text-xl font-serif text-stone-100">{details.name}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-gold-400 text-2xl font-serif">{details.price}</span>
                  {selectedTier === "full" && (
                    <span className="text-stone-500 text-sm line-through">$806 value</span>
                  )}
                </div>
                <p className="text-green-500 text-xs mt-1 font-medium">{details.urgency}</p>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="label-field">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-stone-500 text-xs mt-1">
                  Reading delivered here and saved to your dashboard.
                </p>
              </div>

              {error && (
                <div className="bg-red-950 border border-red-800 text-red-300 rounded-md px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full text-center py-4 text-base font-medium"
              >
                {loading
                  ? "Redirecting to secure checkout…"
                  : `Yes — I Want This Reading →`}
              </button>

              <div className="flex items-center gap-2 text-stone-500 text-xs">
                <span>🔒</span>
                <span>Encrypted payment via Stripe. Your card data never touches our servers.</span>
              </div>

              {/* Trust signals */}
              <div className="pt-3 border-t border-midnight-700 space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="text-gold-500">✦</span>
                  <span>3,400+ readings delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500">✦</span>
                  <span>4.9★ average rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500">✦</span>
                  <span>7-day accuracy guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500">✦</span>
                  <span>Under 2% refund rate</span>
                </div>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Link href="/start" className="text-gold-600 text-sm hover:text-gold-400">
                Try the free snapshot first →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-16 text-center text-stone-400">
          Loading…
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
