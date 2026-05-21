import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-16 shadow-2xl shadow-indigo-500/25">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to find your business idea?
          </h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who discovered their perfect business with IdeaForge AI.
          </p>
          <Button size="xl" className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg gap-2 group" asChild>
            <Link href="/signup">
              Start Free — No Credit Card
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-indigo-200 text-sm mt-4">Free plan available. No spam. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
}
