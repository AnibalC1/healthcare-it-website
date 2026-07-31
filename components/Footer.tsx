import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Healthcare IT Solutions</h3>
            <p className="text-sm text-gray-300 mb-4">
              HIPAA-compliant IT support for independent medical and dental
              practices in Central Massachusetts.
            </p>
            <p className="text-sm text-gray-300">
              📞 <a href="tel:+15551234567" className="hover:text-primary-light">(555) 123-4567</a>
              <br />
              ✉️ <a href="mailto:info@healthcareitsolutions.com" className="hover:text-primary-light">info@healthcareitsolutions.com</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary-light transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-light transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-gray-300 hover:text-primary-light transition-colors">
                  Free Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">
                  HIPAA Compliance Audits
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">
                  Network Security
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">
                  24/7 IT Support
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">
                  Equipment Management
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">
                  Backup & Recovery
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-primary-light transition-colors">
                  Security Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="font-semibold mb-4">Service Area</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Fitchburg, MA</li>
              <li>Leominster, MA</li>
              <li>Gardner, MA</li>
              <li>Westminster, MA</li>
              <li>Lunenburg, MA</li>
              <li>Central Massachusetts</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} Healthcare IT Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Compliance Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 HIPAA-Compliant Infrastructure | SOC 2 Certified Vendors | Zero
            Data Breaches
          </p>
        </div>
      </div>
    </footer>
  );
}
