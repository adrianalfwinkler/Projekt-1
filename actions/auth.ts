"use server";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema, signInSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import { sendWelcomeEmail } from "@/lib/resend";

// Distinguish a Next.js redirect throw from a real error so callers can re-throw it
function isRedirectError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as { digest: unknown }).digest === "string" &&
    (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function signUp(
  formData: FormData
): Promise<{ error: string } | { redirectTo: string }> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    console.error("[auth] signUp: failed to create Supabase client — check env vars");
    return { error: "Service unavailable. Please try again later." };
  }

  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    fullName: formData.get("fullName") as string,
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: raw.email,
      password: raw.password,
      options: { data: { full_name: raw.fullName } },
    });

    if (error) {
      console.error("[auth] signUp error:", error.message);
      return { error: error.message };
    }

    if (authData.user) {
      sendWelcomeEmail(raw.email, raw.fullName).catch((e) =>
        console.warn("[auth] Welcome email failed (non-critical):", e)
      );
    }

    return { redirectTo: "/onboarding" };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    console.error("[auth] signUp unexpected error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function signIn(
  formData: FormData
): Promise<{ error: string } | { redirectTo: string }> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    console.error("[auth] signIn: failed to create Supabase client — check env vars");
    return { error: "Service unavailable. Please try again later." };
  }

  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: raw.email,
      password: raw.password,
    });

    if (error) {
      console.error("[auth] signIn error:", error.message);
      // Normalise Supabase's cryptic messages for users
      if (error.message.toLowerCase().includes("invalid login")) {
        return { error: "Incorrect email or password." };
      }
      if (error.message.toLowerCase().includes("email not confirmed")) {
        return { error: "Please confirm your email before logging in." };
      }
      return { error: error.message };
    }

    return { redirectTo: "/dashboard" };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    console.error("[auth] signIn unexpected error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function signInWithMagicLink(
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required" };

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: "Service unavailable. Please try again later." };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    console.error("[auth] NEXT_PUBLIC_APP_URL is not set");
    return { error: "Server configuration error." };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${appUrl}/auth/callback` },
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch (err) {
    console.error("[auth] magic link error:", err);
    return { error: "Failed to send magic link. Please try again." };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("[auth] signOut error:", err);
  }
  redirect("/");
}

export async function resetPassword(
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required" };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    console.error("[auth] NEXT_PUBLIC_APP_URL is not set");
    return { error: "Server configuration error." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: "Service unavailable. Please try again later." };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appUrl}/auth/reset-password`,
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch (err) {
    console.error("[auth] resetPassword error:", err);
    return { error: "Failed to send reset email. Please try again." };
  }
}
