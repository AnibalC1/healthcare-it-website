#!/usr/bin/env node

/**
 * HCS Content Ingestion Script
 * Processes PDF files from HCS folders and loads them into Supabase
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Course definitions
const COURSES = [
  {
    slug: 'hcs-it-documents',
    title: 'HCS IT Documents',
    description: 'IT Support & System Administration guides for HCS systems',
    difficulty: 'intermediate',
    duration_hours: 5,
    icon: '🖥️',
    order: 1,
    folder: '/workspace/extra/usb/HCS IT Documents',
    modules: [
      {
        slug: 'hardware-configuration',
        title: 'Hardware & Configuration',
        description: 'Barcode scanners and device setup',
        order: 1,
        lessons: [
          {
            slug: 'barcode-scanner-setup',
            title: 'Barcode Scanner Programming',
            file: 'HCS BARCODE SCANNER PROGRAMMING.pdf',
            order: 1,
            type: 'html',
          },
        ],
      },
      {
        slug: 'system-administration',
        title: 'System Administration',
        description: 'Troubleshooting, export/import, and file management',
        order: 2,
        lessons: [
          {
            slug: 'troubleshooting-guide',
            title: 'Troubleshooting Guide',
            file: 'HCS- Troubleshooting Guide 2020.pdf',
            order: 1,
            type: 'html',
          },
          {
            slug: 'export-import',
            title: 'Exporting and Importing Data',
            file: 'Exporting and Importing Cheat Sheet.pdf',
            order: 2,
            type: 'html',
          },
          {
            slug: 'file-upload',
            title: 'Uploading Files into HCS',
            file: 'Quick Tip on Uploading Files into HCS.pdf',
            order: 3,
            type: 'html',
          },
        ],
      },
    ],
  },
  {
    slug: 'hcs-provider-training',
    title: 'HCS Provider Training',
    description: 'Clinical provider guides for medication management and order entry',
    difficulty: 'intermediate',
    duration_hours: 15,
    icon: '👨‍⚕️',
    order: 2,
    folder: '/workspace/extra/usb/HCS Provider',
    modules: [
      {
        slug: 'provider-manual',
        title: 'Provider Manual',
        description: 'Comprehensive guide to HCS provider workflows',
        order: 1,
        lessons: [
          {
            slug: 'provider-manual-2021',
            title: 'Provider Manual 2021',
            file: 'HCS- Provider Manual 2021.pdf',
            order: 1,
            type: 'html',
          },
        ],
      },
      {
        slug: 'medication-management',
        title: 'Medication Management',
        description: 'Medication reconciliation and order entry workflows',
        order: 2,
        lessons: [
          {
            slug: 'medication-reconciliation',
            title: 'Medication Reconciliation Process',
            description: 'Learn the admission and discharge medication reconciliation workflows',
            file: 'HCS - Discharge Medication Reconciliation .pdf',
            order: 1,
            type: 'html',
            video_url: null,
          },
          {
            slug: 'medication-ordering',
            title: 'Medication Order Entry',
            description: 'Complete guide to entering and managing medication orders',
            file: null,
            order: 2,
            type: 'video',
            video_url: '/hcs-content/videos/Med Order Entry.mp4',
            duration_minutes: 8,
          },
        ],
      },
      {
        slug: 'eprescribe-credentials',
        title: 'ePrescribe & Credentials',
        description: 'Registration and credentialing for electronic prescribing',
        order: 3,
        lessons: [
          {
            slug: 'eprescribe-registration',
            title: 'EPCS Registration Guide 2024',
            file: 'HCS EPCS Registration Guide 2024.pdf',
            order: 1,
            type: 'html',
          },
          {
            slug: 'adding-credentials',
            title: 'Adding Credentials and Staff Registration',
            file: 'HCS - Adding Credentials and Registering staff for ePrescribe.pdf',
            order: 2,
            type: 'html',
          },
        ],
      },
    ],
  },
  {
    slug: 'hcs-web-provider-platform',
    title: 'HCS Web Provider Platform',
    description: 'Web-based platform training for providers',
    difficulty: 'intermediate',
    duration_hours: 12,
    icon: '🌐',
    order: 3,
    folder: '/workspace/extra/usb/HCS Web - Provider',
    modules: [
      {
        slug: 'web-platform-guide',
        title: 'Web Platform Guide',
        description: 'Complete guide to the HCS web provider platform',
        order: 1,
        lessons: [
          {
            slug: 'web-provider-manual-2026',
            title: 'HCS Web Provider Manual 2026',
            file: 'HCS Web - Provider Manual 2026.pdf',
            order: 1,
            type: 'html',
          },
        ],
      },
      {
        slug: 'patient-worklist-management',
        title: 'Patient Worklist Management',
        description: 'Managing patient worklists and notifications',
        order: 2,
        lessons: [
          {
            slug: 'patient-worklist-video',
            title: 'Patient Worklist, E-sign Orders, and Labs',
            description: 'Video guide to managing patient worklist and processing orders',
            file: null,
            order: 1,
            type: 'video',
            video_url: '/hcs-content/videos/Patient Worklist.Esign Orders.Labs.mp4',
            duration_minutes: 14,
          },
        ],
      },
      {
        slug: 'order-entry-labs',
        title: 'Order Entry & Labs',
        description: 'Lab ordering and complex order workflows',
        order: 3,
        lessons: [
          {
            slug: 'labcorp-order-entry',
            title: 'LabCorp Order Entry',
            file: 'HCS - LabCorp Order Entry.pdf',
            order: 1,
            type: 'html',
          },
        ],
      },
    ],
  },
];

async function extractPdfText(filePath) {
  try {
    // For now, return a placeholder
    // In production, you would use pdf-parse or similar
    // This is a simplified version - you'd need to implement actual PDF extraction
    const fileName = path.basename(filePath);
    return `<div class="prose">
      <h2>${fileName}</h2>
      <p>Content from: ${filePath}</p>
      <p>Note: In production, actual PDF content would be extracted and formatted here.</p>
    </div>`;
  } catch (error) {
    console.error(`Error extracting PDF ${filePath}:`, error);
    return null;
  }
}

async function ingestCourses() {
  console.log('Starting HCS content ingestion...');

  for (const course of COURSES) {
    console.log(`\nProcessing course: ${course.title}`);

    // Create course
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .upsert({
        slug: course.slug,
        title: course.title,
        description: course.description,
        difficulty: course.difficulty,
        duration_hours: course.duration_hours,
        icon: course.icon,
        course_order: course.order,
      })
      .select()
      .single();

    if (courseError) {
      console.error(`Error creating course ${course.slug}:`, courseError);
      continue;
    }

    console.log(`✓ Created course: ${course.title} (ID: ${courseData.id})`);

    // Process modules
    for (const module of course.modules) {
      console.log(`  Processing module: ${module.title}`);

      const { data: moduleData, error: moduleError } = await supabase
        .from('course_modules')
        .upsert({
          course_id: courseData.id,
          slug: module.slug,
          title: module.title,
          description: module.description,
          module_order: module.order,
        })
        .select()
        .single();

      if (moduleError) {
        console.error(`  Error creating module ${module.slug}:`, moduleError);
        continue;
      }

      console.log(`  ✓ Created module: ${module.title}`);

      // Process lessons
      for (const lesson of module.lessons) {
        console.log(`    Processing lesson: ${lesson.title}`);

        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .upsert({
            module_id: moduleData.id,
            slug: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            content_type: lesson.type,
            lesson_order: lesson.order,
            video_url: lesson.video_url || null,
            duration_minutes: lesson.duration_minutes || null,
            is_published: true,
          })
          .select()
          .single();

        if (lessonError) {
          console.error(`    Error creating lesson ${lesson.slug}:`, lessonError);
          continue;
        }

        // Extract and store HTML content for non-video lessons
        if (lesson.type === 'html' && lesson.file) {
          const filePath = path.join(course.folder, lesson.file);

          if (fs.existsSync(filePath)) {
            const htmlContent = await extractPdfText(filePath);

            if (htmlContent) {
              const { error: contentError } = await supabase
                .from('lesson_content')
                .upsert({
                  lesson_id: lessonData.id,
                  html_content: htmlContent,
                  source_file: lesson.file,
                });

              if (contentError) {
                console.error(`    Error storing content: ${contentError}`);
              } else {
                console.log(`    ✓ Stored content for: ${lesson.title}`);
              }
            }
          } else {
            console.warn(`    ⚠️  File not found: ${filePath}`);
          }
        } else {
          console.log(`    ✓ Created lesson: ${lesson.title}`);
        }
      }
    }
  }

  console.log('\n✓ Ingestion complete!');
}

// Run ingestion
ingestCourses().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
