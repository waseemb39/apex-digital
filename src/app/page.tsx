import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Guide from "@/components/Guide";
import ProvenProcess from "@/components/ProvenProcess";
import TransitionalCTA from "@/components/TransitionalCTA";
import SuccessVision from "@/components/SuccessVision";
import Testimonials from "@/components/Testimonials";
import Stakes from "@/components/Stakes";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Guide />
        <ProvenProcess />
        <TransitionalCTA />
        <SuccessVision />
        <Testimonials />
        <Stakes />

        {/* Contact / Booking Section */}
        <section id="contact" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                Free Strategy Call
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Book your free 30-minute call.
              </h2>
              <p className="text-slate-600">
                Tell us about your business. We&apos;ll tell you exactly what&apos;s
                holding your growth back — and how to fix it.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
