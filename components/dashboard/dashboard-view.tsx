"use client";
import { Analysis, UserProfile } from "@/types";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, FileText, TrendingUp, Crown, Download, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { deleteAnalysis } from "@/actions/analysis";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  analyses: Analysis[];
  profile: UserProfile | null;
  user: User;
}

export function DashboardView({ analyses, profile, user }: Props) {
  const tier = profile?.subscription_tier || "free";
  const isPro = tier === "pro" || tier === "lifetime";
  const { toast } = useToast();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const result = await deleteAnalysis(id);
    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Analysis deleted successfully.", variant: "default" });
      router.refresh();
    }
    setDeletingId(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {profile?.full_name || user.email?.split("@")[0]}
          </p>
        </div>
        <Button variant="gradient" asChild className="gap-2">
          <Link href="/onboarding">
            <PlusCircle className="w-4 h-4" /> New Analysis
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyses.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Analyses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{tier}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyses.length > 0
                  ? Math.max(...analyses.map((a) => a.result?.topRecommendation?.trendScore || 0))
                  : "—"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Best Trend Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade banner for free users */}
      {!isPro && (
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg">Unlock unlimited analyses</h3>
            <p className="text-indigo-100 text-sm mt-1">Upgrade to Pro for unlimited ideas, PDF export, and your full roadmap.</p>
          </div>
          <Button className="bg-white text-indigo-600 hover:bg-indigo-50 shrink-0" asChild>
            <Link href="/pricing">Upgrade — €19/mo</Link>
          </Button>
        </div>
      )}

      {/* Analyses list */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Analyses</h2>
        {analyses.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No analyses yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Generate your first business analysis to get started.</p>
            <Button variant="gradient" asChild>
              <Link href="/onboarding">Start Your First Analysis</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {analyses.map((analysis) => (
              <Card key={analysis.id} className="hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {analysis.result?.topRecommendation?.name || "Business Analysis"}
                        </h3>
                        {analysis.result?.topRecommendation?.trendScore && (
                          <Badge variant="secondary" className="shrink-0 bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-0 text-xs">
                            🔥 {analysis.result.topRecommendation.trendScore}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {analysis.result?.topRecommendation?.summary?.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(analysis.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/results/${analysis.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      {isPro && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/api/export/pdf/${analysis.id}`} target="_blank">
                            <Download className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => handleDelete(analysis.id)}
                        disabled={deletingId === analysis.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
