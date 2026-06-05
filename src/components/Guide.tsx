// Owner: Content Manager | Purpose: Empathy + authority — positions us as Yoda (guide), not Luke (hero)
const stats = [
  { value: "100+", label: "Small businesses served" },
  { value: "90", label: "Days to measurable results" },
  { value: "2×", label: "Average lead increase" },
  { value: "98%", label: "Client satisfaction rate" },
];

export default function Guide() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Empathy + story */}
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
              We Understand
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              We&apos;ve talked to hundreds of business owners who felt exactly
              where you are right now.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              That&apos;s why we built Graft Digital — not to sell you a website,
              but to build you a system. A system that generates leads while you
              focus on what you do best: running your business.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We combine StoryBrand messaging, conversion-focused design, and
              data-driven marketing to give you a predictable pipeline —
              regardless of the season, the referrals, or the algorithm.
            </p>
          </div>

          {/* Right: Authority stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center"
              >
                <div className="text-4xl font-extrabold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
