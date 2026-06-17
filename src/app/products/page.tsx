import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Website Types — Graft Digital",
  description:
    "Explore the six types of websites we build — from focused landing pages and online shops to fully custom digital experiences.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-[0.2em] mb-4">
              What We Build
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              The right website for the right goal.
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Every business is different. We build six types of websites — each
              designed with a specific purpose in mind. Find the one that fits
              where you&apos;re headed.
            </p>
          </div>
        </section>

        {/* Products grid */}
        <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-700 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Not sure which fits best?
            </h2>
            <p className="text-green-100 mb-8">
              Tell us about your business and we&apos;ll recommend the right type —
              no pressure, no jargon.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
