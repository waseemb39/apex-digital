// Owner: Website Owner | Purpose: First-time client intake wizard — 4 steps, saves to localStorage
"use client";

import { useState } from "react";

// --- Service definitions with branched questions ---
const SERVICES = [
  {
    id: "seo",
    label: "SEO Campaign",
    icon: "🔍",
    tagline: "Rank higher on Google and get consistent organic traffic",
    color: "blue",
    questions: [
      { id: "goal", label: "What's your main SEO goal?", type: "radio",
        options: ["Rank for specific keywords", "Increase organic traffic", "Outrank a specific competitor", "All of the above"] },
      { id: "keywords", label: "List your 3 most important target keywords or phrases", type: "text",
        placeholder: "e.g. plumber London, emergency boiler repair..." },
      { id: "previous", label: "Have you done SEO before?", type: "radio",
        options: ["Yes, with an agency", "Yes, in-house", "No, this is our first time"] },
      { id: "tools", label: "Do you have Google Analytics & Search Console?", type: "radio",
        options: ["Yes, both are set up", "Only one of them", "Neither — need to set up"] },
      { id: "competitors", label: "Name 1–3 competitors currently outranking you", type: "text",
        placeholder: "e.g. competitor.com, another-rival.com..." },
      { id: "timeline", label: "What's your expected timeline for results?", type: "radio",
        options: ["3 months", "6 months", "12 months", "I'm flexible"] },
    ],
  },
  {
    id: "ppc",
    label: "PPC Advertising",
    icon: "💰",
    tagline: "More qualified leads from paid ad campaigns",
    color: "red",
    questions: [
      { id: "goal", label: "What's your primary advertising goal?", type: "radio",
        options: ["Generate leads / form fills", "Drive phone calls", "Drive online sales", "Increase brand awareness"] },
      { id: "platforms", label: "Which platforms are you interested in?", type: "checkbox",
        options: ["Google Search", "Google Display / Shopping", "Meta (Facebook/Instagram)", "Microsoft Ads"] },
      { id: "audience", label: "Describe your ideal customer", type: "text",
        placeholder: "e.g. homeowners aged 35–55 in Manchester, interested in home renovation" },
      { id: "previous", label: "Have you run paid ads before?", type: "radio",
        options: ["Yes, with good results", "Yes, but results were poor", "Never run paid ads"] },
      { id: "landing_page", label: "Do you have a dedicated landing page?", type: "radio",
        options: ["Yes, ready to use", "I need one built", "I'll use my homepage for now"] },
    ],
  },
  {
    id: "web",
    label: "Website Build",
    icon: "🖥️",
    tagline: "A professional website that converts visitors into clients",
    color: "yellow",
    questions: [
      { id: "type", label: "What type of project is this?", type: "radio",
        options: ["Brand new website", "Redesign of existing site", "Add pages to current site", "E-commerce store"] },
      { id: "pages", label: "How many pages do you need roughly?", type: "radio",
        options: ["1–3 pages (landing page)", "4–8 pages (standard site)", "9–15 pages (large site)", "15+ pages"] },
      { id: "cms", label: "Any CMS preference?", type: "radio",
        options: ["WordPress", "Shopify (e-commerce)", "Next.js / custom build", "No preference"] },
      { id: "brand", label: "Do you have brand assets ready?", type: "radio",
        options: ["Yes — logo, colors, and fonts all ready", "Logo only", "Nothing yet — need full branding"] },
      { id: "inspiration", label: "Share 1–3 sites you love the look of", type: "text",
        placeholder: "e.g. apple.com, stripe.com, linear.app" },
      { id: "features", label: "Special features needed?", type: "checkbox",
        options: ["Contact / booking form", "E-commerce / payments", "Members-only area", "CRM / chat integration"] },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    icon: "📱",
    tagline: "Grow your audience and turn followers into paying clients",
    color: "purple",
    questions: [
      { id: "platforms", label: "Which platforms?", type: "checkbox",
        options: ["Instagram", "TikTok", "Facebook", "LinkedIn"] },
      { id: "goal", label: "What's your main social media goal?", type: "radio",
        options: ["Grow followers", "Drive traffic to website", "Generate leads", "Build brand awareness"] },
      { id: "current", label: "How active are you on social media now?", type: "radio",
        options: ["Posting regularly", "Posting occasionally", "Have accounts but rarely post", "No accounts yet"] },
      { id: "video", label: "Do you need video content (Reels / TikTok)?", type: "radio",
        options: ["Yes, video is essential", "Static posts only", "Both video and static posts"] },
      { id: "brand", label: "Is your brand kit ready?", type: "radio",
        options: ["Yes — logo, colors, and fonts", "Partially", "Not yet"] },
    ],
  },
];

const BUDGET_OPTIONS = [
  "Under £500 / month",
  "£500–£1,500 / month",
  "£1,500–£5,000 / month",
  "£5,000+ / month",
  "Let's discuss based on goals",
];

const HEAR_OPTIONS = [
  "Google search",
  "Social media",
  "Referral from someone I know",
  "Online ad",
  "Other",
];

// --- Types ---
type Answers = Record<string, string | string[]>;

type WizardData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  industry: string;
  service: string;
  serviceAnswers: Answers;
  budget: string;
  heardFrom: string;
  notes: string;
};

