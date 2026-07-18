import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Healthcare IT Solutions",
  description: "Get in touch for a free IT security assessment. Serving medical and dental practices in Fitchburg, Leominster, Gardner, and Central Massachusetts.",
  openGraph: {
    title: "Contact Healthcare IT Solutions",
    description: "Schedule your free IT security assessment today.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-primary-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-text-muted">
                Have questions? Ready to schedule your free IT assessment? Let's talk.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-text mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary-light p-3 rounded-button mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">Phone</h3>
                      <a href="tel:+15551234567" className="text-primary hover:underline">
                        (555) 123-4567
                      </a>
                      <p className="text-sm text-text-muted mt-1">Mon-Fri 8 AM - 6 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-light p-3 rounded-button mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">Email</h3>
                      <a href="mailto:info@healthcareitsolutions.com" className="text-primary hover:underline">
                        info@healthcareitsolutions.com
                      </a>
                      <p className="text-sm text-text-muted mt-1">24-48 hour response time</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-light p-3 rounded-button mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">Service Area</h3>
                      <p className="text-text-muted">
                        Fitchburg, Leominster, Gardner<br />
                        Central Massachusetts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-light p-6 rounded-card">
                  <h3 className="font-semibold text-text mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm text-text">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">By appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border text-primary font-medium">
                      24/7 emergency support available for Silver & Gold clients
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-text mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-text mb-6">
                Ready to Schedule Your Free Assessment?
              </h2>
              <p className="text-xl text-text-muted mb-8">
                Choose a time that works for you. I'll visit your practice, review your IT
                setup, and provide a detailed security assessment—no obligation.
              </p>
              <a
                href="/assessment"
                className="btn btn-primary text-lg px-8 py-4 inline-block"
              >
                View Available Times
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
