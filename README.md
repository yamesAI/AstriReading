# Astrologia Readings — Traditional Renaissance Natal Astrology

AI-powered natal astrology readings in the William Lilly tradition, sold via a Next.js website with Stripe payments.

---

## Project Structure

```
astrologia-readings/
├── ai-skills/              ← Claude AI prompt modules
│   ├── 00_foundation.md    ← Core reference: dignities, houses, aspects, rulerships
│   ├── 01_skill_temperament.md
│   ├── 02_skill_career_income.md
│   ├── 03_skill_relationships.md
│   ├── 04_skill_health.md
│   ├── 05_skill_timing.md
│   └── 06_skill_full_natal.md   ← Master orchestrator + tier instructions
└── website/                ← Next.js 14 app
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx         ← Home
    │   │   ├── readings/        ← Service catalog
    │   │   ├── about/           ← About the tradition
    │   │   ├── start/           ← Free snapshot (no login)
    │   │   ├── book/            ← Stripe checkout
    │   │   ├── dashboard/       ← Client portal
    │   │   └── api/
    │   │       ├── generate/    ← Claude reading generation
    │   │       ├── checkout/    ← Stripe session creation
    │   │       ├── readings/    ← Reading list lookup
    │   │       └── stripe/webhook/  ← Stripe webhook handler
    │   └── lib/
    │       ├── claude.ts        ← Anthropic SDK + skill loader
    │       ├── stripe.ts        ← Stripe client
    │       └── db.ts            ← Prisma client
    └── prisma/schema.prisma     ← Database schema
```

---

## Pricing Tiers

| Tier | Price | Reading Generated |
|------|-------|-----------------|
| Free Snapshot | $0 (email sign-up) | Skill 01 only — temperament, manners, wit |
| Full Natal Reading | $75 one-time | Skills 01–05 — all life areas |
| Timing Subscription | $27/month | Skill 05 — Firdaria + Solar Revolution |

---

## Setup

### 1. Install dependencies

```bash
cd website
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in:
- `DATABASE_URL` — PostgreSQL connection string (Supabase free tier works)
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32`
- `ANTHROPIC_API_KEY` — from console.anthropic.com
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from Stripe dashboard
- `STRIPE_FULL_READING_PRICE_ID`, `STRIPE_SUBSCRIPTION_PRICE_ID` — create products in Stripe dashboard
- `RESEND_API_KEY` — from resend.com (for email delivery)

### 3. Set up database

```bash
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
```

### 4. Create Stripe products

In your Stripe dashboard, create:
- **Full Natal Reading** — one-time payment, $75
- **Timing Subscription** — recurring, $27/month

Copy the Price IDs into your `.env`.

### 5. Set up Stripe webhook

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

For production, add the webhook endpoint in the Stripe dashboard pointing to:
`https://yourdomain.com/api/stripe/webhook`

### 6. Run development server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## How Readings Are Generated

1. User submits birth data through `/start` (free) or `/dashboard` (paid)
2. `POST /api/generate` receives the request
3. `src/lib/claude.ts` loads the relevant skill prompt files from `../ai-skills/`
4. The skill prompts + birth data are sent to Claude API (`claude-sonnet-4-6`)
5. The generated reading text is saved to the database
6. The user sees their reading in the dashboard

---

## AI Skills Reference

The `ai-skills/` directory contains the technical knowledge extracted from Christopher Warnock's Renaissance Natal Astrology course:

| Skill | Source | Technical Content |
|-------|--------|-----------------|
| 00_foundation | Lessons 1–4 | Dignities, houses, aspects, rulerships |
| 01_temperament | Lesson 5 | Gadbury's 6-factor method, manners, wit |
| 02_career_income | Lesson 6 | 2nd/10th house analysis, Bonatti timing |
| 03_relationships | Lesson 8 | Marriage significators, fertility |
| 04_health | Lesson 7 | Constitutional assessment, illness significators |
| 05_timing | Lesson 11 | Firdaria periods, Solar Revolution |
| 06_full_natal | All | Master orchestrator + tier output rules |

---

## Deployment

Recommended: **Vercel** (zero-config Next.js deployment)

```bash
npm run build   # Verify build passes
vercel deploy
```

Set all environment variables in the Vercel dashboard.

Database: **Supabase** (free tier PostgreSQL, direct connection string for Prisma).
