"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { createCheckoutSession } from "@/actions/stripe";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Perfect for exploring the platform.",
    features: [
      "1 AI business analysis",
      "10 personalized business ideas",
      "Market overview",
      "7-day action plan",
      "Basic monetization guide",
    ],
    notIncluded: [
      "Unlimited analyses",
      "PDF export",
      "Full revenue roadmap",
      "Save history",
    ],
    cta: "Get Started Free",
    href: "/signup",
    priceId: null,
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "€19",
    period: "/month",
    description: "For serious entrepreneurs ready to build.",
    features: [
      "Unlimited analyses",
      "10 personalized ideas per analysis",
      "Full market analysis",
      "Complete revenue roadmap",
      "7-day action plan",
      "PDF export",
      "Save analysis history",
      "Email delivery",
      "Priority generation",
    ],
    notIncluded: [],
    cta: "Start Pro",
    priceId: "pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "€49",
    period: "one-time",
    description: "Pay once, access forever.",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "All future features included",
      "No recurring payments",
      "Priority support",
    ],
    notIncluded: [],
    cta: "Get Lifetime Access",
    priceId: "lifetime",
    highlighted: false,
  },
];

interface Props {
  currentTier: string;
  isLoggedIn: boolean;
}

export function PricingPage({ currentTier, isLoggedIn }: Props) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  function handleUpgrade(planId: string) {
    if (!isLoggedIn) {
      window.location.href = `/signup?plan=${planId}`;
      return;
    }
    setLoadingPlan(planId);
    startTransition(async () => {
      const result = await createCheckoutSession(planId);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        setLoadingPlan(null);
      } else if (result.url) {
        window.location.href = result.url;
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-0">
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Pricing
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Start free. Upgrade when you need unlimited power.
          7-day money-back guarantee on all paid plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isCurrent = currentTier === plan.id;
          const isLoading = loadingPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 border flex flex-col ${
                plan.highlighted
                  ? "border-indigo-500 bg-white dark:bg-gray-900 shadow-2xl shadow-indigo-500/10"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs">
                  {plan.badge}
                </Badge>
              )}
              {isCurrent && (
                <Badge className="absolute -top-3 right-4 bg-green-600 text-white text-xs">
                  Current Plan
                </Badge>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-400 dark:text-gray-600 line-through">
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-gray-300">✗</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div>
                {isCurrent ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : plan.priceId ? (
                  <Button
                    variant={plan.highlighted ? "gradient" : "outline"}
                    className="w-full"
                    onClick={() => handleUpgrade(plan.priceId!)}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : plan.cta}
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={plan.href!}>{plan.cta}</Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Pricing FAQ
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes. Cancel your Pro subscription at any time from your account settings. You'll retain access until the end of your billing period.",
            },
            {
              q: "Is there a money-back guarantee?",
              a: "Absolutely. If you're not satisfied within 7 days of your purchase, contact us for a full refund.",
            },
            {
              q: "What happens when I hit the free limit?",
              a: "After your first free analysis, you'll be prompted to upgrade to Pro for unlimited analyses. Your first analysis is never deleted.",
            },
            {
              q: "Does the Lifetime plan include future features?",
              a: "Yes! The Lifetime plan includes all current features and any new features we add in the future.",
            },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
