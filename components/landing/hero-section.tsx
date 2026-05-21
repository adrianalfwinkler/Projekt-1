"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, TrendingUp, DollarSign, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 px-4 overflow-hidden">
      {/* Mesh grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff20_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff20_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#312e8120_1px,transparent_1px),linear-gradient(to_bottom,#312e8120_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Radial fade over grid */}
        <div className="dark:hidden absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.8) 70%, white 100%)" }} />
        <div className="hidden dark:block absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(3,7,18,0.8) 70%, rgb(3,7,18) 100%)" }} />
        {/* Orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-600/10 dark:to-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-400/15 dark:from-purple-600/10 dark:to-pink-600/10 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Claude AI · Free to start
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.08] mb-6"
        >
          Find Your Perfect{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Business Idea
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-indigo-600/0 via-violet-500/60 to-purple-600/0" />
          </span>
          <br />
          <span className="text-gray-500 dark:text-gray-400">in 60 Seconds</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Answer 7 quick questions. AI analyzes your skills, time, and budget to generate
          10 personalized ideas with a complete action plan to your first euro.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
        >
          <Button
            size="xl"
            variant="gradient"
            asChild
            className="group shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-shadow"
          >
            <Link href="/signup">
              Start for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="xl"
            variant="outline"
            asChild
            className="hover:border-indigo-300 dark:hover:border-indigo-700"
          >
            <Link href="#example">See example output</Link>
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-500 mb-16"
        >
          <span className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1 font-medium text-gray-600 dark:text-gray-300">4.9/5</span>
          </span>
          <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
          <span>2,400+ entrepreneurs</span>
          <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
          <span>No credit card required</span>
        </motion.div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glow behind preview */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />

          <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-2xl shadow-gray-900/10 dark:shadow-black/50 bg-white dark:bg-gray-900">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-1 text-xs text-gray-400 dark:text-gray-500 text-center">
                  ideaforge.ai/results
                </div>
              </div>
              <div className="w-14" />
            </div>

            {/* Content */}
            <div className="p-6 bg-gray-50 dark:bg-gray-950">
              {/* Top recommendation */}
              <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" /> Top Recommendation
                  </span>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-2.5 py-1 rounded-full">
                    🔥 Trend: 92
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Notion Template Business
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Perfect for your design skills. Build once, sell forever to thousands of Notion users.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: DollarSign, label: "Cost", value: "€200" },
                    { icon: TrendingUp, label: "Revenue", value: "€5k/mo" },
                    { icon: Clock, label: "Start", value: "2 weeks" },
                    { icon: Zap, label: "Effort", value: "2 / 5" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white dark:bg-gray-900 rounded-lg p-2.5 border border-gray-100 dark:border-gray-800"
                    >
                      <item.icon className="w-3 h-3 text-indigo-500 mb-1" />
                      <p className="text-[10px] text-gray-400">{item.label}</p>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Idea cards row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "AI Micro-SaaS", cost: "€500", score: 88 },
                  { name: "Creator Newsletter", cost: "€0", score: 79 },
                  { name: "Coaching Service", cost: "€100", score: 75 },
                ].map((idea, i) => (
                  <div
                    key={idea.name}
                    className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-medium text-gray-400">#{i + 2}</span>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                        {idea.score}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1 leading-tight">
                      {idea.name}
                    </p>
                    <span className="text-[10px] text-green-600 dark:text-green-400">
                      {idea.cost} to start
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge — top right */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 sm:-right-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">Analysis complete</p>
              <p className="text-[10px] text-gray-400">Generated in 48 seconds</p>
            </div>
          </motion.div>

          {/* Floating badge — bottom left */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -left-4 sm:-left-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 shadow-xl"
          >
            <p className="text-[10px] text-gray-400 mb-0.5">10,000+ ideas generated</p>
            <div className="flex -space-x-1.5">
              {["🧑‍💼", "👩‍💻", "🧑‍🎨", "👨‍🔬", "👩‍🚀"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-[8px] border border-white dark:border-gray-900"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
