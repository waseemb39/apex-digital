import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us — Graft Digital",
  description:
    "We're a team of digital marketers obsessed with one thing: getting small businesses more qualified leads.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              We believe great businesses deserve to be found.
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Graft Digital was built for business owners who are exceptional at
              what they do — but tired of losing clients to competitors who are
              just better at marketing.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We exist to level the playing field. Big brands have marketing
                  departments. You have us. We bring enterprise-grade strategy to
                  small businesses — without the enterprise price tag.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We don&apos;t just build websites. We build systems: messaging
                  frameworks, conversion funnels, and analytics dashboards that
                  make your growth predictable and measurable.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Approach</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Every engagement starts with strategy, not tactics. We use the
                  StoryBrand framework to clarify your message, then build the
                  technical foundation to amplify it.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Everything we build is documented, owned by you, and designed
                  to run without us — because that&apos;s what a real system looks like.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              What we stand for
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: "🎯", title: "Clarity over cleverness", body: "Simple, clear messaging beats clever copy every time." },
                { icon: "📐", title: "Systems, not heroics", body: "If it only works when we're involved, it's not a system." },
                { icon: "📊", title: "Measure everything", body: "Every decision is backed by data, not gut feel." },
                { icon: "🤝", title: "Client success first", body: "We only win when our clients win. Full stop." },
                { icon: "⚡", title: "Speed and iteration", body: "Launch fast, learn fast, improve continuously." },
                { icon: "🔒", title: "Radical transparency", body: "You own your data, your accounts, and your results." },
              ].map((value) => (
                <div key={value.title} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-700 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to work with a team that&apos;s obsessed with your results?
            </h2>
            <a
              href="/get-started"
              className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
