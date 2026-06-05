// Owner: Website Owner | Purpose: Above-the-fold StoryBrand hero — customer outcome H1, dual CTAs
import Link from "next/link";

const BOOK_CALL_LINK = "#contact";
const LEAD_GUIDE_LINK = "#lead-guide";

export default function Hero() {
  return (
    <section className="bg-slate-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-blue-400 font-semibold text-lg tracking-wide mb-3">
            We connect. You grow.
          </p>

          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Trusted by 100+ small businesses
          </div>

          {/* H1 — customer outcome, NOT company name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            More Clients.{" "}
            <span className="text-blue-400">More Revenue.</span>{" "}
            Less Guesswork.
          </h1>

          {/* Subhead — what we offer + transformation */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
            We build proven digital marketing systems that turn your website
            into a predictable lead machine — so you wake up to a full calendar,
            not an empty inbox.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BOOK_CALL_LINK}
              className="inline-flex justify-center items-center px-8 py-4 bg-orange-600 text-white text-base font-bold rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Book Your Free Strategy Call
            </a>
            <a
              href={LEAD_GUIDE_LINK}
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-white text-base font-semibold rounded-lg border border-slate-500 hover:border-white hover:bg-white/5 transition-colors"
            >
              Download the Free Lead Guide
            </a>
          </div>

          {/* Trust signals */}
          <p className="mt-8 text-sm text-slate-500">
            No credit card required &nbsp;·&nbsp; 30-minute call &nbsp;·&nbsp; No obligation
          </p>
        </div>
      </div>
    </section>
  );
}
