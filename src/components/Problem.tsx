// Owner: Content Manager | Purpose: Names the customer's external, internal, and philosophical pain
import { TrendingDown, Frown, Scale } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    type: "The Visible Problem",
    number: "01",
    headline: "Your website gets traffic but the phone never rings.",
    body: "You've invested in a site. Maybe even ads. But leads are inconsistent, referrals are drying up, and you can't predict where the next client comes from.",
  },
  {
    icon: Frown,
    type: "How It Really Feels",
    number: "02",
    headline: "You feel invisible while your competitors keep winning.",
    body: "You know you're better at what you do — but they're showing up first online. It's frustrating to lose business because of marketing, not quality.",
  },
  {
    icon: Scale,
    type: "Why This Is Unfair",
    number: "03",
    headline: "A great business shouldn't fail because of bad marketing.",
    body: "You built something real. You serve your clients well. You shouldn't have to become a marketing expert just to fill your calendar.",
  },
];

export default function Problem() {
  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            You&apos;ve tried <em className="not-italic underline decoration-green-400 underline-offset-4">everything</em> — and it still isn&apos;t working.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            You&apos;re not alone. Most small business owners face the same three problems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, type, number, headline, body }) => (
            <div
              key={type}
              className="group relative overflow-hidden bg-white rounded-2xl p-8 border border-slate-100 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              {/* Top gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-t-2xl" />

              {/* Decorative background number */}
              <span className="absolute -top-3 -right-1 text-[110px] font-black text-slate-50 select-none leading-none pointer-events-none group-hover:text-green-50 transition-colors duration-300">
                {number}
              </span>

              {/* Icon */}
              <div className="relative w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-5">
                <Icon size={20} className="text-green-600" />
              </div>

              {/* Label */}
              <p className="relative text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                {type}
              </p>

              {/* Headline */}
              <h3 className="relative text-lg font-bold text-slate-900 mb-3 leading-snug">
                {headline}
              </h3>

              {/* Body */}
              <p className="relative text-slate-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
