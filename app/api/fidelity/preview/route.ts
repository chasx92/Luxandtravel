import { NextResponse } from "next/server";
import { FIDELITY_PREVIEW_FALLBACK } from "@/lib/fidelityAutomation";

export async function POST() {
  return NextResponse.json(FIDELITY_PREVIEW_FALLBACK);
}
