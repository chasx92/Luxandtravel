import "server-only";

type GeminiInlineDataPart = {
  inlineData: {
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
  temperature?: number;
  maxOutputTokens?: number;
};

const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function generateGeminiContent({
  parts,
  temperature = 0.2,
  maxOutputTokens = 1400,
}: GeminiGenerateContentOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature,
        maxOutputTokens,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text)
    .filter(Boolean)
    .join("\n");

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}
