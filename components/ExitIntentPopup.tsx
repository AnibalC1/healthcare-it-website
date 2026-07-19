'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ExitIntentPopupProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  offerText?: string;
}

export default function ExitIntentPopup({
  title = "Wait! Don't Leave Without Your Free IT Security Report",
  description = "Get a personalized security assessment showing exactly where your practice is vulnerable",
  ctaText = "Get My Free Report",
  ctaLink = "/it-health-check",
  offerText = "Takes only 2 minutes • No credit card required",
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown === 'true') {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the viewport
      // and popup hasn't been shown yet
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 relative animate-slide-up">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-sm font-medium text-gray-900">2-Minute Assessment</div>
            <div className="text-xs text-gray-600">Quick & easy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm font-medium text-gray-900">Personalized Report</div>
            <div className="text-xs text-gray-600">Your specific risks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-sm font-medium text-gray-900">Action Plan Included</div>
            <div className="text-xs text-gray-600">Step-by-step fixes</div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link
            href={ctaLink}
            className="block w-full bg-blue-600 text-white text-center py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            onClick={() => setIsVisible(false)}
          >
            {ctaText}
          </Link>
          <p className="text-center text-sm text-gray-600">{offerText}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="block w-full text-gray-500 hover:text-gray-700 text-sm"
          >
            No thanks, I'll take my chances
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

// Pricing page variant - offer free assessment
export function ExitIntentPricingOffer() {
  return (
    <ExitIntentPopup
      title="Not Sure Which Plan Fits Your Practice?"
      description="Get a free 30-minute consultation to find the perfect IT solution for your needs"
      ctaText="Schedule Free Consultation"
      ctaLink="/assessment"
      offerText="100% free • No sales pressure • Just expert advice"
    />
  );
}

// ROI Calculator variant
export function ExitIntentROIOffer() {
  return (
    <ExitIntentPopup
      title="See How Much You Could Save"
      description="Our ROI calculator shows the actual dollar amount poor IT is costing your practice"
      ctaText="Calculate My Savings"
      ctaLink="/roi-calculator"
      offerText="Takes 3 minutes • Get instant results"
    />
  );
}
