import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services — Graft Digital",
  description:
    "Digital marketing services for small businesses: websites, SEO, paid ads, email marketing, and conversion optimization.",
};

const services = [
  {
    icon: "🌐",
    title: "Website Design & Build",
    description:
      "StoryBrand-optimized websites built in Next.js. Fast, mobile-first, accessible, and designed to convert visitors into leads.",
    outcomes: ["Passes the 5-second Grunt Test", "PageSpeed ≥ 90 on mobile", "Fully documented for your team"],
  },
  {
    icon: "📣",
    title: "Brand Messaging & Copywriting",
    description:
      "We clarify your message using the StoryBrand SB7 framework so every visitor immediately understands what you offer and why it matters.",
    outcomes: ["Complete BrandScript", "Homepage copy", "Email sequence copy"],
  },
  {
    icon: "🔍",
    title: "SEO & Content Strategy",
    description:
      "Rank for the keywords your ideal clients are searching. We build the technical foundation and content strategy to drive organic traffic.",
    outcomes: ["Technical SEO audit & fix", "Keyword strategy", "Monthly content plan"],
  },
  {
    icon: "💰",
    title: "Paid Advertising (Google & Meta)",
    description:
      "High-converting ad campaigns with clear attribution. Know exactly which ads bring in clients — and which ones to kill.",
    outcomes: ["Full funnel build", "Weekly reporting", "Cost-per-lead tracking"],
  },
  {
    icon: "📧",
    title: "Email Marketing & Automation",
    description:
      "Nurture sequences, lead magnets, and automated follow-ups that turn cold leads into warm appointments while you sleep.",
    outcomes: ["Lead magnet creation", "Welcome sequence", "Booking confirmation flow"],
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    description:
      "GA4, Google Tag Manager, and Meta Pixel installed and configured. A weekly scorecard so you always know your numbers.",
    outcomes: ["Full tracking setup", "Weekly scorecard", "Monthly OKR review"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              Everything you need to turn your website into a lead machine.
            </h1>
            <p className="text-slate-300 text-lg">
              A complete digital marketing system — not a collection of disconnected tactics.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="text-green-600 font-bold">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-blue-100 mb-8">
              Book a free call. We&apos;ll diagnose the gaps and tell you exactly where to start.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Book Your Free Strategy Call
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
