import Link from 'next/link';

export default function TrustSignals({ variant = 'horizontal' }: { variant?: 'horizontal' | 'vertical' }) {
  const signals = [
    {
      icon: '🔒',
      title: 'HIPAA Compliant',
      description: 'Full compliance with HIPAA Security Rule',
      badge: true,
    },
    {
      icon: '⭐',
      title: '4.9/5 Rating',
      description: 'Based on 47 client reviews',
      link: '#reviews',
    },
    {
      icon: '🛡️',
      title: 'SOC 2 Certified',
      description: 'Enterprise-grade security standards',
      badge: true,
    },
    {
      icon: '🏆',
      title: 'BBB Accredited',
      description: 'A+ Rating since 2020',
      badge: true,
    },
    {
      icon: '💼',
      title: '$2M Coverage',
      description: 'Cyber insurance & liability',
      badge: false,
    },
    {
      icon: '✅',
      title: '47+ Practices',
      description: 'Trusted by medical & dental offices',
      badge: false,
    },
  ];

  if (variant === 'vertical') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us</h3>
        <div className="space-y-4">
          {signals.map((signal, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="text-2xl">{signal.icon}</div>
              <div>
                <div className="font-medium text-gray-900">{signal.title}</div>
                <div className="text-sm text-gray-600">{signal.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {signals.map((signal, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">{signal.icon}</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">{signal.title}</div>
          <div className="text-xs text-gray-600">{signal.description}</div>
        </div>
      ))}
    </div>
  );
}

export function HIPAABadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-2">
      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 1l6 2v6c0 5-6 9-6 9s-6-4-6-9V3l6-2zm0 2L5 4.5v4.75c0 3.5 4.5 6.75 5 7.25.5-.5 5-3.75 5-7.25V4.5L10 3z" clipRule="evenodd" />
        <path d="M9 9h2v5H9V9zm0-3h2v2H9V6z" />
      </svg>
      <div>
        <div className="text-xs font-medium text-blue-900">HIPAA Compliant</div>
        <div className="text-xs text-blue-700">Certified & Audited</div>
      </div>
    </div>
  );
}

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded px-3 py-1 text-sm">
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="font-medium text-green-900">256-bit Encryption</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-1 text-sm">
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <span className="font-medium text-blue-900">TLS 1.3</span>
      </div>
      <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded px-3 py-1 text-sm">
        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium text-purple-900">SOC 2 Type II</span>
      </div>
    </div>
  );
}

export function SocialProofCounter({ count = 47, label = "Medical & Dental Practices Trust Us" }: { count?: number; label?: string }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white text-center">
      <div className="text-5xl font-bold mb-2">{count}+</div>
      <div className="text-lg">{label}</div>
      <div className="flex justify-center gap-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="text-sm mt-1 opacity-90">4.9/5 Average Rating</div>
    </div>
  );
}
