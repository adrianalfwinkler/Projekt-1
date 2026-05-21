import { PricingPage } from "@/components/pricing/pricing-page";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – IdeaForge AI",
  description: "Simple, transparent pricing. Start free, upgrade when ready.",
};

export default async function PricingRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let tier = "free";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier")
      .eq("user_id", user.id)
      .single();
    tier = profile?.subscription_tier || "free";
  }

  return <PricingPage currentTier={tier} isLoggedIn={!!user} />;
}
