// Owner: Content Manager | Purpose: Stakes — clarifies cost of inaction (under 20 words, not fear-mongering)
import { ArrowRight } from "lucide-react";

const BOOK_CALL_LINK = "#contact";

export default function Stakes() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Gradient fade separator top */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-slate-700 mx-auto mb-10" />

        <p className="text-slate-400 text-lg mb-3">
          Every month without a system is a month your{" "}
          <span className="gradient-text font-semibold">competitor fills their calendar</span>{" "}
          instead.
        </p>
        <p className="text-white text-2xl sm:text-3xl font-bold mb-10 leading-snug">
          The clients who should be calling you are calling them.
        </p>
        <a
          href={BOOK_CALL_LINK}
          className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold text-base rounded-xl hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-600/30"
        >
          Book Your Free Strategy Call — It&apos;s Free
          <ArrowRight size={18} />
        </a>

        {/* Gradient fade separator bottom */}
        <div className="w-px h-12 bg-gradient-to-b from-slate-700 to-transparent mx-auto mt-10" />
      </div>
    </section>
  );
}
