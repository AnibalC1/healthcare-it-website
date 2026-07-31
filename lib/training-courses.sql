-- HCS Training Platform — real course catalog
-- Mirrors the course/module/lesson structure defined in
-- scripts/ingest-hcs-content.js, so the 3 actual HCS courses appear in
-- /training without needing to run the Node ingestion (which requires the
-- source PDFs and the pdf-parse package).
--
-- Run this in your Supabase SQL Editor AFTER training-schema.sql.
-- Safe to re-run: uses ON CONFLICT so it won't create duplicates.
--
-- NOTE: This loads the courses, modules and lessons. The full lesson text
-- comes from the source PDFs via scripts/ingest-hcs-content.js; until that
-- is run, HTML lessons show a short placeholder pointing at the source file.

-- ---------------------------------------------------------------------------
-- Courses
-- ---------------------------------------------------------------------------
INSERT INTO courses (slug, title, description, course_order, icon, duration_hours, difficulty)
VALUES
  ('hcs-it-documents',
   'HCS IT Documents',
   'IT Support & System Administration guides for HCS systems',
   1, '🖥️', 5, 'intermediate'),
  ('hcs-provider-training',
   'HCS Provider Training',
   'Clinical provider guides for medication management and order entry',
   2, '👨‍⚕️', 15, 'intermediate'),
  ('hcs-web-provider-platform',
   'HCS Web Provider Platform',
   'Web-based platform training for providers',
   3, '🌐', 12, 'intermediate')
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Modules
-- ---------------------------------------------------------------------------
INSERT INTO course_modules (course_id, slug, title, description, module_order)
SELECT c.id, m.slug, m.title, m.description, m.module_order
FROM (VALUES
  ('hcs-it-documents',          'hardware-configuration',      'Hardware & Configuration',      'Barcode scanners and device setup', 1),
  ('hcs-it-documents',          'system-administration',       'System Administration',         'Troubleshooting, export/import, and file management', 2),
  ('hcs-provider-training',     'provider-manual',             'Provider Manual',               'Comprehensive guide to HCS provider workflows', 1),
  ('hcs-provider-training',     'medication-management',       'Medication Management',         'Medication reconciliation and order entry workflows', 2),
  ('hcs-provider-training',     'eprescribe-credentials',      'ePrescribe & Credentials',      'Registration and credentialing for electronic prescribing', 3),
  ('hcs-web-provider-platform', 'web-platform-guide',          'Web Platform Guide',            'Complete guide to the HCS web provider platform', 1),
  ('hcs-web-provider-platform', 'patient-worklist-management', 'Patient Worklist Management',   'Managing patient worklists and notifications', 2),
  ('hcs-web-provider-platform', 'order-entry-labs',            'Order Entry & Labs',            'Lab ordering and complex order workflows', 3)
) AS m(course_slug, slug, title, description, module_order)
JOIN courses c ON c.slug = m.course_slug
ON CONFLICT (course_id, slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Lessons
-- ---------------------------------------------------------------------------
INSERT INTO lessons (module_id, slug, title, description, lesson_order, content_type, video_url, duration_minutes, is_published)
SELECT m.id, l.slug, l.title, l.description, l.lesson_order, l.content_type, l.video_url, l.duration_minutes, TRUE
FROM (VALUES
  -- HCS IT Documents
  ('hardware-configuration',      'barcode-scanner-setup',   'Barcode Scanner Programming',              NULL,                                                                          1, 'html',  NULL,                                                        NULL),
  ('system-administration',       'troubleshooting-guide',   'Troubleshooting Guide',                    NULL,                                                                          1, 'html',  NULL,                                                        NULL),
  ('system-administration',       'export-import',           'Exporting and Importing Data',             NULL,                                                                          2, 'html',  NULL,                                                        NULL),
  ('system-administration',       'file-upload',             'Uploading Files into HCS',                 NULL,                                                                          3, 'html',  NULL,                                                        NULL),
  -- HCS Provider Training
  ('provider-manual',             'provider-manual-2021',    'Provider Manual 2021',                     NULL,                                                                          1, 'html',  NULL,                                                        NULL),
  ('medication-management',       'medication-reconciliation','Medication Reconciliation Process',       'Learn the admission and discharge medication reconciliation workflows',        1, 'html',  NULL,                                                        NULL),
  ('medication-management',       'medication-ordering',     'Medication Order Entry',                   'Complete guide to entering and managing medication orders',                    2, 'video', '/hcs-content/videos/Med Order Entry.mp4',                    8),
  ('eprescribe-credentials',      'eprescribe-registration', 'EPCS Registration Guide 2024',             NULL,                                                                          1, 'html',  NULL,                                                        NULL),
  ('eprescribe-credentials',      'adding-credentials',      'Adding Credentials and Staff Registration',NULL,                                                                          2, 'html',  NULL,                                                        NULL),
  -- HCS Web Provider Platform
  ('web-platform-guide',          'web-provider-manual-2026','HCS Web Provider Manual 2026',             NULL,                                                                          1, 'html',  NULL,                                                        NULL),
  ('patient-worklist-management', 'patient-worklist-video',  'Patient Worklist, E-sign Orders, and Labs','Video guide to managing patient worklist and processing orders',               1, 'video', '/hcs-content/videos/Patient Worklist.Esign Orders.Labs.mp4', 14),
  ('order-entry-labs',            'labcorp-order-entry',     'LabCorp Order Entry',                      NULL,                                                                          1, 'html',  NULL,                                                        NULL)
) AS l(module_slug, slug, title, description, lesson_order, content_type, video_url, duration_minutes)
JOIN course_modules m ON m.slug = l.module_slug
ON CONFLICT (module_id, slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Placeholder lesson content for HTML lessons (until PDF ingestion runs)
-- ---------------------------------------------------------------------------
INSERT INTO lesson_content (lesson_id, html_content, source_file)
SELECT ls.id,
       '<div class="prose prose-sm max-w-none"><h2 class="text-2xl font-bold mb-4">' || ls.title ||
       '</h2><p class="text-gray-700">The full content for this lesson is imported from the source HCS document. ' ||
       'Run <code>scripts/ingest-hcs-content.js</code> with the source PDFs available to load the complete document text.</p></div>',
       'pending-ingestion'
FROM lessons ls
WHERE ls.content_type = 'html'
  AND NOT EXISTS (SELECT 1 FROM lesson_content lc WHERE lc.lesson_id = ls.id);
