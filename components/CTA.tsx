import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Secure Your Practice?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Get a complimentary IT security assessment. We'll review your network,
          HIPAA compliance, backup systems, and provide a detailed report—no
          obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/assessment"
            className="bg-white text-primary hover:bg-primary-light px-8 py-4 rounded-button font-semibold text-lg transition-all hover:shadow-lg"
          >
            Schedule Free Assessment
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-button font-semibold text-lg transition-all"
          >
            Contact Us
          </Link>
        </div>
        <p className="mt-6 text-sm opacity-75">
          Serving Fitchburg, Leominster, Gardner, and surrounding Central Massachusetts
        </p>
      </div>
    </section>
  );
}
