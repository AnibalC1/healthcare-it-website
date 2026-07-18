-- Healthcare IT Solutions - Supabase Database Schema
-- HIPAA-compliant schema for contact forms, assessments, and leads

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  practice_name TEXT NOT NULL,
  practice_size TEXT NOT NULL,

  -- Message (encrypted at rest via Supabase)
  message TEXT NOT NULL,

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  source_page TEXT,

  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  assigned_to TEXT,
  notes TEXT,

  -- Audit trail
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Assessment Bookings Table (for Cal.com integration)
CREATE TABLE IF NOT EXISTS assessment_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Booking Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  practice_name TEXT NOT NULL,
  practice_size TEXT,

  -- Scheduling
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),

  -- Cal.com integration
  calcom_booking_id TEXT,
  calcom_event_id TEXT,

  -- Follow-up
  assessment_completed BOOLEAN DEFAULT FALSE,
  report_sent BOOLEAN DEFAULT FALSE,
  proposal_sent BOOLEAN DEFAULT FALSE,

  -- Notes
  notes TEXT,

  -- Audit trail
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Interactions Table (for DeepSeek AI chat)
CREATE TABLE IF NOT EXISTS chat_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Session tracking
  session_id TEXT NOT NULL,

  -- Message content
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,

  -- PHI detection flags
  phi_detected BOOLEAN DEFAULT FALSE,
  phi_pattern TEXT, -- What pattern triggered the detection

  -- Metadata
  ip_address INET,
  user_agent TEXT,

  -- Auto-deletion (7-day retention per HIPAA mitigation)
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days'
);

-- Audit Log Table (HIPAA requirement)
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- What happened
  action TEXT NOT NULL, -- e.g., 'contact_form_submitted', 'data_accessed', 'data_deleted'
  resource_type TEXT NOT NULL, -- e.g., 'contact_submission', 'assessment_booking'
  resource_id UUID,

  -- Who did it
  user_id TEXT, -- If authenticated user
  ip_address INET,
  user_agent TEXT,

  -- Additional context
  metadata JSONB
);

-- Indexes for performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

CREATE INDEX idx_assessment_bookings_scheduled_date ON assessment_bookings(scheduled_date);
CREATE INDEX idx_assessment_bookings_status ON assessment_bookings(status);

CREATE INDEX idx_chat_interactions_session_id ON chat_interactions(session_id);
CREATE INDEX idx_chat_interactions_expires_at ON chat_interactions(expires_at);

CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);
CREATE INDEX idx_audit_log_action ON audit_log(action);

-- Row Level Security (RLS) Policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can access data (no public access)
CREATE POLICY "Service role only" ON contact_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON assessment_bookings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON chat_interactions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON audit_log FOR ALL USING (auth.role() = 'service_role');

-- Function to auto-delete expired chat interactions (7-day retention)
CREATE OR REPLACE FUNCTION delete_expired_chat_interactions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM chat_interactions WHERE expires_at < NOW();
END;
$$;

-- Schedule daily cleanup (run via pg_cron or external cron)
-- SELECT cron.schedule('delete-expired-chats', '0 2 * * *', 'SELECT delete_expired_chat_interactions()');

-- Function to log audit events
CREATE OR REPLACE FUNCTION log_audit_event(
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_audit_id UUID;
BEGIN
  INSERT INTO audit_log (action, resource_type, resource_id, metadata)
  VALUES (p_action, p_resource_type, p_resource_id, p_metadata)
  RETURNING id INTO v_audit_id;

  RETURN v_audit_id;
END;
$$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessment_bookings_updated_at
  BEFORE UPDATE ON assessment_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
