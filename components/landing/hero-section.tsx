"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 blur-3xl opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Powered by Claude AI
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
        >
          Find the Perfect{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Business Idea
          </span>{" "}
          for You in 60 Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI analyzes your interests, skills, time, and budget to generate
          personalized business ideas and a step-by-step action plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="xl" variant="gradient" asChild className="group shadow-xl shadow-indigo-500/25">
            <Link href="/signup">
              Start Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" className="gap-2">
            <Play className="w-4 h-4 fill-current" />
            See how it works
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-sm text-gray-400 dark:text-gray-500"
        >
          Free to start. No credit card required.
        </motion.p>

        {/* Hero screenshot/preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/50">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 min-h-[300px] flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                {[
                  { label: "Top Recommendation", value: "SaaS Tool for Creators", badge: "🔥 Trend Score: 92", color: "indigo" },
                  { label: "Startup Cost", value: "€500 – €2,000", badge: "Low barrier", color: "green" },
                  { label: "Income Potential", value: "€5k – €20k/mo", badge: "Month 6+", color: "purple" },
                ].map((item, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.value}</p>
                    <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
