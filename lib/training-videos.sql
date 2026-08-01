-- Training videos — wire every video lesson to its Vercel Blob URL.
-- Run once in the Supabase SQL Editor, after training-courses.sql.
-- Safe to re-run: UPDATEs are idempotent; inserts use ON CONFLICT.
--
-- Blob store base: https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com

-- ---------------------------------------------------------------------------
-- 1) Point the two existing video lessons at their Blob URLs
-- ---------------------------------------------------------------------------
UPDATE lessons
SET video_url = 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Med%20Order%20Entry.mp4',
    content_type = 'video', is_published = TRUE
WHERE slug = 'medication-ordering';

UPDATE lessons
SET video_url = 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Web%20-%20Provider/Patient%20Worklist.Esign%20Orders.Labs.mp4',
    content_type = 'video', is_published = TRUE
WHERE slug = 'patient-worklist-video';

-- ---------------------------------------------------------------------------
-- 2) A "Video Library" module in each of the two provider courses
-- ---------------------------------------------------------------------------
INSERT INTO course_modules (course_id, slug, title, description, module_order)
SELECT c.id, m.slug, m.title, m.description, m.module_order
FROM (VALUES
  ('hcs-provider-training',     'video-library', 'Video Library', 'Recorded HCS provider training videos', 4),
  ('hcs-web-provider-platform', 'video-library', 'Video Library', 'Recorded HCS web provider training videos', 4)
) AS m(course_slug, slug, title, description, module_order)
JOIN courses c ON c.slug = m.course_slug
ON CONFLICT (course_id, slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 3) Video lessons — HCS Provider Training → Video Library
-- ---------------------------------------------------------------------------
INSERT INTO lessons (module_id, slug, title, lesson_order, content_type, video_url, is_published)
SELECT m.id, l.slug, l.title, l.lesson_order, 'video', l.video_url, TRUE
FROM (VALUES
  ('admission-med-reconciliation', 'Admission Medication Reconciliation Process', 1, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Admission%20Medication%20Reconciliation%20Process.mp4'),
  ('antibiotic-review-reorder',    'Antibiotic Review and Reorder',                2, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Antibiotic%20Review%20and%20Reorder%20Med.mp4'),
  ('discharge-med-reconciliation', 'Discharge Medication Reconciliation Process',  3, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Discharge%20Medication%20Reconciliation%20Process.mp4'),
  ('entering-medical-consult',     'Entering a Medical Consult',                   4, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Entering%20a%20medical%20consult.mp4'),
  ('edit-discontinue-med',         'How to Edit or Discontinue a Med',             5, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/How%20to%20edit%20or%20discontinue%20a%20med.mp4'),
  ('provider-focus',               'Provider Focus',                               6, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Provider%20Focus.mp4'),
  ('provider-hcs-web-training',    'Provider HCS Web Training',                    7, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Provider%20HCS%20Web%20Training.mp4'),
  ('patient-list-setup',           'Setting Up My Patient List & Work List',       8, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Setting%20up%20My%20Patient%20List%20and%20My%20Patient%20Work%20List.mp4'),
  ('signing-orders-labs',          'Signing Orders and Reviewing Labs',            9, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Provider/Signing%20Orders%20and%20Reviewing%20Labs.mp4')
) AS l(slug, title, lesson_order, video_url)
JOIN course_modules m
  ON m.slug = 'video-library'
 AND m.course_id = (SELECT id FROM courses WHERE slug = 'hcs-provider-training')
ON CONFLICT (module_id, slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 4) Video lessons — HCS Web Provider Platform → Video Library
-- ---------------------------------------------------------------------------
INSERT INTO lessons (module_id, slug, title, lesson_order, content_type, video_url, is_published)
SELECT m.id, l.slug, l.title, l.lesson_order, 'video', l.video_url, TRUE
FROM (VALUES
  ('physicians-documentation',  'Physicians Documentation',   1, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Web%20-%20Provider/Physicians%20Documentation%20Video.MP4'),
  ('web-provider-hcs-training', 'Provider HCS Web Training',  2, 'https://fjaqelxv4mgcfnqc.public.blob.vercel-storage.com/HCS%20Web%20-%20Provider/Provider%20HCS%20Web%20Training.mp4')
) AS l(slug, title, lesson_order, video_url)
JOIN course_modules m
  ON m.slug = 'video-library'
 AND m.course_id = (SELECT id FROM courses WHERE slug = 'hcs-web-provider-platform')
ON CONFLICT (module_id, slug) DO NOTHING;
