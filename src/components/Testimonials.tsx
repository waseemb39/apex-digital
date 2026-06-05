// Owner: Content Manager | Purpose: 3 client stories following Problem â†’ Service â†’ Result arc
// Replace placeholder testimonials with real client names, photos, and results before launch

const testimonials = [
  {
    name: "Sarah Mitchell",
    title: "Owner, Mitchell Plumbing Co.",
    avatar: "SM",
    avatarColor: "bg-green-600",
    problem: "We were relying entirely on word-of-mouth and referrals were drying up.",
    result:
      "Within 60 days of launching our new site, we had 3Ã— more inbound calls and booked out 6 weeks in advance.",
    metric: "3Ã— more leads",
  },
  {
    name: "James Okafor",
    title: "Founder, Okafor Financial",
    avatar: "JO",
    avatarColor: "bg-emerald-600",
    problem: "My website looked outdated and I was losing clients to competitors who looked more professional.",
    result:
      "The new site and messaging completely transformed how prospects see us. We closed 4 new accounts in the first month.",
    metric: "4 new accounts in month 1",
  },
  {
    name: "Linda Torres",
    title: "Director, Torres Wellness Studio",
    avatar: "LT",
    avatarColor: "bg-purple-600",
    problem: "I had no idea where my clients were coming from or how to get more consistently.",
    result:
      "Now I have a live dashboard, a consistent stream of class bookings, and finally feel in control of my business growth.",
    metric: "Fully booked within 45 days",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
            Real Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Business owners like you â€” getting results.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col"
            >
              {/* Metric badge */}
              <div className="inline-flex self-start items-center bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-green-200">
                âœ“ {testimonial.metric}
              </div>

              {/* Problem */}
              <p className="text-slate-500 text-sm italic mb-4">
                &ldquo;{testimonial.problem}&rdquo;
              </p>

              {/* Result */}
              <p className="text-slate-800 font-medium text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.result}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                  <p className="text-slate-500 text-xs">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

