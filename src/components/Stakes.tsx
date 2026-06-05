// Owner: Content Manager | Purpose: Stakes â€” clarifies cost of inaction (under 20 words, not fear-mongering)
const BOOK_CALL_LINK = "#contact";

export default function Stakes() {
  return (
    <section className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-slate-400 text-lg mb-3">
          Every month without a system is a month your competitor fills their calendar instead.
        </p>
        <p className="text-white text-xl font-semibold mb-8">
          The clients who should be calling you are calling them.
        </p>
        <a
          href={BOOK_CALL_LINK}
          className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold text-base rounded-lg hover:bg-orange-700 transition-colors"
        >
          Book Your Free Strategy Call â€” It&apos;s Free
        </a>
      </div>
    </section>
  );
}

