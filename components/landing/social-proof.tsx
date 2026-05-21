export function SocialProof() {
  const stats = [
    { value: "10,000+", label: "Ideas Generated" },
    { value: "2,400+", label: "Users" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "60s", label: "Average Time" },
  ];

  const logos = ["TechCrunch", "ProductHunt", "IndieHackers", "HackerNews"];

  return (
    <section className="py-16 px-4 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-10 uppercase tracking-widest font-medium">
          Trusted by entrepreneurs worldwide
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8 opacity-40">
          {logos.map((logo) => (
            <span key={logo} className="text-gray-500 dark:text-gray-400 font-bold text-lg tracking-tight">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
