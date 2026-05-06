export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { generateReading, ReadingTier, BirthData } from "@/lib/claude";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  tier: z.enum(["free", "full", "timing"]),
  birthName: z.string().min(1),
  birthDate: z.string().min(1),
  birthTime: z.string().optional(),
  birthPlace: z.string().min(1),
  gender: z.string().optional(),
  chartData: z.string().optional(),
  focusAreas: z.string().optional(),
  firdariaData: z.string().optional(),
  solarRevolutionData: z.string().optional(),
  email: z.string().email().optional(),
  readingId: z.string().optional(), // For paid tiers, created by webhook first
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const birthData: BirthData = {
    birthName: data.birthName,
    birthDate: data.birthDate,
    birthTime: data.birthTime,
    birthPlace: data.birthPlace,
    gender: data.gender,
    chartData: data.chartData,
    focusAreas: data.focusAreas,
    firdariaData: data.firdariaData,
    solarRevolutionData: data.solarRevolutionData,
  };

  // For paid tiers, a readingId must be provided (created by the Stripe webhook)
  if (data.tier !== "free" && !data.readingId) {
    return NextResponse.json({ error: "readingId required for paid tiers" }, { status: 400 });
  }

  try {
    // Generate the reading
    const content = await generateReading(data.tier as ReadingTier, birthData);

    // For free tier, save the reading to DB if email provided
    if (data.tier === "free") {
      if (data.email) {
        let user = await db.user.findUnique({ where: { email: data.email } });
        if (!user) {
          user = await db.user.create({ data: { email: data.email, name: data.birthName } });
        }
        await db.reading.create({
          data: {
            userId: user.id,
            tier: "FREE",
            status: "COMPLETE",
            birthName: data.birthName,
            birthDate: data.birthDate,
            birthTime: data.birthTime,
            birthPlace: data.birthPlace,
            birthData: birthData as object,
            content,
          },
        });
      }
      return NextResponse.json({ content });
    }

    // For paid tiers, update the existing reading record
    await db.reading.update({
      where: { id: data.readingId },
      data: {
        status: "COMPLETE",
        content,
        birthName: data.birthName,
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        birthPlace: data.birthPlace,
        birthData: birthData as object,
      },
    });

    return NextResponse.json({ content, readingId: data.readingId });
  } catch (err) {
    console.error("Reading generation error:", err);

    if (data.readingId) {
      await db.reading.update({
        where: { id: data.readingId },
        data: { status: "FAILED" },
      }).catch(() => {});
    }

    return NextResponse.json({ error: "Reading generation failed. Please contact support." }, { status: 500 });
  }
}
