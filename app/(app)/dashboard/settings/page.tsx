"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Crown, CreditCard, LogOut, ExternalLink } from "lucide-react";
import { signOut } from "@/actions/auth";
import { createPortalSession } from "@/actions/stripe";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const { toast } = useToast();

  function handlePortal() {
    setIsPortalLoading(true);
    startTransition(async () => {
      const result = await createPortalSession();
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        setIsPortalLoading(false);
      } else if (result.url) {
        window.location.href = result.url;
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-600" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your plan and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Plan</p>
                <div className="mt-1">
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-0">
                    Free
                  </Badge>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/pricing">Upgrade</Link>
              </Button>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Manage your subscription, download invoices, and update payment methods.
              </p>
              <Button variant="outline" className="gap-2" onClick={handlePortal} disabled={isPortalLoading}>
                {isPortalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                Billing Portal
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={signOut}>
              <Button variant="outline" type="submit" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950" disabled={isPending}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
