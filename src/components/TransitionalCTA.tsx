// Owner: Content Manager | Purpose: Email lead magnet — dark dramatic transitional CTA
// Connect the form action to your email marketing tool (Mailchimp, ConvertKit, etc.) before launch
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const LEAD_GUIDE_ID = "lead-guide";

export default function TransitionalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Replace this with your email marketing API call (Mailchimp, ConvertKit, etc.)
    console.log("Lead guide requested by:", email);
    setSubmitted(true);
  }

  return (
    <section
      id={LEAD_GUIDE_ID}
      className="relative bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Green orb top-right */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          Free Resource
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Get the <span className="gradient-text">7-Step Framework</span> We Use to
          Double Leads in 90 Days
        </h2>
        <p className="text-slate-400 mb-10 text-lg leading-relaxed">
          The exact playbook we run for every new client — yours free, no strings attached.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-300 rounded-2xl px-6 py-5 font-medium">
            Check your inbox! Your free guide is on its way. 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-600/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950 whitespace-nowrap"
            >
              Send It
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        <p className="mt-5 text-xs text-slate-600">
          No spam, ever. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
