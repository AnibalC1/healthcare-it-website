import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Healthcare IT Solutions",
  description: "Terms of Service for Healthcare IT Solutions. Understand our service agreements and policies.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold text-text mb-6">Terms of Service</h1>
            <p className="text-text-muted mb-8">
              <strong>Effective Date:</strong> July 18, 2026
              <br />
              <strong>Last Updated:</strong> July 18, 2026
            </p>

            <div className="space-y-8 text-text">
              <section>
                <h2 className="text-2xl font-bold text-text mb-4">1. Agreement to Terms</h2>
                <p className="text-text-muted">
                  By accessing our website or using our services, you agree to be bound by these
                  Terms of Service and our Privacy Policy. If you do not agree, do not use our
                  services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">2. Services Offered</h2>
                <p className="text-text-muted mb-4">
                  Healthcare IT Solutions provides IT support, HIPAA compliance consulting, network
                  security, and related services to medical and dental practices. Our services include:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>Monthly managed IT support packages (Bronze, Silver, Gold)</li>
                  <li>One-time IT assessments and security audits</li>
                  <li>HIPAA compliance audits and documentation</li>
                  <li>Network setup and infrastructure consulting</li>
                  <li>Emergency IT support and ransomware recovery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">3. Free IT Security Assessment</h2>
                <p className="text-text-muted">
                  We offer complimentary IT security assessments with no obligation. The assessment
                  includes an on-site visit (approximately 1 hour) and a written report. By scheduling
                  an assessment, you agree to:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2 mt-4">
                  <li>Provide accurate contact and practice information</li>
                  <li>Grant access to IT infrastructure for evaluation purposes</li>
                  <li>Not use the assessment for competitive analysis if you are an IT provider</li>
                </ul>
                <p className="text-text-muted mt-4">
                  The assessment is provided for informational purposes only and does not constitute
                  a guarantee of HIPAA compliance or security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">4. Service Agreements</h2>

                <h3 className="text-xl font-semibold text-text mb-3">4.1 Contract Terms</h3>
                <p className="text-text-muted mb-4">
                  Our managed IT support packages operate on month-to-month agreements with:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li><strong>30-day termination notice:</strong> Either party may terminate with written notice</li>
                  <li><strong>Net 15 payment terms:</strong> Invoices due within 15 days of receipt</li>
                  <li><strong>Auto-renewal:</strong> Services continue monthly unless cancelled in writing</li>
                  <li><strong>Fixed pricing:</strong> Monthly rates guaranteed for 12 months from start date</li>
                </ul>

                <h3 className="text-xl font-semibold text-text mb-3 mt-6">4.2 Scope of Service</h3>
                <p className="text-text-muted">
                  Each service package (Bronze, Silver, Gold) includes specific deliverables as
                  outlined in your service agreement. Additional services beyond the package scope
                  will be billed separately at agreed-upon rates.
                </p>

                <h3 className="text-xl font-semibold text-text mb-3 mt-6">4.3 Emergency Support</h3>
                <p className="text-text-muted">
                  24/7 emergency support is available to Silver and Gold clients at no additional
                  charge. Bronze clients may request emergency support at $200/hour with 2-hour
                  minimum. Emergency support is defined as system downtime preventing patient care.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">5. Client Responsibilities</h2>
                <p className="text-text-muted mb-4">As a client, you agree to:</p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>Provide accurate information about your IT infrastructure and needs</li>
                  <li>Grant timely access to systems for maintenance and support</li>
                  <li>Follow security recommendations and best practices we provide</li>
                  <li>Maintain current backups of critical data (we will verify, but you own the systems)</li>
                  <li>Pay invoices on time per agreed payment terms</li>
                  <li>Notify us immediately of security incidents or breaches</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">6. Limitations of Liability</h2>
                <p className="text-text-muted mb-4">
                  To the fullest extent permitted by law:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>We provide services on an "as is" basis without warranties of any kind</li>
                  <li>We are not liable for data loss, business interruption, or consequential damages</li>
                  <li>Our total liability is limited to fees paid in the 3 months prior to the claim</li>
                  <li>We are not responsible for third-party services or products</li>
                </ul>
                <p className="text-text-muted mt-4">
                  <strong>Important:</strong> While we implement best practices for HIPAA compliance
                  and security, ultimate responsibility for HIPAA compliance rests with your practice
                  as the covered entity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">7. HIPAA Business Associate Agreement</h2>
                <p className="text-text-muted">
                  For clients engaging our managed IT services, we will execute a Business Associate
                  Agreement (BAA) as required by HIPAA. The BAA governs how we handle protected
                  health information (PHI) in the course of providing IT support.
                </p>
                <p className="text-text-muted mt-4">
                  The free IT assessment does NOT create a business associate relationship. A BAA
                  is only required if you become a client.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">8. Confidentiality</h2>
                <p className="text-text-muted">
                  We treat all client information as confidential. We will not disclose your practice
                  information, IT infrastructure details, or any data we access during service
                  delivery to third parties except:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2 mt-4">
                  <li>As required by law or court order</li>
                  <li>To our subcontractors who have signed confidentiality agreements</li>
                  <li>With your explicit written permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">9. Payment Terms</h2>
                <p className="text-text-muted mb-4">
                  Payment terms for our services:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li><strong>Recurring services:</strong> Invoiced monthly on the 1st, due Net 15</li>
                  <li><strong>One-time projects:</strong> 50% deposit upfront, balance due upon completion</li>
                  <li><strong>Late payments:</strong> 1.5% monthly interest on overdue balances (18% APR)</li>
                  <li><strong>Non-payment:</strong> Services may be suspended after 30 days past due</li>
                </ul>
                <p className="text-text-muted mt-4">
                  Accepted payment methods: Check, ACH transfer, credit card (3% processing fee).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">10. Intellectual Property</h2>
                <p className="text-text-muted">
                  Documentation, scripts, configurations, and materials we create for your practice
                  belong to you. Our proprietary tools, methodologies, and general IT knowledge
                  remain our intellectual property.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">11. Termination</h2>
                <p className="text-text-muted mb-4">
                  Either party may terminate the service agreement with 30 days written notice.
                  We may terminate immediately if:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>You fail to pay invoices after 60 days</li>
                  <li>You use our services for illegal purposes</li>
                  <li>You breach these Terms of Service</li>
                </ul>
                <p className="text-text-muted mt-4">
                  Upon termination, you remain responsible for all outstanding fees. We will provide
                  reasonable transition assistance (up to 30 days) to your new IT provider.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">12. Indemnification</h2>
                <p className="text-text-muted">
                  You agree to indemnify and hold us harmless from claims arising from your use of
                  our services, your violation of these terms, or your violation of any law or
                  regulation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">13. Governing Law</h2>
                <p className="text-text-muted">
                  These Terms are governed by the laws of the Commonwealth of Massachusetts. Any
                  disputes will be resolved in the courts of Worcester County, Massachusetts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">14. Changes to Terms</h2>
                <p className="text-text-muted">
                  We may update these Terms from time to time. Material changes will be communicated
                  via email to active clients. Continued use of services after changes constitutes
                  acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">15. Contact Information</h2>
                <p className="text-text-muted">
                  Questions about these Terms of Service? Contact us:
                </p>
                <div className="bg-primary-light p-6 rounded-card mt-4">
                  <p className="text-text">
                    <strong>Healthcare IT Solutions</strong>
                    <br />
                    Email: info@healthcareitsolutions.com
                    <br />
                    Phone: (555) 123-4567
                    <br />
                    Service Area: Central Massachusetts
                  </p>
                </div>
              </section>

              <section className="bg-primary-light p-6 rounded-card">
                <h2 className="text-2xl font-bold text-text mb-4">Acknowledgment</h2>
                <p className="text-text-muted">
                  By using our website or services, you acknowledge that you have read, understood,
                  and agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
