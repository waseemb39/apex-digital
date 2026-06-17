// Owner: Website Owner | Purpose: Site-wide navigation with frosted glass scroll effect and primary CTA
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const GET_STARTED_LINK = "/get-started";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = scrolled
    ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-sm"
    : "bg-transparent border-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${navClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 12 4 7 7 5C10 3 12 4 12 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 5C7 5 7 2 10 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="7" cy="5" r="1.5" fill="white"/>
              </svg>
            </div>
            <div>
              <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"}`}>
                Graft<span className="text-green-500">Digital</span>
              </span>
              <p className={`text-xs leading-none mt-0.5 hidden sm:block transition-colors duration-300 ${scrolled ? "text-slate-400" : "text-slate-400"}`}>
                We connect. You grow.
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/services" className={`transition-colors hover:text-green-400 ${scrolled ? "text-slate-600" : "text-slate-300"}`}>
              Services
            </Link>
            <Link href="/products" className={`transition-colors hover:text-green-400 ${scrolled ? "text-slate-600" : "text-slate-300"}`}>
              Products
            </Link>
            <Link href="/about" className={`transition-colors hover:text-green-400 ${scrolled ? "text-slate-600" : "text-slate-300"}`}>
              About
            </Link>
            <Link href="/portal" className={`transition-colors hover:text-green-400 ${scrolled ? "text-slate-600" : "text-slate-300"}`}>
              Login
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={GET_STARTED_LINK}
              className="inline-flex items-center px-5 py-2 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-5 flex flex-col gap-4">
          <Link href="/services" className="text-slate-300 font-medium hover:text-white" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link href="/products" className="text-slate-300 font-medium hover:text-white" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link href="/about" className="text-slate-300 font-medium hover:text-white" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/portal" className="text-slate-300 font-medium hover:text-white" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link href="/contact" className="text-slate-300 font-medium hover:text-white" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <a
            href={GET_STARTED_LINK}
            className="inline-flex justify-center items-center px-5 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
