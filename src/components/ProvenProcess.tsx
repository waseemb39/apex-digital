// Owner: Content Manager | Purpose: "Here's How It Works" â€” 3-step plan removes risk of doing business
// Update steps array to change process content. Keep titles under 5 words, descriptions under 15.

const steps = [
  {
    number: "01",
    icon: "ðŸ“ž",
    title: "Book a Free Call",
    description: "We learn your goals and diagnose exactly what's holding your growth back.",
  },
  {
    number: "02",
    icon: "âš™ï¸",
    title: "We Build Your System",
    description: "We build your messaging, website, and marketing engine in 30 days.",
  },
  {
    number: "03",
    icon: "ðŸ“ˆ",
    title: "Watch Your Leads Grow",
    description: "Consistent, qualified leads arrive every week â€” without you chasing them.",
  },
];

const BOOK_CALL_LINK = "#contact";

export default function ProvenProcess() {
  return (
    <section className="bg-green-700 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Here&apos;s How It Works
          </h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Three clear steps to a full calendar and a business you love running.
          </p>
        </div>

        {/* Steps â€” horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row gap-8 mb-14">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              {/* Connector line (desktop only, not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_16px)] w-8 h-0.5 bg-green-400 z-10" />
              )}

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 h-full">
                <div className="text-3xl mb-4">{step.icon}</div>
                <div className="text-green-200 text-xs font-bold uppercase tracking-widest mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-green-100 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={BOOK_CALL_LINK}
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold text-base rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
          >
            Book Your Free Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}


