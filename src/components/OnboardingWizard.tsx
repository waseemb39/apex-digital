// Owner: Website Owner | Purpose: First-time client intake wizard — 4 steps, saves to localStorage
"use client";

import { useState } from "react";
import {
  Zap,
  Building2,
  ShoppingBag,
  CalendarCheck,
  BookOpen,
  Sparkles,
  LucideProps,
} from "lucide-react";
import { products } from "@/data/products";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Zap, Building2, ShoppingBag, CalendarCheck, BookOpen, Sparkles,
};

const PAGE_OPTIONS = ["1–3", "4–8", "9–15", "15+", "Not sure yet"];

const ADDON_OPTIONS = [
  "Custom design (not a template)",
  "E-commerce / online payments",
  "Online booking or scheduling",
  "Blog / CMS",
  "User accounts or login area",
  "Admin dashboard",
  "Multi-language support",
  "Copywriting / content creation",
  "Custom animations / interactions",
  "Third-party integrations (CRM, API, etc.)",
  "SEO setup",
  "Logo / branding",
];

const MARKETING_OPTIONS = [
  {
    id: "discuss",
    label: "Let's discuss what's best for my business",
    description: "We'll review your goals and recommend the right mix of services.",
    recommended: true,
  },
  {
    id: "package",
    label: "A marketing package (SEO + Ads + Social — ongoing growth)",
    description: "Full digital marketing running alongside your new website.",
    recommended: false,
  },
  {
    id: "website-only",
    label: "Just the website for now — no marketing package",
    description: "Build the website first, add marketing later when you're ready.",
    recommended: false,
  },
];

const HEAR_OPTIONS = [
  "Google search",
  "Social media",
  "Referral from someone I know",
  "Online ad",
  "Other",
];

// --- Types ---
type Scope = { pages: string; addons: string[] };

type WizardData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  industry: string;
  websiteType: string;
  scope: Scope;
  marketingPackage: string;
  heardFrom: string;
  notes: string;
};

const EMPTY: WizardData = {
  name: "", email: "", phone: "", businessName: "", website: "",
  industry: "", websiteType: "", scope: { pages: "", addons: [] },
  marketingPackage: "", heardFrom: "", notes: "",
};

type StringFields = Exclude<keyof WizardData, "scope">;

// --- Small helpers ---
function inputCls(err?: string) {
  return `w-full px-4 py-3 border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
    err ? "border-red-400 bg-red-50" : "border-slate-300"
  }`;
}

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function RadioOption({ name, value, checked, onChange, label }: {
  name: string; value: string; checked: boolean;
  onChange: () => void; label: string;
}) {
  return (
    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
      checked ? "border-green-500 bg-green-50 text-green-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
    }`}>
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? "border-green-600" : "border-slate-300"
      }`}>
        {checked && <div className="w-2 h-2 rounded-full bg-green-600" />}
      </div>
      <input type="radio" name={name} value={value} className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

function CheckOption({ checked, onChange, label }: {
  checked: boolean; onChange: () => void; label: string;
}) {
  return (
    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
      checked ? "border-green-500 bg-green-50 text-green-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
    }`}>
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? "border-green-600 bg-green-600" : "border-slate-300"
      }`}>
        {checked && <span className="text-white text-xs leading-none">✓</span>}
      </div>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

