// Owner: Website Owner | Purpose: Returning client portal — sign-in by email, department questionnaires per service
"use client";

import { useState, useEffect } from "react";

// ─── Department questions per service ────────────────────────────────────────
type Question = {
  id: string;
  label: string;
  type: "text" | "radio" | "checkbox";
  options?: string[];
  placeholder?: string;
};

type Department = {
  id: string;
  label: string;
  icon: string;
  questions: Question[];
};

const DEPARTMENTS: Record<string, Department[]> = {
  seo: [
    {
      id: "technical",
      label: "Technical SEO",
      icon: "⚙️",
      questions: [
        { id: "cms", label: "What CMS is your website built on?", type: "radio",
          options: ["WordPress", "Shopify", "Wix / Squarespace", "Custom build / other"] },
        { id: "cms_access", label: "Can you provide CMS admin access?", type: "radio",
          options: ["Yes — will share credentials securely", "Need to set up admin access", "Read-only access only"] },
        { id: "known_issues", label: "Any known technical issues on the site?", type: "text",
          placeholder: "404 errors, slow pages, broken links, duplicate content..." },
        { id: "ssl", label: "Is your site on HTTPS?", type: "radio",
          options: ["Yes", "No", "Not sure"] },
        { id: "page_speed", label: "How would you rate your current page speed?", type: "radio",
          options: ["Fast — loads in under 2 seconds", "Moderate — sometimes slow", "Slow — visitors complain", "Very slow / I don't know"] },
      ],
    },
    {
      id: "content",
      label: "SEO Content",
      icon: "✍️",
      questions: [
        { id: "blog", label: "Do you currently have a blog?", type: "radio",
          options: ["Yes, publishing regularly", "Yes, but it's outdated", "No blog yet"] },
        { id: "topics", label: "What topics should our content focus on?", type: "text",
          placeholder: "e.g. home renovation tips, tax advice for freelancers, property investment..." },
        { id: "avoid", label: "Any topics, keywords, or language to avoid?", type: "text",
          placeholder: "Competitor brand names, regulated claims, sensitive topics..." },
        { id: "voice", label: "How would you describe your brand voice?", type: "radio",
          options: ["Professional & formal", "Friendly & approachable", "Expert & technical", "Bold & direct"] },
        { id: "approver", label: "Who approves content before it's published?", type: "text",
          placeholder: "Name + email of the approver" },
      ],
    },
    {
      id: "analytics",
      label: "Analytics & Tracking",
      icon: "📊",
      questions: [
        { id: "ga4", label: "Is Google Analytics 4 installed?", type: "radio",
          options: ["Yes, working correctly", "Old Universal Analytics only", "Not installed"] },
        { id: "gsc", label: "Is Google Search Console active?", type: "radio",
          options: ["Yes, verified", "Set up but not verified", "Not set up"] },
        { id: "conversions", label: "What conversion actions should we track?", type: "checkbox",
          options: ["Form submissions", "Phone calls", "Email clicks", "Product purchases", "Appointment bookings"] },
        { id: "report_to", label: "Who should receive the monthly SEO report?", type: "text",
          placeholder: "Name + email address" },
      ],
    },
  ],

  ppc: [
    {
      id: "campaign",
      label: "Campaign Setup",
      icon: "🎯",
      questions: [
        { id: "platforms_confirm", label: "Confirm which platforms to run ads on", type: "checkbox",
          options: ["Google Search", "Google Display", "Google Shopping", "Meta (Facebook/Instagram)", "Microsoft Ads"] },
        { id: "accounts", label: "Do you have existing ad accounts?", type: "radio",
          options: ["Yes — will share access", "No — need to create new accounts", "Yes, but history is poor — create fresh"] },
        { id: "landing_urls", label: "Paste the landing page URL(s) ads should point to", type: "text",
          placeholder: "https://yourbusiness.com/service-page" },
        { id: "conversion_action", label: "Primary conversion action", type: "radio",
          options: ["Form submission / enquiry", "Phone call", "Product purchase", "App install"] },
        { id: "target_cpa", label: "Target cost per lead or sale (if known)", type: "text",
          placeholder: "e.g. £20 per lead, £50 per sale — or leave blank if unsure" },
      ],
    },
    {
      id: "creative",
      label: "Ad Creative",
      icon: "🎨",
      questions: [
        { id: "brand_kit", label: "Is your brand kit ready?", type: "radio",
          options: ["Yes — logo, colors, and fonts all ready", "Logo only", "Needs creating from scratch"] },
        { id: "product_images", label: "Do you have product or service images?", type: "radio",
          options: ["Yes, high-quality images ready", "Have images but need editing", "Need stock imagery"] },
        { id: "restrictions", label: "Any brand or ad content restrictions?", type: "text",
          placeholder: "Words to avoid, regulated claims, competitor name policy..." },
        { id: "past_copy", label: "Any past ad copy that performed well?", type: "text",
          placeholder: "Paste headlines or descriptions you've used before..." },
        { id: "approver", label: "Who approves ad creatives before launch?", type: "text",
          placeholder: "Name + email" },
      ],
    },
    {
      id: "tracking",
      label: "Tracking & Analytics",
      icon: "📈",
      questions: [
        { id: "conv_tracking", label: "Is conversion tracking set up in your ad accounts?", type: "radio",
          options: ["Yes, working correctly", "Partially set up", "Not set up"] },
        { id: "crm", label: "What CRM do you use?", type: "text",
          placeholder: "e.g. HubSpot, Salesforce, Pipedrive, or none" },
        { id: "roas_target", label: "Target ROAS (for e-commerce)", type: "text",
          placeholder: "e.g. 4× = £4 revenue per £1 spent — leave blank if not e-commerce" },
        { id: "report_to", label: "Who should receive weekly performance alerts?", type: "text",
          placeholder: "Name + email" },
      ],
    },
  ],

  web: [
    {
      id: "design",
      label: "Design",
      icon: "🎨",
      questions: [
        { id: "inspiration", label: "Share 2–3 competitor or inspiration websites you love", type: "text",
          placeholder: "e.g. stripe.com, linear.app, squarespace.com" },
        { id: "dislikes", label: "What should the design absolutely NOT look like?", type: "text",
          placeholder: "Outdated, too corporate, too minimal, clashing colours..." },
        { id: "brand_kit", label: "Brand kit status", type: "radio",
          options: ["Logo + colors + fonts all ready", "Logo only", "Need full brand identity designed"] },
        { id: "feel", label: "Desired design feel", type: "radio",
          options: ["Clean & minimal", "Bold & modern", "Professional & corporate", "Warm & approachable"] },
        { id: "approver", label: "Who gives final design sign-off?", type: "text",
          placeholder: "Name + email of the decision-maker" },
      ],
    },
    {
      id: "development",
      label: "Development",
      icon: "⚙️",
      questions: [
        { id: "current_url", label: "Current website URL (if redesign / migration)", type: "text",
          placeholder: "https://current-site.com" },
        { id: "hosting", label: "Current hosting provider (if known)", type: "text",
          placeholder: "e.g. GoDaddy, SiteGround, Cloudflare, WP Engine" },
        { id: "features", label: "Special features or functionality needed", type: "checkbox",
          options: ["Online booking / appointment scheduler", "E-commerce / checkout", "Members-only / login area", "Live chat integration", "Blog / news section", "CRM integration"] },
        { id: "integrations", label: "Tools that need to connect to the site", type: "text",
          placeholder: "e.g. Mailchimp, HubSpot, Calendly, Stripe, Xero..." },
      ],
    },
    {
      id: "content",
      label: "Content & Copy",
      icon: "✍️",
      questions: [
        { id: "existing_copy", label: "Do you have existing copy we can use or adapt?", type: "radio",
          options: ["Yes — reviewed, approved, and ready to use", "Rough copy that needs rewriting", "Starting from scratch"] },
        { id: "product_info", label: "Can you provide product / service descriptions?", type: "radio",
          options: ["Yes, sending this week", "Need help writing them", "Partially have them"] },
        { id: "testimonials", label: "Do you have testimonials or case studies ready?", type: "radio",
          options: ["Yes, 3 or more ready", "1–2 available", "Not yet"] },
        { id: "approver", label: "Who approves final copy before it goes live?", type: "text",
          placeholder: "Name + email" },
      ],
    },
  ],

  social: [
    {
      id: "access",
      label: "Platform Access",
      icon: "🔑",
      questions: [
        { id: "instagram", label: "Instagram handle", type: "text", placeholder: "@yourbusiness" },
        { id: "tiktok", label: "TikTok handle", type: "text", placeholder: "@yourbusiness" },
        { id: "facebook", label: "Facebook page URL", type: "text", placeholder: "facebook.com/yourbusiness" },
        { id: "linkedin", label: "LinkedIn company page URL", type: "text", placeholder: "linkedin.com/company/yourbusiness" },
        { id: "followers", label: "Current follower counts (all platforms combined)", type: "text",
          placeholder: "e.g. IG: 1,200 · TikTok: 400 · FB: 800" },
      ],
    },
    {
      id: "content",
      label: "Content Strategy",
      icon: "📋",
      questions: [
        { id: "pillars", label: "Your 3 main content topics (pillars)", type: "text",
          placeholder: "e.g. Before & afters / Educational tips / Behind the scenes" },
        { id: "avoid", label: "Topics or content to NEVER post", type: "text",
          placeholder: "Competitor mentions, pricing, political topics, anything sensitive..." },
        { id: "competitors", label: "3 competitor or inspiration accounts to benchmark", type: "text",
          placeholder: "@account1, @account2, @account3" },
        { id: "voice", label: "Brand voice on social media", type: "radio",
          options: ["Professional & informative", "Casual & relatable", "Bold & entertaining", "Expert & educational"] },
        { id: "approver", label: "Who approves posts before they go live?", type: "text",
          placeholder: "Name + how quickly they can review (same day / 48 hours)" },
      ],
    },
    {
      id: "video",
      label: "Video Content",
      icon: "🎬",
      questions: [
        { id: "raw_footage", label: "Can you provide raw video footage?", type: "radio",
          options: ["Yes, regularly from our team", "Occasionally", "No — need stock or animation only"] },
        { id: "testimonials", label: "Do you have video testimonials from clients?", type: "radio",
          options: ["Yes, ready to use", "Not yet, but we can film them", "No"] },
        { id: "video_length", label: "Preferred video length", type: "radio",
          options: ["15 seconds (quick & punchy)", "30–60 seconds (standard Reel)", "60–90 seconds (detailed)", "Mix of lengths"] },
        { id: "audio", label: "OK to use trending audio / licensed music?", type: "radio",
          options: ["Yes — use trending sounds", "Original / brand audio only", "No strong preference"] },
      ],
    },
  ],
};

