import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// HIPAA-compliant contact form submission endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, practiceName, practiceSize, message } = body;

    // Validation
    if (!name || !email || !phone || !practiceName || !practiceSize || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // PHI detection patterns (basic)
    const phiPatterns = [
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
      /\b(patient|diagnosis|treatment|medication|prescription)\b/i,
      /\bMRN\s*#?\s*\d+/i, // Medical Record Number
    ];

    let phiDetected = false;
    let phiPattern = '';

    for (const pattern of phiPatterns) {
      if (pattern.test(message) || pattern.test(name)) {
        phiDetected = true;
        phiPattern = pattern.source;
        break;
      }
    }

    // If PHI detected, reject submission
    if (phiDetected) {
      // Log the attempt (without storing the actual PHI)
      await supabaseAdmin.from('audit_log').insert({
        action: 'phi_detected_in_form',
        resource_type: 'contact_submission',
        metadata: {
          email,
          phi_pattern: phiPattern,
        },
      });

      return NextResponse.json(
        {
          error: 'Your message appears to contain protected health information (PHI). Please remove any patient names, medical records, diagnoses, or treatment information and resubmit.',
        },
        { status: 400 }
      );
    }

    // Get client metadata
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const sourcePage = request.headers.get('referer') || '/contact';

    // Insert into Supabase (encrypted at rest)
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        practice_name: practiceName,
        practice_size: practiceSize,
        message,
        ip_address: ipAddress,
        user_agent: userAgent,
        source_page: sourcePage,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      );
    }

    // Log audit event
    await supabaseAdmin.from('audit_log').insert({
      action: 'contact_form_submitted',
      resource_type: 'contact_submission',
      resource_id: data.id,
      ip_address: ipAddress,
      user_agent: userAgent,
      metadata: {
        email,
        practice_name: practiceName,
      },
    });

    // TODO: Send notification email to Anibal
    // await sendEmail({
    //   to: 'info@healthcareitsolutions.com',
    //   subject: `New Contact Form: ${practiceName}`,
    //   body: `...`,
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us. We will respond within 24-48 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
