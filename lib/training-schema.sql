-- HCS Training Platform Schema

-- Courses table
CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  course_order INTEGER NOT NULL,
  icon TEXT,
  duration_hours FLOAT,
  difficulty TEXT DEFAULT 'intermediate' -- beginner, intermediate, advanced
);

-- Course modules/sections
CREATE TABLE course_modules (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  module_order INTEGER NOT NULL,
  UNIQUE(course_id, slug)
);

-- Lessons (individual lessons within a module)
CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  module_id BIGINT REFERENCES course_modules(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  lesson_order INTEGER NOT NULL,
  content_type TEXT NOT NULL, -- 'html', 'video', 'quiz'
  content_url TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  is_published BOOLEAN DEFAULT FALSE,
  UNIQUE(module_id, slug)
);

-- Lesson content (HTML from converted PDFs)
CREATE TABLE lesson_content (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  html_content TEXT NOT NULL,
  source_file TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percent INTEGER DEFAULT 0,
  video_watched_percent INTEGER,
  UNIQUE(user_id, lesson_id)
);

-- Course enrollment
CREATE TABLE course_enrollments (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  completion_percent INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Quizzes (if any)
CREATE TABLE quizzes (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  passing_score INTEGER DEFAULT 70
);

-- Quiz questions
CREATE TABLE quiz_questions (
  id BIGSERIAL PRIMARY KEY,
  quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
  question_order INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice', -- multiple_choice, true_false, short_answer
  options JSONB, -- [{text: "option", is_correct: true}]
  explanation TEXT
);

-- User quiz attempts
CREATE TABLE quiz_attempts (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER,
  passed BOOLEAN,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Certificates of completion
CREATE TABLE certificates (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_number TEXT UNIQUE NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies (courses are public for view, but progress is user-specific)
CREATE POLICY "Courses are viewable by everyone" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Modules are viewable by everyone" ON course_modules
  FOR SELECT USING (true);

CREATE POLICY "Lessons are viewable by enrolled users" ON lessons
  FOR SELECT USING (true);

CREATE POLICY "Users can only see their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only see their own enrollments" ON course_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON course_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_lessons_module ON lessons(module_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX idx_certificates_user ON certificates(user_id);

