// Owner: Content Manager | Purpose: Empathy + authority — positions us as Yoda (guide), not Luke (hero)
const stats = [
  { value: "100+", label: "Small businesses served" },
  { value: "90", label: "Days to measurable results" },
  { value: "2×", label: "Average lead increase" },
  { value: "98%", label: "Client satisfaction rate" },
];

export default function Guide() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Empathy + story */}
          <div>
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">
              We Understand
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 leading-tight">
              We&apos;ve talked to hundreds of business owners who felt exactly
              where you are right now.
            </h2>
            <div className="border-l-4 border-green-500 pl-6 mb-6">
              <p className="text-slate-600 leading-relaxed">
                That&apos;s why we built Graft Digital — not to sell you a website,
                but to build you a system. A system that generates leads while you
                focus on what you do best: running your business.
              </p>
            </div>
            <div className="border-l-4 border-green-200 pl-6">
              <p className="text-slate-600 leading-relaxed">
                We combine StoryBrand messaging, conversion-focused design, and
                data-driven marketing to give you a predictable pipeline —
                regardless of the season, the referrals, or the algorithm.
              </p>
            </div>
          </div>

          {/* Right: Dark authority stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50 text-center group hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300"
              >
                <div className="text-5xl font-black gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto my-3" />
                <div className="text-sm text-slate-400 font-medium leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
