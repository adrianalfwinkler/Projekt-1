import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Infinity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "€0",
    period: "forever",
    description: "See what IdeaForge AI can do with zero risk.",
    features: ["1 complete AI analysis", "10 personalized ideas", "Market overview", "7-day action plan"],
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
    iconColor: "text-gray-500 bg-gray-100 dark:bg-gray-800",
  },
  {
    name: "Pro",
    icon: Crown,
    price: "€19",
    period: "/month",
    description: "For serious builders. Unlimited everything.",
    features: [
      "Unlimited analyses",
      "Full PDF export",
      "Complete 12-month roadmap",
      "Save & compare analyses",
      "Priority AI generation",
      "Email delivery",
    ],
    cta: "Start Pro",
    href: "/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
    iconColor: "text-indigo-600 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400",
  },
  {
    name: "Lifetime",
    icon: Infinity,
    price: "€49",
    period: "one-time",
    description: "Pay once, build forever.",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "All future features",
      "No recurring payments",
    ],
    cta: "Get Lifetime",
    href: "/signup?plan=lifetime",
    highlighted: false,
    iconColor: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400",
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready to go all in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-7 flex flex-col",
                plan.highlighted
                  ? "bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/10"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.iconColor}`}>
                <plan.icon className="w-5 h-5" />
              </div>

              <div className="mb-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "gradient" : "outline"}
                className={cn("w-full", plan.highlighted && "shadow-lg shadow-indigo-500/20")}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
          All paid plans include a <strong className="text-gray-600 dark:text-gray-300">7-day money-back guarantee</strong>. No questions asked.
        </p>
      </div>
    </section>
  );
}
