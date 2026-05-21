"use server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function exportUserData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const [{ data: profile }, { data: analyses }] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", user.id).single(),
    supabase.from("analyses").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);

  const exportData = {
    exportedAt: new Date().toISOString(),
    account: {
      email: user.email,
      createdAt: user.created_at,
      fullName: profile?.full_name,
      subscriptionTier: profile?.subscription_tier,
    },
    analyses: (analyses || []).map((a) => ({
      id: a.id,
      createdAt: a.created_at,
      onboardingData: a.onboarding_data,
      result: a.result,
    })),
  };

  return { data: JSON.stringify(exportData, null, 2) };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Server configuration error" };
  }

  await supabase.from("analyses").delete().eq("user_id", user.id);
  await supabase.from("subscriptions").delete().eq("user_id", user.id);
  await supabase.from("profiles").delete().eq("user_id", user.id);

  const adminClient = createAdminClient(supabaseUrl, serviceRoleKey);
  const { error } = await adminClient.auth.admin.deleteUser(user.id);

  if (error) return { error: error.message };

  await supabase.auth.signOut();
  redirect("/");
}
