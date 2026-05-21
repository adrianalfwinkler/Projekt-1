"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { resetPassword } from "@/actions/auth";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await resetPassword(formData);
      if (result?.error) setError(result.error);
      else setSuccess(true);
    });
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border-gray-200 dark:border-gray-800 shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>Enter your email and we&apos;ll send you a reset link</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Check your email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                We sent a password reset link to your email address.
              </p>
              <Button variant="outline" asChild>
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isPending} />
              </div>
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-3 py-2">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full" variant="gradient" size="lg" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Back to login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
