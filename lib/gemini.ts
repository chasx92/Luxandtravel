import "server-only";

type GeminiInlineDataPart = {
  inline_data: {
    mimeType: string;
    data: string;
  };
};

type GeminiTextPart = {
  text: string;
};

export type GeminiPart = GeminiTextPart | GeminiInlineDataPart;

type GeminiGenerateContentOptions = {
  parts: GeminiPart[];
  model?: string;
  temperature?: number;
  thinkingBudget?: number;
  maxOutputTokens?: number;
  responseMimeType?: "application/json" | "text/plain";
};

export type GeminiUsageMetadata = Record<string, unknown>;

export type GeminiGenerateContentResult = {
  model: string;
  text: string;
  usageMetadata?: GeminiUsageMetadata;
  raw: unknown;
};

export class GeminiApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "GeminiApiError";
    this.status = status;
    this.details = details;
  }
}

export const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function getGeminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

export function cleanGeminiError(error: unknown) {
  if (error instanceof GeminiApiError) {
    return {
      ok: false,
      error: "gemini_error",
      message: error.message,
      status: error.status,
    };
  }

  return {
    ok: false,
    error: "gemini_error",
    message: error instanceof Error ? error.message : "Gemini request failed",
    status: 500,
  };
}

export async function generateGeminiContentResult({
  parts,
  model = DEFAULT_GEMINI_MODEL,
  temperature = 0.2,
  thinkingBudget,
  maxOutputTokens = 1400,
  responseMimeType = "application/json",
}: GeminiGenerateContentOptions): Promise<GeminiGenerateContentResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new GeminiApiError("Missing GEMINI_API_KEY", 500);
  }

  const generationConfig: Record<string, unknown> = {
    temperature,
    maxOutputTokens,
    responseMimeType,
  };

  if (typeof thinkingBudget === "number") {
    generationConfig.thinkingConfig = { thinkingBudget };
  }

  const response = await fetch(`${getGeminiUrl(model)}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : `Gemini request failed with status ${response.status}`;
    throw new GeminiApiError(message, response.status, data);
  }

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text)
    .filter(Boolean)
    .join("\n");

  if (!text) {
    throw new GeminiApiError("Gemini returned an empty response", 502, data);
  }

  return {
    model,
    text,
    usageMetadata: data?.usageMetadata,
    raw: data,
  };
}

export async function generateGeminiContent(options: GeminiGenerateContentOptions): Promise<string> {
  const result = await generateGeminiContentResult(options);
  return result.text;
}
