import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    console.error("[auth/callback] No code in URL");
    return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
    }

    // Ensure the redirect target is relative (prevent open-redirect)
    const safeNext = next.startsWith("/") ? next : "/dashboard";
    return NextResponse.redirect(`${origin}${safeNext}`);
  } catch (err) {
    console.error("[auth/callback] Unexpected error:", err);
    return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
  }
}
