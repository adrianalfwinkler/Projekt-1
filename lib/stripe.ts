import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true });
  }
  return _stripe;
}

export const STRIPE_PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    name: "Pro",
    price: 19,
    currency: "EUR",
    interval: "month" as const,
  },
  lifetime: {
    priceId: process.env.STRIPE_LIFETIME_PRICE_ID ?? "",
    name: "Lifetime",
    price: 49,
    currency: "EUR",
  },
} as const;