// ─── Types ───────────────────────────────────────────────────────────────────
type Profile = {
  name: string;
  email: string;
  businessName: string;
  service: string;
  completedAt: string;
};

type DeptAnswers = Record<string, Record<string, string | string[]>>;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function inputCls() {
  return "w-full px-4 py-3 border border-slate-600 rounded-lg bg-slate-800 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none";
}

function RadioOpt({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
      checked ? "border-blue-500 bg-blue-900/30 text-blue-200" : "border-slate-700 text-slate-400 hover:border-slate-600"
    }`}>
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? "border-blue-400" : "border-slate-600"
      }`}>
        {checked && <div className="w-2 h-2 rounded-full bg-blue-400" />}
      </div>
      <input type="radio" className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

function CheckOpt({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
      checked ? "border-blue-500 bg-blue-900/30 text-blue-200" : "border-slate-700 text-slate-400 hover:border-slate-600"
    }`}>
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? "border-blue-400 bg-blue-500" : "border-slate-600"
      }`}>
        {checked && <span className="text-white text-xs leading-none">✓</span>}
      </div>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

// ─── Sign-in screen ───────────────────────────────────────────────────────────
function SignIn({ onSuccess }: { onSuccess: (profile: Profile) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSignIn() {
    const raw = localStorage.getItem("graft_profile");
    if (!raw) {
      setError("No account found. Please complete the onboarding form first.");
      return;
    }
    const profile: Profile = JSON.parse(raw);
    if (profile.email.toLowerCase() !== email.toLowerCase().trim()) {
      setError("Email not found. Please check your email or complete the onboarding form.");
      return;
    }
    onSuccess(profile);
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="text-5xl mb-6">🔐</div>
      <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
      <p className="text-slate-400 text-sm mb-8">
        Enter the email you used when you first registered to access your portal.
      </p>
      <div className="text-left mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
          className="w-full px-4 py-3 border border-slate-600 rounded-lg bg-slate-800 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="jane@yourbusiness.com"
        />
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </div>
      <button
        onClick={handleSignIn}
        className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-colors"
      >
        Access My Portal →
      </button>
      <p className="mt-6 text-xs text-slate-500">
        New client?{" "}
        <a href="/get-started" className="text-blue-400 hover:underline">
          Start your onboarding here →
        </a>
      </p>
    </div>
  );
}

// ─── Department questionnaire ─────────────────────────────────────────────────
function DepartmentForm({
  dept,
  answers,
  onChange,
  onSave,
  saved,
}: {
  dept: Department;
  answers: Record<string, string | string[]>;
  onChange: (id: string, val: string | string[]) => void;
  onSave: () => void;
  saved: boolean;
}) {
  function toggle(id: string, opt: string) {
    const cur = (answers[id] as string[]) ?? [];
    onChange(id, cur.includes(opt) ? cur.filter((v) => v !== opt) : [...cur, opt]);
  }

  return (
    <div className="space-y-7">
      {dept.questions.map((q, i) => (
        <div key={q.id}>
          <p className="text-sm font-semibold text-slate-200 mb-3">
            {i + 1}. {q.label}
          </p>
          {q.type === "text" && (
            <textarea
              value={(answers[q.id] as string) ?? ""}
              onChange={(e) => onChange(q.id, e.target.value)}
              rows={2}
              placeholder={q.placeholder}
              className={inputCls()}
            />
          )}
          {q.type === "radio" && (
            <div className="space-y-2">
              {q.options!.map((opt) => (
                <RadioOpt key={opt} checked={answers[q.id] === opt}
                  onChange={() => onChange(q.id, opt)} label={opt} />
              ))}
            </div>
          )}
          {q.type === "checkbox" && (
            <div className="space-y-2">
              {q.options!.map((opt) => (
                <CheckOpt key={opt}
                  checked={((answers[q.id] as string[]) ?? []).includes(opt)}
                  onChange={() => toggle(q.id, opt)} label={opt} />
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={onSave}
        className={`w-full py-3 font-bold text-sm rounded-lg transition-colors ${
          saved
            ? "bg-green-600 text-white cursor-default"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {saved ? "✓ Saved" : "Save This Section →"}
      </button>
    </div>
  );
}

// ─── Main portal ──────────────────────────────────────────────────────────────
export default function CustomerPortal() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeDept, setActiveDept] = useState(0);
  const [answers, setAnswers] = useState<DeptAnswers>({});
  const [savedDepts, setSavedDepts] = useState<Set<string>>(new Set());
  const [allSubmitted, setAllSubmitted] = useState(false);

  // Load saved department answers from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("graft_dept_answers");
    if (raw) {
      const parsed = JSON.parse(raw);
      setAnswers(parsed.answers ?? {});
      setSavedDepts(new Set(parsed.savedDepts ?? []));
    }
  }, []);

  const departments = profile ? (DEPARTMENTS[profile.service] ?? []) : [];
  const dept = departments[activeDept];

  const completedCount = savedDepts.size;
  const totalDepts = departments.length;
  const completionPct = totalDepts > 0 ? Math.round((completedCount / totalDepts) * 100) : 0;

  function updateAnswer(deptId: string, qId: string, val: string | string[]) {
    setAnswers((prev) => ({
      ...prev,
      [deptId]: { ...(prev[deptId] ?? {}), [qId]: val },
    }));
    // Mark unsaved when edited
    setSavedDepts((prev) => {
      const next = new Set(prev);
      next.delete(deptId);
      return next;
    });
  }

  function saveDept(deptId: string) {
    const next = new Set(savedDepts).add(deptId);
    setSavedDepts(next);
    const payload = { answers, savedDepts: Array.from(next) };
    localStorage.setItem("graft_dept_answers", JSON.stringify(payload));
  }

  function submitAll() {
    // Save final state to localStorage; connect to your API here
    const payload = { profile, answers, savedDepts: Array.from(savedDepts), submittedAt: new Date().toISOString() };
    localStorage.setItem("graft_submission", JSON.stringify(payload));
    setAllSubmitted(true);
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-20">
        <SignIn onSuccess={(p) => setProfile(p)} />
      </div>
    );
  }

  if (allSubmitted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-3">All done, {profile.name.split(" ")[0]}!</h2>
          <p className="text-slate-400 mb-6">
            Your complete intake is now with our team. We&apos;ll review everything and confirm your strategy call details within 1 business day.
          </p>
          <a href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Back to Homepage
          </a>
        </div>
      </div>
    );
  }

  const SERVICE_LABELS: Record<string, string> = {
    seo: "SEO Campaign", ppc: "PPC Advertising", web: "Website Build", social: "Social Media",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Portal header */}
      <div className="border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <a href="/" className="text-sm font-bold text-blue-400 hover:text-blue-300 mb-1 inline-block">
              ← GraftDigital
            </a>
            <h1 className="text-xl font-bold text-white">
              {profile.businessName} — Client Portal
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">{profile.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-500 mb-1">Overall progress</div>
              <div className="text-lg font-bold text-white">{completionPct}%</div>
            </div>
            <div className="w-24 h-2 bg-slate-700 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Service badge */}
        <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-slate-300 font-medium">Service: <strong className="text-white">{SERVICE_LABELS[profile.service]}</strong></span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">{completedCount}/{totalDepts} departments complete</span>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">

          {/* Left: Department sidebar */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {departments.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActiveDept(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all flex-shrink-0 lg:flex-shrink ${
                  activeDept === i
                    ? "border-blue-500 bg-blue-900/30 text-blue-200"
                    : "border-slate-700 text-slate-400 hover:border-slate-600"
                }`}
              >
                <span className="text-lg">{d.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{d.label}</div>
                  {savedDepts.has(d.id) && (
                    <div className="text-xs text-green-400 mt-0.5">✓ Saved</div>
                  )}
                </div>
              </button>
            ))}

            {/* Submit all button */}
            {completedCount === totalDepts && (
              <button
                onClick={submitAll}
                className="lg:mt-4 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-colors flex-shrink-0"
              >
                Submit All → 🚀
              </button>
            )}
          </div>

          {/* Right: Active department questions */}
          {dept && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-700">
                <span className="text-3xl">{dept.icon}</span>
                <div>
                  <h2 className="text-lg font-bold text-white">{dept.label}</h2>
                  <p className="text-slate-400 text-xs">{dept.questions.length} questions in this section</p>
                </div>
              </div>
              <DepartmentForm
                dept={dept}
                answers={answers[dept.id] ?? {}}
                onChange={(qId, val) => updateAnswer(dept.id, qId, val)}
                onSave={() => saveDept(dept.id)}
                saved={savedDepts.has(dept.id)}
              />

              {/* Next dept button */}
              {activeDept < departments.length - 1 && savedDepts.has(dept.id) && (
                <button
                  onClick={() => setActiveDept((i) => i + 1)}
                  className="mt-4 w-full py-2.5 border border-slate-600 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Next: {departments[activeDept + 1].label} →
                </button>
              )}
            </div>
          )}
        </div>

        {/* Submit prompt */}
        {completedCount === totalDepts && (
          <div className="mt-8 bg-green-900/20 border border-green-700/40 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-green-300 font-bold">All {totalDepts} departments complete!</p>
              <p className="text-green-400/70 text-sm">Submit everything to our team and we&apos;ll review before your call.</p>
            </div>
            <button
              onClick={submitAll}
              className="px-7 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors text-sm whitespace-nowrap"
            >
              Submit to Graft Digital 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
