import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-light via-white to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
            Your Practice Deserves IT That{" "}
            <span className="text-primary">Understands Healthcare</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto">
            HIPAA-compliant IT support for independent medical and dental practices
            in Central Massachusetts. Fixed pricing. No surprises.
          </p>

          {/* Pain Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
            <div className="bg-white p-6 rounded-card shadow-sm">
              <div className="text-primary text-3xl mb-3">⚠️</div>
              <h3 className="font-semibold text-lg mb-2">
                Worried About HIPAA Compliance?
              </h3>
              <p className="text-text-muted text-sm">
                Many practices unknowingly violate technical safeguards. We audit,
                fix, and document everything.
              </p>
            </div>

            <div className="bg-white p-6 rounded-card shadow-sm">
              <div className="text-primary text-3xl mb-3">💸</div>
              <h3 className="font-semibold text-lg mb-2">
                Overpaying for Generic IT?
              </h3>
              <p className="text-text-muted text-sm">
                Enterprise MSPs charge healthcare prices without healthcare expertise.
                We specialize in practices your size.
              </p>
            </div>

            <div className="bg-white p-6 rounded-card shadow-sm">
              <div className="text-primary text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2">
                Ransomware Keeping You Up?
              </h3>
              <p className="text-text-muted text-sm">
                Medical practices are prime targets. We implement multi-layer defense
                and tested backup systems.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/assessment" className="btn btn-primary text-lg px-8 py-4">
              Get Your Free IT Security Assessment
            </Link>
            <Link href="/services" className="btn btn-secondary text-lg px-8 py-4">
              View Service Packages
            </Link>
          </div>

          {/* Trust Signal */}
          <p className="mt-8 text-sm text-text-muted">
            ✓ 8+ years healthcare IT experience (HRI Hospital)
            <br />
            ✓ Serving Fitchburg, Leominster, Gardner & surrounding areas
            <br />
            ✓ Fixed monthly pricing from $800/month
          </p>
        </div>
      </div>

      {/* Decorative background element */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
