import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Astrologia — Traditional Renaissance Natal Readings",
  description:
    "Precise natal chart readings in the tradition of William Lilly and Renaissance astrology. Discover your temperament, career, relationships, health, and timing.",
  keywords: ["natal astrology", "birth chart reading", "traditional astrology", "William Lilly", "Renaissance astrology"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gold-900 bg-midnight-950">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-gold-400 text-xl font-serif tracking-widest hover:text-gold-300">
              ☽ ASTROLOGIA
            </Link>
            <div className="flex gap-6 items-center text-sm text-stone-300">
              <Link href="/readings" className="hover:text-gold-400 transition-colors">Readings</Link>
              <Link href="/about" className="hover:text-gold-400 transition-colors">About</Link>
              <Link href="/start" className="btn-gold text-sm py-2 px-4">Free Snapshot</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-gold-900 mt-20 py-8 text-center text-stone-500 text-sm">
          <p className="mb-1">
            Traditional Renaissance Natal Astrology in the tradition of William Lilly (1647)
          </p>
          <p className="text-xs text-stone-600">
            Readings are for entertainment and self-reflection. Not a substitute for professional advice.
          </p>
        </footer>
      </body>
    </html>
  );
}
