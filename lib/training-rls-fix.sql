-- Training RLS fix — run once in your Supabase SQL Editor.
-- Safe to re-run (drops policy first).

-- REQUIRED: lesson_content has RLS enabled in training-schema.sql but no
-- policy was ever created, which means deny-all — logged-in users get EMPTY
-- lesson bodies. This adds the missing read policy so lesson content displays,
-- matching the "viewable by everyone" pattern already used for lessons.
DROP POLICY IF EXISTS "Lesson content is viewable by everyone" ON lesson_content;
CREATE POLICY "Lesson content is viewable by everyone" ON lesson_content
  FOR SELECT USING (true);

-- RECOMMENDED (security): these four tables were never protected. Without RLS,
-- the public anon key can read/write them. Enable RLS and add sensible
-- policies. Remove this section if you are not using quizzes/certificates yet.
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Quizzes are viewable by everyone" ON quizzes;
CREATE POLICY "Quizzes are viewable by everyone" ON quizzes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Quiz questions are viewable by everyone" ON quiz_questions;
CREATE POLICY "Quiz questions are viewable by everyone" ON quiz_questions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users see their own quiz attempts" ON quiz_attempts;
CREATE POLICY "Users see their own quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users insert their own quiz attempts" ON quiz_attempts;
CREATE POLICY "Users insert their own quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users see their own certificates" ON certificates;
CREATE POLICY "Users see their own certificates" ON certificates
  FOR SELECT USING (auth.uid() = user_id);
