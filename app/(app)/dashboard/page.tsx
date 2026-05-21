import { getUser, createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  try {
    const supabase = await createClient();
    const [{ data: analyses }, { data: profile }] = await Promise.all([
      supabase.from("analyses").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("user_id", user.id).single(),
    ]);

    return (
      <DashboardView
        analyses={analyses || []}
        profile={profile}
        user={user}
      />
    );
  } catch {
    redirect("/login");
  }
}
