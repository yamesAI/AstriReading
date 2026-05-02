"use client";

import { useState } from "react";

interface FormData {
  birthName: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
  email: string;
  chartData: string;
}

const initialForm: FormData = {
  birthName: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  gender: "",
  email: "",
  chartData: "",
};

export default function StartPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [reading, setReading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.birthName || !form.birthDate || !form.birthPlace || !form.email) {
      setError("Please fill in your name, date of birth, place of birth, and email.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "free", ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setReading(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (reading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <p className="text-gold-400 text-sm tracking-widest uppercase mb-2">Your Reading</p>
          <h1 className="text-3xl font-serif text-stone-50">Temperament Snapshot</h1>
          <p className="text-stone-500 text-sm mt-1">Delivered to {form.email}</p>
        </div>

        <div className="card-dark prose-custom mb-10">
          <div
            className="text-stone-300 leading-relaxed whitespace-pre-wrap text-sm"
            dangerouslySetInnerHTML={{ __html: reading.replace(/\*\*(.*?)\*\*/g, "<strong class='text-gold-300'>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }}
          />
        </div>

        <div className="border border-gold-800 rounded-xl p-6 text-center">
          <p className="text-gold-300 font-serif text-lg mb-2">
            Ready for the full picture?
          </p>
          <p className="text-stone-400 text-sm mb-5">
            Your complete natal reading covers career, income timing, relationships,
            health, and a key themes synthesis — all in the William Lilly tradition.
          </p>
          <a href="/book?tier=full" className="btn-gold inline-block">
            Order Full Reading — $75
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-gold-400 text-sm tracking-widest uppercase mb-3">Free</p>
        <h1 className="text-4xl font-serif text-stone-50 mb-3">
          Your Temperament Snapshot
        </h1>
        <p className="text-stone-400 leading-relaxed">
          Enter your birth data and receive an AI-generated character reading
          based on your rising sign, planetary ruler, and elemental balance —
          in the Renaissance tradition.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-dark space-y-5">
        <div>
          <label htmlFor="birthName" className="label-field">Your Name</label>
          <input
            id="birthName"
            type="text"
            className="input-field"
            placeholder="Jane Smith"
            value={form.birthName}
            onChange={(e) => update("birthName", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="label-field">Email Address</label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <p className="text-stone-500 text-xs mt-1">
            We&apos;ll save your reading here. No spam.
          </p>
        </div>

        <div>
          <label htmlFor="birthDate" className="label-field">Date of Birth</label>
          <input
            id="birthDate"
            type="date"
            className="input-field"
            value={form.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="birthTime" className="label-field">
            Time of Birth{" "}
            <span className="text-stone-500">(optional but recommended)</span>
          </label>
          <input
            id="birthTime"
            type="time"
            className="input-field"
            value={form.birthTime}
            onChange={(e) => update("birthTime", e.target.value)}
          />
          <p className="text-stone-500 text-xs mt-1">
            Check your birth certificate. Without a birth time, we use noon as an approximation.
          </p>
        </div>

        <div>
          <label htmlFor="birthPlace" className="label-field">Place of Birth</label>
          <input
            id="birthPlace"
            type="text"
            className="input-field"
            placeholder="London, England"
            value={form.birthPlace}
            onChange={(e) => update("birthPlace", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="label-field">
            Gender <span className="text-stone-500">(optional — affects relationship significators)</span>
          </label>
          <select
            id="gender"
            className="input-field"
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
          >
            <option value="">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="nonbinary">Non-binary</option>
          </select>
        </div>

        <div>
          <button
            type="button"
            className="text-gold-500 text-sm underline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Hide" : "Add"} chart data from Solar Fire (optional)
          </button>

          {showAdvanced && (
            <div className="mt-3">
              <label htmlFor="chartData" className="label-field">
                Chart Data (paste from Solar Fire or similar software)
              </label>
              <textarea
                id="chartData"
                className="input-field min-h-32 resize-y font-mono text-xs"
                placeholder="Paste planetary positions, house cusps, dignities here..."
                value={form.chartData}
                onChange={(e) => update("chartData", e.target.value)}
              />
              <p className="text-stone-500 text-xs mt-1">
                Include: all planet positions (sign, house, degree), essential dignities,
                house cusps. The more detail you provide, the more precise your reading.
              </p>
            </div>
          )}
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
          {loading ? "Generating your reading…" : "Get My Free Snapshot"}
        </button>

        <p className="text-stone-500 text-xs text-center">
          No credit card required. Instant delivery.
        </p>
      </form>
    </div>
  );
}
