"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Crown,
  Download,
  HelpCircle,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  UserSearch,
} from "lucide-react";

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

export type FidelityReportViewData = {
  status: "report_ready";
  riskLevel: "low" | "moderate" | "high" | "unclear";
  trustScore: number;
  summary: string;
  detectedSignals: FidelityReportSignal[];
  importantMoments: FidelityImportantMoment[];
  questionsToAsk: string[];
  confidence: "low" | "medium" | "high";
  disclaimer: string;
};

type FidelityReportViewProps = {
  report: FidelityReportViewData;
  sessionId?: string;
  createdAt?: string;
  isDemo?: boolean;
};

const severityStyles = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-rose-50 text-rose-700 border-rose-200",
};

const riskStyles = {
  low: "text-emerald-700 bg-emerald-50 border-emerald-200",
  moderate: "text-amber-700 bg-amber-50 border-amber-200",
  high: "text-rose-700 bg-rose-50 border-rose-200",
  unclear: "text-slate-700 bg-slate-50 border-slate-200",
};

const recommendedChecks = [
  {
    id: "dating",
    title: "Dating Search",
    href: "/dating-search",
    icon: Search,
    keywords: ["flirt", "romantic", "dating", "tone", "intimate"],
    description: "Check if they may have an active dating profile.",
  },
  {
    id: "face",
    title: "Face Trace",
    href: "/face-trace",
    icon: UserSearch,
    keywords: ["photo", "image", "identity", "picture", "profile"],
    description: "Search if their photos appear elsewhere online.",
  },
  {
    id: "following",
    title: "Following AI",
    href: "/following-ai",
    icon: Sparkles,
    keywords: ["social", "follow", "instagram", "activity", "pattern"],
    description: "Analyze new follows and suspicious social patterns.",
  },
];

const suggestedQuestions = [
  "What are the top signals?",
  "What should I ask them?",
  "Why is this moment important?",
  "Does the tone seem suspicious?",
];

function getRecommendedChecks(report: FidelityReportViewData) {
  const signalText = report.detectedSignals
    .map((signal) => `${signal.type} ${signal.title} ${signal.explanation}`)
    .join(" ")
    .toLowerCase();

  const matched = recommendedChecks.filter((check) =>
    check.keywords.some((keyword) => signalText.includes(keyword))
  );

  return matched.length > 0 ? matched : recommendedChecks;
}

function formatLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function FidelityReportView({ report, sessionId, createdAt, isDemo }: FidelityReportViewProps) {
  const checks = getRecommendedChecks(report);
  const score = Math.max(0, Math.min(100, Math.round(report.trustScore)));

  return (
    <div className="min-h-screen bg-[#fff8f7] text-slate-950 print:bg-white">
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          body {
            background: #ffffff !important;
          }

          .print-card {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
            break-inside: avoid;
          }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none no-print">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-300/30 blur-3xl" />
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <header className="relative border-b border-rose-100 bg-white/80 backdrop-blur-xl no-print">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
              alt="ProfileFinder"
              className="h-8 w-8"
            />
            <span className="text-lg font-black text-slate-950">ProfileFinder</span>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-rose-200 hover:text-rose-600"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <section className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-bold text-rose-600 shadow-sm">
            <Shield className="h-4 w-4" />
            Private paid report
          </div>
          <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Your private Fidelity report is ready
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Based on the screenshots and context you provided.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            {sessionId && <span>Session: {sessionId}</span>}
            {createdAt && <span>Created: {new Date(createdAt).toLocaleDateString()}</span>}
            {isDemo && <span className="font-semibold text-amber-700">Demo data</span>}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="print-card rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">Trust Score</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-6xl font-black text-slate-950">{score}</span>
                  <span className="pb-2 text-xl font-black text-slate-400">/100</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 p-3 text-white shadow-lg shadow-rose-200">
                <CheckCircle2 className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className={`rounded-2xl border px-4 py-3 ${riskStyles[report.riskLevel]}`}>
                <p className="text-xs font-bold uppercase tracking-wide opacity-70">Risk Level</p>
                <p className="mt-1 text-lg font-black">{formatLabel(report.riskLevel)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                <p className="text-xs font-bold uppercase tracking-wide opacity-70">Confidence</p>
                <p className="mt-1 text-lg font-black">{formatLabel(report.confidence)}</p>
              </div>
            </div>
          </div>

          <div className="print-card rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-rose-500">Summary</p>
            <p className="text-lg leading-8 text-slate-700">{report.summary}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="print-card rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
              <h2 className="text-2xl font-black text-slate-950">Detected Signals</h2>
              <div className="mt-5 space-y-3">
                {report.detectedSignals.length > 0 ? (
                  report.detectedSignals.map((signal, index) => (
                    <div key={`${signal.title}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black ${severityStyles[signal.severity]}`}>
                          {formatLabel(signal.severity)}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                          {formatLabel(signal.type)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-black text-slate-950">{signal.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{signal.explanation}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
                    No specific signals were strong enough to highlight from the available screenshots.
                  </div>
                )}
              </div>
            </div>

            <div className="print-card rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
              <h2 className="text-2xl font-black text-slate-950">Important Moments</h2>
              <div className="mt-5 space-y-3">
                {report.importantMoments.length > 0 ? (
                  report.importantMoments.map((moment, index) => (
                    <div key={`${moment.moment}-${index}`} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
                      <p className="font-black text-slate-950">{moment.moment}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{moment.whyItMatters}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
                    No clear moment stood out. This can happen when screenshots are partial, cropped, or missing context.
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="print-card rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
              <h2 className="text-xl font-black text-slate-950">Questions to Ask</h2>
              <div className="mt-4 space-y-3">
                {report.questionsToAsk.map((question, index) => (
                  <div key={`${question}-${index}`} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    {question}
                  </div>
                ))}
              </div>
            </div>

            <div className="print-card rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-sm leading-6 text-amber-900">
                  {report.disclaimer || "This analysis highlights possible conversation patterns and is not proof of cheating or wrongdoing."}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70 no-print">
              <h2 className="text-xl font-black text-slate-950">Actions</h2>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-3 font-black text-white shadow-lg shadow-rose-200 transition hover:scale-[1.01]"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </button>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black text-slate-700 transition hover:border-rose-200 hover:text-rose-600"
                >
                  Back to Dashboard
                </Link>
                <Link
                  href="/dating-search"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-3 font-black text-rose-700 transition hover:bg-rose-100"
                >
                  Run additional checks
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr] no-print">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
            <h2 className="text-2xl font-black text-slate-950">Recommended checks</h2>
            <p className="mt-2 text-sm text-slate-600">Optional tools that can strengthen your report without changing this analysis.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {checks.map((check) => {
                const Icon = check.icon;
                return (
                  <Link
                    key={check.id}
                    href={check.href}
                    className="rounded-2xl border border-rose-100 bg-gradient-to-b from-white to-rose-50 p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-100"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-black text-slate-950">{check.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{check.description}</p>
                    <p className="mt-4 text-sm font-black text-rose-600">Run this check</p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 font-black">
                    <Crown className="h-5 w-5 text-yellow-300" />
                    Unlock all tools
                  </div>
                  <p className="mt-1 text-sm text-white/70">Upgrade to access every Profilefinder report.</p>
                </div>
                <Link href="/payment?plan=subscription" className="rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950">
                  Upgrade
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/70">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-rose-500" />
              <h2 className="text-2xl font-black text-slate-950">Ask about this report</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600">Coming soon: ask follow-up questions using this report as context.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400"
                >
                  <HelpCircle className="h-4 w-4" />
                  {question}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
