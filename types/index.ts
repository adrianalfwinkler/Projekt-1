export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: "free" | "pro" | "lifetime";
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  interests: string[];
  skills: string[];
  hoursPerDay: string;
  budget: string;
  monthlyIncomeGoal: string;
  businessModel: string;
  riskTolerance: string;
}

export interface BusinessIdea {
  name: string;
  summary: string;
  startupCost: string;
  difficulty: number;
  incomePotential: string;
}

export interface TopRecommendation {
  name: string;
  summary: string;
  whyItFitsYou: string;
  difficulty: number;
  startupCost: string;
  incomePotential: string;
  timeToFirstRevenue: string;
  trendScore: number;
}

export interface MarketAnalysis {
  marketSize: string;
  competition: string;
  advantages: string[];
}

export interface MonetizationPlan {
  revenueStreams: string[];
  pricingExamples: string[];
}

export interface SevenDayTask {
  day: number;
  task: string;
}

export interface Roadmap {
  month1: string;
  month3: string;
  month6: string;
  month12: string;
}

export interface AnalysisResult {
  topRecommendation: TopRecommendation;
  businessIdeas: BusinessIdea[];
  marketAnalysis: MarketAnalysis;
  monetizationPlan: MonetizationPlan;
  sevenDayPlan: SevenDayTask[];
  roadmap: Roadmap;
}

export interface Analysis {
  id: string;
  user_id: string;
  onboarding_data: OnboardingData;
  result: AnalysisResult;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  status: string;
  current_period_end: string | null;
  tier: "free" | "pro" | "lifetime";
  created_at: string;
  updated_at: string;
}
