import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ResultsView } from "@/components/results/results-view";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Your Business Analysis" };

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: analysis } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!analysis) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("user_id", user.id)
    .single();

  return (
    <ResultsView
      analysis={analysis}
      tier={profile?.subscription_tier || "free"}
    />
  );
}
