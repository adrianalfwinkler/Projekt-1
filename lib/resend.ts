import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendWelcomeEmail(email: string, name: string) {
  await getResend().emails.send({
    from: "IdeaForge AI <hello@ideaforgeai.com>",
    to: email,
    subject: "Welcome to IdeaForge AI 🚀",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Welcome to IdeaForge AI, ${name || "entrepreneur"}!</h1>
        <p>You're one step closer to finding your perfect business idea.</p>
        <p>Start your free analysis now and discover 10 personalized business ideas tailored to your skills, interests, and goals.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Start Your Analysis →</a>
        <p style="color: #6b7280; margin-top: 32px;">The IdeaForge AI Team</p>
      </div>
    `,
  });
}

export async function sendAnalysisEmail(
  email: string,
  name: string,
  analysisId: string,
  topIdeaName: string
) {
  await getResend().emails.send({
    from: "IdeaForge AI <hello@ideaforgeai.com>",
    to: email,
    subject: `Your business analysis is ready: ${topIdeaName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Your Analysis is Ready! 🎉</h1>
        <p>Hi ${name || "there"},</p>
        <p>Your personalized business analysis has been generated. Your top recommendation is:</p>
        <h2 style="color: #1e1b4b;">${topIdeaName}</h2>
        <p>Click below to view your full analysis including the 7-day action plan, market analysis, and revenue roadmap.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/results/${analysisId}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">View Your Analysis →</a>
        <p style="color: #6b7280; margin-top: 32px;">The IdeaForge AI Team</p>
      </div>
    `,
  });
}
