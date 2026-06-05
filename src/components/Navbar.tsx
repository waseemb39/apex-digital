// Owner: Website Owner | Purpose: Site-wide navigation with primary CTA
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const BOOK_CALL_LINK = "#contact";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div>
              <span className="text-xl font-bold text-slate-900">
                Graft<span className="text-blue-600">Digital</span>
              </span>
              <p className="text-xs text-slate-400 leading-none mt-0.5 hidden sm:block">We connect. You grow.</p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/services" className="hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/portal" className="hover:text-blue-600 transition-colors">
              Client Portal
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center px-4 py-2.5 border border-blue-600 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
            <a
              href={BOOK_CALL_LINK}
              className="inline-flex items-center px-5 py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Book a Free Strategy Call
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 flex flex-col gap-4">
          <Link
            href="/services"
            className="text-slate-700 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-slate-700 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/portal"
            className="text-slate-700 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Client Portal
          </Link>
          <Link
            href="/get-started"
            className="text-blue-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
          <Link
            href="/contact"
            className="text-slate-700 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <a
            href={BOOK_CALL_LINK}
            className="inline-flex justify-center items-center px-5 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Book a Free Strategy Call
          </a>
        </div>
      )}
    </nav>
  );
}
