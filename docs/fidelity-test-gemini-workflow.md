# Fidelity Test Gemini full-report workflow

The Fidelity Test funnel keeps the pre-payment experience locked and frontend-only. The fake scan preview does not call Gemini, n8n, or any AI provider.

Gemini is called only after payment succeeds through `POST /api/fidelity/full-report`.

## Environment

Add this server-side variable:

```bash
GEMINI_API_KEY="your-gemini-api-key"
```

Never expose `GEMINI_API_KEY` to the frontend.

## Current payload source

The form stores the normalized Fidelity payload in browser `sessionStorage` under:

```text
pf_fidelity_automation_payload
```

Current screenshot values are local preview data URLs. This is fine for local Gemini testing when the browser sends the saved payload after payment. TODO: move screenshots to private storage and pass signed URLs or private file IDs once backend persistence is connected.

## Full report endpoint

Endpoint:

```text
POST /api/fidelity/full-report
```

Production behavior:

```json
{
  "paymentConfirmed": true,
  "payload": {
    "service": "fidelity_test",
    "sessionId": "string",
    "screenshots": ["data:image/png;base64,..."],
    "screenshotConversationType": "me_and_them",
    "personNameOrNickname": "Alex",
    "mainConcerns": ["romantic_or_flirty_tone", "time_gaps"],
    "userContext": "Optional user context",
    "createdAt": "2026-04-29T10:00:00.000Z",
    "source": "profilefinder_web"
  }
}
```

Dev/test behavior:

In local development only, pass `devMode: true` to test without a real payment confirmation.

```bash
curl -X POST http://localhost:3003/api/fidelity/full-report \
  -H "Content-Type: application/json" \
  -d '{
    "devMode": true,
    "payload": {
      "service": "fidelity_test",
      "sessionId": "local-test-session",
      "screenshots": [],
      "screenshotConversationType": "me_and_them",
      "personNameOrNickname": "Alex",
      "mainConcerns": ["romantic_or_flirty_tone", "time_gaps"],
      "userContext": "They said the conversation was only friendly, but the late-night tone and missing replies worry me.",
      "createdAt": "2026-04-29T10:00:00.000Z",
      "source": "profilefinder_web"
    }
  }'
```

If `GEMINI_API_KEY` is missing or Gemini fails, the endpoint returns a fallback-safe report with `riskLevel: "unclear"` and `confidence: "low"`.

## Post-payment result page

After a single Fidelity payment, the success page redirects to:

```text
/report/fidelity/latest
```

The report page reads the saved `pf_fidelity_automation_payload` from `sessionStorage`, calls `POST /api/fidelity/full-report`, then stores the result locally under:

```text
pf_fidelity_full_report_<sessionId>
pf_fidelity_last_report
```

`FidelityReportView` renders the structured report without exposing raw JSON to the user. It includes the score, summary, detected signals, important moments, recommended questions, disclaimer, print-to-PDF action, recommended checks, and a disabled follow-up questions area.

If no payload exists in the browser, the page shows safe demo/fallback content and does not call Gemini.

## Dashboard prep

The dashboard reads `pf_fidelity_last_report` from `sessionStorage` and shows a recent Fidelity Test report card with:

- service type
- created date
- risk level
- trust score
- status
- link back to `/report/fidelity/<sessionId>`

TODO: replace browser storage with secure server-side report persistence connected to the paid user/session/email.

## Gemini model

Use:

```text
gemini-2.5-flash-lite
```

The server helper calls Gemini's `generateContent` API and requests JSON output.

## Report JSON

The API returns:

```json
{
  "status": "report_ready",
  "riskLevel": "low",
  "trustScore": 72,
  "summary": "Short cautious summary.",
  "detectedSignals": [
    {
      "type": "tone_shift",
      "severity": "medium",
      "title": "Possible tone shift",
      "explanation": "Careful explanation using non-accusatory wording."
    }
  ],
  "importantMoments": [
    {
      "moment": "Late-night exchange",
      "whyItMatters": "May suggest a pattern worth discussing."
    }
  ],
  "questionsToAsk": ["Can you explain the timing of this exchange?"],
  "confidence": "medium",
  "disclaimer": "This report highlights possible signals and conversation patterns. It is not proof of cheating, dishonesty, or wrongdoing."
}
```

## Analysis rules

The report must never say `cheating detected`, never accuse anyone directly, and never present signals as proof.

Use careful wording such as `possible`, `signals`, `patterns`, `indicators`, and `may suggest`.

If screenshots are unclear or missing, return `confidence: "low"` and explain that there is not enough evidence.

## n8n role

n8n is deprecated for the main Fidelity AI analysis. It may later be used only for email delivery, PDF generation, notifications, CRM updates, or logging.

## Future payment/session TODOs

- Verify Stripe Checkout Session or Payment Intent server-side before calling Gemini.
- Load the saved Fidelity payload by `sessionId`, `checkoutSessionId`, or internal order ID instead of trusting a client flag.
- Upload screenshots to private storage before payment and send Gemini signed URLs or base64 image parts after payment.
- Generate server-side PDFs later; the current report page uses `window.print()` with print-friendly styles.
