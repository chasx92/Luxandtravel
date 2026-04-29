import { NextResponse } from "next/server";
import { cleanGeminiError, generateGeminiContentResult } from "@/lib/gemini";

export async function GET() {
  try {
    const result = await generateGeminiContentResult({
      model: "gemini-2.5-flash",
      parts: [{ text: "Reply with exactly this JSON: {\"message\":\"gemini-ok\"}" }],
      temperature: 0,
      thinkingBudget: 0,
      maxOutputTokens: 80,
    });

    return NextResponse.json({
      ok: true,
      model: result.model,
      text: result.text,
      usageMetadata: result.usageMetadata,
    });
  } catch (error) {
    const cleanError = cleanGeminiError(error);
    return NextResponse.json(cleanError, { status: cleanError.status });
  }
}

export async function POST() {
  return GET();
}
