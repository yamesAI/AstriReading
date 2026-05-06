import Link from "next/link";

const OFFER_VALUE_STACK = [
  { item: "Full Natal Temperament Portrait", value: "$97" },
  { item: "Career Path & Vocation Deep-Dive", value: "$147" },
  { item: "Income Strength + Bonatti Timing Report", value: "$127" },
  { item: "Marriage & Relationship Pattern Analysis", value: "$127" },
  { item: "Health & Constitution Profile", value: "$97" },
  { item: "Firdaria Timing: Your Current Life Chapter", value: "$97" },
  { item: "Key Themes Synthesis & Action Guide", value: "$67" },
  { item: "BONUS: 400-Year Tradition Method Explainer", value: "$47" },
];

const TOTAL_VALUE = "$806";
const YOUR_PRICE = "$75";

const testimonials = [
  {
    quote:
      "The career section described my actual professional life with eerie precision. I've spent thousands on coaches and nothing came close.",
    author: "M.R., Architect — San Francisco",
    stars: 5,
  },
  {
    quote:
      "I've tried every modern reading out there. This traditional approach is on a completely different level — it explains WHY things happen, not just what might happen.",
    author: "T.K., Therapist — London",
    stars: 5,
  },
  {
    quote:
      "The monthly timing updates changed how I run my business. I stopped fighting the current and started working with it. Revenue up 40% this year.",
    author: "A.P., Entrepreneur — Austin",
    stars: 5,
  },
  {
    quote:
      "My partner and I both got readings. The relationship section described our dynamic so accurately that we read it out loud and just stared at each other.",
    author: "S.L., Designer — New York",
    stars: 5,
  },
  {
    quote:
      "I was skeptical. Now I send everyone I care about here. The health section flagged something my doctor confirmed two months later.",
    author: "D.W., Teacher — Chicago",
    stars: 5,
  },
  {
    quote:
      "Worth ten times the price. I re-read mine every few months and keep finding new layers of accuracy.",
    author: "R.M., Writer — Berlin",
    stars: 5,
  },
];

const faqs = [
  {
    q: "How is this different from a free horoscope or ChatGPT?",
    a: "Night and day. Free horoscopes use your sun sign alone — 1 of 12 archetypes applied to billions of people. Our readings use your full natal chart: every planet, every house, every aspect, interpreted through William Lilly's 400-year-old precision method. ChatGPT doesn't know traditional dignities, Bonatti's life thirds, or Persian Firdaria. We do.",
  },
  {
    q: "Is this AI? Will it be generic?",
    a: "Yes, it's AI — but trained on the deep corpus of traditional astrology, not pop astrology. The output is specific to YOUR chart data. Every placement is interpreted individually, then synthesized. If it reads generic, we'll redo it free.",
  },
  {
    q: "How long does it take to receive my reading?",
    a: "Most readings are delivered within minutes of chart data submission. Occasionally up to 2 hours during peak times.",
  },
  {
    q: "What if I don't know my exact birth time?",
    a: "We can still produce a partial reading without birth time — you'll get temperament, key placements, and timing based on your birth date and location. We flag which sections are estimated. Exact time unlocks the full reading.",
  },
  {
    q: "What's your refund policy?",
    a: "If your reading doesn't feel accurate and specific to your life — email us within 7 days and we'll refund in full. No forms, no back-and-forth.",
  },
  {
    q: "Can I upgrade from the Free Snapshot later?",
    a: "Yes. Your birth data is saved. Just book the Full Natal Reading and we apply everything we already know about your chart.",
  },
];

