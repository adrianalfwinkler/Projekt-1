"use server";
import { createClient } from "@/lib/supabase/server";
import { getStripe, STRIPE_PLANS } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession(planId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const plan = STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS];
  if (!plan) return { error: "Invalid plan" };

  try {
    const stripe = getStripe();

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email, full_name")
      .eq("user_id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: profile?.full_name || undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("user_id", user.id);
    }

    const isSubscription = "interval" in plan;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      mode: isSubscription ? "subscription" : "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: { user_id: user.id, plan_id: planId },
      allow_promotion_codes: true,
    });

    return { url: session.url };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create checkout session";
    return { error: msg };
  }
}

export async function createPortalSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return { error: "No billing account found" };
  }

  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return { url: session.url };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create portal session";
    return { error: msg };
  }
}
