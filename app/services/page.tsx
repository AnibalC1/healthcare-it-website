import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Services & Pricing | Healthcare IT Solutions",
  description: "HIPAA-compliant IT support packages for medical and dental practices. Bronze ($800/mo), Silver ($1,200/mo), and Gold ($1,800/mo) plans with transparent pricing.",
  openGraph: {
    title: "IT Services & Pricing for Healthcare Practices",
    description: "Fixed monthly pricing for HIPAA-compliant IT support. No surprises.",
  },
};

const packages = [
  {
    name: "Bronze",
    price: "$800",
    introPrice: "$600",
    subtitle: "Best for 1-3 provider practices with basic IT needs",
    features: [
      "Monthly on-site visit (2 hours)",
      "Remote support during business hours (8 AM - 6 PM)",
      "Network monitoring and security updates",
      "Quarterly HIPAA compliance review",
      "Equipment inventory tracking",
      "Email/phone support (response within 4 hours)",
    ],
    notIncluded: [
      "After-hours emergency support",
      "Hardware purchases (available separately)",
    ],
  },
  {
    name: "Silver",
    price: "$1,200",
    introPrice: "$900",
    subtitle: "Best for 4-8 provider practices with moderate IT complexity",
    features: [
      "Bi-weekly on-site visits (4 hours total/month)",
      "24/7 emergency phone support",
      "Network monitoring and security updates",
      "Monthly HIPAA compliance audit",
      "Equipment inventory + lifecycle planning",
      "Backup verification and testing",
      "Email/phone support (response within 2 hours)",
      "Security awareness training (quarterly)",
    ],
    notIncluded: [
      "Hardware purchases (can procure at cost + 10%)",
    ],
    popular: true,
  },
  {
    name: "Gold",
    price: "$1,800",
    introPrice: "$1,350",
    subtitle: "Best for 9+ provider practices or multi-location offices",
    features: [
      "Weekly on-site visits (8 hours total/month)",
      "24/7 emergency support (phone + remote)",
      "Dedicated IT strategy planning",
      "Network monitoring, security, and optimization",
      "HIPAA compliance management (full documentation)",
      "Equipment inventory + proactive replacement planning",
      "Backup verification and disaster recovery planning",
      "Email/phone support (response within 1 hour)",
      "Security awareness training (monthly)",
      "Vendor management (negotiate with EHR, phone, internet providers)",
    ],
    notIncluded: [
      "Hardware: Procure at cost + 10%",
    ],
  },
];

const alacarte = [
  { service: "Initial IT Assessment", price: "FREE", timeline: "1-2 hours" },
  { service: "Network Setup (new office)", price: "$2,500-4,000", timeline: "1-2 weeks" },
  { service: "HIPAA Compliance Audit", price: "$1,500", timeline: "3-5 days" },
  { service: "Security Risk Assessment", price: "$1,200", timeline: "2-3 days" },
  { service: "Backup System Implementation", price: "$1,000-2,000", timeline: "1 week" },
  { service: "Equipment Inventory System", price: "$800", timeline: "2-3 days" },
  { service: "EHR Migration Support", price: "$150/hour", timeline: "Varies" },
  { service: "Ransomware Recovery", price: "$200/hour (emergency)", timeline: "Varies" },
];

const addons = [
  { service: "Cloud backup (per workstation)", price: "$25/month" },
  { service: "Antivirus/EDR (per workstation)", price: "$15/month" },
  { service: "Email security/spam filtering", price: "$10/user/month" },
  { service: "Password manager (practice-wide)", price: "$50/month" },
  { service: "After-hours monitoring", price: "$200/month" },
  { service: "Additional on-site hours", price: "$100/hour" },
];

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-primary-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Service Packages & Pricing
              </h1>
              <p className="text-xl text-text-muted mb-6">
                Fixed monthly pricing. No hidden fees. Cancel anytime with 30-day notice.
              </p>
              <div className="inline-block bg-primary text-white px-6 py-3 rounded-pill">
                <span className="font-semibold">⭐ Special Offer:</span> First 3 clients get 25% off for 3 months
              </div>
            </div>
          </div>
        </section>

        {/* Package Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`card relative ${pkg.popular ? "ring-2 ring-primary" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-pill text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6 pt-2">
                    <h2 className="text-2xl font-bold text-text mb-2">
                      {pkg.name} Package
                    </h2>
                    <div className="mb-2">
                      <div className="text-4xl font-bold text-primary">
                        {pkg.price}
                        <span className="text-lg text-text-muted font-normal">/month</span>
                      </div>
                      <div className="text-sm text-primary mt-1">
                        Intro rate: {pkg.introPrice}/month (first 3 months)
                      </div>
                    </div>
                    <p className="text-sm text-text-muted">{pkg.subtitle}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-text mb-3">Included:</h3>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-text mb-3">Not included:</h3>
                    <ul className="space-y-2">
                      {pkg.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-text-muted mr-2">•</span>
                          <span className="text-text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/assessment"
                    className={`block text-center ${pkg.popular ? "btn btn-primary" : "btn btn-secondary"} w-full`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* À La Carte Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-text text-center mb-12">
              One-Time Projects & À La Carte Services
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-card shadow-md overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="text-left p-4">Service</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alacarte.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-background"}>
                        <td className="p-4 font-medium text-text">{item.service}</td>
                        <td className="p-4 text-text">{item.price}</td>
                        <td className="p-4 text-text-muted">{item.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-text mb-6">Add-On Services (for retainer clients)</h3>
              <div className="bg-white rounded-card shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary-light">
                    <tr>
                      <th className="text-left p-4 text-text">Service</th>
                      <th className="text-left p-4 text-text">Monthly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addons.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-background"}>
                        <td className="p-4 text-text">{item.service}</td>
                        <td className="p-4 text-primary font-semibold">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Contract Terms */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-text mb-8">Contract Terms</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary-light p-6 rounded-card">
                <h3 className="font-semibold text-lg text-text mb-4">What We Offer</h3>
                <ul className="space-y-2 text-text">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Monthly contracts (no long-term commitment)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>30-day termination notice (either party)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Net 15 payment terms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Auto-renewal unless cancelled in writing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background p-6 rounded-card">
                <h3 className="font-semibold text-lg text-text mb-4">Why Month-to-Month?</h3>
                <ul className="space-y-2 text-text-muted">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Easier to get started (low commitment)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Forces us to deliver great service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Most clients stay 2+ years when happy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Transparent, fair pricing model</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Schedule your complimentary IT assessment and get a customized proposal
              based on your practice's specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment" className="bg-white text-primary hover:bg-primary-light px-8 py-4 rounded-button font-semibold text-lg transition-all">
                Schedule Free Assessment
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-button font-semibold text-lg transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
