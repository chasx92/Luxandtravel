import { NextResponse } from "next/server";
import { cleanGeminiError, generateGeminiContentResult, type GeminiPart } from "@/lib/gemini";

type AnalyzeScreenshotBody = {
  context?: unknown;
  imageBase64?: unknown;
  mimeType?: unknown;
};

type FidelityScreenshotAnalysis = {
  extractedMessages: string[];
  concernScore: number;
  redFlags: string[];
  ambiguitySignals: string[];
  uncertainty: string;
  followUpQuestions: string[];
};

const FALLBACK_ANALYSIS: FidelityScreenshotAnalysis = {
  extractedMessages: [],
  concernScore: 0,
  redFlags: [],
  ambiguitySignals: ["The screenshot could not be analyzed with enough confidence."],
  uncertainty: "high",
  followUpQuestions: ["Can you upload a clearer screenshot or add more conversation context?"],
};

function stripDataUrlPrefix(value: string) {
  return value.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "");
}

function extractJson(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return fenced?.[1] || trimmed;
}

function toStringArray(value: unknown, maxItems: number) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, maxItems)
    : [];
}

function normalizeAnalysis(value: unknown): FidelityScreenshotAnalysis {
  if (!value || typeof value !== "object") return FALLBACK_ANALYSIS;

  const raw = value as Partial<FidelityScreenshotAnalysis>;
  const concernScore =
    typeof raw.concernScore === "number" && Number.isFinite(raw.concernScore)
      ? Math.max(0, Math.min(100, Math.round(raw.concernScore)))
      : 0;

  return {
    extractedMessages: toStringArray(raw.extractedMessages, 20),
    concernScore,
    redFlags: toStringArray(raw.redFlags, 10),
    ambiguitySignals: toStringArray(raw.ambiguitySignals, 10),
    uncertainty: typeof raw.uncertainty === "string" ? raw.uncertainty : "high",
    followUpQuestions: toStringArray(raw.followUpQuestions, 8),
  };
}

function buildPrompt(context: string) {
  return `
You are the first Fidelity Test vision endpoint for ProfileFinder.

Analyze the uploaded chat screenshot and the user context.

User context:
${context || "No extra context provided."}

Rules:
- Extract visible messages only when readable.
- Identify possible concern signals, ambiguity signals, and useful follow-up questions.
- Never say cheating is proven with certainty.
- Never accuse anyone directly.
- Use cautious wording: possible, may suggest, could indicate, unclear.
- If the image is unclear or context is missing, increase uncertainty and ask follow-up questions.

Return only valid JSON with this exact shape:
{
  "extractedMessages": string[],
  "concernScore": number,
  "redFlags": string[],
  "ambiguitySignals": string[],
  "uncertainty": string,
  "followUpQuestions": string[]
}
`.trim();
}

export async function POST(request: Request) {
  let body: AnalyzeScreenshotBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json", message: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.imageBase64 !== "string" || body.imageBase64.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "missing_image", message: "imageBase64 is required" }, { status: 400 });
  }

  if (typeof body.mimeType !== "string" || !body.mimeType.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "invalid_mime_type", message: "mimeType must be an image type" }, { status: 400 });
  }

  const context =
    typeof body.context === "string"
      ? body.context
      : body.context
        ? JSON.stringify(body.context)
        : "";

  const parts: GeminiPart[] = [
    { text: buildPrompt(context) },
    {
      inline_data: {
        mime_type: body.mimeType,
        data: stripDataUrlPrefix(body.imageBase64),
      },
    },
  ];

  try {
    const result = await generateGeminiContentResult({
      model: "gemini-2.5-flash",
      parts,
      temperature: 0.2,
      thinkingBudget: 1024,
      maxOutputTokens: 1400,
    });

    return NextResponse.json({
      ok: true,
      model: result.model,
      ...normalizeAnalysis(JSON.parse(extractJson(result.text))),
      usageMetadata: result.usageMetadata,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { ok: false, error: "invalid_gemini_json", message: "Gemini returned non-JSON content" },
        { status: 502 }
      );
    }

    const cleanError = cleanGeminiError(error);
    return NextResponse.json(cleanError, { status: cleanError.status });
  }
}
