import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SKILLS_DIR = join(process.cwd(), "..", "ai-skills");

function loadSkill(filename: string): string {
  return readFileSync(join(SKILLS_DIR, filename), "utf-8");
}

function buildSystemPrompt(tier: "free" | "full" | "timing"): string {
  const foundation = loadSkill("00_foundation.md");
  const fullNatal = loadSkill("06_skill_full_natal.md");

  if (tier === "free") {
    const temperament = loadSkill("01_skill_temperament.md");
    return [
      "You are an expert traditional Renaissance natal astrologer.",
      "FOUNDATION REFERENCE:\n" + foundation,
      "SKILL MODULE — TEMPERAMENT:\n" + temperament,
      "MASTER INSTRUCTIONS:\n" + fullNatal,
      "TIER: FREE — Generate ONLY the Temperament & Character section (Section 2).",
      "Keep the output to 350-450 words.",
      "End with: 'This is your complimentary Temperament Snapshot. To receive your complete natal reading — including career, income, relationships, health, and timing — visit our readings page.'",
    ].join("\n\n---\n\n");
  }

  if (tier === "timing") {
    const timing = loadSkill("05_skill_timing.md");
    return [
      "You are an expert traditional Renaissance natal astrologer.",
      "FOUNDATION REFERENCE:\n" + foundation,
      "SKILL MODULE — TIMING:\n" + timing,
      "MASTER INSTRUCTIONS:\n" + fullNatal,
      "TIER: TIMING SUBSCRIPTION — Generate ONLY Section 6 (Timing), labeled as a Monthly Timing Update.",
    ].join("\n\n---\n\n");
  }

  // Full reading
  const temperament = loadSkill("01_skill_temperament.md");
  const careerIncome = loadSkill("02_skill_career_income.md");
  const relationships = loadSkill("03_skill_relationships.md");
  const health = loadSkill("04_skill_health.md");
  const timing = loadSkill("05_skill_timing.md");

  return [
    "You are an expert traditional Renaissance natal astrologer.",
    "FOUNDATION REFERENCE:\n" + foundation,
    "SKILL 01 — TEMPERAMENT:\n" + temperament,
    "SKILL 02 — CAREER & INCOME:\n" + careerIncome,
    "SKILL 03 — RELATIONSHIPS:\n" + relationships,
    "SKILL 04 — HEALTH:\n" + health,
    "SKILL 05 — TIMING:\n" + timing,
    "MASTER INSTRUCTIONS:\n" + fullNatal,
    "TIER: FULL — Generate the complete natal reading with all 7 sections.",
  ].join("\n\n---\n\n");
}

export type ReadingTier = "free" | "full" | "timing";

export interface BirthData {
  birthName: string;
  birthDate: string;
  birthTime?: string;
  birthPlace: string;
  gender?: string;
  chartData?: string; // Raw chart data from Solar Fire or similar
  focusAreas?: string;
  firdariaData?: string; // For timing tier
  solarRevolutionData?: string; // For timing tier
}

export async function generateReading(
  tier: ReadingTier,
  birthData: BirthData
): Promise<string> {
  const systemPrompt = buildSystemPrompt(tier);

  const userMessage = `Please generate a ${tier === "free" ? "Temperament Snapshot" : tier === "timing" ? "Monthly Timing Update" : "Full Natal Reading"} for the following client:

**Name:** ${birthData.birthName}
**Date of Birth:** ${birthData.birthDate}
**Time of Birth:** ${birthData.birthTime || "Unknown (using noon chart)"}
**Place of Birth:** ${birthData.birthPlace}
**Gender:** ${birthData.gender || "Not specified"}

${birthData.chartData ? `**Chart Data:**\n${birthData.chartData}` : ""}
${birthData.focusAreas ? `**Client's Focus Areas:** ${birthData.focusAreas}` : ""}
${birthData.firdariaData ? `**Firdaria Data:** ${birthData.firdariaData}` : ""}
${birthData.solarRevolutionData ? `**Solar Revolution Data:** ${birthData.solarRevolutionData}` : ""}

Please generate the reading now, following the skill module instructions precisely.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: tier === "free" ? 1024 : 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type from Claude");
  return content.text;
}
