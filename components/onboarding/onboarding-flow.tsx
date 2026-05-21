"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { OnboardingData } from "@/types";
import { StepInterests } from "./steps/step-interests";
import { StepSkills } from "./steps/step-skills";
import { StepTime } from "./steps/step-time";
import { StepBudget } from "./steps/step-budget";
import { StepIncome } from "./steps/step-income";
import { StepModel } from "./steps/step-model";
import { StepRisk } from "./steps/step-risk";
import { generateAnalysis } from "@/actions/analysis";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { title: "Your Interests", subtitle: "What topics excite you most?" },
  { title: "Your Skills", subtitle: "What are you good at?" },
  { title: "Available Time", subtitle: "How much time can you commit daily?" },
  { title: "Starting Budget", subtitle: "How much can you invest to start?" },
  { title: "Income Goal", subtitle: "What's your monthly income target?" },
  { title: "Business Model", subtitle: "What type of business appeals to you?" },
  { title: "Risk Tolerance", subtitle: "How comfortable are you with risk?" },
];

const initialData: OnboardingData = {
  interests: [],
  skills: [],
  hoursPerDay: "",
  budget: "",
  monthlyIncomeGoal: "",
  businessModel: "",
  riskTolerance: "",
};

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const progress = ((step + 1) / STEPS.length) * 100;

  function updateData(updates: Partial<OnboardingData>) {
    setData((prev) => ({ ...prev, ...updates }));
  }

  function canProceed(): boolean {
    switch (step) {
      case 0: return data.interests.length > 0;
      case 1: return data.skills.length > 0;
      case 2: return data.hoursPerDay !== "";
      case 3: return data.budget !== "";
      case 4: return data.monthlyIncomeGoal !== "";
      case 5: return data.businessModel !== "";
      case 6: return data.riskTolerance !== "";
      default: return false;
    }
  }

  async function handleFinish() {
    setIsLoading(true);
    try {
      const result = await generateAnalysis(data);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.analysisId) {
        router.push(`/results/${result.analysisId}`);
      }
    } catch (e) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  const stepComponents = [
    <StepInterests key="interests" value={data.interests} onChange={(v) => updateData({ interests: v })} />,
    <StepSkills key="skills" value={data.skills} onChange={(v) => updateData({ skills: v })} />,
    <StepTime key="time" value={data.hoursPerDay} onChange={(v) => updateData({ hoursPerDay: v })} />,
    <StepBudget key="budget" value={data.budget} onChange={(v) => updateData({ budget: v })} />,
    <StepIncome key="income" value={data.monthlyIncomeGoal} onChange={(v) => updateData({ monthlyIncomeGoal: v })} />,
    <StepModel key="model" value={data.businessModel} onChange={(v) => updateData({ businessModel: v })} />,
    <StepRisk key="risk" value={data.riskTolerance} onChange={(v) => updateData({ riskTolerance: v })} />,
  ];

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Step {step + 1} of {STEPS.length}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{STEPS[step].title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{STEPS[step].subtitle}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {stepComponents[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0 || isLoading}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            variant="gradient"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed() || isLoading}
            className="gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="gradient"
            onClick={handleFinish}
            disabled={!canProceed() || isLoading}
            className="gap-2 shadow-lg shadow-indigo-500/25"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating your analysis...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate My Business Ideas
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
