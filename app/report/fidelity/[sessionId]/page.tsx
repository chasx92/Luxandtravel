"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertCircle, Loader2, Shield } from "lucide-react";
import { FidelityReportView, type FidelityReportViewData } from "@/components/reports/FidelityReportView";
import { loadFidelityScreenshots } from "@/lib/fidelityClientStorage";
import type { FidelityAutomationPayload } from "@/lib/fidelityAutomation";

type ReportState =
  | { status: "loading"; report: null; message: string }
  | { status: "ready"; report: FidelityReportViewData; payload: FidelityAutomationPayload | null; isDemo: boolean; screenshots: string[] }
  | { status: "error"; report: FidelityReportViewData; payload: FidelityAutomationPayload | null; isDemo: boolean; screenshots: string[]; message: string };

const DEMO_REPORT: FidelityReportViewData = {
  status: "report_ready",
  analysisSource: "fallback",
  riskLevel: "unclear",
  trustScore: 50,
  summary:
    "No paid Fidelity session payload was found in this browser. Once payment/session persistence is connected, this page will load the saved screenshots and context, then show the private Gemini report here.",
  detectedSignals: [],
  importantMoments: [],
  questionsToAsk: [
    "Can you confirm the conversation context?",
    "Were there timing gaps or explanations that felt unclear?",
    "Do you have screenshots from before or after this exchange?",
  ],
  confidence: "low",
  disclaimer:
    "This analysis highlights possible conversation patterns and is not proof of cheating or wrongdoing.",
};

function isFidelityPayload(value: unknown): value is FidelityAutomationPayload {
  if (!value || typeof value !== "object") return false;

  const payload = value as Partial<FidelityAutomationPayload>;
  return (
    payload.service === "fidelity_test" &&
    typeof payload.sessionId === "string" &&
    Array.isArray(payload.screenshots) &&
    typeof payload.screenshotConversationType === "string" &&
    Array.isArray(payload.mainConcerns) &&
    payload.source === "profilefinder_web"
  );
}

function readStoredPayload(routeSessionId: string): FidelityAutomationPayload | null {
  const raw = sessionStorage.getItem("pf_fidelity_automation_payload");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!isFidelityPayload(parsed)) return null;
    if (routeSessionId !== "latest" && parsed.sessionId !== routeSessionId) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readStoredReport(sessionId: string): FidelityReportViewData | null {
  const raw = sessionStorage.getItem(`pf_fidelity_full_report_${sessionId}`);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return parsed?.version === 2 && parsed?.report?.status === "report_ready" ? parsed.report : null;
  } catch {
    return null;
  }
}

export default function FidelityReportPage() {
  const params = useParams<{ sessionId: string }>();
  const routeSessionId = useMemo(() => params?.sessionId || "latest", [params?.sessionId]);
  const [state, setState] = useState<ReportState>({
    status: "loading",
    report: null,
    message: "Preparing your private report...",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadReport() {
      const payload = readStoredPayload(routeSessionId);

      if (!payload) {
        setState({
          status: "ready",
          report: DEMO_REPORT,
          payload: null,
          isDemo: true,
          screenshots: [],
        });
        return;
      }

      const storedScreenshots = await loadFidelityScreenshots(payload.sessionId).catch(() => []);
      const reportPayload = {
        ...payload,
        screenshots: storedScreenshots.length > 0 ? storedScreenshots : payload.screenshots,
      };

      const cachedReport = readStoredReport(payload.sessionId);
      if (cachedReport) {
        setState({ status: "ready", report: cachedReport, payload: reportPayload, isDemo: false, screenshots: reportPayload.screenshots });
        return;
      }

      try {
        const response = await fetch("/api/fidelity/full-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // TODO: Replace this temporary paymentConfirmed flag with server-side Stripe/session verification.
          body: JSON.stringify({ paymentConfirmed: true, payload: reportPayload }),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(
            typeof errorBody?.message === "string"
              ? errorBody.message
              : `Report generation failed with ${response.status}`
          );
        }

        const report = (await response.json()) as FidelityReportViewData;
        sessionStorage.setItem(
          `pf_fidelity_full_report_${payload.sessionId}`,
          JSON.stringify({ version: 2, report })
        );
        sessionStorage.setItem(
          "pf_fidelity_last_report",
          JSON.stringify({
            sessionId: payload.sessionId,
            createdAt: payload.createdAt,
            screenshotsCount: reportPayload.screenshots.length,
            report,
          })
        );

        if (!cancelled) {
          setState({ status: "ready", report, payload: reportPayload, isDemo: false, screenshots: reportPayload.screenshots });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            report: DEMO_REPORT,
            payload,
            isDemo: true,
            screenshots: storedScreenshots,
            message:
              error instanceof Error
                ? error.message
                : "The backend report request could not complete.",
          });
        }
      }
    }

    loadReport();

    return () => {
      cancelled = true;
    };
  }, [routeSessionId]);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen bg-[#fff8f7] px-4 py-10 text-slate-950">
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center text-center">
          <div className="mb-5 rounded-full bg-white p-5 shadow-xl shadow-rose-100">
            <Loader2 className="h-9 w-9 animate-spin text-rose-500" />
          </div>
          <h1 className="text-3xl font-black">Preparing your private report</h1>
          <p className="mt-3 text-slate-600">{state.message}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-bold text-rose-600">
            <Shield className="h-4 w-4" />
            Gemini runs only after payment
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {state.status === "error" && (
        <div className="no-print fixed left-4 right-4 top-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-xl shadow-amber-100">
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-black">Report fallback shown</p>
              <p>{state.message}</p>
              <Link href="/dashboard" className="mt-2 inline-block font-black text-amber-800 underline">
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
      <FidelityReportView
        report={state.report}
        sessionId={state.payload?.sessionId || routeSessionId}
        createdAt={state.payload?.createdAt}
        isDemo={state.isDemo}
        screenshots={state.screenshots}
      />
    </>
  );
}
