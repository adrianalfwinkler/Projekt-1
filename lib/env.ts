const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const recommended = [
  "NEXT_PUBLIC_APP_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "ANTHROPIC_API_KEY",
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
] as const;

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    const msg = `[env] Missing required environment variables: ${missing.join(", ")}`;
    // In production, this should crash fast rather than serve broken pages
    if (process.env.NODE_ENV === "production") {
      throw new Error(msg);
    }
    console.error(msg);
  }

  if (process.env.NODE_ENV !== "production") {
    const notSet = recommended.filter((key) => !process.env[key]);
    if (notSet.length > 0) {
      console.warn(`[env] Optional env vars not set: ${notSet.join(", ")}`);
    }
  }
}

// Convenience typed accessors — throw clearly if used when not set
export function getSupabaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!v) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return v;
}

export function getAppUrl(): string {
  const v = process.env.NEXT_PUBLIC_APP_URL;
  if (!v) throw new Error("NEXT_PUBLIC_APP_URL is not set");
  return v;
}
