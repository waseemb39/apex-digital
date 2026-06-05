// Owner: Website Owner | Purpose: Site footer — gradient border, 4-col layout, repeated CTA, trust signals
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BOOK_CALL_LINK = "#contact";

const serviceLinks = [
  { label: "SEO", href: "/services" },
  { label: "Paid Ads (PPC)", href: "/services" },
  { label: "Website Design", href: "/services" },
  { label: "Social Media", href: "/services" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/portal" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer CTA */}
        <div className="text-center py-16 border-b border-slate-800">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-[0.2em] mb-3">
            Ready to grow?
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to fill your{" "}
            <span className="gradient-text">calendar</span>?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Book your free 30-minute strategy call. No pitch, no pressure — just a
            clear plan for getting more leads.
          </p>
          <a
            href={BOOK_CALL_LINK}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-600/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Book Your Free Strategy Call
            <ArrowRight size={18} />
          </a>
        </div>

        {/* 4-column footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 12 4 7 7 5C10 3 12 4 12 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 5C7 5 7 2 10 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="7" cy="5" r="1.5" fill="white"/>
                </svg>
              </div>
              <span className="text-xl font-bold">
                Graft<span className="text-green-400">Digital</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              We connect. You grow.
              <br />
              Proven marketing systems for small businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Services
            </h3>
            <nav className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <nav className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:hello@graftdigital.com"
                className="text-slate-500 text-sm hover:text-white transition-colors"
              >
                hello@graftdigital.com
              </a>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1.5 text-green-400 text-sm font-semibold hover:text-green-300 transition-colors mt-1"
              >
                Start a Project
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Graft Digital. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
