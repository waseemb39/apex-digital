// Owner: Website Owner | Purpose: Card for a single website type product — used on the /products index grid
import Link from "next/link";
import {
  Zap,
  Building2,
  ShoppingBag,
  CalendarCheck,
  BookOpen,
  Sparkles,
  ArrowRight,
  LucideProps,
} from "lucide-react";
import type { Product } from "@/data/products";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Zap,
  Building2,
  ShoppingBag,
  CalendarCheck,
  BookOpen,
  Sparkles,
};

export default function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.icon] ?? Zap;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-slate-200 p-8 hover:border-green-400 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50 text-green-600 mb-5 group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
        <Icon size={24} strokeWidth={1.75} />
      </div>

      <h2 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h2>
      <p className="text-green-600 text-sm font-medium mb-3">{product.tagline}</p>
      <p className="text-slate-600 text-sm leading-relaxed flex-grow">
        {product.shortDescription}
      </p>

      <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-green-600 group-hover:gap-2 transition-all duration-200">
        Learn more <ArrowRight size={15} />
      </div>
    </Link>
  );
}
