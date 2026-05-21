import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { AnalysisResult } from "@/types";

function generatePdfHtml(result: AnalysisResult, createdAt: string): string {
  const { topRecommendation, businessIdeas, marketAnalysis, monetizationPlan, sevenDayPlan, roadmap } = result;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${topRecommendation.name} – IdeaForge AI Analysis</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a2e; background: #fff; font-size: 13px; line-height: 1.6; }
  .page { max-width: 800px; margin: 0 auto; padding: 48px 40px; }
  .header { border-bottom: 3px solid #4f46e5; padding-bottom: 24px; margin-bottom: 32px; }
  .logo { font-size: 20px; font-weight: 800; color: #4f46e5; letter-spacing: -0.5px; }
  .logo span { color: #7c3aed; }
  .header-meta { color: #6b7280; font-size: 12px; margin-top: 4px; }
  h1 { font-size: 28px; font-weight: 800; color: #111827; margin-bottom: 8px; }
  h2 { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 12px; margin-top: 32px; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb; }
  h3 { font-size: 15px; font-weight: 600; color: #374151; margin-bottom: 6px; }
  .badge { display: inline-block; background: #eef2ff; color: #4f46e5; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; margin-bottom: 12px; }
  .trend-badge { background: #fef3c7; color: #d97706; margin-left: 8px; }
  .top-rec { background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%); border: 1px solid #c7d2fe; border-radius: 12px; padding: 20px; margin-bottom: 8px; }
  .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; }
  .meta-item { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; }
  .meta-label { font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; }
  .meta-value { font-size: 13px; font-weight: 600; color: #111827; margin-top: 2px; }
  .why-box { background: #fff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 12px; margin-top: 12px; font-size: 12px; color: #4b5563; }
  .idea-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .idea-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
  .idea-number { font-size: 10px; color: #9ca3af; float: right; }
  .idea-name { font-weight: 600; font-size: 13px; color: #111827; }
  .idea-summary { font-size: 11px; color: #6b7280; margin-top: 4px; line-height: 1.5; }
  .idea-tags { margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap; }
  .tag { font-size: 10px; padding: 2px 8px; border-radius: 4px; background: #f3f4f6; color: #374151; }
  .tag-green { background: #dcfce7; color: #166534; }
  .tag-blue { background: #dbeafe; color: #1d4ed8; }
  .list-item { display: flex; gap: 8px; margin-bottom: 6px; align-items: flex-start; }
  .list-bullet { color: #4f46e5; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .day-item { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
  .day-num { width: 24px; height: 24px; background: #eef2ff; color: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .roadmap-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .roadmap-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
  .roadmap-label { font-size: 10px; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 11px; display: flex; justify-content: space-between; }
  p { margin-bottom: 8px; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo">IdeaForge <span>AI</span></div>
    <div class="header-meta">Business Analysis Report · Generated ${new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  </div>

  <h1>${topRecommendation.name}</h1>
  <span class="badge">⭐ Top Recommendation</span>
  <span class="badge trend-badge">🔥 Trend Score: ${topRecommendation.trendScore}</span>

  <div class="top-rec">
    <p>${topRecommendation.summary}</p>
    <div class="why-box"><strong>Why it fits you:</strong> ${topRecommendation.whyItFitsYou}</div>
    <div class="meta-grid">
      <div class="meta-item"><div class="meta-label">Startup Cost</div><div class="meta-value">${topRecommendation.startupCost}</div></div>
      <div class="meta-item"><div class="meta-label">Income Potential</div><div class="meta-value">${topRecommendation.incomePotential}</div></div>
      <div class="meta-item"><div class="meta-label">First Revenue</div><div class="meta-value">${topRecommendation.timeToFirstRevenue}</div></div>
      <div class="meta-item"><div class="meta-label">Difficulty</div><div class="meta-value">${topRecommendation.difficulty}/5</div></div>
    </div>
  </div>

  <h2>10 Business Ideas</h2>
  <div class="idea-grid">
    ${businessIdeas.map((idea, i) => `
      <div class="idea-card">
        <span class="idea-number">#${i + 1}</span>
        <div class="idea-name">${idea.name}</div>
        <div class="idea-summary">${idea.summary}</div>
        <div class="idea-tags">
          <span class="tag tag-green">💰 ${idea.startupCost}</span>
          <span class="tag tag-blue">📈 ${idea.incomePotential}</span>
          <span class="tag">🎯 ${idea.difficulty}/5</span>
        </div>
      </div>
    `).join("")}
  </div>

  <h2>Market Analysis</h2>
  <h3>Market Size</h3><p>${marketAnalysis.marketSize}</p>
  <h3>Competition</h3><p>${marketAnalysis.competition}</p>
  <h3>Your Advantages</h3>
  ${marketAnalysis.advantages.map(a => `<div class="list-item"><span class="list-bullet">✓</span><span>${a}</span></div>`).join("")}

  <h2>Monetization Plan</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div>
      <h3>Revenue Streams</h3>
      ${monetizationPlan.revenueStreams.map(s => `<div class="list-item"><span class="list-bullet">$</span><span>${s}</span></div>`).join("")}
    </div>
    <div>
      <h3>Pricing Examples</h3>
      ${monetizationPlan.pricingExamples.map(p => `<div class="list-item"><span class="list-bullet">→</span><span>${p}</span></div>`).join("")}
    </div>
  </div>

  <h2>Your 7-Day Action Plan</h2>
  ${sevenDayPlan.map(item => `
    <div class="day-item">
      <div class="day-num">${item.day}</div>
      <div><strong>Day ${item.day}:</strong> ${item.task}</div>
    </div>
  `).join("")}

  <h2>12-Month Revenue Roadmap</h2>
  <div class="roadmap-grid">
    <div class="roadmap-card"><div class="roadmap-label">Month 1</div><p>${roadmap.month1}</p></div>
    <div class="roadmap-card"><div class="roadmap-label">Month 3</div><p>${roadmap.month3}</p></div>
    <div class="roadmap-card"><div class="roadmap-label">Month 6</div><p>${roadmap.month6}</p></div>
    <div class="roadmap-card"><div class="roadmap-label">Month 12</div><p>${roadmap.month12}</p></div>
  </div>

  <div class="footer">
    <span>IdeaForge AI · ideaforgeai.com</span>
    <span>© ${new Date().getFullYear()} IdeaForge AI. All rights reserved.</span>
  </div>
</div>
</body>
</html>`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check subscription
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("user_id", user.id)
    .single();

  const tier = profile?.subscription_tier || "free";
  if (tier === "free") {
    return NextResponse.json({ error: "Pro subscription required" }, { status: 403 });
  }

  const { data: analysis } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!analysis) {
    return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
  }

  const html = generatePdfHtml(analysis.result as AnalysisResult, analysis.created_at);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="ideaforge-analysis-${id}.html"`,
    },
  });
}
