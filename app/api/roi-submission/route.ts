import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { practiceName, email, practiceSize, currentITSpend, downtimeHours, securityIncidents, complianceStatus, results } = body;

    // Store ROI calculation submission
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name: 'ROI Calculator Lead',
        email,
        phone: '',
        practice_name: practiceName,
        practice_size: practiceSize,
        message: `ROI Calculator Submission:
- Current IT Spend: $${currentITSpend}/month
- Downtime Hours (annual): ${downtimeHours}
- Security Incidents: ${securityIncidents}
- Compliance Status: ${complianceStatus}

CALCULATED RESULTS:
- Total Annual IT Risk Cost: $${results.totalAnnualCost}
- Downtime Cost: $${results.downtimeCost}
- Security Cost: $${results.securityCost}
- Compliance Risk: $${results.complianceRisk}
- Inefficiency Cost: $${results.inefficiencyCost}
- Recommended Package: ${results.recommendedPackage}
- Package Cost: $${results.packageCost}
- Potential Savings: $${results.potentialSavings}
- ROI: ${results.roiPercentage}%`,
        source_page: '/roi-calculator',
        status: 'new',
      })
      .select();

    if (error) throw error;

    // Log audit event
    if (data && data[0]) {
      await supabaseAdmin.rpc('log_audit_event', {
        p_action: 'roi_calculator_submission',
        p_resource_type: 'contact_submission',
        p_resource_id: data[0].id,
        p_metadata: { email, practiceName, results },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('ROI submission error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
