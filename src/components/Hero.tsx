// Owner: Website Owner | Purpose: Above-the-fold StoryBrand hero — gradient mesh, split layout, floating metrics card
import Link from "next/link";
import { CheckCircle, ArrowRight, TrendingUp, Users, BarChart2 } from "lucide-react";

const GET_STARTED_LINK = "/get-started";

const weeklyBars = [30, 45, 35, 60, 50, 75, 90];

export default function Hero() {
  return (
    <section className="relative bg-slate-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient orb — top left green */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      {/* Gradient orb — bottom right orange */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />
      {/* Gradient orb — center subtle */}
      <div
        className="absolute top-1/2 left-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(22,163,74,0.05) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Tagline */}
            <p className="text-green-400 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              We connect. You grow.
            </p>

            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-sm border border-green-400/20 text-green-300 text-sm font-medium px-4 py-1.5 rounded-full mb-7">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 100+ small businesses
            </div>

            {/* H1 */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              More Clients.{" "}
              <span className="gradient-text">More Revenue.</span>{" "}
              Less&nbsp;Guesswork.
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              We build proven digital marketing systems that turn your website
              into a predictable lead machine — so you wake up to a full calendar,
              not an empty inbox.
            </p>

            {/* Primary CTA */}
            <div className="mb-10">
              <a
                href={GET_STARTED_LINK}
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-orange-600 text-white text-base font-bold rounded-xl hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-600/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Get Started
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                "No credit card required",
                "30-minute call",
                "No obligation",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Floating metrics card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Weekly Leads</p>
                    <p className="text-white text-3xl font-extrabold mt-0.5">+47</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center">
                    <TrendingUp size={18} className="text-green-400" />
                  </div>
                </div>

                {/* Sparkline bars */}
                <div className="flex items-end gap-1.5 h-14 mb-5">
                  {weeklyBars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-green-500/20 relative overflow-hidden">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700/50 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/60 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={13} className="text-slate-400" />
                        <p className="text-slate-400 text-xs">New Clients</p>
                      </div>
                      <p className="text-white font-bold text-lg">12</p>
                      <p className="text-green-400 text-xs">+3 this week</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart2 size={13} className="text-slate-400" />
                        <p className="text-slate-400 text-xs">Conversion</p>
                      </div>
                      <p className="text-white font-bold text-lg">38%</p>
                      <p className="text-green-400 text-xs">+12% vs last mo.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-4 -right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-orange-600/40">
                Live Dashboard
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-600/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse" />
                System Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
