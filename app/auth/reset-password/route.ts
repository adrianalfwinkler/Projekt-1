import { NextResponse } from "next/server";

// Supabase redirects here after password reset email is clicked.
// The hash fragment contains the access_token — forward to the client page.
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/reset-password`);
}
