// Owner: Website Owner | Purpose: Stage 1A lead form — 3 steps, books a sales call
"use client";

import { useState } from "react";

const WEBSITE_TYPES = [
  "Landing page",
  "Company website",
  "Online shop",
  "Online booking service",
  "Blog website",
  "Portfolio website",
  "Unique / custom website",
];

const MAIN_GOAL_OPTIONS = [
  "Get more leads",
  "Sell products online",
  "Receive bookings or appointments",
  "Present the business professionally",
  "Improve an existing website",
  "Support digital marketing campaigns",
  "Build trust and credibility",
  "Not sure yet",
];

const LANGUAGE_OPTIONS = ["Arabic", "Hebrew", "English", "Other", "Not sure yet"];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1–2 weeks",
  "Within 3–4 weeks",
  "Within 1–2 months",
  "Flexible",
  "Not sure yet",
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
    label: "A marketing package: SEO, ads, and social media for ongoing growth",
    description: "Full digital marketing running alongside your new website.",
    recommended: false,
  },
  {
    id: "website-only",
    label: "Just the website for now, without a marketing package",
    description: "Build the website first, add marketing later when you're ready.",
    recommended: false,
  },
];

const LEAD_SOURCE_OPTIONS = [
  "Google search",
  "Google ad",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "TikTok",
  "WhatsApp",
  "Referral",
  "Existing customer",
  "Other",
];

// --- Types ---
type WizardData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  currentWebsite: string;
  websiteType: string;
  mainGoal: string;
  languages: string[];
  timeline: string;
  marketingHelp: string;
  leadSource: string;
};

const EMPTY: WizardData = {
  name: "", email: "", phone: "", businessName: "",
  industry: "", currentWebsite: "", websiteType: "",
  mainGoal: "", languages: [], timeline: "",
  marketingHelp: "", leadSource: "",
};

type StringFields = Exclude<keyof WizardData, "languages">;

// --- Small helpers ---
function inputCls(err?: string) {
  return `w-full px-4 py-3 border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
    err ? "border-red-400 bg-red-50" : "border-slate-300"
  }`;
}

