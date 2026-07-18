import Link from "next/link";

const packages = [
  {
    name: "Bronze",
    price: "$800",
    subtitle: "Best for 1-3 provider practices",
    features: [
      "Monthly on-site visit (2 hours)",
      "Remote support during business hours",
      "Network monitoring & security updates",
      "Quarterly HIPAA compliance review",
      "Equipment inventory tracking",
      "Email/phone support (4-hour response)",
    ],
    badge: null,
  },
  {
    name: "Silver",
    price: "$1,200",
    subtitle: "Best for 4-8 provider practices",
    features: [
      "Bi-weekly on-site visits (4 hours/month)",
      "24/7 emergency phone support",
      "Network monitoring & security updates",
      "Monthly HIPAA compliance audit",
      "Equipment inventory + lifecycle planning",
      "Backup verification & testing",
      "Email/phone support (2-hour response)",
      "Quarterly security awareness training",
    ],
    badge: "Most Popular",
  },
  {
    name: "Gold",
    price: "$1,800",
    subtitle: "Best for 9+ providers or multi-location",
    features: [
      "Weekly on-site visits (8 hours/month)",
      "24/7 emergency support (phone + remote)",
      "Dedicated IT strategy planning",
      "Network optimization & monitoring",
      "Full HIPAA compliance management",
      "Proactive equipment replacement planning",
      "Disaster recovery planning",
      "Email/phone support (1-hour response)",
      "Monthly security awareness training",
      "Vendor management (EHR, phone, internet)",
    ],
    badge: "Premium",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-background" id="services">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Service Packages
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Fixed monthly pricing. No hidden fees. Cancel anytime with 30-day notice.
          </p>
          <p className="text-sm text-primary mt-2 font-medium">
            ⭐ First 3 clients get 25% off for 3 months
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`card relative ${
                pkg.badge ? "ring-2 ring-primary" : ""
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-pill text-sm font-medium">
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-6 pt-2">
                <h3 className="text-2xl font-bold text-text mb-2">
                  {pkg.name} Package
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {pkg.price}
                  <span className="text-lg text-text-muted font-normal">/month</span>
                </div>
                <p className="text-sm text-text-muted">{pkg.subtitle}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-text">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/assessment"
                className={`block text-center ${
                  pkg.badge ? "btn btn-primary" : "btn btn-secondary"
                } w-full`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-text-muted mb-4">
            Need custom pricing? Have more than 15 providers?
          </p>
          <Link href="/contact" className="text-primary hover:underline font-medium">
            Contact us for enterprise pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
