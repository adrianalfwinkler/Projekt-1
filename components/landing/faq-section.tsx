import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does IdeaForge AI work?",
    answer: "You answer 7 quick questions about your interests, skills, time, budget, and income goals. Our AI analyzes your profile against thousands of business models and generates 10 personalized ideas with market data, monetization strategies, and a 7-day action plan — all in under 60 seconds.",
  },
  {
    question: "Is the free plan really free?",
    answer: "Yes. You get one complete business analysis — including all ideas, market analysis, and the action plan — completely free. No credit card required. Upgrade to Pro if you want unlimited analyses and PDF export.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our analysis is powered by Claude, Anthropic's most capable AI. It synthesizes current market trends, your personal profile, and proven business models to give highly relevant, actionable recommendations. While no AI can predict the future, users consistently rate the analysis as far more useful than generic business advice.",
  },
  {
    question: "Can I get a refund?",
    answer: "Yes — 7-day money-back guarantee on all paid plans. If you're not satisfied for any reason, contact us and we'll refund your payment, no questions asked.",
  },
  {
    question: "What is the Lifetime plan?",
    answer: "A one-time payment of €49 gives you permanent access to all Pro features, including future updates. No subscriptions, no recurring charges — ever.",
  },
  {
    question: "Can I export my analysis as a PDF?",
    answer: "Yes. Pro and Lifetime users can download their full analysis as a professionally formatted PDF — great for sharing with co-founders, mentors, or investors.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Everything you need to know before you start.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors data-[state=open]:border-indigo-300 dark:data-[state=open]:border-indigo-700"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white text-sm py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-center text-sm text-gray-400 mt-10">
          Still have questions?{" "}
          <a href="mailto:hello@ideaforge.ai" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Email us
          </a>
        </p>
      </div>
    </section>
  );
}
