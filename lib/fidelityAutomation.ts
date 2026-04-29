export type FidelityConversationType =
  | "me_and_them"
  | "them_and_someone_else"
  | "group_chat"
  | "not_sure";

export type FidelityGender = "male" | "female";

export type FidelityRiskPreview = "low" | "moderate" | "high" | "unclear";

export type FidelityAutomationPayload = {
  service: "fidelity_test";
  sessionId: string;
  screenshots: string[];
  customerGender: FidelityGender | null;
  conversationPartnerGender: FidelityGender | null;
  screenshotConversationType: FidelityConversationType;
  personNameOrNickname: string | null;
  mainConcerns: string[];
  userContext: string | null;
  createdAt: string;
  source: "profilefinder_web";
};

export type FidelityPreviewResponse = {
  status: "preview_ready";
  riskPreview: FidelityRiskPreview;
  teasers: string[];
  signalsCount: number;
  reportReady: boolean;
};

export type FidelityFormAutomationState = {
  screenshots: File[];
  previews: string[];
  customerGender: FidelityGender | "";
  conversationPartnerGender: FidelityGender | "";
  conversationWith: string;
  personNameOrNickname: string;
  focusAreas: string[];
  userContext: string;
  sessionId?: string;
};

export const FIDELITY_PREVIEW_FALLBACK: FidelityPreviewResponse = {
  status: "preview_ready",
  riskPreview: "unclear",
  teasers: ["Conversation scanned", "Behavior patterns prepared", "Private report ready"],
  signalsCount: 2,
  reportReady: true,
};

const conversationTypeMap: Record<string, FidelityConversationType> = {
  me_and_target: "me_and_them",
  target_and_someone_else: "them_and_someone_else",
  group_chat: "group_chat",
};

export function createFidelitySessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `fidelity_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeFidelityPreviewResponse(response: unknown): FidelityPreviewResponse {
  if (!response || typeof response !== "object") {
    return FIDELITY_PREVIEW_FALLBACK;
  }

  const raw = response as Partial<FidelityPreviewResponse>;
  const riskPreview: FidelityRiskPreview =
    raw.riskPreview === "low" ||
    raw.riskPreview === "moderate" ||
    raw.riskPreview === "high" ||
    raw.riskPreview === "unclear"
      ? raw.riskPreview
      : "unclear";

  const teasers =
    Array.isArray(raw.teasers) && raw.teasers.length > 0
      ? raw.teasers.filter((teaser): teaser is string => typeof teaser === "string").slice(0, 4)
      : FIDELITY_PREVIEW_FALLBACK.teasers;

  return {
    status: "preview_ready",
    riskPreview,
    teasers: teasers.length > 0 ? teasers : FIDELITY_PREVIEW_FALLBACK.teasers,
    signalsCount:
      typeof raw.signalsCount === "number" && Number.isFinite(raw.signalsCount)
        ? Math.max(0, Math.round(raw.signalsCount))
        : FIDELITY_PREVIEW_FALLBACK.signalsCount,
    reportReady: raw.reportReady ?? true,
  };
}

export function prepareFidelityAutomationPayload(
  formState: FidelityFormAutomationState
): FidelityAutomationPayload {
  return {
    service: "fidelity_test",
    sessionId: formState.sessionId || createFidelitySessionId(),
    // TODO: Upload screenshots to private object storage and send signed URLs instead of local preview data URLs.
    screenshots: formState.previews,
    customerGender: formState.customerGender || null,
    conversationPartnerGender: formState.conversationPartnerGender || null,
    screenshotConversationType: conversationTypeMap[formState.conversationWith] || "not_sure",
    personNameOrNickname: formState.personNameOrNickname.trim() || null,
    mainConcerns: formState.focusAreas,
    userContext: formState.userContext.trim() || null,
    createdAt: new Date().toISOString(),
    source: "profilefinder_web",
  };
}
