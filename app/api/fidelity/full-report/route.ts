import { NextResponse } from "next/server";
import { generateFidelityReport } from "@/lib/fidelityReport";
import type { FidelityAutomationPayload } from "@/lib/fidelityAutomation";

type FullReportRequestBody = {
  paymentConfirmed?: boolean;
  devMode?: boolean;
  payload?: FidelityAutomationPayload;
};

function isValidPayload(payload: Partial<FidelityAutomationPayload> | undefined): payload is FidelityAutomationPayload {
  return (
    Boolean(payload) &&
    payload?.service === "fidelity_test" &&
    typeof payload.sessionId === "string" &&
    Array.isArray(payload.screenshots) &&
    (payload.customerGender === "male" || payload.customerGender === "female" || payload.customerGender === null || payload.customerGender === undefined) &&
    (payload.conversationPartnerGender === "male" || payload.conversationPartnerGender === "female" || payload.conversationPartnerGender === null || payload.conversationPartnerGender === undefined) &&
    typeof payload.screenshotConversationType === "string" &&
    Array.isArray(payload.mainConcerns) &&
    payload.source === "profilefinder_web"
  );
}

export async function POST(request: Request) {
  let body: FullReportRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const canRunInDev = process.env.NODE_ENV !== "production" && body.devMode === true;

  if (!body.paymentConfirmed && !canRunInDev) {
    return NextResponse.json(
      {
        error: "payment_required",
        message: "Fidelity full report generation must run only after payment succeeds.",
      },
      { status: 402 }
    );
  }

  // TODO: After payment/session persistence is connected, load the payload by sessionId/orderId server-side.
  // For now, this route accepts a dev/test payload so Gemini can be tested locally.
  if (!isValidPayload(body.payload)) {
    return NextResponse.json({ error: "Missing or invalid Fidelity payload" }, { status: 400 });
  }

  const report = await generateFidelityReport(body.payload);
  return NextResponse.json(report);
}
