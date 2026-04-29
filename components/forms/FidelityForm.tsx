"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Eye,
  Heart,
  ImagePlus,
  Loader2,
  Lock,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCircle,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FIDELITY_PREVIEW_FALLBACK,
  createFidelitySessionId,
  prepareFidelityAutomationPayload,
  type FidelityPreviewResponse,
} from "@/lib/fidelityAutomation";
import { serviceContent } from "../../lib/content";
import { TrustPanel } from "../ui/TrustPanel";
import "@/styles/dating-search.css";

type RelationshipType = "me_and_target" | "target_and_someone_else" | "group_chat";
type FocusArea =
  | "time_gaps"
  | "romantic_or_flirty_tone"
  | "story_does_not_match"
  | "hidden_or_deleted_parts"
  | "general_trust_analysis";

type CrossCheckKey = "datingSearch" | "faceTrace" | "followingAI";

type FidelityAnalysisPayload = {
  service: "fidelity_test";
  screenshots: File[];
  conversationWith: RelationshipType | "";
  personNameOrNickname: string;
  focusAreas: FocusArea[];
  userContext: string;
  approximateDate: string;
  explanationGiven: string;
  concern: string;
  crossChecks: Record<CrossCheckKey, boolean>;
};

const relationshipOptions: Array<{ value: RelationshipType; label: string }> = [
  { value: "me_and_target", label: "Me and the person concerned" },
  { value: "target_and_someone_else", label: "The person concerned and someone else" },
  { value: "group_chat", label: "A group chat" },
];

const focusOptions: Array<{ value: FocusArea; label: string }> = [
  { value: "romantic_or_flirty_tone", label: "Does it feel flirty or romantic?" },
  { value: "story_does_not_match", label: "Does their story feel inconsistent?" },
  { value: "time_gaps", label: "Are there strange gaps or timing issues?" },
  { value: "hidden_or_deleted_parts", label: "Do parts look hidden, deleted, or unclear?" },
  { value: "general_trust_analysis", label: "Give me a general trust analysis" },
];

const crossCheckOptions: Array<{
  key: CrossCheckKey;
  Icon: typeof Search;
  title: string;
  description: string;
}> = [
  {
    key: "datingSearch",
    Icon: Heart,
    title: "Dating Search",
    description: "Check if they may have an active dating profile.",
  },
  {
    key: "faceTrace",
    Icon: Eye,
    title: "Face Trace",
    description: "Search if their photos appear elsewhere.",
  },
  {
    key: "followingAI",
    Icon: UserCircle,
    title: "Following AI",
    description: "Review new follows and suspicious social patterns.",
  },
];

const scanLabels = [
  "Reading conversation",
  "Checking time gaps",
  "Detecting behavior patterns",
  "Preparing private report",
];

