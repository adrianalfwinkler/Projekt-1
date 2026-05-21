"use client";
import { Star } from "lucide-react";

const testimonials = [
  { quote: "I had the analysis done in under a minute. The Notion template idea fit my skills perfectly — I made my first sale that same week.", name: "Lena K.", role: "Freelance Designer", avatar: "LK" },
  { quote: "Finally, AI that doesn't give generic advice. The 7-day plan was specific enough to actually follow.", name: "Marco R.", role: "Student & Side-Hustler", avatar: "MR" },
  { quote: "I was skeptical, but the market analysis was surprisingly accurate. Saved me weeks of research.", name: "Priya S.", role: "Software Engineer", avatar: "PS" },
  { quote: "The income roadmap for month 1 through 12 was exactly what I needed to pitch my co-founder.", name: "Tom B.", role: "Aspiring Founder", avatar: "TB" },
  { quote: "Best €49 I've ever spent. Got my first client within 3 weeks of following the plan.", name: "Sophie M.", role: "Marketing Consultant", avatar: "SM" },
  { quote: "The AI understood my constraints perfectly — low budget, limited time, but big ambitions.", name: "Ravi N.", role: "University Student", avatar: "RN" },
  { quote: "I've tried other business idea generators but none come close to the depth IdeaForge AI provides.", name: "Claire D.", role: "Product Manager", avatar: "CD" },
  { quote: "Three analyses, three solid ideas. Now building my first SaaS with the roadmap from the platform.", name: "Alex J.", role: "Developer & Founder", avatar: "AJ" },
];

const stats = [
  { value: "10,000+", label: "Ideas Generated" },
  { value: "2,400+", label: "Happy Users" },
  { value: "4.9 / 5", label: "Average Rating" },
  { value: "< 60s", label: "Generation Time" },
];

function AvatarInitials({ initials, index }: { initials: string; index: number }) {
  const colors = [
    "from-indigo-400 to-purple-500",
    "from-purple-400 to-pink-500",
    "from-blue-400 to-indigo-500",
    "from-green-400 to-teal-500",
    "from-orange-400 to-red-500",
    "from-teal-400 to-cyan-500",
    "from-rose-400 to-pink-500",
    "from-violet-400 to-purple-500",
  ];
  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
      {initials}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <div className="w-[320px] shrink-0 mx-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
      <div className="flex gap-0.5 mb-3">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-2.5">
        <AvatarInitials initials={testimonial.avatar} index={index} />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function SocialProof() {
  const doubled = [...testimonials, ...testimonials]; // for seamless loop
  const row2 = [...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)];

  return (
    <section className="py-20 overflow-hidden border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/30">
      {/* Stats row */}
      <div className="max-w-4xl mx-auto px-4 mb-14">
        <p className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">
          Trusted by entrepreneurs worldwide
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="relative mb-4">
        <div className="flex" style={{ animation: 'marquee 35s linear infinite' }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i % testimonials.length} />
          ))}
        </div>
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900/30 to-transparent pointer-events-none z-10" />
      </div>

      {/* Marquee row 2 — right to left (reverse) */}
      <div className="relative">
        <div className="flex" style={{ animation: 'marquee 40s linear infinite reverse' }}>
          {row2.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={(i + 3) % testimonials.length} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900/30 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
