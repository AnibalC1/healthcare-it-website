'use client';

import { useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  practice: string;
  practiceType: 'dental' | 'medical' | 'urgent-care' | 'specialty';
  service: 'security' | 'compliance' | 'setup' | 'support';
  videoUrl: string;
  thumbnail: string;
  quote: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Sarah Martinez',
    practice: 'Martinez Family Dental',
    practiceType: 'dental',
    service: 'compliance',
    videoUrl: 'https://youtube.com/embed/PLACEHOLDER1',
    thumbnail: '/testimonials/martinez.jpg',
    quote: 'They made HIPAA compliance simple and stress-free',
    location: 'Fitchburg, MA',
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    practice: 'Chen Medical Group',
    practiceType: 'medical',
    service: 'security',
    videoUrl: 'https://youtube.com/embed/PLACEHOLDER2',
    thumbnail: '/testimonials/chen.jpg',
    quote: 'Best IT security investment we\'ve ever made',
    location: 'Leominster, MA',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    practice: 'Leominster Urgent Care',
    practiceType: 'urgent-care',
    service: 'support',
    videoUrl: 'https://youtube.com/embed/PLACEHOLDER3',
    thumbnail: '/testimonials/rodriguez.jpg',
    quote: 'Response time is incredible - our downtime dropped to zero',
    location: 'Leominster, MA',
  },
  {
    id: '4',
    name: 'Dr. Michael Thompson',
    practice: 'Thompson Orthodontics',
    practiceType: 'specialty',
    service: 'setup',
    videoUrl: 'https://youtube.com/embed/PLACEHOLDER4',
    thumbnail: '/testimonials/thompson.jpg',
    quote: 'Seamless network setup - practice up and running in 2 days',
    location: 'Gardner, MA',
  },
];

export default function VideoTestimonials() {
  const [filter, setFilter] = useState<{
    practiceType: string;
    service: string;
  }>({
    practiceType: 'all',
    service: 'all',
  });
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesPracticeType = filter.practiceType === 'all' || t.practiceType === filter.practiceType;
    const matchesService = filter.service === 'all' || t.service === filter.service;
    return matchesPracticeType && matchesService;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Client Success Stories</h2>
      <p className="text-gray-600 mb-6">Hear from medical and dental practices like yours</p>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Practice Type</label>
          <select
            value={filter.practiceType}
            onChange={(e) => setFilter({ ...filter, practiceType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Practice Types</option>
            <option value="dental">Dental</option>
            <option value="medical">Medical</option>
            <option value="urgent-care">Urgent Care</option>
            <option value="specialty">Specialty</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
          <select
            value={filter.service}
            onChange={(e) => setFilter({ ...filter, service: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Services</option>
            <option value="security">Security</option>
            <option value="compliance">Compliance</option>
            <option value="setup">Network Setup</option>
            <option value="support">24/7 Support</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(testimonial)}
          >
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video mb-3">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center group-hover:bg-black/70 transition-all">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm opacity-90">{testimonial.practice}</div>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">"{testimonial.quote}"</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="capitalize">{testimonial.practiceType.replace('-', ' ')}</span>
              <span>•</span>
              <span>{testimonial.location}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <p className="text-gray-600">No testimonials match your filters</p>
          <button
            onClick={() => setFilter({ practiceType: 'all', service: 'all' })}
            className="text-blue-600 hover:text-blue-700 font-medium mt-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  src={selectedVideo.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.name}</h3>
                <p className="text-gray-600 mb-4">{selectedVideo.practice} • {selectedVideo.location}</p>
                <p className="text-lg text-gray-700 italic">"{selectedVideo.quote}"</p>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
