import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Graft Digital",
  description: "Sign in to your Graft Digital client portal.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 12C2 12 4 7 7 5C10 3 12 4 12 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 5C7 5 7 2 10 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="7" cy="5" r="1.5" fill="white"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              Graft<span className="text-green-600">Digital</span>
            </span>
          </a>
          <p className="text-slate-500 text-sm mt-3">Sign in to your client portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Not a client yet?{" "}
          <a href="/get-started" className="text-green-600 hover:underline font-medium">
            Get started here →
          </a>
        </p>
      </div>
    </div>
  );
}
