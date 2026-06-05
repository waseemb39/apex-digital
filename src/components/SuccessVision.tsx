// Owner: Content Manager | Purpose: Paints life after working with us — sensory, specific, customer-focused
const outcomes = [
  { icon: "📅", text: "A calendar full of qualified discovery calls — booked automatically" },
  { icon: "💬", text: "Leads who already know, like, and trust you before they call" },
  { icon: "📊", text: "A clear dashboard showing exactly where every lead came from" },
  { icon: "😌", text: "Freedom to focus on your craft, not chasing the next client" },
];

export default function SuccessVision() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
              Your New Normal
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Imagine waking up to a full calendar — every single Monday.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              No more cold outreach. No more wondering where the next client
              will come from. Just a steady stream of people who already want
              what you offer, showing up in your inbox and booking your calls.
            </p>
            <p className="text-slate-600 leading-relaxed">
              That&apos;s not a fantasy — it&apos;s what our clients experience within
              90 days of turning on their Graft Digital system.
            </p>
          </div>

          <div className="space-y-4">
            {outcomes.map((outcome) => (
              <div
                key={outcome.text}
                className="flex items-start gap-4 bg-slate-50 rounded-xl p-5 border border-slate-200"
              >
                <span className="text-2xl flex-shrink-0">{outcome.icon}</span>
                <p className="text-slate-700 font-medium">{outcome.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
