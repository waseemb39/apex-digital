import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, getProductBySlug } from "@/data/products";
import {
  Zap,
  Building2,
  ShoppingBag,
  CalendarCheck,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Users,
  LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Zap,
  Building2,
  ShoppingBag,
  CalendarCheck,
  BookOpen,
  Sparkles,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Graft Digital`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const Icon = iconMap[product.icon] ?? Zap;

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-600/20 text-green-400 mx-auto mb-6">
              <Icon size={28} strokeWidth={1.75} />
            </div>
            <p className="text-xs font-semibold text-green-400 uppercase tracking-[0.2em] mb-4">
              Website Type
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              {product.name}
            </h1>
            <p className="text-green-400 text-lg font-medium mb-6">
              {product.tagline}
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              {product.longDescription}
            </p>
          </div>
        </section>

        {/* Features + Ideal For */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What&apos;s included
              </h2>
              <ul className="space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-slate-700 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Ideal for
              </h2>
              <ul className="space-y-4">
                {product.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Users
                      size={18}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-slate-700 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Back link */}
              <a
                href="/products"
                className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-slate-500 hover:text-green-600 transition-colors"
              >
                ← All website types
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-700 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to build your {product.name.toLowerCase()}?
            </h2>
            <p className="text-green-100 mb-8">
              Let&apos;s talk about your goals and put together a plan that fits your
              budget and timeline.
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
