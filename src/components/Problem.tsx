// Owner: Content Manager | Purpose: Names the customer's external, internal, and philosophical pain
const problems = [
  {
    icon: "📉",
    type: "The Visible Problem",
    headline: "Your website gets traffic but the phone never rings.",
    body: "You've invested in a site. Maybe even ads. But leads are inconsistent, referrals are drying up, and you can't predict where the next client comes from.",
  },
  {
    icon: "😤",
    type: "How It Really Feels",
    headline: "You feel invisible while your competitors keep winning.",
    body: "You know you're better at what you do — but they're showing up first online. It's frustrating to lose business because of marketing, not quality.",
  },
  {
    icon: "⚖️",
    type: "Why This Is Unfair",
    headline: "A great business shouldn't fail because of bad marketing.",
    body: "You built something real. You serve your clients well. You shouldn't have to become a marketing expert just to fill your calendar.",
  },
];

export default function Problem() {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            You&apos;ve tried everything — and it still isn&apos;t working.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            You&apos;re not alone. Most small business owners face the same three problems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.type}
              className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                {problem.type}
              </p>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {problem.headline}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{problem.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
