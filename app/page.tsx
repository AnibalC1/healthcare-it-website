import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustSignals from "@/components/TrustSignals";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content">
        <Hero />
        <TrustSignals />
        <Services />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
