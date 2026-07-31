'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

interface Module {
  id: number;
  slug: string;
  title: string;
  module_order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  slug: string;
  title: string;
  lesson_order: number;
  content_type: string;
  duration_minutes: number;
  is_published: boolean;
}

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
}

interface UserProgress {
  lesson_id: number;
  completed_at: string | null;
}

export default function CourseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
      await fetchCourseData();
    };

    checkAuth();
  }, [router, supabase, courseSlug]);

  const fetchCourseData = async () => {
    // Fetch course
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', courseSlug)
      .single();

    if (courseData) {
      setCourse(courseData);

      // Fetch modules
      const { data: modulesData } = await supabase
        .from('course_modules')
        .select(`
          id,
          slug,
          title,
          module_order,
          lessons (
            id,
            slug,
            title,
            lesson_order,
            content_type,
            duration_minutes,
            is_published
          )
        `)
        .eq('course_id', courseData.id)
        .order('module_order');

      if (modulesData) {
        // Sort lessons within each module
        const sortedModules = modulesData.map(m => ({
          ...m,
          lessons: (m.lessons || []).sort((a: any, b: any) => a.lesson_order - b.lesson_order)
        }));
        setModules(sortedModules);
      }

      // Fetch user progress
      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('lesson_id, completed_at')
          .eq('user_id', user.id);

        if (progressData) {
          setUserProgress(progressData);
        }
      }
    }
    setLoading(false);
  };

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const isLessonCompleted = (lessonId: number) => {
    return userProgress.some(p => p.lesson_id === lessonId && p.completed_at);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link href="/training" className="text-blue-600 hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = userProgress.filter(p => p.completed_at).length;
  const completionPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/training" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to courses
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                <span className="text-sm font-bold text-blue-600">{completionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${completionPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedLessons}/{totalLessons}</div>
              <div className="text-xs text-gray-600">completed</div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {expandedModules.has(module.id) ? '▼' : '▶'}
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-gray-900">{module.title}</h2>
                    <p className="text-sm text-gray-600">{module.lessons.length} lessons</p>
                  </div>
                </div>
              </button>

              {/* Lessons */}
              {expandedModules.has(module.id) && (
                <div className="border-t">
                  {module.lessons.map((lesson) => {
                    const isCompleted = isLessonCompleted(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/training/${courseSlug}/${module.slug}/${lesson.slug}`}
                        className={`block px-6 py-3 border-b hover:bg-gray-50 transition ${
                          isCompleted ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-lg">
                            {isCompleted ? '✓' : '○'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                            <p className="text-xs text-gray-600">
                              {lesson.content_type === 'video' ? '🎬 Video' : '📄 Lesson'}
                              {lesson.duration_minutes && ` • ${lesson.duration_minutes} min`}
                            </p>
                          </div>
                          <span className={`text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                            {isCompleted ? 'Complete' : 'Not started'}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
