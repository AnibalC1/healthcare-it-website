-- HCS Web Provider — document lessons (converted from Word to HTML).
-- The HTML lives as static files under /public/training-docs and is referenced
-- by lessons.content_url; the lesson page fetches and renders it. This keeps
-- large document HTML out of the database.
--
-- Run once in the Supabase SQL Editor, after training-courses.sql.
-- Safe to re-run: ON CONFLICT prevents duplicates.

-- Module to hold the reference documents
INSERT INTO course_modules (course_id, slug, title, description, module_order)
SELECT c.id, 'reference-documents', 'Provider Reference Documents',
       'HCS Web provider guides, cheat sheets, and reference materials', 5
FROM courses c
WHERE c.slug = 'hcs-web-provider-platform'
ON CONFLICT (course_id, slug) DO NOTHING;

-- Document lessons
INSERT INTO lessons (module_id, slug, title, lesson_order, content_type, content_url, is_published)
SELECT m.id, l.slug, l.title, l.lesson_order, 'html', l.content_url, TRUE
FROM (VALUES
  ('abx-stewardship',               'Antibiotic Stewardship',                       1,  '/training-docs/abx-stewardship.html'),
  ('adding-credentials',            'Adding Credentials',                           2,  '/training-docs/adding-credentials.html'),
  ('cancel-incorrect-eprescribe',   'How to Cancel an Incorrect ePrescribe',        3,  '/training-docs/cancel-incorrect-eprescribe.html'),
  ('md-nte',                        'MD - NTE',                                     4,  '/training-docs/md-nte.html'),
  ('notification-form-cheat-sheet', 'Notification Form (Worklist) Cheat Sheet',     5,  '/training-docs/notification-form-cheat-sheet.html'),
  ('provider-linked-orders',        'Provider Access to Enter Linked Orders',       6,  '/training-docs/provider-linked-orders.html'),
  ('quick-reference-physician',     'Quick Reference Tool - Physician',             7,  '/training-docs/quick-reference-physician.html'),
  ('refusing-signatures-rerouting', 'Refusing Signatures & Rerouting for e-Signing',8,  '/training-docs/refusing-signatures-rerouting.html'),
  ('trifold-admission',             'Trifold - Admission',                          9,  '/training-docs/trifold-admission.html'),
  ('trifold-discharge',             'Trifold - Provider Discharge',                 10, '/training-docs/trifold-discharge.html'),
  ('creating-patient-list',         'Creating My Patient List',                     11, '/training-docs/creating-patient-list.html')
) AS l(slug, title, lesson_order, content_url)
JOIN course_modules m
  ON m.slug = 'reference-documents'
 AND m.course_id = (SELECT id FROM courses WHERE slug = 'hcs-web-provider-platform')
ON CONFLICT (module_id, slug) DO NOTHING;
