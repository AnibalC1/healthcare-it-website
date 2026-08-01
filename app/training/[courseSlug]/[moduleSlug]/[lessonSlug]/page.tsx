'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Lesson {
  id: number;
  slug: string;
  title: string;
  description: string;
  content_type: string;
  video_url: string;
}

interface LessonContent {
  html_content: string;
}

interface Module {
  id: number;
  slug: string;
  title: string;
}

interface Course {
  id: number;
  slug: string;
  title: string;
}

interface UserProgress {
  lesson_id: number;
  progress_percent: number;
  completed_at: string | null;
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const moduleSlug = params.moduleSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const supabaseRef = useRef<any>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    // Use the shared Supabase client (safe placeholder fallbacks avoid a
    // client-side crash when env vars are not configured).
    supabaseRef.current = supabase;

    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabaseRef.current.auth.getUser();
        if (!user) {
          router.push('/portal/login');
          return;
        }
        setUser(user);
        await fetchData();
      } catch {
        router.push('/portal/login');
      }
    };

    checkAuth();
  }, [router, courseSlug, moduleSlug, lessonSlug]);

  const fetchData = async () => {
    try {
      // Get course
      const { data: courseData } = await supabaseRef.current
        .from('courses')
        .select('*')
        .eq('slug', courseSlug)
        .single();

      if (courseData) {
        setCourse(courseData);

        // Get module
        const { data: moduleData } = await supabaseRef.current
          .from('course_modules')
          .select('*')
          .eq('slug', moduleSlug)
          .eq('course_id', courseData.id)
          .single();

        if (moduleData) {
          setModule(moduleData);

          // Get lesson
          const { data: lessonData } = await supabaseRef.current
            .from('lessons')
            .select('*')
            .eq('slug', lessonSlug)
            .eq('module_id', moduleData.id)
            .single();

          if (lessonData) {
            setLesson(lessonData);

            // Get lesson content
            const { data: contentData } = await supabaseRef.current
              .from('lesson_content')
              .select('html_content')
              .eq('lesson_id', lessonData.id)
              .single();

            if (contentData) {
              setLessonContent(contentData);
            }

            // Get user progress
            if (user) {
              const { data: progressData } = await supabaseRef.current
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('lesson_id', lessonData.id)
                .single();

              if (progressData) {
                setUserProgress(progressData);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async () => {
    if (!lesson || !user) return;

    setMarkingComplete(true);
    try {
      const { error } = await supabaseRef.current
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          progress_percent: 100,
          completed_at: new Date().toISOString(),
        });

      if (!error) {
        setUserProgress({
          lesson_id: lesson.id,
          progress_percent: 100,
          completed_at: new Date().toISOString(),
        });
      }
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson || !module || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
          <Link href="/training" className="text-blue-600 hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = userProgress?.completed_at !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link
              href={`/training/${courseSlug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              ← {course.title}
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-sm text-gray-600">{module.title}</p>
          </div>
          <button
            onClick={markLessonComplete}
            disabled={isCompleted || markingComplete}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isCompleted
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {markingComplete ? 'Saving...' : isCompleted ? '✓ Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {lesson.content_type === 'video' && lesson.video_url ? (
            <div className="mb-8">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full"
                  src={lesson.video_url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ) : null}

          {lessonContent?.html_content ? (
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lessonContent.html_content }} />
            </div>
          ) : lesson.content_type !== 'video' ? (
            <div className="text-center text-gray-600 py-12">
              <p>Content for this lesson is being prepared.</p>
            </div>
          ) : null}

          {/* Completion Button */}
          <div className="mt-12 pt-8 border-t">
            <button
              onClick={markLessonComplete}
              disabled={isCompleted || markingComplete}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                isCompleted
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {markingComplete ? 'Saving...' : isCompleted ? '✓ Lesson Completed' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
