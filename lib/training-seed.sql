-- HCS Training Platform — sample seed data
-- Run this in your Supabase SQL editor AFTER training-schema.sql.
-- Safe to re-run: uses ON CONFLICT so it won't create duplicates.

-- ---------------------------------------------------------------------------
-- Courses
-- ---------------------------------------------------------------------------
INSERT INTO courses (slug, title, description, course_order, icon, duration_hours, difficulty)
VALUES
  ('hipaa-security-awareness',
   'HIPAA Security Awareness',
   'The annual HIPAA security awareness training every workforce member needs — PHI handling, phishing, passwords, and breach response.',
   1, '🛡️', 1.5, 'beginner'),
  ('ransomware-defense',
   'Ransomware Defense for Practices',
   'Recognize, avoid, and respond to the ransomware attacks that target healthcare offices.',
   2, '🔒', 1.0, 'intermediate')
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Modules (referenced to their course by slug)
-- ---------------------------------------------------------------------------
INSERT INTO course_modules (course_id, slug, title, description, module_order)
SELECT c.id, m.slug, m.title, m.description, m.module_order
FROM (VALUES
  ('hipaa-security-awareness', 'foundations', 'HIPAA Foundations', 'What HIPAA requires and why it matters.', 1),
  ('hipaa-security-awareness', 'everyday-threats', 'Everyday Threats', 'The attacks that target medical staff.', 2),
  ('ransomware-defense', 'ransomware-basics', 'Ransomware Basics', 'How ransomware works and spreads.', 1)
) AS m(course_slug, slug, title, description, module_order)
JOIN courses c ON c.slug = m.course_slug
ON CONFLICT (course_id, slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Lessons (referenced to their module by slug)
-- ---------------------------------------------------------------------------
INSERT INTO lessons (module_id, slug, title, description, lesson_order, content_type, duration_minutes, is_published)
SELECT m.id, l.slug, l.title, l.description, l.lesson_order, l.content_type, l.duration_minutes, TRUE
FROM (VALUES
  ('foundations', 'what-is-phi', 'What Is PHI?', 'Identifying protected health information.', 1, 'html', 10),
  ('foundations', 'the-security-rule', 'The HIPAA Security Rule', 'Administrative, physical, and technical safeguards.', 2, 'html', 12),
  ('everyday-threats', 'spotting-phishing', 'Spotting Phishing Emails', 'Red flags in emails targeting your practice.', 1, 'html', 10),
  ('ransomware-basics', 'how-ransomware-spreads', 'How Ransomware Spreads', 'Common infection paths in medical offices.', 1, 'html', 10)
) AS l(module_slug, slug, title, description, lesson_order, content_type, duration_minutes)
JOIN course_modules m ON m.slug = l.module_slug
ON CONFLICT (module_id, slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Lesson content (HTML shown on the lesson page)
-- ---------------------------------------------------------------------------
INSERT INTO lesson_content (lesson_id, html_content, source_file)
SELECT ls.id, v.html_content, 'seed'
FROM (VALUES
  ('what-is-phi',
   '<h2>What Is PHI?</h2><p>Protected Health Information (PHI) is any information that can identify a patient and relates to their health, care, or payment for care — names, dates, medical record numbers, and more.</p><p>Under HIPAA, PHI must be protected whether it is spoken, written, or electronic.</p>'),
  ('the-security-rule',
   '<h2>The HIPAA Security Rule</h2><p>The Security Rule requires three kinds of safeguards for electronic PHI:</p><ul><li><strong>Administrative</strong> — policies, training, and risk analysis.</li><li><strong>Physical</strong> — locked devices and facility access controls.</li><li><strong>Technical</strong> — encryption, access controls, and audit logs.</li></ul>'),
  ('spotting-phishing',
   '<h2>Spotting Phishing Emails</h2><p>Watch for urgency, mismatched sender addresses, unexpected attachments, and links that do not match the real domain. When in doubt, verify through a known phone number — never the contact info in the email.</p>'),
  ('how-ransomware-spreads',
   '<h2>How Ransomware Spreads</h2><p>Ransomware most often enters through phishing attachments, compromised remote-access tools, and unpatched software. One infected workstation can encrypt shared drives across the whole practice.</p>')
) AS v(lesson_slug, html_content)
JOIN lessons ls ON ls.slug = v.lesson_slug
WHERE NOT EXISTS (
  SELECT 1 FROM lesson_content lc WHERE lc.lesson_id = ls.id
);
