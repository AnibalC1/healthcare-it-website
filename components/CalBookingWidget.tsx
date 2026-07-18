"use client";

import { useEffect } from 'react';

interface CalBookingWidgetProps {
  calLink?: string; // e.g., "healthcareit/assessment"
  className?: string;
}

export default function CalBookingWidget({
  calLink = "healthcareit/assessment",
  className = ""
}: CalBookingWidgetProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={className}>
      {/* Cal.com Inline Embed */}
      <div
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      ></div>
    </div>
  );
}