function Field({
  label, required, error, hint, children,
}: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-xs text-slate-400 mb-2">{hint}</p>}
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function RadioOption({
  name, value, checked, onChange, label,
}: {
  name: string; value: string; checked: boolean; onChange: () => void; label: string;
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

function CheckOption({
  checked, onChange, label,
}: {
  checked: boolean; onChange: () => void; label: string;
}) {
  return (
    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
      checked ? "border-green-500 bg-green-50 text-green-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
    }`}>
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? "border-green-600 bg-green-600" : "border-slate-300"
      }`}>
        {checked && <span className="text-white text-xs leading-none">&#10003;</span>}
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

  const TOTAL = 4; // 3 content steps + 1 success step

  function set(field: StringFields, val: string) {
    setData((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: "" }));
  }

  function toggleLanguage(lang: string) {
    setData((p) => ({
      ...p,
      languages: p.languages.includes(lang)
        ? p.languages.filter((l) => l !== lang)
        : [...p.languages, lang],
    }));
    setErrors((p) => ({ ...p, languages: "" }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) e.name = "Required";
      if (!data.email.trim()) e.email = "Required";
      if (!data.phone.trim()) e.phone = "Required";
      if (!data.businessName.trim()) e.businessName = "Required";
      if (!data.websiteType) e.websiteType = "Please select a website type to continue";
    }
    if (step === 2) {
      if (!data.mainGoal) e.mainGoal = "Please select a goal to continue";
      if (data.languages.length === 0) e.languages = "Please select at least one language";
      if (!data.timeline) e.timeline = "Please select a timeline to continue";
    }
    if (step === 3) {
      if (!data.marketingHelp) e.marketingHelp = "Please select an option to continue";
      if (!data.leadSource) e.leadSource = "Please select an option to continue";
    }
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
    setStep(4);
  }

  const progress = Math.round(((step - 1) / (TOTAL - 1)) * 100);

  return (
    <div className="max-w-2xl mx-auto">

      {/* Progress */}
      {step < 4 && (
        <div className="mb-10">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Step {step} of {TOTAL - 1}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Contact, business basics, website type */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Let&apos;s get to know your business</h2>
            <p className="text-slate-500 text-sm">Takes about 2 minutes. We&apos;ll use your answers to prepare a custom strategy.</p>
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
            <Field label="Phone Number" required error={errors.phone}>
              <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)}
                className={inputCls(errors.phone)} placeholder="+44 7700 000000" />
            </Field>
            <Field label="Business Name" required error={errors.businessName}>
              <input type="text" value={data.businessName} onChange={(e) => set("businessName", e.target.value)}
                className={inputCls(errors.businessName)} placeholder="Your Business Ltd" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              label="Industry"
              hint="e.g. restaurant, clinic, legal, e-commerce, education, construction, beauty, or other"
            >
              <input type="text" value={data.industry} onChange={(e) => set("industry", e.target.value)}
                className={inputCls()} placeholder="Your industry" />
            </Field>
            <Field label="Current Website (if any)">
              <input type="url" value={data.currentWebsite} onChange={(e) => set("currentWebsite", e.target.value)}
                className={inputCls()} placeholder="https://yourbusiness.com" />
            </Field>
          </div>

          <Field label="What type of website do you need?" required error={errors.websiteType}>
            <div className="grid sm:grid-cols-3 gap-3 mt-1">
              {WEBSITE_TYPES.map((type) => {
                const isSelected = data.websiteType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set("websiteType", type)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-green-600 bg-green-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-green-200"
                    }`}
                  >
                    <div className={`font-semibold text-sm ${isSelected ? "text-green-900" : "text-slate-900"}`}>
                      {type}
                    </div>
                    {isSelected && (
                      <div className="mt-1.5 text-xs font-bold text-green-600">&#10003; Selected</div>
                    )}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
      )}

      {/* STEP 2: Goal, languages, timeline */}
      {step === 2 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Tell us about your goals</h2>
            <p className="text-slate-500 text-sm">This helps us prepare the right strategy for your call.</p>
          </div>

          <Field label="What is the main goal of the website?" required error={errors.mainGoal}>
            <div className="space-y-2 mt-1">
              {MAIN_GOAL_OPTIONS.map((opt) => (
                <RadioOption key={opt} name="mainGoal" value={opt}
                  checked={data.mainGoal === opt}
                  onChange={() => set("mainGoal", opt)} label={opt} />
              ))}
            </div>
          </Field>

          <Field
            label="Which languages should the website support?"
            required
            error={errors.languages}
            hint="Select all that may be needed"
          >
            <div className="space-y-2 mt-1">
              {LANGUAGE_OPTIONS.map((lang) => (
                <CheckOption key={lang}
                  checked={data.languages.includes(lang)}
                  onChange={() => toggleLanguage(lang)} label={lang} />
              ))}
            </div>
          </Field>

          <Field label="When would you like the website to be ready?" required error={errors.timeline}>
            <div className="space-y-2 mt-1">
              {TIMELINE_OPTIONS.map((opt) => (
                <RadioOption key={opt} name="timeline" value={opt}
                  checked={data.timeline === opt}
                  onChange={() => set("timeline", opt)} label={opt} />
              ))}
            </div>
          </Field>
        </div>
      )}

      {/* STEP 3: Marketing help + lead source */}
      {step === 3 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Almost there!</h2>
            <p className="text-slate-500 text-sm">Two quick questions and we&apos;re done.</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-1.5">
              Do you want help with digital marketing? <span className="text-red-500">*</span>
            </p>
            {errors.marketingHelp && (
              <p className="text-red-500 text-xs mb-2">{errors.marketingHelp}</p>
            )}
            <div className="space-y-3">
              {MARKETING_OPTIONS.map((opt) => {
                const isSelected = data.marketingHelp === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => set("marketingHelp", opt.id)}
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
                      <div className="mt-2 ml-7 text-xs font-bold text-green-600">&#10003; Selected</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              How did you hear about us? <span className="text-red-500">*</span>
            </label>
            {errors.leadSource && (
              <p className="text-red-500 text-xs mb-1">{errors.leadSource}</p>
            )}
            <select
              value={data.leadSource}
              onChange={(e) => set("leadSource", e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select an option</option>
              {LEAD_SOURCE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-6">&#127881;</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            You&apos;re all set, {data.name.split(" ")[0]}!
          </h2>
          <p className="text-slate-600 mb-2 max-w-md mx-auto">
            We&apos;ll review your answers and be in touch within 1 business day to confirm your strategy call.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 text-left max-w-sm mx-auto mt-6">
            <p className="text-sm font-bold text-green-800 mb-2">What happens next:</p>
            <ul className="text-sm text-green-700 space-y-1.5">
              <li>&#10003; We review your intake answers</li>
              <li>&#10003; We prepare a custom strategy outline</li>
              <li>&#10003; We confirm your 30-min call time by email</li>
            </ul>
          </div>
          <a
            href="/portal"
            className="inline-flex items-center px-7 py-3.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Access Your Client Portal &#8594;
          </a>
          <p className="mt-4 text-xs text-slate-400">
            Use your portal to complete the detailed onboarding questionnaire before your call.
          </p>
        </div>
      )}

      {/* Navigation */}
      {step < 4 && (
        <div className="flex gap-3 mt-10 pt-8 border-t border-slate-200">
          {step > 1 && (
            <button
              onClick={back}
              className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              &#8592; Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={next}
              className="flex-1 py-3 bg-green-600 text-white font-bold text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue &#8594;
            </button>
          ) : (
            <button
              onClick={finish}
              className="flex-1 py-3 bg-orange-600 text-white font-bold text-sm rounded-lg hover:bg-orange-700 transition-colors"
            >
              Submit &amp; Book My Call &#8594;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
