import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Guide from "@/components/Guide";
import ProvenProcess from "@/components/ProvenProcess";
import SuccessVision from "@/components/SuccessVision";
import Testimonials from "@/components/Testimonials";
import Stakes from "@/components/Stakes";
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
        <SuccessVision />
        <Testimonials />
        <Stakes />
      </main>
      <Footer />
    </>
  );
}

