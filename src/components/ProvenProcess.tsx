// Owner: Content Manager | Purpose: "Here's How It Works" — 3-step plan removes risk of doing business
import { Phone, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Book a Free Call",
    description: "We learn your goals and diagnose exactly what's holding your growth back.",
  },
  {
    number: "02",
    icon: Settings,
    title: "We Build Your System",
    description: "We build your messaging, website, and marketing engine in 30 days.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Watch Your Leads Grow",
    description: "Consistent, qualified leads arrive every week — without you chasing them.",
  },
];

const BOOK_CALL_LINK = "#contact";

export default function ProvenProcess() {
  return (
    <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-800 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-300 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Here&apos;s How It Works
          </h2>
          <p className="text-green-200/80 text-lg max-w-xl mx-auto">
            Three clear steps to a full calendar and a business you love running.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-6 mb-14">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              {/* Connector line (desktop only, not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%)] w-6 h-px bg-gradient-to-r from-green-400/60 to-transparent z-10" />
              )}

              <div className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-8 h-full group hover:bg-white/15 hover:border-white/25 transition-all duration-300">
                {/* Large backdrop number */}
                <span className="absolute -bottom-3 right-3 text-[120px] font-black text-white/5 select-none leading-none pointer-events-none">
                  {step.number}
                </span>

                {/* Step badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center">
                    <span className="text-green-300 text-xs font-bold">{step.number}</span>
                  </div>
                  <span className="text-green-300 text-xs font-bold uppercase tracking-widest">
                    Step {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5">
                  <step.icon size={22} className="text-green-300" />
                </div>

                <h3 className="text-white font-bold text-xl mb-3 relative">{step.title}</h3>
                <p className="text-green-100/70 text-sm leading-relaxed relative">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={BOOK_CALL_LINK}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold text-base rounded-xl hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-600/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
          >
            Book Your Free Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
