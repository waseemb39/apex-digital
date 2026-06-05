// Owner: Website Owner | Purpose: Site footer — repeated CTA, navigation, legal links, trust signals
import Link from "next/link";

const BOOK_CALL_LINK = "#contact";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Footer CTA */}
        <div className="text-center border-b border-slate-800 pb-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to fill your calendar?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Book your free 30-minute strategy call. No pitch, no pressure — just a
            clear plan for getting more leads.
          </p>
          <a
            href={BOOK_CALL_LINK}
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Book Your Free Strategy Call
          </a>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Graft<span className="text-blue-400">Digital</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-400 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-slate-500 text-sm text-center sm:text-right">
            © {new Date().getFullYear()} Graft Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
