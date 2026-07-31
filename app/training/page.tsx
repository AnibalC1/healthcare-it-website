import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HIPAA Security Awareness Training | Healthcare IT Solutions",
  description:
    "HIPAA-required security awareness training for medical and dental practice staff. Phishing simulations, annual documentation, and audit-ready records for Central Massachusetts practices.",
  openGraph: {
    title: "HIPAA Security Awareness Training for Healthcare Practices",
    description:
      "Meet the HIPAA training requirement and turn your staff into your first line of defense. Documented, audit-ready, and built for small practices.",
  },
};

const modules = [
  {
    title: "HIPAA & PHI Fundamentals",
    description:
      "What counts as protected health information, the minimum necessary rule, and everyday habits that keep patient data safe.",
  },
  {
    title: "Phishing & Email Threats",
    description:
      "How to spot the fake login pages, invoice scams, and spoofed vendor emails that target medical offices—plus what to do when one gets through.",
  },
  {
    title: "Passwords & Access Security",
    description:
      "Strong passwords, multi-factor authentication, and why sharing that one clinic login puts your whole practice at risk.",
  },
  {
    title: "Ransomware Awareness",
    description:
      "Why healthcare is the #1 ransomware target, the warning signs of an infection, and how to keep one wrong click from locking your EHR.",
  },
  {
    title: "Device & Physical Security",
    description:
      "Securing workstations, laptops, and mobile devices, locking screens, and handling PHI on paper and in the waiting room.",
  },
  {
    title: "Breach Response Basics",
    description:
      "Who to call, what to document, and the first steps that protect your patients—and your practice—when something goes wrong.",
  },
];

const included = [
  "Annual security awareness training for every staff member",
  "Simulated phishing campaigns with staff-level reporting",
  "Completion certificates and audit-ready training logs",
  "Role-based content for front desk, clinical, and admin staff",
  "New-hire onboarding training within the first week",
  "Ongoing threat alerts when new scams target healthcare",
];

export default function TrainingPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-primary-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                HIPAA Security Awareness Training
              </h1>
              <p className="text-xl text-text-muted">
                Your staff are your first line of defense—and your biggest risk. We turn
                everyday clicks into confident, compliant decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-text mb-6">
                    Training Isn't Optional—It's the Law
                  </h2>
                  <div className="space-y-4 text-text-muted">
                    <p>
                      The HIPAA Security Rule requires every covered entity to implement a
                      security awareness and training program for all workforce members. It's
                      one of the first things an auditor asks for after a breach—and one of the
                      most common gaps in small practices.
                    </p>
                    <p>
                      More than 90% of successful attacks on healthcare organizations start with
                      a single employee clicking the wrong link. No firewall fixes that. Trained
                      staff do.
                    </p>
                    <p>
                      We handle the whole program—content, delivery, phishing tests, and the
                      documentation you'll need if the OCR ever comes knocking.
                    </p>
                  </div>
                </div>

                <div className="bg-primary-light p-8 rounded-card">
                  <h3 className="text-2xl font-bold text-text mb-6">Why Practices Choose Us</h3>
                  <div className="space-y-3 text-text">
                    {included.map((item) => (
                      <div key={item} className="flex items-start">
                        <span className="text-primary mr-3 text-xl">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Modules */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text mb-4">What We Cover</h2>
                <p className="text-xl text-text-muted">
                  Practical, plain-language training built for busy medical and dental teams—not
                  generic corporate slideshows.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {modules.map((module) => (
                  <div key={module.title} className="bg-white p-6 rounded-card border border-border">
                    <h3 className="text-lg font-semibold text-text mb-2">{module.title}</h3>
                    <p className="text-text-muted">{module.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text mb-4">How It Works</h2>
                <p className="text-xl text-text-muted">
                  Included in every service package—up and running in your first month.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">Enroll Your Team</h3>
                  <p className="text-text-muted">
                    We add every staff member and tailor the content to their role—no IT lift on
                    your end.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">Train & Test</h3>
                  <p className="text-text-muted">
                    Staff complete short, on-demand modules and receive periodic phishing
                    simulations to keep skills sharp.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">Document & Report</h3>
                  <p className="text-text-muted">
                    You get completion certificates and audit-ready logs that prove compliance
                    year after year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Make Your Team Your Strongest Defense
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Security awareness training is included in every Healthcare IT Solutions package.
              Schedule a free assessment and we'll get your staff trained and documented.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="bg-white text-primary hover:bg-primary-light px-8 py-4 rounded-button font-semibold text-lg transition-all"
              >
                Schedule Free Assessment
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-button font-semibold text-lg transition-all"
              >
                View Service Packages
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
