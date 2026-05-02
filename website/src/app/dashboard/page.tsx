"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Reading {
  id: string;
  tier: "FREE" | "FULL" | "TIMING";
  status: "PENDING" | "GENERATING" | "COMPLETE" | "FAILED";
  birthName: string;
  birthDate: string;
  content: string | null;
  createdAt: string;
}

interface BirthFormData {
  birthName: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
  chartData: string;
  firdariaData: string;
  solarRevolutionData: string;
}

const tierLabel: Record<string, string> = {
  FREE: "Temperament Snapshot",
  FULL: "Full Natal Reading",
  TIMING: "Timing Update",
};

function DashboardContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [readings, setReadings] = useState<Reading[]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [form, setForm] = useState<BirthFormData>({
    birthName: "", birthDate: "", birthTime: "", birthPlace: "",
    gender: "", chartData: "", firdariaData: "", solarRevolutionData: "",
  });
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  async function loadReadings(userEmail: string) {
    const res = await fetch(`/api/readings?email=${encodeURIComponent(userEmail)}`);
    if (res.ok) {
      const data = await res.json();
      setReadings(data.readings || []);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    await loadReadings(email);
  }

  function update(field: keyof BirthFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submitBirthData(reading: Reading) {
    if (!form.birthName || !form.birthDate || !form.birthPlace) {
      setGenError("Please fill in name, date, and place of birth.");
      return;
    }
    setGenError(null);
    setGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: reading.tier.toLowerCase(),
          readingId: reading.id,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      // Refresh readings
      await loadReadings(email);
      setSelectedReading(null);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setGenerating(false);
    }
  }

  if (!submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-serif text-stone-50 mb-4">Your Dashboard</h1>
        <p className="text-stone-400 mb-8">
          Enter the email you used to order your reading.
        </p>
        {sessionId && (
          <div className="bg-green-950 border border-green-800 text-green-300 rounded-md px-4 py-3 text-sm mb-6">
            Payment successful! Enter your email to access your dashboard and submit your birth data.
          </div>
        )}
        <form onSubmit={handleEmailSubmit} className="card-dark space-y-4">
          <div>
            <label htmlFor="dash-email" className="label-field">Email Address</label>
            <input
              id="dash-email"
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-gold w-full">Access Dashboard</button>
        </form>
      </div>
    );
  }

  const pendingReadings = readings.filter((r) => r.status === "PENDING");
  const completeReadings = readings.filter((r) => r.status === "COMPLETE");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-stone-50">Your Readings</h1>
          <p className="text-stone-500 text-sm mt-1">{email}</p>
        </div>
        <Link href="/book" className="btn-outline text-sm py-2 px-4">
          Order New Reading
        </Link>
      </div>

      {readings.length === 0 && (
        <div className="card-dark text-center py-12">
          <p className="text-stone-400 mb-4">No readings found for this email.</p>
          <Link href="/book" className="btn-gold">Order Your First Reading</Link>
        </div>
      )}

      {/* Pending readings — need birth data */}
      {pendingReadings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gold-400 font-serif text-lg mb-4">
            Action Required — Submit Your Birth Data
          </h2>
          {pendingReadings.map((r) => (
            <div key={r.id} className="card-dark mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs text-gold-500 uppercase tracking-wider">
                    {tierLabel[r.tier]}
                  </span>
                  <p className="text-stone-400 text-sm">
                    Ordered {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReading(selectedReading?.id === r.id ? null : r)}
                  className="btn-gold text-sm py-2 px-4"
                >
                  {selectedReading?.id === r.id ? "Cancel" : "Submit Birth Data"}
                </button>
              </div>

              {selectedReading?.id === r.id && (
                <div className="border-t border-midnight-700 pt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-field">Full Name</label>
                      <input className="input-field" value={form.birthName}
                        onChange={(e) => update("birthName", e.target.value)} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="label-field">Date of Birth</label>
                      <input type="date" className="input-field" value={form.birthDate}
                        onChange={(e) => update("birthDate", e.target.value)} />
                    </div>
                    <div>
                      <label className="label-field">Time of Birth (optional)</label>
                      <input type="time" className="input-field" value={form.birthTime}
                        onChange={(e) => update("birthTime", e.target.value)} />
                    </div>
                    <div>
                      <label className="label-field">Place of Birth</label>
                      <input className="input-field" value={form.birthPlace}
                        onChange={(e) => update("birthPlace", e.target.value)} placeholder="London, England" />
                    </div>
                    <div>
                      <label className="label-field">Gender (optional)</label>
                      <select className="input-field" value={form.gender}
                        onChange={(e) => update("gender", e.target.value)}>
                        <option value="">Prefer not to say</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="nonbinary">Non-binary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-field">
                      Chart Data from Solar Fire{" "}
                      <span className="text-stone-500">(strongly recommended for accuracy)</span>
                    </label>
                    <textarea className="input-field min-h-28 font-mono text-xs resize-y"
                      value={form.chartData}
                      onChange={(e) => update("chartData", e.target.value)}
                      placeholder="Paste planetary positions, house cusps, dignities here…" />
                  </div>

                  {(r.tier === "TIMING") && (
                    <>
                      <div>
                        <label className="label-field">Current Firdaria Period (from Solar Fire)</label>
                        <textarea className="input-field min-h-20 font-mono text-xs resize-y"
                          value={form.firdariaData}
                          onChange={(e) => update("firdariaData", e.target.value)}
                          placeholder="e.g. Major period: Sun (running 2021-2031). Minor period: Sun/Venus (current)." />
                      </div>
                      <div>
                        <label className="label-field">Solar Revolution Data (current year)</label>
                        <textarea className="input-field min-h-20 font-mono text-xs resize-y"
                          value={form.solarRevolutionData}
                          onChange={(e) => update("solarRevolutionData", e.target.value)}
                          placeholder="Paste Solar Revolution chart data here…" />
                      </div>
                    </>
                  )}

                  {genError && (
                    <div className="bg-red-950 border border-red-800 text-red-300 rounded-md px-4 py-3 text-sm">
                      {genError}
                    </div>
                  )}

                  <button
                    onClick={() => submitBirthData(r)}
                    disabled={generating}
                    className="btn-gold w-full"
                  >
                    {generating ? "Generating your reading…" : "Generate My Reading"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Completed readings */}
      {completeReadings.length > 0 && (
        <div>
          <h2 className="text-gold-400 font-serif text-lg mb-4">Your Readings</h2>
          <div className="space-y-4">
            {completeReadings.map((r) => (
              <div key={r.id} className="card-dark">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-xs text-gold-500 uppercase tracking-wider">
                      {tierLabel[r.tier]}
                    </span>
                    {r.birthName && (
                      <p className="text-stone-200 font-serif">{r.birthName}</p>
                    )}
                    <p className="text-stone-500 text-xs">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedReading(selectedReading?.id === r.id ? null : r)}
                    className="btn-outline text-sm py-2 px-4"
                  >
                    {selectedReading?.id === r.id ? "Collapse" : "Read"}
                  </button>
                </div>

                {selectedReading?.id === r.id && r.content && (
                  <div className="border-t border-midnight-700 pt-4">
                    <div
                      className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: r.content
                          .replace(/\*\*(.*?)\*\*/g, "<strong class='text-gold-300'>$1</strong>")
                          .replace(/^## (.*$)/gm, "<h2 class='text-gold-400 font-serif text-lg mt-6 mb-2'>$1</h2>")
                          .replace(/^### (.*$)/gm, "<h3 class='text-gold-300 font-serif mt-4 mb-1'>$1</h3>"),
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-stone-400">
        Loading dashboard…
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
