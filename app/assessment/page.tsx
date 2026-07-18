import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free IT Security Assessment | Healthcare IT Solutions",
  description: "Get a complimentary IT security and HIPAA compliance assessment for your medical or dental practice. No obligation. Detailed written report included.",
  openGraph: {
    title: "Free IT Security Assessment for Healthcare Practices",
    description: "1-hour complimentary assessment with detailed security report. No obligation.",
  },
};

export default function AssessmentPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 px-6 py-2 rounded-pill mb-6">
                <span className="font-semibold">100% FREE • NO OBLIGATION</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Free IT Security Assessment
              </h1>

              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Get a comprehensive review of your practice's IT infrastructure, HIPAA
                compliance, and security posture—absolutely free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="#booking"
                  className="bg-white text-primary hover:bg-primary-light hover:text-primary px-8 py-4 rounded-button font-semibold text-lg transition-all shadow-lg"
                >
                  Schedule Your Assessment
                </a>
                <a
                  href="#what-included"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-button font-semibold text-lg transition-all"
                >
                  What's Included
                </a>
              </div>

              <p className="text-sm opacity-75">
                ⏱️ Takes about 1 hour • 📝 Written report included • 🔒 Zero sales pressure
              </p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section id="what-included" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-4">
                What's Included in Your Free Assessment
              </h2>
              <p className="text-xl text-text-muted text-center mb-12">
                I'll spend about an hour at your practice reviewing your entire IT setup.
                You'll get a detailed written report—no obligation to hire me.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background p-6 rounded-card">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary text-white p-3 rounded-button mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text mb-2">Network Security Review</h3>
                      <ul className="text-text-muted text-sm space-y-1">
                        <li>• Firewall configuration</li>
                        <li>• WiFi security assessment</li>
                        <li>• Open port vulnerabilities</li>
                        <li>• Network segmentation review</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-card">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary text-white p-3 rounded-button mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text mb-2">HIPAA Compliance Audit</h3>
                      <ul className="text-text-muted text-sm space-y-1">
                        <li>• Technical safeguards checklist</li>
                        <li>• Administrative controls</li>
                        <li>• Physical security review</li>
                        <li>• Gap analysis & recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-card">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary text-white p-3 rounded-button mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text mb-2">Backup System Verification</h3>
                      <ul className="text-text-muted text-sm space-y-1">
                        <li>• Backup configuration review</li>
                        <li>• Last successful backup verification</li>
                        <li>• Recovery time estimate</li>
                        <li>• Off-site backup assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-card">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary text-white p-3 rounded-button mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text mb-2">Equipment Inventory</h3>
                      <ul className="text-text-muted text-sm space-y-1">
                        <li>• Workstation audit</li>
                        <li>• Server health check</li>
                        <li>• End-of-life equipment identification</li>
                        <li>• Replacement timeline planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-text text-center mb-12">
                What You'll Receive
              </h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-card flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Detailed Written Report
                    </h3>
                    <p className="text-text-muted">
                      A comprehensive PDF report documenting all findings, security vulnerabilities,
                      HIPAA compliance gaps, and specific recommendations prioritized by risk level.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-card flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Prioritized Action Plan
                    </h3>
                    <p className="text-text-muted">
                      A clear roadmap of what to fix first (critical issues), what can wait
                      (medium priority), and what's optional (nice-to-have improvements).
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-card flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      Custom Service Proposal (Optional)
                    </h3>
                    <p className="text-text-muted">
                      If you're interested, I'll provide a proposal showing exactly how I can help,
                      what it costs, and what's included. Zero pressure—the assessment and report
                      are yours to keep regardless.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Free Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-text text-center mb-6">
                Why Offer a Free Assessment?
              </h2>
              <p className="text-xl text-text-muted text-center mb-12">
                I get this question a lot. Here's the honest answer:
              </p>

              <div className="bg-primary-light p-8 rounded-card">
                <p className="text-text mb-4">
                  Most medical and dental practices have <strong>no idea</strong> whether their IT
                  is secure or HIPAA compliant. They're trusting their current provider (or their
                  nephew who "knows computers") without verification.
                </p>
                <p className="text-text mb-4">
                  A free assessment gives you an independent, professional evaluation of your IT
                  security—with no strings attached. You get actionable recommendations you can
                  use whether you hire me or not.
                </p>
                <p className="text-text mb-4">
                  For me, it's an opportunity to demonstrate my expertise and show you what proper
                  healthcare IT support looks like. If I do a good job, you'll consider hiring me.
                  If not, you still got a valuable security audit for free.
                </p>
                <p className="text-text font-semibold">
                  Fair deal for everyone. No sales pitch. No pressure. Just honest, professional advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Schedule Your Free Assessment
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Choose a time that works for you. I'll visit your practice for about an hour,
                and you'll have your detailed report within 3-5 business days.
              </p>

              {/* TODO: Replace with actual Cal.com embed */}
              <div className="bg-white rounded-card p-12 text-text">
                <p className="text-2xl font-bold mb-6">
                  📅 Booking Calendar Coming Soon
                </p>
                <p className="text-text-muted mb-8">
                  In the meantime, contact us directly to schedule your free assessment:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+15551234567"
                    className="btn btn-primary text-lg px-8 py-4"
                  >
                    📞 Call (555) 123-4567
                  </a>
                  <a
                    href="/contact"
                    className="btn btn-secondary text-lg px-8 py-4"
                  >
                    ✉️ Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-text text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <details className="bg-white p-6 rounded-card">
                  <summary className="font-semibold text-lg text-text cursor-pointer">
                    Is there really no catch? What's the cost?
                  </summary>
                  <p className="text-text-muted mt-4">
                    Zero cost. No hidden fees. No obligation. You get a professional IT security
                    assessment and detailed report absolutely free. If you decide to hire me
                    afterward, great. If not, the report is still yours to keep and use.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-card">
                  <summary className="font-semibold text-lg text-text cursor-pointer">
                    How long does the assessment take?
                  </summary>
                  <p className="text-text-muted mt-4">
                    About 1 hour at your practice. I'll review your network, servers, workstations,
                    backup systems, and HIPAA controls. You'll receive the written report within
                    3-5 business days.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-card">
                  <summary className="font-semibold text-lg text-text cursor-pointer">
                    Do I need to prepare anything before you visit?
                  </summary>
                  <p className="text-text-muted mt-4">
                    Nope. Just make sure I have access to your server room (if you have one) and
                    can see a few workstations. Everything else I'll figure out during the visit.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-card">
                  <summary className="font-semibold text-lg text-text cursor-pointer">
                    Will you try to sell me services during the assessment?
                  </summary>
                  <p className="text-text-muted mt-4">
                    No. The assessment is purely informational. I'll document what I find, answer
                    your questions, and provide recommendations. If you ask for a proposal, I'll
                    send one. Otherwise, you'll just get the report with no sales pitch.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-card">
                  <summary className="font-semibold text-lg text-text cursor-pointer">
                    What if I already have an IT provider?
                  </summary>
                  <p className="text-text-muted mt-4">
                    That's fine. Many practices use the free assessment as an independent audit
                    to verify their current provider is doing a good job. Think of it as a second
                    opinion. If everything looks good, I'll tell you. If I find gaps, you'll know
                    what to ask your current provider to fix.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
