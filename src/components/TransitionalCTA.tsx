// Owner: Content Manager | Purpose: Email lead magnet â€” transitional CTA for visitors not ready to book
// Connect the form action to your email marketing tool (Mailchimp, ConvertKit, etc.) before launch
"use client";

import { useState } from "react";

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
    <section id={LEAD_GUIDE_ID} className="bg-green-50 border-y border-green-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
          Free Resource
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Download the Free Lead Guide
        </h2>
        <p className="text-slate-600 mb-8">
          The exact 7-step framework we use to double leads for small businesses
          in 90 days â€” yours free.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-6 py-4 font-medium">
            Check your inbox! Your free guide is on its way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send Me the Guide
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-slate-400">
          No spam, ever. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

