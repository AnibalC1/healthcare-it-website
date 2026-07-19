import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { practiceName, email, score, answers, recommendations } = body;

    // Count "No" answers
    const noAnswers = Object.values(answers).filter((a) => !a).length;

    // Store health check submission
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name: 'IT Health Check Lead',
        email,
        phone: '',
        practice_name: practiceName,
        practice_size: '',
        message: `IT Health Check Submission:
Security Score: ${score}%
Failed Checks: ${noAnswers}/15

CRITICAL AREAS:
${recommendations.length > 0 ? recommendations.map((r: string) => `- ${r.toUpperCase()}`).join('\n') : '- None (all areas scoring well)'}

DETAILED ANSWERS:
${Object.entries(answers).map(([q, a]) => `${q}: ${a ? 'YES' : 'NO'}`).join('\n')}`,
        source_page: '/it-health-check',
        status: 'new',
      });

    if (error) throw error;

    // Log audit event
    await supabaseAdmin.rpc('log_audit_event', {
      p_action: 'health_check_submission',
      p_resource_type: 'contact_submission',
      p_resource_id: data?.[0]?.id,
      p_metadata: { email, practiceName, score, recommendations },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Health check submission error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
