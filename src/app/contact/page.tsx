import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call — Graft Digital",
  description:
    "Book a free 30-minute strategy call. We'll diagnose what's holding your lead generation back and give you a clear plan.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Book Your Free Strategy Call
            </h1>
            <p className="text-slate-300 text-lg">
              30 minutes. No pitch. Just a clear picture of what&apos;s holding your
              growth back — and how to fix it.
            </p>
          </div>
        </section>

        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
