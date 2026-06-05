// Owner: Content Manager | Purpose: Bento-grid client stories following Problem → Service → Result arc
// Replace placeholder testimonials with real client names, photos, and results before launch

const testimonials = [
  {
    name: "Sarah Mitchell",
    title: "Owner, Mitchell Plumbing Co.",
    avatar: "SM",
    avatarColor: "bg-green-600",
    result:
      "Within 60 days of launching our new site, we had 3× more inbound calls and booked out 6 weeks in advance. I finally stopped worrying about where the next job would come from.",
    metric: "3× more leads",
    featured: true,
  },
  {
    name: "James Okafor",
    title: "Founder, Okafor Financial",
    avatar: "JO",
    avatarColor: "bg-emerald-600",
    result:
      "The new site and messaging completely transformed how prospects see us. We closed 4 new accounts in the first month alone.",
    metric: "4 new accounts in month 1",
    featured: false,
  },
  {
    name: "Linda Torres",
    title: "Director, Torres Wellness Studio",
    avatar: "LT",
    avatarColor: "bg-purple-600",
    result:
      "Now I have a live dashboard, a consistent stream of class bookings, and finally feel in control of my business growth.",
    metric: "Fully booked within 45 days",
    featured: false,
  },
];

export default function Testimonials() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
            Real Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Business owners like you — getting results.
          </h2>
        </div>

        {/* Bento grid: featured left (tall), two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured card — tall */}
          <div className="relative overflow-hidden bg-white rounded-2xl p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:row-span-2">
            {/* Decorative quote mark */}
            <span className="absolute top-4 left-5 text-[72px] font-serif text-green-100 leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            {/* Stars */}
            <div className="flex gap-0.5 mb-4 relative">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Metric badge */}
            <div className="inline-flex self-start items-center bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              ✓ {featured.metric}
            </div>

            {/* Quote */}
            <p className="text-slate-700 text-base leading-relaxed mb-8 flex-1 relative">
              &ldquo;{featured.result}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <div className={`w-11 h-11 rounded-full ${featured.avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {featured.avatar}
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{featured.name}</p>
                <p className="text-slate-400 text-xs">{featured.title}</p>
              </div>
            </div>
          </div>

          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-4">
            {rest.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative overflow-hidden bg-white rounded-2xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col flex-1"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-3 left-4 text-[56px] font-serif text-green-100 leading-none select-none pointer-events-none">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3 relative">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Metric badge */}
                <div className="inline-flex self-start items-center bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  ✓ {testimonial.metric}
                </div>

                {/* Quote */}
                <p className="text-slate-700 text-sm leading-relaxed mb-5 flex-1 relative">
                  &ldquo;{testimonial.result}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className={`w-9 h-9 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-slate-400 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