export function FidelityForm() {
  const router = useRouter();
  const content = serviceContent.fidelity.form;
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef(createFidelitySessionId());

  const [currentStep, setCurrentStep] = useState(0);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [conversationWith, setConversationWith] = useState<RelationshipType | "">("");
  const [personNameOrNickname, setPersonNameOrNickname] = useState("");
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(["general_trust_analysis"]);
  const [userContext, setUserContext] = useState("");
  const [crossChecks, setCrossChecks] = useState<Record<CrossCheckKey, boolean>>({
    datingSearch: false,
    faceTrace: false,
    followingAI: false,
  });
  const [scanPercent, setScanPercent] = useState(0);
  const [activeScanLabels, setActiveScanLabels] = useState<number[]>([0]);
  const [previewResponse, setPreviewResponse] = useState<FidelityPreviewResponse>(FIDELITY_PREVIEW_FALLBACK);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setScreenshots((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    setCurrentStep(1);
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setScreenshots((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
    setPreviews((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const toggleFocusArea = (value: FocusArea) => {
    setFocusAreas((prev) => {
      if (prev.includes(value)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  const toggleCrossCheck = (key: CrossCheckKey) => {
    setCrossChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const prepareFidelityAnalysisPayload = (): FidelityAnalysisPayload => ({
    service: "fidelity_test",
    screenshots,
    conversationWith,
    personNameOrNickname: personNameOrNickname.trim(),
    focusAreas,
    userContext: userContext.trim(),
    approximateDate: "",
    explanationGiven: "",
    concern: "",
    crossChecks,
  });

  const prepareCurrentAutomationPayload = () =>
    prepareFidelityAutomationPayload({
      screenshots,
      previews,
      conversationWith,
      personNameOrNickname,
      focusAreas,
      userContext,
      sessionId: sessionIdRef.current,
    });

  const persistFidelityAnalysisPayload = () => {
    if (typeof window === "undefined") return;

    const payload = prepareFidelityAnalysisPayload();
    const automationPayload = prepareCurrentAutomationPayload();
    sessionStorage.setItem("pf_fidelity_uploads", JSON.stringify(previews));
    sessionStorage.setItem("pf_fidelity_automation_payload", JSON.stringify(automationPayload));
    sessionStorage.setItem(
      "pf_fidelity_analysis_payload",
      JSON.stringify({
        ...payload,
        screenshots: screenshots.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        })),
      })
    );
  };

  const startFidelityScanPreview = () => {
    persistFidelityAnalysisPayload();
    setCurrentStep(6);
    setScanPercent(0);
    setActiveScanLabels([0]);
    setPreviewResponse(FIDELITY_PREVIEW_FALLBACK);

    scanLabels.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveScanLabels((prev) => (prev.includes(index) ? prev : [...prev, index]));
      }, index * 650);
    });

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 4;
      setScanPercent(Math.min(progress, 100));

      if (progress >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setCurrentStep(7), 450);
      }
    }, 110);
  };

  const submitFidelityLead = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    persistFidelityAnalysisPayload();

    if (typeof window !== "undefined") {
      sessionStorage.setItem("pf_fidelity_lead_email", email.trim());
    }

    window.setTimeout(() => {
      router.push("/fidelity-test/payment");
    }, 700);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const progressStep = currentStep;
  const selectedFocusLabels = focusOptions
    .filter((option) => focusAreas.includes(option.value))
    .map((option) => option.label);
  const selectedCrossChecks = crossCheckOptions.filter((option) => crossChecks[option.key]);

  return (
    <div className="bg-white relative rounded-3xl shadow-2xl shadow-rose-950/10 border border-white/70 w-full max-w-md mx-auto p-4 md:p-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff4e71] via-[#ec4899] to-[#ff7f66]" />

      <div className="flex items-center gap-3 mb-4 pt-1">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-3 rounded-2xl shadow-lg shadow-rose-500/25 shrink-0">
          <MessageSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff4e71]">Fidelity Test</p>
          <h3 className="text-xl md:text-2xl text-slate-950 font-black leading-tight">
            {currentStep === 0 ? content.title : "Private chat analysis"}
          </h3>
          <p className="text-slate-500 text-xs md:text-sm leading-snug mt-1">
            {currentStep === 0 ? content.subtitle : "A short context flow for clearer possible signals."}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500">
            {currentStep === 0 ? "Upload screenshots" : `Step ${progressStep} of 7`}
          </span>
          <span className="text-xs font-black text-[#ff4e71]">{Math.round((progressStep / 7) * 100)}%</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                progressStep >= index + 1
                  ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66]"
                  : "bg-slate-100"
              }`}
            />
          ))}
        </div>
      </div>

      <input
        ref={uploadInputRef}
        id="screenshots-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="min-h-[390px]">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >
          {currentStep === 0 && (
            <div className="flex flex-col min-h-[390px]">
              <label htmlFor="screenshots-upload" className="block text-sm font-bold text-slate-800 mb-3">
                {content.label || "Upload conversation screenshots"}
              </label>

              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                className="group w-full border-2 border-dashed border-rose-200 rounded-2xl p-5 flex items-center gap-4 text-left cursor-pointer hover:border-[#ff4e71] hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all"
              >
                <div className="p-3 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-xl group-hover:scale-105 transition-transform shrink-0 shadow-lg shadow-rose-500/20">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-950 mb-1 font-black text-sm">
                    {content.uploadText || "Click to upload screenshots"}
                  </p>
                  <p className="text-xs text-slate-500 leading-snug">
                    {content.uploadHint || "JPG, PNG. Multiple chat screenshots accepted."}
                  </p>
                </div>
              </button>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-3 mt-4 border border-red-100">
                <h4 className="text-xs font-black text-[#ff4e71] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Privacy-first analysis
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {(content.features || []).slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs text-slate-700 bg-white/75 border border-white rounded-xl px-2.5 py-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#ff4e71] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-auto text-center text-xs font-semibold leading-5 text-slate-500">
                Your screenshots stay private and are used only for this analysis.
              </p>
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex flex-col min-h-[390px]">
              <div className="mb-4">
                <h2 className="text-xl font-black text-slate-950">Screenshots uploaded</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {screenshots.length} screenshot{screenshots.length === 1 ? "" : "s"} uploaded. Add more messages if you want a more accurate analysis.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1 mb-4">
                {previews.map((preview, index) => (
                  <div key={`${preview}-${index}`} className="relative group aspect-[3/4]">
                    <img
                      src={preview}
                      alt={`Uploaded chat screenshot ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl border border-rose-100 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1.5 -right-1.5 bg-slate-950 text-white p-1.5 rounded-full shadow-lg hover:scale-105 transition-transform"
                      aria-label={`Remove screenshot ${index + 1}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                className="mb-4 w-full rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 text-sm font-black text-[#ff4e71] flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
              >
                <ImagePlus className="w-4 h-4" />
                Add more screenshots
              </button>

              <div className="mt-auto rounded-2xl bg-slate-50 border border-slate-100 p-3 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#ff4e71] shrink-0 mt-0.5" />
                <p className="text-xs font-semibold leading-5 text-slate-600">
                  Your screenshots stay private and are used only to prepare this analysis. They are not stored permanently by this frontend.
                </p>
              </div>

              <button type="button" onClick={() => goToStep(2)} className="dating-btn-primary mt-4">
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col min-h-[390px]">
              <h2 className="text-xl font-black text-slate-950 mb-1">Who are these messages between?</h2>
              <p className="text-sm font-semibold text-slate-500 mb-4">
                Are these messages between you and them, or between them and someone else?
              </p>

              <div className="grid grid-cols-1 gap-2 mb-4">
                {relationshipOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setConversationWith(option.value)}
                    className={`rounded-2xl border px-4 py-3 text-left font-black transition-all ${
                      conversationWith === option.value
                        ? "border-[#ff4e71] bg-rose-50 text-slate-950 shadow-sm"
                        : "border-slate-100 bg-white text-slate-700 hover:border-rose-200"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {option.label}
                      {conversationWith === option.value ? <Check className="w-5 h-5 text-[#ff4e71]" /> : null}
                    </span>
                  </button>
                ))}
              </div>

              <label className="text-xs font-black uppercase tracking-[0.12em] text-slate-500 mb-2" htmlFor="person-nickname">
                Optional nickname
              </label>
              <input
                id="person-nickname"
                value={personNameOrNickname}
                onChange={(event) => setPersonNameOrNickname(event.target.value)}
                placeholder="e.g. Alex, Babe, @username..."
                className="dating-email-input !text-left !text-base !border-slate-200 focus:!shadow-[0_0_0_3px_rgba(255,78,113,0.16)]"
              />

              <div className="mt-auto flex gap-3 pt-4">
                <button type="button" onClick={() => goToStep(1)} className="dating-btn-secondary !px-4">
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  disabled={!conversationWith}
                  className="dating-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col min-h-[390px]">
              <h2 className="text-xl font-black text-slate-950 mb-1">What feels off?</h2>
              <p className="text-sm font-semibold text-slate-500 mb-4">Pick what best matches your doubt. You can choose more than one.</p>

              <div className="grid grid-cols-1 gap-2 mb-4">
                {focusOptions.map((option) => {
                  const selected = focusAreas.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleFocusArea(option.value)}
                      className={`rounded-2xl border px-3 py-3 text-left text-sm font-black leading-5 transition-all ${
                        selected
                          ? "border-[#ff4e71] bg-gradient-to-br from-rose-50 to-orange-50 text-slate-950 shadow-sm"
                          : "border-slate-100 bg-white text-slate-700 hover:border-rose-200"
                      }`}
                    >
                      <span className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected ? "border-[#ff4e71] bg-[#ff4e71] text-white" : "border-slate-200"
                          }`}
                        >
                          {selected ? <Check className="w-3.5 h-3.5" /> : null}
                        </span>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto flex gap-3 pt-4">
                <button type="button" onClick={() => goToStep(2)} className="dating-btn-secondary !px-4">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={() => goToStep(4)} className="dating-btn-primary">
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col min-h-[390px]">
              <div className="mb-4">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4e71] mb-2">Optional</div>
                <h2 className="text-xl font-black text-slate-950">Add context for a better analysis</h2>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                  Tell us what happened in your own words. This helps the AI understand the conversation better.
                </p>
              </div>

              <textarea
                value={userContext}
                onChange={(event) => setUserContext(event.target.value)}
                placeholder="Example: These messages are between my partner and someone from work. They said it was only friendly, but the late-night tone and missing replies worry me. The conversation happened last weekend."
                className="min-h-[150px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-5 text-slate-800 outline-none transition focus:border-[#ff4e71] focus:bg-white focus:ring-4 focus:ring-rose-100"
              />

              <div className="mt-auto flex gap-3 pt-4">
                <button type="button" onClick={() => goToStep(3)} className="dating-btn-secondary !px-4">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={() => goToStep(5)} className="dating-btn-secondary !flex-1">
                  Skip
                </button>
                <button type="button" onClick={() => goToStep(5)} className="dating-btn-primary !flex-1">
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="flex flex-col min-h-[390px]">
              <div className="mb-4">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4e71] mb-2">Optional</div>
                <h2 className="text-xl font-black text-slate-950">Want to cross-check more signals?</h2>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                  Add another check to strengthen your report.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {crossCheckOptions.map(({ key, Icon, title, description }) => {
                  const selected = crossChecks[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleCrossCheck(key)}
                      className={`rounded-2xl border p-3 text-left transition-all ${
                        selected
                          ? "border-[#ff4e71] bg-gradient-to-br from-rose-50 to-orange-50 shadow-sm"
                          : "border-slate-100 bg-white hover:border-rose-200"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-black text-slate-950">{title}</span>
                          <span className="block text-xs font-semibold leading-5 text-slate-500">{description}</span>
                        </span>
                        <span
                          className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors ${
                            selected ? "bg-[#ff4e71]" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                              selected ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto flex gap-3 pt-4">
                <button type="button" onClick={() => goToStep(4)} className="dating-btn-secondary !px-4">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={startFidelityScanPreview} className="dating-btn-secondary !flex-1">
                  Skip for now
                </button>
                <button type="button" onClick={startFidelityScanPreview} className="dating-btn-primary !flex-1">
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="flex flex-col min-h-[390px]">
              <div className="analysis-pulse-card analysis-pulse-fidelity">
                <div className="analysis-radar-dot" />
                <div>
                  <div className="analysis-pulse-title">AI chat scan preview</div>
                  <div className="analysis-pulse-copy">Preparing possible signals and conversation patterns.</div>
                </div>
              </div>

              <div className="relative rounded-3xl border border-rose-100 bg-gradient-to-br from-slate-950 to-slate-800 p-4 shadow-xl overflow-hidden mb-4">
                <div className="grid grid-cols-3 gap-2 opacity-80">
                  {previews.slice(0, 3).map((preview, index) => (
                    <div key={`${preview}-scan-${index}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/10">
                      <img src={preview} alt="" className="h-full w-full object-cover opacity-60" />
                      <motion.div
                        className="absolute inset-x-2 h-8 rounded-lg border border-white/50 bg-white/20"
                        initial={{ top: "12%" }}
                        animate={{ top: ["12%", "62%", "28%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-xs font-black">Analysis progress</span>
                    <span className="text-sm font-black">{scanPercent}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] transition-all"
                      style={{ width: `${scanPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {scanLabels.map((label, index) => (
                  <div key={label} className={`dating-log-item ${!activeScanLabels.includes(index) ? "inactive" : ""}`}>
                    <div className={`dating-log-icon ${activeScanLabels.includes(index) ? "done" : "pending"}`}>
                      {activeScanLabels.includes(index) ? <Check size={16} /> : <Sparkles size={16} />}
                    </div>
                    <span className="text-sm font-bold text-slate-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="flex flex-col min-h-[390px] text-center">
              <div className="dating-check-circle mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] shadow-lg shadow-rose-500/30 flex items-center justify-center">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-950">Your private analysis is ready</h2>
              <p className="mx-auto mt-2 max-w-[310px] text-sm font-semibold leading-6 text-slate-500">
                Enter your email to receive and unlock your full report.
              </p>

              <div className="my-5 rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 to-orange-50 p-4 text-left">
                <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                  <ShieldCheck className="w-4 h-4 text-[#ff4e71]" />
                  Trust report ready
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-bold text-slate-600">
                  <span>Behavior signals detected: locked</span>
                  {previewResponse.teasers.slice(0, 2).map((teaser) => (
                    <span key={teaser}>{teaser}: locked</span>
                  ))}
                  <span>Signals prepared: {previewResponse.signalsCount}</span>
                  <span>Focus: {selectedFocusLabels.slice(0, 2).join(", ")}</span>
                  {selectedCrossChecks.length ? (
                    <span>Cross-checks added: {selectedCrossChecks.map((item) => item.title).join(", ")}</span>
                  ) : null}
                </div>
              </div>

              <form onSubmit={submitFidelityLead} className="mt-auto flex w-full flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="dating-email-input"
                />
                <button type="submit" disabled={isSubmitting} className="dating-btn-dark">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Unlock full analysis</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 flex justify-center gap-5 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock size={14} className="text-emerald-500" /> Secure
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#ff4e71]" /> Private
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <TrustPanel service="fidelity" step={currentStep} />
    </div>
  );
}
