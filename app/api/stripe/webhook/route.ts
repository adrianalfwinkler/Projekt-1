import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const planId = session.metadata?.plan_id;

        if (!userId || !planId) break;

        const tier = planId === "lifetime" ? "lifetime" : "pro";

        await supabase.from("profiles").update({ subscription_tier: tier }).eq("user_id", userId);

        await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_subscription_id: (session.subscription as string) || null,
          stripe_price_id: session.metadata?.plan_id || null,
          status: "active",
          tier,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) break;

        const isActive = subscription.status === "active";
        const tier = isActive ? "pro" : "free";

        await supabase
          .from("profiles")
          .update({ subscription_tier: tier })
          .eq("user_id", profile.user_id);

        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            tier,
            current_period_end: new Date(
              (subscription as unknown as { current_period_end: number }).current_period_end * 1000
            ).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", profile.user_id);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due", updated_at: new Date().toISOString() })
            .eq("user_id", profile.user_id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
