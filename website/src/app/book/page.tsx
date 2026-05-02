"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const tierDetails = {
  full: {
    name: "Full Natal Reading",
    price: "$75",
    description: "A complete Renaissance natal reading covering temperament, career, income, relationships, health, and key themes synthesis.",
    features: [
      "Temperament, manners & intelligence",
      "Career path & vocation analysis",
      "Income strength & Bonatti timing",
      "Marriage & relationship pattern",
      "Children & fertility",
      "Health & constitution",
      "Key themes synthesis",
    ],
  },
  subscription: {
    name: "Timing Subscription",
    price: "$27/month",
    description: "Monthly Firdaria + Solar Revolution timing updates. Cancel anytime.",
    features: [
      "Current Firdaria major & minor period",
      "Solar Revolution annual forecast",
      "Monthly practical guidance",
      "Access to all past readings",
    ],
  },
};

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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-gold-400 text-sm tracking-widest uppercase mb-3">Order</p>
        <h1 className="text-4xl font-serif text-stone-50">Complete Your Reading</h1>
      </div>

      {canceled && (
        <div className="bg-amber-950 border border-amber-800 text-amber-300 rounded-md px-4 py-3 text-sm mb-8 text-center">
          Your payment was canceled. No charge was made.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Tier selection + order summary */}
        <div className="space-y-6">
          <div>
            <p className="label-field mb-3">Select Reading Type</p>
            <div className="space-y-3">
              {(Object.entries(tierDetails) as ["full" | "subscription", typeof tierDetails.full][]).map(([key, t]) => (
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
                    <span className="text-gold-400 font-serif">{t.price}</span>
                  </div>
                  <p className="text-stone-500 text-xs mt-1">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card-dark">
            <h3 className="text-gold-300 font-serif mb-3">What&apos;s Included</h3>
            <ul className="space-y-2">
              {details.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-stone-300 text-sm">
                  <span className="text-gold-500 mt-0.5 shrink-0">✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-dark text-sm text-stone-400">
            <p className="mb-2">
              <strong className="text-stone-300">After payment:</strong> You&apos;ll be taken
              to your dashboard where you can submit your birth data and chart information.
              Your reading is generated within minutes.
            </p>
            <p>
              <strong className="text-stone-300">Subscriptions</strong> can be canceled
              anytime from your dashboard.
            </p>
          </div>
        </div>

        {/* Right: Checkout form */}
        <div>
          <form onSubmit={handleCheckout} className="card-dark space-y-5">
            <h3 className="text-xl font-serif text-stone-100">
              {details.name}
              <span className="text-gold-400 ml-2">{details.price}</span>
            </h3>

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
                Your reading will be delivered here and saved to your dashboard.
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
              className="btn-gold w-full text-center"
            >
              {loading
                ? "Redirecting to checkout…"
                : `Continue to Payment — ${details.price}`}
            </button>

            <div className="flex items-center gap-2 text-stone-500 text-xs">
              <span>🔒</span>
              <span>Secure payment via Stripe. Your card data never touches our servers.</span>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link href="/start" className="text-gold-600 text-sm hover:text-gold-400">
              Want to try the free snapshot first? →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-stone-400">
        Loading…
      </div>
    }>
      <BookContent />
    </Suspense>
  );
}
