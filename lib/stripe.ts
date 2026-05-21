import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const STRIPE_PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: "Pro",
    price: 19,
    currency: "EUR",
    interval: "month" as const,
  },
  lifetime: {
    priceId: process.env.STRIPE_LIFETIME_PRICE_ID!,
    name: "Lifetime",
    price: 49,
    currency: "EUR",
  },
} as const;
