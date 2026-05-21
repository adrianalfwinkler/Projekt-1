import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does IdeaForge AI work?",
    answer: "You answer 7 quick questions about your interests, skills, time, budget, and income goals. Our AI analyzes your profile against thousands of business models and generates 10 personalized business ideas with a full analysis including market data, monetization strategies, and a 7-day action plan.",
  },
  {
    question: "Is the free plan really free?",
    answer: "Yes! You can generate one complete business analysis with all features completely free — no credit card required. If you want unlimited analyses and PDF exports, you can upgrade to Pro.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our analysis is powered by Claude, Anthropic's state-of-the-art AI model. While AI can't predict the future, it synthesizes current market trends, your personal profile, and proven business models to give you highly relevant and actionable recommendations.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes. We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied for any reason, contact us and we'll refund your payment, no questions asked.",
  },
  {
    question: "What is the Lifetime plan?",
    answer: "The Lifetime plan is a one-time payment of €49 that gives you permanent access to all Pro features, including future updates, with no recurring subscription.",
  },
  {
    question: "Can I export my analysis as a PDF?",
    answer: "Yes! Pro and Lifetime users can export their full business analysis as a professionally formatted PDF to share with co-founders, investors, or keep for future reference.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
              <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
