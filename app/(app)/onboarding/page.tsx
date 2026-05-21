import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = { title: "Start Your Analysis" };

export default async function OnboardingPage() {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <OnboardingFlow />
    </div>
  );
}
