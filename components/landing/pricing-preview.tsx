import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Try it out with your first analysis.",
    features: ["1 AI business analysis", "10 personalized ideas", "Market overview", "7-day action plan"],
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€19",
    period: "/month",
    description: "For serious entrepreneurs ready to grow.",
    features: [
      "Unlimited analyses",
      "Full PDF export",
      "Complete revenue roadmap",
      "Save analysis history",
      "Priority generation",
      "Email delivery",
    ],
    cta: "Start Pro",
    href: "/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Lifetime",
    price: "€49",
    period: "one-time",
    description: "Pay once, use forever.",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "All future features",
      "No subscription",
    ],
    cta: "Get Lifetime",
    href: "/signup?plan=lifetime",
    highlighted: false,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready to unlock unlimited potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border ${
                plan.highlighted
                  ? "border-indigo-500 bg-white dark:bg-gray-900 shadow-2xl shadow-indigo-500/10 scale-105"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white">
                  {plan.badge}
                </Badge>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? "gradient" : "outline"}
                className="w-full"
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
