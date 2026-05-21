import Anthropic from "@anthropic-ai/sdk";
import { AnalysisResult, OnboardingData } from "@/types";

let _anthropic: Anthropic | null = null;

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _anthropic;
}

export async function generateBusinessAnalysis(
  data: OnboardingData
): Promise<AnalysisResult> {
  const prompt = `You are an expert business consultant and entrepreneur. Analyze the following user profile and generate a comprehensive business analysis.

User Profile:
- Interests: ${data.interests.join(", ")}
- Skills: ${data.skills.join(", ")}
- Available time per day: ${data.hoursPerDay} hours
- Starting budget: ${data.budget}
- Monthly income goal: ${data.monthlyIncomeGoal}
- Preferred business model: ${data.businessModel}
- Risk tolerance: ${data.riskTolerance}

Generate a detailed business analysis and return it as a valid JSON object with EXACTLY this structure:

{
  "topRecommendation": {
    "name": "Business name",
    "summary": "2-3 sentence description",
    "whyItFitsYou": "Personalized explanation of why this fits the user specifically",
    "difficulty": 3,
    "startupCost": "€500 - €2,000",
    "incomePotential": "€2,000 - €8,000/month",
    "timeToFirstRevenue": "2-4 weeks",
    "trendScore": 85
  },
  "businessIdeas": [
    {
      "name": "Business name",
      "summary": "1-2 sentence description",
      "startupCost": "€X - €Y",
      "difficulty": 3,
      "incomePotential": "€X - €Y/month"
    }
  ],
  "marketAnalysis": {
    "marketSize": "Global market size and growth rate",
    "competition": "Competition level assessment",
    "advantages": ["Advantage 1", "Advantage 2", "Advantage 3"]
  },
  "monetizationPlan": {
    "revenueStreams": ["Revenue stream 1", "Revenue stream 2"],
    "pricingExamples": ["Example pricing 1", "Example pricing 2"]
  },
  "sevenDayPlan": [
    { "day": 1, "task": "Specific actionable task for day 1" },
    { "day": 2, "task": "Specific actionable task for day 2" },
    { "day": 3, "task": "Specific actionable task for day 3" },
    { "day": 4, "task": "Specific actionable task for day 4" },
    { "day": 5, "task": "Specific actionable task for day 5" },
    { "day": 6, "task": "Specific actionable task for day 6" },
    { "day": 7, "task": "Specific actionable task for day 7" }
  ],
  "roadmap": {
    "month1": "What to achieve in month 1",
    "month3": "What to achieve by month 3",
    "month6": "What to achieve by month 6",
    "month12": "What to achieve by month 12"
  }
}

Requirements:
- Generate exactly 10 business ideas in the businessIdeas array
- difficulty is a number from 1-5
- trendScore is a number from 0-100
- Make all recommendations highly personalized to the user's specific profile
- Be realistic and actionable
- Focus on ideas achievable with the given budget and time constraints
- Return ONLY the JSON object, no additional text`;

  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude API");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in Claude response");
  }

  const result = JSON.parse(jsonMatch[0]) as AnalysisResult;
  return result;
}
