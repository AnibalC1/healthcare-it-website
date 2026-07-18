import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Anibal Cabral | Healthcare IT Solutions",
  description: "8+ years of healthcare IT experience from HRI Hospital. Specialized IT support for independent medical and dental practices in Central Massachusetts.",
  openGraph: {
    title: "About Healthcare IT Solutions",
    description: "Expert healthcare IT consulting with real hospital experience.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-primary-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                About Healthcare IT Solutions
              </h1>
              <p className="text-xl text-text-muted">
                Real healthcare IT experience. Built for independent practices.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-bold text-text mb-6">
                    Why I Started Healthcare IT Solutions
                  </h2>
                  <div className="space-y-4 text-text-muted">
                    <p>
                      After 8+ years managing IT infrastructure at HRI Hospital, I saw a pattern:
                      independent medical and dental practices were either overpaying for
                      enterprise-level IT services they didn't need, or going it alone and
                      unknowingly violating HIPAA technical safeguards.
                    </p>
                    <p>
                      Small practices don't need a 50-person MSP charging $3,000/month. They need
                      someone who understands healthcare IT compliance, speaks their language,
                      and provides transparent, fixed pricing.
                    </p>
                    <p>
                      That's why I founded Healthcare IT Solutions—to bring hospital-grade IT
                      expertise to independent practices at prices that make sense for your size.
                    </p>
                  </div>
                </div>

                <div className="bg-primary-light p-8 rounded-card">
                  <h3 className="text-2xl font-bold text-text mb-6">Anibal Cabral</h3>
                  <div className="space-y-3 text-text">
                    <div className="flex items-start">
                      <span className="text-primary mr-3 text-xl">✓</span>
                      <span>8+ years healthcare IT experience (HRI Hospital)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary mr-3 text-xl">✓</span>
                      <span>HIPAA compliance specialist</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary mr-3 text-xl">✓</span>
                      <span>Network security & infrastructure expert</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary mr-3 text-xl">✓</span>
                      <span>EHR integration & migration experience</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary mr-3 text-xl">✓</span>
                      <span>Serving Central Massachusetts</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-text-muted italic">
                      "Your practice deserves IT support from someone who's actually worked
                      in healthcare, not just read about it in a vendor brochure."
                    </p>
                    <p className="text-sm text-text mt-2">— Anibal Cabral, Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-text text-center mb-12">
                What I Bring to Your Practice
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-card">
                  <div className="text-3xl mb-4">🏥</div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    Healthcare IT Experience
                  </h3>
                  <p className="text-text-muted">
                    8+ years at HRI Hospital managing critical healthcare infrastructure.
                    I understand the unique demands of medical environments—uptime requirements,
                    HIPAA compliance, EHR integration, and patient data security.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-card">
                  <div className="text-3xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    HIPAA Compliance Expertise
                  </h3>
                  <p className="text-text-muted">
                    Extensive experience implementing and auditing HIPAA technical safeguards.
                    I know what OCR looks for during audits, and I'll ensure your practice
                    is compliant before they come knocking.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-card">
                  <div className="text-3xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    Cybersecurity Focus
                  </h3>
                  <p className="text-text-muted">
                    Medical practices are prime ransomware targets. I implement multi-layer
                    defense strategies: endpoint protection, backup verification, employee
                    training, and incident response planning.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-card">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    Transparent Pricing
                  </h3>
                  <p className="text-text-muted">
                    Fixed monthly rates from $800/month. No surprise bills, no upselling,
                    no "emergency hourly rates." You know exactly what you're paying every month,
                    and you can cancel with 30 days notice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How I Work Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-text text-center mb-12">
                How I Work With Your Practice
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Free IT Security Assessment
                    </h3>
                    <p className="text-text-muted">
                      I visit your practice, review your network, backup systems, HIPAA
                      compliance, and equipment. You get a detailed written report with
                      recommendations—no obligation to hire me.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Custom Proposal & Transparent Pricing
                    </h3>
                    <p className="text-text-muted">
                      Based on your needs, I recommend a service package (Bronze, Silver, or Gold).
                      You see exactly what's included, what's not, and what it costs every month.
                      No hidden fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Onboarding & Immediate Action
                    </h3>
                    <p className="text-text-muted">
                      Once you sign on, I start immediately: document your systems, fix critical
                      security gaps, set up monitoring, and create your HIPAA compliance binder.
                      Most clients see results within the first week.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Ongoing Proactive Support
                    </h3>
                    <p className="text-text-muted">
                      I don't just respond to emergencies. I monitor your systems, apply security
                      updates, plan equipment lifecycles, train your staff, and keep you compliant.
                      You focus on patients; I focus on keeping your IT running smoothly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-text mb-6">
                Serving Central Massachusetts
              </h2>
              <p className="text-xl text-text-muted mb-8">
                Providing on-site and remote IT support to medical and dental practices in:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white p-4 rounded-card text-text">Fitchburg</div>
                <div className="bg-white p-4 rounded-card text-text">Leominster</div>
                <div className="bg-white p-4 rounded-card text-text">Gardner</div>
                <div className="bg-white p-4 rounded-card text-text">Westminster</div>
                <div className="bg-white p-4 rounded-card text-text">Lunenburg</div>
                <div className="bg-white p-4 rounded-card text-text">Ashburnham</div>
              </div>
              <p className="text-text-muted mt-6">
                Not listed? Contact me—I serve the entire Central Massachusetts region.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Talk About Your Practice's IT
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Schedule a free assessment and see how I can help secure your practice
              and keep you HIPAA compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment" className="bg-white text-primary hover:bg-primary-light px-8 py-4 rounded-button font-semibold text-lg transition-all">
                Schedule Free Assessment
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-button font-semibold text-lg transition-all">
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
