"use client";
import { useState, useEffect } from "react";

type ConsentState = "accepted" | "rejected" | null;

const CONSENT_KEY = "ideaforge_analytics_consent";

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null;
    setConsent(stored);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
  }

  function reset() {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(null);
  }

  return { consent, accept, reject, reset };
}