const EMPTY: WizardData = {
  name: "", email: "", phone: "", businessName: "", website: "",
  industry: "", service: "", serviceAnswers: {}, budget: "", heardFrom: "", notes: "",
};

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
  const selected = SERVICES.find((s) => s.id === data.service);

  function set(field: keyof WizardData, val: string) {
    setData((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: "" }));
  }

  function setAnswer(id: string, val: string | string[]) {
    setData((p) => ({ ...p, serviceAnswers: { ...p.serviceAnswers, [id]: val } }));
  }

  function toggle(id: string, opt: string) {
    const cur = (data.serviceAnswers[id] as string[]) ?? [];
    setAnswer(id, cur.includes(opt) ? cur.filter((v) => v !== opt) : [...cur, opt]);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) e.name = "Required";
      if (!data.email.trim()) e.email = "Required";
      if (!data.businessName.trim()) e.businessName = "Required";
    }
    if (step === 2 && !data.service) e.service = "Please select a service to continue";
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

      {/* STEP 2: Goal / service selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">What&apos;s your biggest goal right now?</h2>
            <p className="text-slate-500 text-sm">Select the service that matches your primary objective. You can add more later.</p>
          </div>
          {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((svc) => (
              <button
                key={svc.id}
                type="button"
                onClick={() => set("service", svc.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  data.service === svc.id
                    ? "border-green-600 bg-green-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-green-200"
                }`}
              >
                <div className="text-3xl mb-3">{svc.icon}</div>
                <div className="font-bold text-slate-900 text-sm mb-1">{svc.label}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{svc.tagline}</div>
                {data.service === svc.id && (
                  <div className="mt-3 text-xs font-bold text-green-600">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Service questions */}
      {step === 3 && selected && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Tell us about your {selected.label} goals</h2>
            <p className="text-slate-500 text-sm">A few quick questions so our team can prepare the right strategy.</p>
          </div>
          {selected.questions.map((q, i) => (
            <div key={q.id}>
              <p className="text-sm font-semibold text-slate-800 mb-3">
                {i + 1}. {q.label}
              </p>
              {q.type === "text" && (
                <textarea
                  value={(data.serviceAnswers[q.id] as string) ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  rows={2}
                  placeholder={q.placeholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              )}
              {q.type === "radio" && (
                <div className="space-y-2">
                  {q.options!.map((opt) => (
                    <RadioOption key={opt} name={q.id} value={opt}
                      checked={data.serviceAnswers[q.id] === opt}
                      onChange={() => setAnswer(q.id, opt)} label={opt} />
                  ))}
                </div>
              )}
              {q.type === "checkbox" && (
                <div className="space-y-2">
                  {q.options!.map((opt) => (
                    <CheckOption key={opt}
                      checked={((data.serviceAnswers[q.id] as string[]) ?? []).includes(opt)}
                      onChange={() => toggle(q.id, opt)} label={opt} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* STEP 4: Budget */}
      {step === 4 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Almost done — budget & notes</h2>
            <p className="text-slate-500 text-sm">This helps us prepare a relevant proposal for you.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-3">What&apos;s your monthly budget range?</p>
            <div className="space-y-2">
              {BUDGET_OPTIONS.map((opt) => (
                <RadioOption key={opt} name="budget" value={opt}
                  checked={data.budget === opt}
                  onChange={() => set("budget", opt)} label={opt} />
              ))}
            </div>
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
            Use your portal to complete the detailed department questionnaire before your call.
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
