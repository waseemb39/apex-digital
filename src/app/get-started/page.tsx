import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingWizard from "@/components/OnboardingWizard";

export const metadata: Metadata = {
  title: "Get Started — Graft Digital",
  description:
    "Tell us about your business goals in 3 minutes. We'll prepare a custom strategy made for you.",
};

export default function GetStartedPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 mb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Let&apos;s understand your goals
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Answer a few questions about your business. We use your answers to prepare a
              custom strategy — tailored to your specific situation, not a generic pitch.
            </p>
            <div className="flex justify-center gap-6 mt-6 text-xs text-slate-400">
              <span>⏱ Takes ~3 minutes</span>
              <span>🔒 Your data is private</span>
              <span>🎯 Personalized for your business</span>
            </div>
          </div>
        </div>

        {/* Wizard */}
        <div className="px-4 sm:px-6 lg:px-8">
          <OnboardingWizard />
        </div>
      </main>
      <Footer />
    </>
  );
}
