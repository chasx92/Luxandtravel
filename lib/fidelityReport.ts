import "server-only";

import { generateGeminiContent, type GeminiPart } from "@/lib/gemini";
import type { FidelityAutomationPayload, FidelityConversationType } from "@/lib/fidelityAutomation";

export type FidelityReportSignal = {
  type: string;
  severity: "low" | "medium" | "high";
  title: string;
  explanation: string;
};

export type FidelityImportantMoment = {
  moment: string;
  whyItMatters: string;
};

export type FidelityFullReport = {
  status: "report_ready";
  analysisSource: "gemini" | "fallback";
  riskLevel: "low" | "moderate" | "high" | "unclear";
  trustScore: number;
  summary: string;
  detectedSignals: FidelityReportSignal[];
  importantMoments: FidelityImportantMoment[];
  questionsToAsk: string[];
  confidence: "low" | "medium" | "high";
  disclaimer: string;
};

const FALLBACK_REPORT: FidelityFullReport = {
  status: "report_ready",
  analysisSource: "fallback",
  riskLevel: "unclear",
  trustScore: 50,
  summary:
    "The available material was not enough to produce a confident analysis. A cautious review may still help identify possible conversation patterns once clearer screenshots are available.",
  detectedSignals: [],
  importantMoments: [],
  questionsToAsk: [
    "Can you share the missing context around this conversation?",
    "Were there any timing gaps or explanations that felt unclear?",
    "Is there another screenshot that shows what happened before or after?",
  ],
  confidence: "low",
  disclaimer:
    "This report highlights possible signals and conversation patterns. It is not proof of cheating, dishonesty, or wrongdoing.",
};

const conversationDescriptions: Record<FidelityConversationType, string> = {
  me_and_them: "The screenshots are between the user and the person concerned.",
  them_and_someone_else: "The screenshots are between the person concerned and someone else.",
  group_chat: "The screenshots are from a group chat.",
  not_sure: "The user is not sure who all participants are.",
};

const genderDescriptions = {
  male: "man",
  female: "woman",
};

function parseDataUrlImage(value: string): { mimeType: string; data: string } | null {
  const match = value.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;

  return {
    mimeType: match[1],
    data: match[2],
  };
}

function buildImageParts(screenshots: string[]): GeminiPart[] {
  return screenshots
    .map(parseDataUrlImage)
    .filter((image): image is { mimeType: string; data: string } => Boolean(image))
    .slice(0, 6)
    .map((image) => ({
      inline_data: {
        mimeType: image.mimeType,
        data: image.data,
      },
    }));
}

function extractJson(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return fenced?.[1] || trimmed;
}

function normalizeSeverity(value: unknown): "low" | "medium" | "high" {
  return value === "medium" || value === "high" ? value : "low";
}

