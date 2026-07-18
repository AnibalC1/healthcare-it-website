import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Healthcare IT Solutions",
  description: "HIPAA-compliant privacy policy for Healthcare IT Solutions. Learn how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold text-text mb-6">Privacy Policy</h1>
            <p className="text-text-muted mb-8">
              <strong>Effective Date:</strong> July 18, 2026
              <br />
              <strong>Last Updated:</strong> July 18, 2026
            </p>

            <div className="space-y-8 text-text">
              <section>
                <h2 className="text-2xl font-bold text-text mb-4">1. Introduction</h2>
                <p className="text-text-muted">
                  Healthcare IT Solutions ("we," "us," or "our") is committed to protecting your
                  privacy and complying with all applicable data protection laws, including the
                  Health Insurance Portability and Accountability Act (HIPAA).
                </p>
                <p className="text-text-muted">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-text mb-3">2.1 Information You Provide</h3>
                <p className="text-text-muted mb-4">We collect information you voluntarily provide when you:</p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>Submit a contact form or request an assessment</li>
                  <li>Schedule an appointment</li>
                  <li>Communicate with us via email or phone</li>
                  <li>Subscribe to our newsletter or updates</li>
                </ul>
                <p className="text-text-muted mt-4">This may include:</p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Practice name and size</li>
                  <li>Business-related inquiries or messages</li>
                </ul>

                <h3 className="text-xl font-semibold text-text mb-3 mt-6">2.2 Automatically Collected Information</h3>
                <p className="text-text-muted mb-4">When you visit our website, we automatically collect:</p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>IP address and geographic location (city/state level only)</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website</li>
                </ul>
                <p className="text-text-muted mt-4">
                  We use privacy-respecting analytics (Plausible Analytics) that does not use cookies
                  or track individuals across websites.
                </p>

                <h3 className="text-xl font-semibold text-text mb-3 mt-6">2.3 Protected Health Information (PHI)</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-4">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> Do NOT submit protected health information (PHI)
                    through our website forms. PHI includes patient names, medical record numbers,
                    diagnoses, treatment information, or any data that could identify a specific
                    patient.
                  </p>
                </div>
                <p className="text-text-muted mt-4">
                  If you accidentally submit PHI, please contact us immediately at
                  info@healthcareitsolutions.com so we can securely delete it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">3. How We Use Your Information</h2>
                <p className="text-text-muted mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>Respond to your inquiries and schedule assessments</li>
                  <li>Provide IT support and consulting services</li>
                  <li>Send service updates and important notifications</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="text-text-muted mt-4">
                  We will <strong>never</strong> sell, rent, or share your personal information
                  with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">4. Data Security</h2>
                <p className="text-text-muted mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li><strong>Encryption in transit:</strong> TLS 1.3 encryption for all website traffic</li>
                  <li><strong>Encryption at rest:</strong> AES-256 encryption for stored data</li>
                  <li><strong>Access controls:</strong> Restricted access to authorized personnel only</li>
                  <li><strong>Audit logging:</strong> All data access is logged and monitored</li>
                  <li><strong>Regular security audits:</strong> Quarterly vulnerability assessments</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">5. Data Retention</h2>
                <p className="text-text-muted">
                  We retain your information only as long as necessary to fulfill the purposes
                  outlined in this policy or as required by law. Contact form submissions are
                  retained for 90 days unless we establish a business relationship.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">6. Your Rights</h2>
                <p className="text-text-muted mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to our processing of your data</li>
                </ul>
                <p className="text-text-muted mt-4">
                  To exercise these rights, contact us at info@healthcareitsolutions.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">7. Third-Party Services</h2>
                <p className="text-text-muted mb-4">
                  We use the following HIPAA-compliant third-party services:
                </p>
                <ul className="list-disc pl-6 text-text-muted space-y-2">
                  <li><strong>Supabase:</strong> Database and authentication (BAA in place)</li>
                  <li><strong>Vercel:</strong> Website hosting (HIPAA-compliant tier)</li>
                  <li><strong>Cal.com:</strong> Appointment scheduling (self-hosted)</li>
                  <li><strong>Plausible Analytics:</strong> Privacy-focused analytics (no cookies, no personal data)</li>
                </ul>
                <p className="text-text-muted mt-4">
                  All vendors handling potentially sensitive data have signed Business Associate
                  Agreements (BAAs) as required by HIPAA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">8. Cookies</h2>
                <p className="text-text-muted">
                  We use minimal cookies strictly necessary for website functionality (e.g., session
                  management). We do not use tracking cookies or third-party advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">9. Children's Privacy</h2>
                <p className="text-text-muted">
                  Our services are not directed to individuals under 18. We do not knowingly collect
                  information from children.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">10. Changes to This Policy</h2>
                <p className="text-text-muted">
                  We may update this Privacy Policy from time to time. Changes will be posted on
                  this page with an updated "Last Updated" date. Continued use of our services
                  after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text mb-4">11. Contact Us</h2>
                <p className="text-text-muted">
                  If you have questions about this Privacy Policy or our data practices, contact us:
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