// --- Main wizard ---
export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const TOTAL = 5;

  function set(field: StringFields, val: string) {
    setData((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: "" }));
  }

  function setScope(field: keyof Scope, val: string | string[]) {
    setData((p) => ({ ...p, scope: { ...p.scope, [field]: val } }));
  }

  function toggleAddon(opt: string) {
    const cur = data.scope.addons;
    setScope("addons", cur.includes(opt) ? cur.filter((v) => v !== opt) : [...cur, opt]);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) e.name = "Required";
      if (!data.email.trim()) e.email = "Required";
      if (!data.businessName.trim()) e.businessName = "Required";
    }
    if (step === 2 && !data.websiteType) e.websiteType = "Please select a website type to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validate()) setStep((s) => Math.min(s + 1, TOTAL));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function finish() {
    if (!validate()) return;
    const profile = { ...data, completedAt: new Date().toISOString() };
    localStorage.setItem("graft_profile", JSON.stringify(profile));
    setStep(5);
  }

  const progress = Math.round(((step - 1) / (TOTAL - 1)) * 100);

  return (
    <div className="max-w-2xl mx-auto">

      {/* Progress */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Step {step} of {TOTAL - 1}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* STEP 1: Contact info */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Let&apos;s get to know your business</h2>
            <p className="text-slate-500 text-sm">Takes about 3 minutes. We&apos;ll use your answers to prepare a custom strategy for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Your Full Name" required error={errors.name}>
              <input type="text" value={data.name} onChange={(e) => set("name", e.target.value)}
                className={inputCls(errors.name)} placeholder="Jane Smith" />
            </Field>
            <Field label="Email Address" required error={errors.email}>
              <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)}
                className={inputCls(errors.email)} placeholder="jane@yourbusiness.com" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Phone Number">
              <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)}
                className={inputCls()} placeholder="+44 7700 000000" />
            </Field>
            <Field label="Industry">
              <input type="text" value={data.industry} onChange={(e) => set("industry", e.target.value)}
                className={inputCls()} placeholder="e.g. Plumbing, Legal, E-commerce" />
            </Field>
          </div>
          <Field label="Business Name" required error={errors.businessName}>
            <input type="text" value={data.businessName} onChange={(e) => set("businessName", e.target.value)}
              className={inputCls(errors.businessName)} placeholder="Your Business Ltd" />
          </Field>
          <Field label="Current Website (if you have one)">
            <input type="url" value={data.website} onChange={(e) => set("website", e.target.value)}
              className={inputCls()} placeholder="https://yourbusiness.com" />
          </Field>
        </div>
      )}

      {/* STEP 2: Website type */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">What type of website do you need?</h2>
            <p className="text-slate-500 text-sm">Pick the option closest to what you have in mind — we&apos;ll refine the details together.</p>
          </div>
          {errors.websiteType && <p className="text-red-500 text-sm">{errors.websiteType}</p>}
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((product) => {
              const Icon = ICON_MAP[product.icon] ?? Zap;
              const isSelected = data.websiteType === product.slug;
              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => set("websiteType", product.slug)}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-green-200"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                    isSelected ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{product.name}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{product.tagline}</div>
                  {isSelected && (
                    <div className="mt-3 text-xs font-bold text-green-600">✓ Selected</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Scope factors */}
      {step === 3 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">What should your website include?</h2>
            <p className="text-slate-500 text-sm">Select everything you think you&apos;ll need — this helps us estimate timeline and effort accurately.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-3">Roughly how many pages?</p>
            <div className="space-y-2">
              {PAGE_OPTIONS.map((opt) => (
                <RadioOption key={opt} name="pages" value={opt}
                  checked={data.scope.pages === opt}
                  onChange={() => setScope("pages", opt)} label={opt} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-3">What else should it include? <span className="font-normal text-slate-400">(select all that apply)</span></p>
            <div className="grid sm:grid-cols-2 gap-2">
              {ADDON_OPTIONS.map((opt) => (
                <CheckOption key={opt}
                  checked={data.scope.addons.includes(opt)}
                  onChange={() => toggleAddon(opt)} label={opt} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Marketing package + notes */}
      {step === 4 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Do you want help with digital marketing?</h2>
            <p className="text-slate-500 text-sm">Beyond the website itself — choose what fits, or let us advise you.</p>
          </div>

          <div className="space-y-3">
            {MARKETING_OPTIONS.map((opt) => {
              const isSelected = data.marketingPackage === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => set("marketingPackage", opt.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
                    opt.recommended
                      ? isSelected
                        ? "border-green-600 bg-green-50 shadow-sm"
                        : "border-green-400 bg-green-50/40 hover:border-green-500"
                      : isSelected
                        ? "border-green-600 bg-green-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-green-200"
                  }`}
                >
                  {opt.recommended && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-green-700 text-white text-xs font-bold rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-start gap-3 pr-24">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? "border-green-600" : opt.recommended ? "border-green-500" : "border-slate-300"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-green-600" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm mb-1">{opt.label}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{opt.description}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-2 ml-7 text-xs font-bold text-green-600">✓ Selected</div>
                  )}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              How did you hear about Graft Digital?
            </label>
            <select value={data.heardFrom} onChange={(e) => set("heardFrom", e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select an option</option>
              {HEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Anything else you&apos;d like us to know?
            </label>
            <textarea value={data.notes} onChange={(e) => set("notes", e.target.value)} rows={3}
              placeholder="Specific requirements, questions, context about your business..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
          </div>
        </div>
      )}

      {/* STEP 5: Success */}
      {step === 5 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            You&apos;re all set, {data.name.split(" ")[0]}!
          </h2>
          <p className="text-slate-600 mb-2 max-w-md mx-auto">
            We&apos;ll review your answers and be in touch within 1 business day to confirm your strategy call.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 text-left max-w-sm mx-auto mt-6">
            <p className="text-sm font-bold text-green-800 mb-2">What happens next:</p>
            <ul className="text-sm text-green-700 space-y-1.5">
              <li>✓ We review your intake answers</li>
              <li>✓ We prepare a custom strategy outline</li>
              <li>✓ We confirm your 30-min call time by email</li>
            </ul>
          </div>
          <a
            href="/portal"
            className="inline-flex items-center px-7 py-3.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Access Your Client Portal →
          </a>
          <p className="mt-4 text-xs text-slate-400">
            Use your portal to complete the detailed onboarding questionnaire before your call.
          </p>
        </div>
      )}

      {/* Navigation */}
      {step < 5 && (
        <div className="flex gap-3 mt-10 pt-8 border-t border-slate-200">
          {step > 1 && (
            <button onClick={back}
              className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button onClick={next}
              className="flex-1 py-3 bg-green-600 text-white font-bold text-sm rounded-lg hover:bg-green-700 transition-colors">
              Continue →
            </button>
          ) : (
            <button onClick={finish}
              className="flex-1 py-3 bg-orange-600 text-white font-bold text-sm rounded-lg hover:bg-orange-700 transition-colors">
              Submit & Book My Call →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
