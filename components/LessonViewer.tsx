'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

interface LessonViewerProps {
  contentType: 'html' | 'video' | 'quiz';
  htmlContent?: string;
  videoUrl?: string;
  duration?: number;
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

const PDFViewer = dynamic(() => import('react-pdf').then(mod => mod.Document), {
  loading: () => <div>Loading PDF...</div>,
  ssr: false,
});

export default function LessonViewer({
  contentType,
  htmlContent,
  videoUrl,
  duration,
  onProgress,
  onComplete,
}: LessonViewerProps) {
  const [videoWatchedPercent, setVideoWatchedPercent] = useState(0);

  const handleVideoProgress = (event: any) => {
    if (videoUrl && duration) {
      const currentTime = event.currentTarget.currentTime;
      const percent = Math.round((currentTime / duration) * 100);
      setVideoWatchedPercent(percent);
      onProgress?.(percent);

      // Mark complete at 90%
      if (percent >= 90) {
        onComplete?.();
      }
    }
  };

  if (contentType === 'video' && videoUrl) {
    return (
      <div className="w-full">
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <video
            controls
            onTimeUpdate={handleVideoProgress}
            className="w-full h-full"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${videoWatchedPercent}%` }}
              ></div>
            </div>
          </div>
          <span className="font-semibold">{videoWatchedPercent}%</span>
        </div>
      </div>
    );
  }

  if (contentType === 'html' && htmlContent) {
    return (
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }

  return <div className="text-center text-gray-500 py-12">No content available</div>;
}
