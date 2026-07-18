import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// System prompt for DeepSeek AI chat
const SYSTEM_PROMPT = `You are a helpful AI assistant for Healthcare IT Solutions, a HIPAA-compliant IT support company serving medical and dental practices in Central Massachusetts.

About the Company:
- Owner: Anibal Cabral (8+ years healthcare IT experience from HRI Hospital)
- Services: IT support, HIPAA compliance, network security, equipment management
- Service Area: Fitchburg, Leominster, Gardner, and Central Massachusetts
- Packages: Bronze ($800/mo), Silver ($1,200/mo), Gold ($1,800/mo)
- Special offer: First 3 clients get 25% off for 3 months
- Free IT security assessment available

Your role:
1. Answer questions about IT services, HIPAA compliance, pricing, and scheduling
2. Help users book the free assessment
3. Be professional, knowledgeable, and helpful
4. NEVER ask for or discuss patient information, medical records, or PHI
5. If user mentions PHI, redirect them to general IT questions

If asked to schedule an assessment, provide this link: /assessment

Keep responses concise (2-3 sentences) and actionable.`;

// PHI detection patterns
const PHI_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/, // SSN
  /\bMRN\s*#?\s*\d+/i, // Medical Record Number
  /\b(patient|diagnosis|treatment|medication|prescription|symptoms?|condition)\b/i,
  /\b(diabetes|cancer|HIV|AIDS|surgery|operation)\b/i,
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Check for PHI in user message
    let phiDetected = false;
    let phiPattern = '';

    for (const pattern of PHI_PATTERNS) {
      if (pattern.test(message)) {
        phiDetected = true;
        phiPattern = pattern.source;
        break;
      }
    }

    if (phiDetected) {
      // Log PHI detection (without storing the actual message)
      const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
      const sessionId = request.headers.get('x-session-id') || `session-${Date.now()}`;

      await supabaseAdmin.from('chat_interactions').insert({
        session_id: sessionId,
        user_message: '[PHI DETECTED - MESSAGE REDACTED]',
        assistant_response: 'PHI detected, message rejected',
        phi_detected: true,
        phi_pattern: phiPattern,
        ip_address: ipAddress,
      });

      return NextResponse.json(
        {
          response: '⚠️ For your privacy and HIPAA compliance, please do not include patient names, medical records, diagnoses, or treatment details. How else can I help you with our IT services?',
          phi_detected: true,
        },
        { status: 200 }
      );
    }

    // Call DeepSeek API
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-5).map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!deepseekResponse.ok) {
      console.error('DeepSeek API error:', await deepseekResponse.text());
      throw new Error('DeepSeek API request failed');
    }

    const data = await deepseekResponse.json();
    const assistantMessage = data.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please contact us at (555) 123-4567.';

    // Log interaction (7-day auto-delete per schema)
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
    const sessionId = request.headers.get('x-session-id') || `session-${Date.now()}`;

    await supabaseAdmin.from('chat_interactions').insert({
      session_id: sessionId,
      user_message: message.substring(0, 500), // Limit length for storage
      assistant_response: assistantMessage.substring(0, 500),
      phi_detected: false,
      ip_address: ipAddress,
    });

    return NextResponse.json({
      response: assistantMessage,
      phi_detected: false,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
