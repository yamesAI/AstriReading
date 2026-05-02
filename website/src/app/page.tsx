import Link from "next/link";

const tiers = [
  {
    name: "Free Snapshot",
    price: "$0",
    description: "Sign up and receive your Temperament Portrait — an AI-generated character reading based on your rising sign, planetary ruler, and elemental chart balance.",
    features: [
      "Temperament analysis (Choleric / Sanguine / Phlegmatic / Melancholic)",
      "Manners & social expression",
      "Wit & intelligence profile",
      "Instant delivery",
    ],
    cta: "Get Free Snapshot",
    href: "/start",
    highlight: false,
  },
  {
    name: "Full Natal Reading",
    price: "$75",
    description: "A complete Renaissance natal reading covering every major life area — career, income, relationships, health, and spirituality — in the tradition of William Lilly.",
    features: [
      "Everything in Free Snapshot",
      "Career path & vocation",
      "Income strength & timing (Bonatti's life thirds)",
      "Marriage & relationships",
      "Children & fertility",
      "Health & constitution",
      "Key themes & synthesis",
    ],
    cta: "Order Full Reading",
    href: "/book?tier=full",
    highlight: true,
  },
  {
    name: "Timing Subscription",
    price: "$27/mo",
    description: "Monthly Firdaria + Solar Revolution updates. Know the astrological weather of your life and navigate your year with traditional timing methods.",
    features: [
      "Monthly Firdaria period interpretation",
      "Solar Revolution annual forecast",
      "What's activated this month",
      "Practical guidance for current period",
      "Access to all past readings",
    ],
    cta: "Subscribe",
    href: "/book?tier=subscription",
    highlight: false,
  },
];

const testimonials = [
  {
    quote: "The most accurate and meaningful reading I've ever had. The career section described my actual professional life with eerie precision.",
    author: "M.R., architect",
  },
  {
    quote: "I've tried many modern readings. This traditional approach goes deeper — it actually explains WHY things happen, not just what might happen.",
    author: "T.K., therapist",
  },
  {
    quote: "The monthly timing updates have become essential to how I plan. Finally, I understand the seasons of my life.",
    author: "A.P., entrepreneur",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-star-field py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold-400 text-sm tracking-widest uppercase mb-4">
            Traditional Renaissance Natal Astrology
          </p>
          <h1 className="text-5xl font-serif text-stone-50 mb-6 leading-tight">
            Your Birth Chart,<br />
            <span className="text-gold-400">Precisely Read</span>
          </h1>
          <p className="text-lg text-stone-300 mb-10 leading-relaxed">
            AI-powered readings in the 400-year tradition of William Lilly — the most
            precise natal astrology system ever developed. Temperament. Career. Love.
            Health. Timing. All from your birth chart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="btn-gold text-base px-8 py-3">
              Start with Free Snapshot
            </Link>
            <Link href="/readings" className="btn-outline text-base px-8 py-3">
              See All Readings
            </Link>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif text-gold-400 text-center mb-12">
          The Tradition Behind the Readings
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "William Lilly's Method",
              body: "Every reading follows the precise techniques of William Lilly's Christian Astrology (1647) — the most complete traditional astrology text in English.",
            },
            {
              title: "Essential Dignities",
              body: "We use the ancient dignity system (domicile, exaltation, triplicity, terms, faces) that tells you whether a planet is working for you or against you.",
            },
            {
              title: "Firdaria Timing",
              body: "The Persian Firdaria system assigns planetary rulers to life periods — showing you which chapter you're in and what themes are activated right now.",
            },
          ].map((item) => (
            <div key={item.title} className="card-dark">
              <h3 className="text-gold-300 font-serif text-lg mb-3">{item.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-midnight-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif text-gold-400 text-center mb-4">
            Reading Options
          </h2>
          <p className="text-center text-stone-400 mb-12 max-w-xl mx-auto">
            Start free. Deepen your understanding over time.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 flex flex-col ${
                  tier.highlight
                    ? "bg-gold-900/20 border-2 border-gold-500"
                    : "bg-midnight-950 border border-midnight-700"
                }`}
              >
                {tier.highlight && (
                  <span className="text-xs text-gold-400 tracking-widest uppercase mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-serif text-stone-100 mb-1">{tier.name}</h3>
                <p className="text-3xl font-serif text-gold-400 mb-4">{tier.price}</p>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed flex-1">
                  {tier.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="text-stone-300 text-sm flex items-start gap-2">
                      <span className="text-gold-500 mt-0.5">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={tier.highlight ? "btn-gold text-center" : "btn-outline text-center"}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif text-gold-400 text-center mb-12">
          From the Stars, For Real Lives
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="card-dark">
              <p className="text-stone-300 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-gold-500 text-xs">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-star-field py-16 px-4 text-center">
        <h2 className="text-3xl font-serif text-stone-50 mb-4">
          Begin with Your Free Temperament Snapshot
        </h2>
        <p className="text-stone-400 mb-8">
          No credit card. Just your birth data and 60 seconds.
        </p>
        <Link href="/start" className="btn-gold text-base px-10 py-3">
          Get My Free Reading
        </Link>
      </section>
    </div>
  );
}
