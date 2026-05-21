"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signUp } from "@/actions/auth";
import { Loader2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await signUp(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border-gray-200 dark:border-gray-800 shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Start finding your perfect business idea</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="John Doe" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Min. 8 characters" required minLength={8} disabled={isPending} />
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-3 py-2">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            <Button type="submit" className="w-full" variant="gradient" size="lg" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Log in
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-600">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
