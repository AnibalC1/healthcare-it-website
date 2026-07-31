'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration_hours: number;
  difficulty: string;
  icon: string;
}

interface Enrollment {
  course_id: number;
  completion_percent: number;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function TrainingPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
      await fetchCourses();
      await fetchEnrollments(user.id);
    };

    checkAuth();
  }, [router, supabase]);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('course_order', { ascending: true });

    if (!error && data) {
      setCourses(data);
    }
    setLoading(false);
  };

  const fetchEnrollments = async (userId: string) => {
    const { data } = await supabase
      .from('course_enrollments')
      .select('course_id, completion_percent')
      .eq('user_id', userId);

    if (data) {
      setEnrollments(data);
    }
  };

  const enrollCourse = async (courseId: number) => {
    const { error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
      });

    if (!error) {
      await fetchEnrollments(user.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HCS Training Platform</h1>
          <p className="text-xl text-gray-600">
            Master HCS systems with interactive training courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const enrollment = enrollments.find(e => e.course_id === course.id);
            const isEnrolled = !!enrollment;
            const completionPercent = enrollment?.completion_percent || 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-4xl">
                  {course.icon}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {course.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {course.duration_hours}h
                      </span>
                    </div>
                  </div>

                  {isEnrolled && (
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Progress</span>
                        <span className="text-sm font-bold text-blue-600">{completionPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${completionPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {isEnrolled ? (
                    <Link
                      href={`/training/${course.slug}`}
                      className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={() => enrollCourse(course.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
