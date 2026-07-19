'use client';

import { useState } from 'react';

type InquiryType = 'emergency' | 'assessment' | 'consultation' | 'question';

interface InquiryOption {
  type: InquiryType;
  icon: string;
  title: string;
  description: string;
  duration: number;
  calcomEvent: string;
  urgent: boolean;
}

const inquiryOptions: InquiryOption[] = [
  {
    type: 'emergency',
    icon: '🚨',
    title: 'Emergency Support',
    description: 'Server down, network outage, security breach',
    duration: 60,
    calcomEvent: 'emergency-support',
    urgent: true,
  },
  {
    type: 'assessment',
    icon: '🔍',
    title: 'Free IT Assessment',
    description: 'Comprehensive practice IT and security review',
    duration: 120,
    calcomEvent: 'free-assessment',
    urgent: false,
  },
  {
    type: 'consultation',
    icon: '💼',
    title: 'General Consultation',
    description: 'Discuss your IT needs, pricing, or service packages',
    duration: 30,
    calcomEvent: 'consultation',
    urgent: false,
  },
  {
    type: 'question',
    icon: '❓',
    title: 'Quick Question',
    description: '15-minute call to answer specific questions',
    duration: 15,
    calcomEvent: 'quick-question',
    urgent: false,
  },
];

export default function SmartCalBooking() {
  const [selectedType, setSelectedType] = useState<InquiryType | null>(null);

  const handleSelection = (type: InquiryType) => {
    setSelectedType(type);
  };

  if (selectedType) {
    const option = inquiryOptions.find((o) => o.type === selectedType)!;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => setSelectedType(null)}
          className="text-blue-600 hover:text-blue-700 text-sm mb-4 flex items-center gap-1"
        >
          ← Back to options
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{option.icon}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{option.title}</h2>
          <p className="text-gray-600 mb-2">{option.description}</p>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {option.duration} minutes
          </div>
          {option.urgent && (
            <div className="mt-3 inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Same-day slots available
            </div>
          )}
        </div>

        {/* Cal.com Embed */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            data-cal-link={`yourusername/${option.calcomEvent}`}
            data-cal-config='{"layout":"month_view"}'
            style={{ width: '100%', height: '600px', overflow: 'scroll' }}
          >
            {/* Cal.com widget will render here */}
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading calendar...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Cal.com widget will embed here in production
                </p>
              </div>
            </div>
          </div>
        </div>

        {option.urgent && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Need help RIGHT NOW?</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  For active outages or security emergencies, call us immediately:
                </p>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Schedule a Call</h2>
        <p className="text-lg text-gray-600">What brings you here today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inquiryOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => handleSelection(option.type)}
            className="text-left border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{option.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
            <p className="text-gray-600 mb-3">{option.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {option.duration} min
              </div>
              {option.urgent && (
                <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded">
                  Same-day
                </span>
              )}
            </div>
            <div className="mt-4 text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Select
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">All appointments include:</p>
        <div className="flex justify-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Expert guidance
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No sales pressure
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Actionable advice
          </div>
        </div>
      </div>
    </div>
  );
}
