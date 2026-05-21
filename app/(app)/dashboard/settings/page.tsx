"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Crown, CreditCard, LogOut, ExternalLink, Download,
  Trash2, AlertTriangle, Shield, FileText, Loader2
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { createPortalSession } from "@/actions/stripe";
import { exportUserData, deleteAccount } from "@/actions/account";
import { useToast } from "@/hooks/use-toast";
import { useConsent } from "@/hooks/use-consent";
import Link from "next/link";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { consent, reset: resetConsent } = useConsent();
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

  async function handleExport() {
    setIsExporting(true);
    try {
      const result = await exportUserData();
      if (result.error) {
        toast({ title: "Export failed", description: result.error, variant: "destructive" });
      } else if (result.data) {
        const blob = new Blob([result.data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ideaforge-data-export-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Export successful", description: "Your data has been downloaded." });
      }
    } catch {
      toast({ title: "Export failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  }

  async function handleDeleteAccount() {
    setIsDeleting(true);
    try {
      const result = await deleteAccount();
      if (result?.error) {
        toast({ title: "Deletion failed", description: result.error, variant: "destructive" });
        setIsDeleting(false);
      }
    } catch {
      toast({ title: "Deletion failed", description: "Please contact support.", variant: "destructive" });
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Manage your account, subscription, and data.</p>

      <div className="space-y-6">

        {/* Subscription */}
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
                <Badge variant="secondary" className="mt-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-0">
                  Free
                </Badge>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/pricing">Upgrade</Link>
              </Button>
            </div>
            <Separator />
            <Button variant="outline" size="sm" className="gap-2" onClick={handlePortal} disabled={isPortalLoading}>
              {isPortalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
              Manage Billing
              <ExternalLink className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Data (GDPR) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Privacy & Your Data
            </CardTitle>
            <CardDescription>GDPR rights — access, export, and delete your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-xl p-3">
              <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                Under GDPR you have the right to access, export, and delete all personal data we hold about you.
              </p>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics Consent</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {consent === "accepted" ? "✅ Analytics enabled" : consent === "rejected" ? "🚫 Analytics disabled" : "⏳ No decision yet"}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={resetConsent}>
                Change
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Your Data</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Download all your data as JSON (Art. 20 GDPR)</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExport} disabled={isExporting}>
                {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                Export
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy Policy</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">How we collect and use your data</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/privacy" className="gap-1 flex items-center">
                  <FileText className="w-3.5 h-3.5" /> View
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Session */}
        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={signOut}>
              <Button variant="outline" type="submit" className="gap-2 text-gray-600" disabled={isPending}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Permanent and irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            {!showDeleteConfirm ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Delete Account</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all data. Cannot be undone.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
                    Are you absolutely sure?
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    This will permanently delete your account, all business analyses, and subscription data.
                    This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white gap-2"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    Yes, Delete My Account
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