function normalizeReport(response: unknown): FidelityFullReport {
  if (!response || typeof response !== "object") return FALLBACK_REPORT;

  const raw = response as Partial<FidelityFullReport>;
  const riskLevel =
    raw.riskLevel === "low" ||
    raw.riskLevel === "moderate" ||
    raw.riskLevel === "high" ||
    raw.riskLevel === "unclear"
      ? raw.riskLevel
      : "unclear";

  const confidence =
    raw.confidence === "medium" || raw.confidence === "high" ? raw.confidence : "low";

  const detectedSignals = Array.isArray(raw.detectedSignals)
    ? raw.detectedSignals.slice(0, 6).map((signal) => ({
        type: typeof signal?.type === "string" ? signal.type : "conversation_pattern",
        severity: normalizeSeverity(signal?.severity),
        title: typeof signal?.title === "string" ? signal.title : "Possible signal",
        explanation:
          typeof signal?.explanation === "string"
            ? signal.explanation
            : "This may suggest a pattern worth reviewing with more context.",
      }))
    : [];

  const importantMoments = Array.isArray(raw.importantMoments)
    ? raw.importantMoments.slice(0, 5).map((moment) => ({
        moment: typeof moment?.moment === "string" ? moment.moment : "Unclear moment",
        whyItMatters:
          typeof moment?.whyItMatters === "string"
            ? moment.whyItMatters
            : "This may matter if it connects to timing, tone, or context.",
      }))
    : [];

  const questionsToAsk = Array.isArray(raw.questionsToAsk)
    ? raw.questionsToAsk.filter((question): question is string => typeof question === "string").slice(0, 5)
    : FALLBACK_REPORT.questionsToAsk;

  return {
    status: "report_ready",
    analysisSource: "gemini",
    riskLevel,
    trustScore:
      typeof raw.trustScore === "number" && Number.isFinite(raw.trustScore)
        ? Math.max(0, Math.min(100, Math.round(raw.trustScore)))
        : FALLBACK_REPORT.trustScore,
    summary: typeof raw.summary === "string" ? raw.summary : FALLBACK_REPORT.summary,
    detectedSignals,
    importantMoments,
    questionsToAsk: questionsToAsk.length > 0 ? questionsToAsk : FALLBACK_REPORT.questionsToAsk,
    confidence,
    disclaimer:
      typeof raw.disclaimer === "string" ? raw.disclaimer : FALLBACK_REPORT.disclaimer,
  };
}

function buildFidelityPrompt(payload: FidelityAutomationPayload) {
  return `
You are analyzing chat screenshots for Profilefinder's paid Fidelity Test full report.

Use the uploaded screenshots and user context to identify possible conversation signals, patterns, inconsistencies, time gaps, or trust-related indicators.

Conversation type:
${conversationDescriptions[payload.screenshotConversationType]}

Person name or nickname:
${payload.personNameOrNickname || "Not provided"}

User gender:
${payload.customerGender ? genderDescriptions[payload.customerGender] : "Not provided"}

Person concerned gender:
${payload.conversationPartnerGender ? genderDescriptions[payload.conversationPartnerGender] : "Not provided"}

Main concerns:
${payload.mainConcerns.length > 0 ? payload.mainConcerns.join(", ") : "general_trust_analysis"}

User context:
${payload.userContext || "No extra context provided"}

Analysis rules:
- Never say "cheating detected".
- Never accuse anyone directly.
- Never present signals as proof.
- Use careful wording: possible, signals, patterns, indicators, may suggest.
- If screenshots are unclear, set confidence to "low".
- If there is not enough evidence, say so clearly.
- Keep the report concise.
- Adapt the analysis to the conversation type.

Return only valid JSON matching this exact shape:

{
  "status": "report_ready",
  "riskLevel": "low" | "moderate" | "high" | "unclear",
  "trustScore": number,
  "summary": string,
  "detectedSignals": [
    {
      "type": string,
      "severity": "low" | "medium" | "high",
      "title": string,
      "explanation": string
    }
  ],
  "importantMoments": [
    {
      "moment": string,
      "whyItMatters": string
    }
  ],
  "questionsToAsk": string[],
  "confidence": "low" | "medium" | "high",
  "disclaimer": string
}
`.trim();
}

export async function generateFidelityReport(
  payload: FidelityAutomationPayload
): Promise<FidelityFullReport> {
  const imageParts = buildImageParts(payload.screenshots);
  const parts: GeminiPart[] = [{ text: buildFidelityPrompt(payload) }, ...imageParts];

  if (imageParts.length === 0) {
    parts.push({
      text:
        "No image parts were available. The screenshots may currently be local references or URLs that need private storage upload before Gemini vision analysis.",
    });
  }

  try {
    const responseText = await generateGeminiContent({
      parts,
      model: "gemini-2.5-flash",
      temperature: 0.15,
      thinkingBudget: 1024,
      maxOutputTokens: 1600,
    });
    return normalizeReport(JSON.parse(extractJson(responseText)));
  } catch {
    return FALLBACK_REPORT;
  }
}