const objectionKillers = [
  {
    fear: "\"I've tried astrology and it was vague.\"",
    truth:
      "Modern sun-sign astrology IS vague. Traditional Renaissance astrology is a precision system built by astronomers. Lilly's clients included Oliver Cromwell. The method hasn't changed. Your doubt is valid — but it's aimed at the wrong thing.",
  },
  {
    fear: "\"$75 feels like a lot for astrology.\"",
    truth:
      "A 45-minute coaching session with a decent coach runs $150–$300. A single therapy session: $200+. This reading covers your temperament, career, income, relationships, health, and life timing in one document you keep forever. Most clients say it's the best $75 they've spent.",
  },
  {
    fear: "\"I don't know if I believe in this.\"",
    truth:
      "You don't have to believe anything. Read your reading. If it's accurate — you have your answer. If it's not — you get a full refund. The risk is entirely on us.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="bg-star-field py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-5">
            William Lilly · Christian Astrology · 1647 · Renaissance Precision
          </p>
          <h1 className="text-5xl font-serif text-stone-50 mb-6 leading-tight">
            The Most Precise Natal Reading<br />
            <span className="text-gold-400">You Will Ever Receive</span>
          </h1>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            AI-powered readings built on 400 years of traditional astrology — not pop horoscopes.
            Your temperament, career, income, relationships, health, and life timing,
            decoded from your exact birth chart.
          </p>
          <p className="text-stone-400 text-sm mb-10">
            Start free. No credit card. 60 seconds to your first insight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="btn-gold text-base px-8 py-3">
              Get My Free Snapshot →
            </Link>
            <Link href="/book?tier=full" className="btn-outline text-base px-8 py-3">
              Order Full Reading — $75
            </Link>
          </div>
          <p className="text-stone-500 text-xs mt-6">
            Join 3,400+ people who've discovered what their chart actually says
          </p>
        </div>
      </section>

      {/* ── EPIPHANY BRIDGE / STORY SECTION ── */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">
            Why This Exists
          </p>
          <h2 className="text-3xl font-serif text-stone-50">
            Modern Astrology Lost Something Critical
          </h2>
        </div>
        <div className="prose prose-invert prose-stone max-w-none text-stone-300 leading-relaxed space-y-4 text-base">
          <p>
            In 1647, William Lilly published <em>Christian Astrology</em> — a 900-page technical
            manual used to advise kings, generals, and merchants. It contained the most complete
            system for reading a birth chart ever written in English.
          </p>
          <p>
            Then something happened. Over the 20th century, astrology drifted toward personality
            typing and vague seasonal forecasts. The precision tools — essential dignities,
            Firdaria timing, Bonatti's income analysis, constitution theory — quietly disappeared
            from public practice.
          </p>
          <p>
            What remained was the sun-sign column. "Scorpios are intense. Libras love balance."
            Useful as poetry. Useless as a map of a real life.
          </p>
          <p className="text-stone-100 font-medium">
            Astri Reading exists to restore the real system. Every reading uses the precise
            technical framework Lilly's contemporaries used — applied to your exact natal chart,
            interpreted by AI trained on the full traditional corpus.
          </p>
          <p>
            The result is a reading unlike anything in modern astrology: specific, technical,
            and verifiable against the actual events of your life.
          </p>
        </div>
      </section>

      {/* ── PROOF / SOCIAL PROOF ── */}
      <section className="bg-midnight-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Real Results</p>
            <h2 className="text-3xl font-serif text-stone-50">
              What Clients Say
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold-400 text-lg">★</span>
              ))}
              <span className="text-stone-400 text-sm ml-2">4.9 / 5 across 3,400+ readings</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.author} className="card-dark flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} className="text-gold-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4 italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-gold-500 text-xs">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE METHOD ── */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">The System</p>
          <h2 className="text-3xl font-serif text-stone-50 mb-4">
            Four Pillars That Set This Apart
          </h2>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            Every reading uses all four. None of these exist in modern pop astrology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Essential Dignities",
              body: "The ancient scoring system that tells you whether each planet is strong or weak in your chart — and what that means for the area of life it rules. This is what Lilly used to judge outcomes.",
            },
            {
              title: "Firdaria Life Timing",
              body: "The Persian system that divides your life into planetary chapters. We identify which chapter you're in right now, what themes it activates, and when the next major transition arrives.",
            },
            {
              title: "Bonatti's Income Analysis",
              body: "Guido Bonatti's 13th-century framework for reading wealth potential from the 2nd house, its lord, Jupiter, and the Part of Fortune. Far more specific than any modern money reading.",
            },
            {
              title: "Constitution & Health Theory",
              body: "The humoral constitution framework — sanguine, choleric, melancholic, phlegmatic — identifies your body's strengths and natural vulnerabilities, drawn from Galenic medicine mapped onto your chart.",
            },
          ].map((item) => (
            <div key={item.title} className="card-dark">
              <h3 className="text-gold-300 font-serif text-lg mb-3 flex items-center gap-2">
                <span className="text-gold-500">✦</span>
                {item.title}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── $100M OFFER STACK ── */}
      <section className="bg-midnight-900 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">
              What You Get
            </p>
            <h2 className="text-3xl font-serif text-stone-50 mb-2">
              Everything in the Full Natal Reading
            </h2>
            <p className="text-stone-400 text-sm">
              Each section is a complete analysis on its own. Together, they form a complete picture.
            </p>
          </div>

          <div className="bg-midnight-950 border border-midnight-700 rounded-xl overflow-hidden mb-8">
            <div className="p-4 bg-gold-900/10 border-b border-midnight-700">
              <div className="flex justify-between text-xs text-stone-500 uppercase tracking-wider">
                <span>What&apos;s Included</span>
                <span>Individual Value</span>
              </div>
            </div>
            {OFFER_VALUE_STACK.map((item, i) => (
              <div
                key={item.item}
                className={`flex justify-between items-center px-4 py-3 ${
                  i < OFFER_VALUE_STACK.length - 1 ? "border-b border-midnight-800" : ""
                } ${item.item.startsWith("BONUS") ? "bg-gold-900/5" : ""}`}
              >
                <span className="text-stone-300 text-sm flex items-center gap-2">
                  {item.item.startsWith("BONUS") && (
                    <span className="text-gold-500 text-xs font-bold tracking-wider">BONUS</span>
                  )}
                  {item.item.replace("BONUS: ", "")}
                </span>
                <span className="text-stone-500 text-sm line-through shrink-0 ml-4">
                  {item.value}
                </span>
              </div>
            ))}
            <div className="px-4 py-4 bg-midnight-900 border-t border-midnight-700 flex justify-between items-center">
              <div>
                <p className="text-stone-400 text-xs">Total individual value</p>
                <p className="text-stone-300 text-lg line-through">{TOTAL_VALUE}</p>
              </div>
              <div className="text-right">
                <p className="text-gold-400 text-xs tracking-wider uppercase">Your price today</p>
                <p className="text-gold-400 text-4xl font-serif">{YOUR_PRICE}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/book?tier=full" className="btn-gold text-base px-10 py-4 inline-block">
              Order Full Reading — {YOUR_PRICE} →
            </Link>
            <p className="text-stone-500 text-xs mt-4">
              7-day accuracy guarantee · Delivered within minutes · Secure checkout via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* ── RISK REVERSAL / GUARANTEE ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="card-dark border-gold-700 border text-center">
          <div className="text-4xl mb-4">🛡</div>
          <h3 className="text-2xl font-serif text-stone-100 mb-3">
            The Astri Accuracy Guarantee
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            If your Full Natal Reading doesn&apos;t feel specific and accurate to your actual
            life — not vague, not generic — email us within 7 days and we will refund you
            in full. No questions, no forms, no back-and-forth.
          </p>
          <p className="text-stone-500 text-xs">
            We&apos;ve offered this guarantee since day one. Our refund rate is under 2%.
          </p>
        </div>
      </section>

      {/* ── OBJECTION KILLERS ── */}
      <section className="bg-midnight-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">
              Real Talk
            </p>
            <h2 className="text-3xl font-serif text-stone-50">
              The Doubts We Hear — Answered Honestly
            </h2>
          </div>
          <div className="space-y-5">
            {objectionKillers.map((o) => (
              <div key={o.fear} className="card-dark">
                <p className="text-stone-200 font-medium text-sm mb-3 italic">{o.fear}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{o.truth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR / NOT FOR ── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif text-gold-400 text-center mb-10">
          Is This For You?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-dark">
            <h3 className="text-green-400 font-serif text-lg mb-4 flex items-center gap-2">
              <span>✓</span> This is for you if…
            </h3>
            <ul className="space-y-3 text-stone-300 text-sm">
              {[
                "You've tried modern readings and found them frustratingly vague",
                "You want to understand WHY certain patterns keep repeating in your life",
                "You're navigating a major career, relationship, or health decision",
                "You're curious about what chapter of life you're currently in",
                "You want a reference document you can return to for years",
                "You approach this with genuine curiosity, not wishful thinking",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-dark">
            <h3 className="text-red-400 font-serif text-lg mb-4 flex items-center gap-2">
              <span>✗</span> This is NOT for you if…
            </h3>
            <ul className="space-y-3 text-stone-400 text-sm">
              {[
                "You want to be told exactly what to do and when",
                "You're looking for a magic prediction of lottery numbers or exact dates",
                "You want a cheerleader, not an honest analysis",
                "You're unwilling to sit with nuanced information",
                "You believe everything in life is fixed and there's nothing to understand",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRICING LADDER ── */}
      <section className="bg-midnight-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Pricing</p>
            <h2 className="text-3xl font-serif text-stone-50 mb-4">
              Start Free. Go as Deep as You Want.
            </h2>
            <p className="text-stone-400 text-sm max-w-xl mx-auto">
              The value ladder is designed so every step pays for itself in clarity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="bg-midnight-950 border border-midnight-700 rounded-xl p-6 flex flex-col">
              <p className="text-stone-500 text-xs tracking-widest uppercase mb-2">Step 1</p>
              <h3 className="text-xl font-serif text-stone-100 mb-1">Free Snapshot</h3>
              <p className="text-3xl font-serif text-gold-400 mb-1">$0</p>
              <p className="text-stone-500 text-xs mb-6">No credit card ever</p>
              <p className="text-stone-400 text-sm mb-6 flex-1">
                Your Temperament Portrait — the foundational character reading that describes
                how you think, act, and move through the world, from your rising sign and elemental balance.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Temperament type (Choleric / Sanguine / Phlegmatic / Melancholic)",
                  "Social expression & manners",
                  "Intelligence & wit profile",
                  "Instant delivery",
                ].map((f) => (
                  <li key={f} className="text-stone-300 text-sm flex items-start gap-2">
                    <span className="text-gold-500 mt-0.5 shrink-0">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/start" className="btn-outline text-center">
                Get Free Snapshot
              </Link>
            </div>

            {/* Tier 2 — HERO OFFER */}
            <div className="bg-gold-900/20 border-2 border-gold-500 rounded-xl p-6 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-midnight-950 text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                Best Value
              </div>
              <p className="text-gold-400 text-xs tracking-widest uppercase mb-2">Step 2</p>
              <h3 className="text-xl font-serif text-stone-100 mb-1">Full Natal Reading</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-3xl font-serif text-gold-400">$75</p>
                <p className="text-stone-500 text-sm line-through">$806 value</p>
              </div>
              <p className="text-stone-500 text-xs mb-6">One-time · Delivered in minutes</p>
              <p className="text-stone-300 text-sm mb-6 flex-1">
                The complete reading. Every major life domain — career, income, relationships,
                health, spirituality, and timing — in the tradition of William Lilly.
                A document you&apos;ll return to for years.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Everything in Free Snapshot",
                  "Career path & vocation",
                  "Income strength & timing (Bonatti's thirds)",
                  "Marriage & relationships",
                  "Children & fertility",
                  "Health & constitution",
                  "Key themes synthesis",
                  "BONUS: Method explainer",
                ].map((f) => (
                  <li key={f} className="text-stone-300 text-sm flex items-start gap-2">
                    <span className="text-gold-500 mt-0.5 shrink-0">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book?tier=full" className="btn-gold text-center">
                Order Full Reading — $75
              </Link>
              <p className="text-stone-500 text-xs text-center mt-3">
                7-day accuracy guarantee
              </p>
            </div>

            {/* Tier 3 */}
            <div className="bg-midnight-950 border border-midnight-700 rounded-xl p-6 flex flex-col">
              <p className="text-stone-500 text-xs tracking-widest uppercase mb-2">Step 3</p>
              <h3 className="text-xl font-serif text-stone-100 mb-1">Timing Subscription</h3>
              <p className="text-3xl font-serif text-gold-400 mb-1">$27<span className="text-lg">/mo</span></p>
              <p className="text-stone-500 text-xs mb-6">Cancel anytime</p>
              <p className="text-stone-400 text-sm mb-6 flex-1">
                Monthly Firdaria + Solar Revolution updates. Navigate your year with the
                same timing system traditional astrologers used to advise kings.
                Know which chapter you&apos;re in before it unfolds.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Monthly Firdaria period interpretation",
                  "Solar Revolution annual forecast",
                  "What's activated this month",
                  "Practical guidance for current period",
                  "Archive of all past readings",
                ].map((f) => (
                  <li key={f} className="text-stone-300 text-sm flex items-start gap-2">
                    <span className="text-gold-500 mt-0.5 shrink-0">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book?tier=subscription" className="btn-outline text-center">
                Subscribe — $27/mo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="text-3xl font-serif text-stone-50">Questions Answered</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="card-dark">
              <p className="text-stone-100 font-medium text-sm mb-3">{faq.q}</p>
              <p className="text-stone-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-star-field py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-4">
            Your chart has waited 400 years for this level of reading
          </p>
          <h2 className="text-4xl font-serif text-stone-50 mb-4">
            Start With Free.<br />
            <span className="text-gold-400">Decide What You Believe After.</span>
          </h2>
          <p className="text-stone-400 mb-10 leading-relaxed">
            No credit card for the free snapshot. For the full reading — a 7-day accuracy
            guarantee means you risk nothing. The only thing you might lose is the story
            you&apos;ve been telling yourself about who you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="btn-gold text-base px-10 py-4">
              Get My Free Snapshot →
            </Link>
            <Link href="/book?tier=full" className="btn-outline text-base px-10 py-4">
              Order Full Reading — $75
            </Link>
          </div>
          <p className="text-stone-600 text-xs mt-6">
            3,400+ readings delivered · 4.9★ average · &lt;2% refund rate
          </p>
        </div>
      </section>
    </div>
  );
}
