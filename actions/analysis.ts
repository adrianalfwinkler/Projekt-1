"use server";
import { createClient } from "@/lib/supabase/server";
import { generateBusinessAnalysis } from "@/lib/anthropic";
import { onboardingSchema } from "@/lib/validations";
import { OnboardingData } from "@/types";
import { sendAnalysisEmail } from "@/lib/resend";
import { revalidatePath } from "next/cache";

export async function generateAnalysis(data: OnboardingData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const parsed = onboardingSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  // Check free tier usage
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("user_id", user.id)
    .single();

  const tier = profile?.subscription_tier || "free";

  if (tier === "free") {
    const { count } = await supabase
      .from("analyses")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if ((count ?? 0) >= 1) {
      return { error: "FREE_TIER_LIMIT", paywall: true };
    }
  }

  try {
    const result = await generateBusinessAnalysis(data);

    const { data: analysis, error: dbError } = await supabase
      .from("analyses")
      .insert({
        user_id: user.id,
        onboarding_data: data,
        result: result,
      })
      .select()
      .single();

    if (dbError) return { error: dbError.message };

    // Send email notification (non-blocking)
    try {
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("user_id", user.id)
        .single();

      await sendAnalysisEmail(
        userProfile?.email || user.email || "",
        userProfile?.full_name || "",
        analysis.id,
        result.topRecommendation.name
      );
    } catch (_) {}

    revalidatePath("/dashboard");
    return { analysisId: analysis.id };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to generate analysis";
    return { error: msg };
  }
}

export async function getAnalysis(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  return data;
}

export async function getUserAnalyses() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function deleteAnalysis(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("analyses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}
