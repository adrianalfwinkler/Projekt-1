import { PricingPage } from "@/components/pricing/pricing-page";
import { getUser, createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – IdeaForge AI",
  description: "Simple, transparent pricing. Start free, upgrade when ready.",
};

export default async function PricingRoute() {
  const user = await getUser();

  let tier = "free";
  if (user) {
    try {
      const supabase = await createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("user_id", user.id)
        .single();
      tier = profile?.subscription_tier || "free";
    } catch {}
  }

  return <PricingPage currentTier={tier} isLoggedIn={!!user} />;
}
