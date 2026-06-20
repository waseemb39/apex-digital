// Owner: Website Owner | Purpose: Admin form to create a new customer + project via the API route
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Result {
  tempPassword: string;
  userId: string;
}

export default function CreateCustomerForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    projectName: "",
  });

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((p) => ({ ...p, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const res = await fetch("/api/admin/create-customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    setResult({ tempPassword: json.tempPassword, userId: json.userId });
    setLoading(false);
    // Refresh the customer list in the background.
    router.refresh();
  }

  function reset() {
    setForm({ fullName: "", businessName: "", email: "", projectName: "" });
    setResult(null);
    setError("");
    setOpen(false);
  }

  const inputCls =
    "w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          + Create Customer
        </button>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">Create New Customer</h2>
            <button
              onClick={reset}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cancel
            </button>
          </div>

          {result ? (
            /* Success state */
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-sm font-bold text-green-800 mb-1">
                  Customer created successfully!
                </p>
                <p className="text-sm text-green-700 mb-4">
                  Share these login details with the client securely. The temporary
                  password will not be shown again.
                </p>
                <div className="bg-white border border-green-200 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Email</span>
                    <p className="font-mono text-sm font-bold text-slate-900">{form.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Temporary Password</span>
                    <p className="font-mono text-sm font-bold text-slate-900">{result.tempPassword}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={reset}
                className="w-full py-2.5 border border-slate-300 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create Another Customer
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                  <input {...field("fullName")} required placeholder="Jane Smith" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name *</label>
                  <input {...field("businessName")} required placeholder="Acme Ltd" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
                <input
                  {...field("email")}
                  type="email"
                  required
                  placeholder="jane@acme.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Project Name *</label>
                <input
                  {...field("projectName")}
                  required
                  placeholder="Acme Website Rebuild"
                  className={inputCls}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-600 text-white text-sm font-bold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-60"
              >
                {loading ? "Creating…" : "Create Customer & Project →"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
