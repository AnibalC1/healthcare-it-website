import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthcare IT Solutions | HIPAA-Compliant IT Services for Medical & Dental Practices",
  description: "Professional IT support, HIPAA compliance, and cybersecurity for independent medical and dental practices in Fitchburg, Leominster, and Gardner, MA. Expert healthcare IT consulting with transparent pricing.",
  keywords: [
    "healthcare IT",
    "HIPAA compliance",
    "medical practice IT support",
    "dental practice technology",
    "Massachusetts healthcare IT",
    "Fitchburg IT services",
    "medical cybersecurity"
  ],
  authors: [{ name: "Anibal Cabral", url: "https://healthcareitsolutions.com" }],
  openGraph: {
    title: "Healthcare IT Solutions | HIPAA-Compliant IT for Medical Practices",
    description: "Expert IT support and HIPAA compliance for independent healthcare practices in Central Massachusetts.",
    url: "https://healthcareitsolutions.com",
    siteName: "Healthcare IT Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare IT Solutions",
    description: "HIPAA-Compliant IT Services for Medical & Dental Practices",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code-here", // To be updated with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.deepseek.com" />
        <link rel="dns-prefetch" href="https://cal.com" />
      </head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
