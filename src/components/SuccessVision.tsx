// Owner: Content Manager | Purpose: Paints life after working with us — sensory, specific, customer-focused
import { Calendar, MessageCircle, BarChart2, Smile } from "lucide-react";

const outcomes = [
  {
    icon: Calendar,
    text: "A calendar full of qualified discovery calls — booked automatically",
  },
  {
    icon: MessageCircle,
    text: "Leads who already know, like, and trust you before they call",
  },
  {
    icon: BarChart2,
    text: "A clear dashboard showing exactly where every lead came from",
  },
  {
    icon: Smile,
    text: "Freedom to focus on your craft, not chasing the next client",
  },
];

export default function SuccessVision() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">
              Your New Normal
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Imagine waking up to a full calendar — every single Monday.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              No more cold outreach. No more wondering where the next client
              will come from. Just a steady stream of people who already want
              what you offer, showing up in your inbox and booking your calls.
            </p>
            <p className="text-slate-600 leading-relaxed">
              That&apos;s not a fantasy — it&apos;s what our clients experience within
              90 days of turning on their Graft Digital system.
            </p>
          </div>

          <div className="space-y-3">
            {outcomes.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 bg-gradient-to-r from-slate-50 to-white rounded-xl p-5 border border-slate-200 hover:border-green-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                  <Icon size={18} className="text-green-600" />
                </div>
                <p className="text-slate-700 font-medium leading-snug pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
