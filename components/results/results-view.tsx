"use client";
import { Analysis } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp, DollarSign, Clock, Target, Lightbulb,
  BarChart3, Calendar, Map, Download, Star, ArrowRight, Lock
} from "lucide-react";
import Link from "next/link";
import { DifficultyBar } from "./difficulty-bar";
import { TrendBadge } from "./trend-badge";

interface Props {
  analysis: Analysis;
  tier: string;
}

export function ResultsView({ analysis, tier }: Props) {
  const { result } = analysis;
  const isPro = tier === "pro" || tier === "lifetime";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0">
            ✅ Analysis Complete
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Business Analysis
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Based on your profile, here are your personalized business recommendations.
        </p>
      </div>

      {/* Top Recommendation */}
      <div className="rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Top Recommendation</span>
          </div>
          <TrendBadge score={result.topRecommendation.trendScore} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {result.topRecommendation.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {result.topRecommendation.summary}
        </p>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 border border-indigo-100 dark:border-indigo-900">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Why it fits you:</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{result.topRecommendation.whyItFitsYou}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: DollarSign, label: "Startup Cost", value: result.topRecommendation.startupCost },
            { icon: TrendingUp, label: "Income Potential", value: result.topRecommendation.incomePotential },
            { icon: Clock, label: "First Revenue", value: result.topRecommendation.timeToFirstRevenue },
            { icon: Target, label: "Difficulty", value: `${result.topRecommendation.difficulty}/5` },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
              <item.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="ideas" className="space-y-6">
        <TabsList className="w-full sm:w-auto flex-wrap h-auto gap-1">
          <TabsTrigger value="ideas" className="gap-1.5"><Lightbulb className="w-3.5 h-3.5" />Ideas</TabsTrigger>
          <TabsTrigger value="market" className="gap-1.5"><BarChart3 className="w-3.5 h-3.5" />Market</TabsTrigger>
          <TabsTrigger value="monetization" className="gap-1.5"><DollarSign className="w-3.5 h-3.5" />Monetize</TabsTrigger>
          <TabsTrigger value="plan" className="gap-1.5"><Calendar className="w-3.5 h-3.5" />7-Day Plan</TabsTrigger>
          <TabsTrigger value="roadmap" className="gap-1.5 relative">
            <Map className="w-3.5 h-3.5" />Roadmap
            {!isPro && <Lock className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />}
          </TabsTrigger>
        </TabsList>

        {/* Business Ideas */}
        <TabsContent value="ideas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.businessIdeas.map((idea, i) => (
              <Card key={i} className="hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{idea.name}</h3>
                    <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">#{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{idea.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900">
                      💰 {idea.startupCost}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                      📈 {idea.incomePotential}
                    </span>
                    <DifficultyBar difficulty={idea.difficulty} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Analysis */}
        <TabsContent value="market">
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Market Overview</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Market Size</p>
                  <p className="text-gray-600 dark:text-gray-400">{result.marketAnalysis.marketSize}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Competition Level</p>
                  <p className="text-gray-600 dark:text-gray-400">{result.marketAnalysis.competition}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Advantages</p>
                  <ul className="space-y-2">
                    {result.marketAnalysis.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                        <span className="text-indigo-500 mt-0.5">✓</span>
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monetization */}
        <TabsContent value="monetization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Revenue Streams</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.monetizationPlan.revenueStreams.map((stream, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <span className="text-green-500 font-bold mt-0.5">$</span>
                      {stream}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Pricing Examples</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.monetizationPlan.pricingExamples.map((example, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <span className="text-indigo-500 font-bold mt-0.5">→</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 7-Day Plan */}
        <TabsContent value="plan">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-600" />Your 7-Day Launch Plan</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.sevenDayPlan.map((item) => (
                  <div key={item.day} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-center shrink-0">
                      {item.day}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">Day {item.day}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roadmap */}
        <TabsContent value="roadmap">
          {isPro ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Month 1", value: result.roadmap.month1, color: "indigo" },
                { label: "Month 3", value: result.roadmap.month3, color: "purple" },
                { label: "Month 6", value: result.roadmap.month6, color: "blue" },
                { label: "Month 12", value: result.roadmap.month12, color: "green" },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">{item.label}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Unlock Your Revenue Roadmap</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Upgrade to Pro to see your complete 12-month revenue roadmap with milestones for months 1, 3, 6, and 12.
              </p>
              <Button variant="gradient" size="lg" asChild>
                <Link href="/pricing">Upgrade to Pro <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Export / Save Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        {isPro ? (
          <Button variant="outline" className="gap-2" asChild>
            <Link href={`/api/export/pdf/${analysis.id}`} target="_blank">
              <Download className="w-4 h-4" /> Export PDF
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="gap-2 opacity-60" disabled>
            <Lock className="w-4 h-4" /> Export PDF (Pro)
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link href="/dashboard">View Dashboard</Link>
        </Button>
        <Button variant="gradient" asChild>
          <Link href="/onboarding">New Analysis</Link>
        </Button>
      </div>
    </div>
  );
}
