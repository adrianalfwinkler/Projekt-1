import PostHog from "posthog-js";

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

export const ANALYTICS_EVENTS = {
  LANDING_PAGE_VIEW: "landing_page_view",
  START_ONBOARDING: "start_onboarding",
  COMPLETE_ONBOARDING: "complete_onboarding",
  GENERATE_ANALYSIS: "generate_analysis",
  PAYWALL_VIEWED: "paywall_viewed",
  CHECKOUT_STARTED: "checkout_started",
  PURCHASE_COMPLETED: "purchase_completed",
  RESULTS_VIEWED: "results_viewed",
  PDF_EXPORTED: "pdf_exported",
  ANALYSIS_SAVED: "analysis_saved",
} as const;
