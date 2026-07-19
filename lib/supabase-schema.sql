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

-- ====================
-- CLIENT PORTAL TABLES
-- ====================

-- Clients Table (for portal authentication and profile)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Authentication (tied to Supabase Auth)
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Practice Information
  practice_name TEXT NOT NULL,
  practice_size TEXT, -- '1-3', '4-8', '9+'
  practice_type TEXT, -- 'dental', 'medical', 'urgent-care', 'specialty'

  -- Contact Information
  primary_contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,

  -- Service Package
  service_package TEXT CHECK (service_package IN ('bronze', 'silver', 'gold')),
  monthly_rate NUMERIC(10, 2),
  contract_start_date DATE,
  contract_end_date DATE,

  -- Portal Access
  portal_enabled BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP WITH TIME ZONE,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled')),

  -- Audit
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ticket Number (human-readable)
  ticket_number TEXT NOT NULL UNIQUE,

  -- Client Reference
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Ticket Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('hardware', 'software', 'network', 'security', 'compliance', 'general')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

  -- Status Tracking
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'waiting-client', 'resolved', 'closed')),
  assigned_to TEXT,

  -- Resolution
  resolution TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  attachments JSONB, -- Array of file URLs
  internal_notes TEXT, -- Not visible to client

  -- Audit
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Invoice Number (human-readable)
  invoice_number TEXT NOT NULL UNIQUE,

  -- Client Reference
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Invoice Details
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,

  -- Line Items (JSON for flexibility)
  line_items JSONB NOT NULL, -- [{ description, quantity, rate, amount }]

  -- Amounts
  subtotal NUMERIC(10, 2) NOT NULL,
  tax NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,

  -- Payment Status
  status TEXT DEFAULT 'unpaid' CHECK (status IN ('draft', 'sent', 'unpaid', 'paid', 'overdue', 'cancelled')),
  paid_at TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,

  -- Files
  pdf_url TEXT,

  -- Notes
  notes TEXT,

  -- Audit
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance Documents Table
CREATE TABLE IF NOT EXISTS compliance_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Client Reference
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Document Details
  title TEXT NOT NULL,
  document_type TEXT CHECK (document_type IN ('hipaa-audit', 'security-assessment', 'baa', 'policy', 'certificate', 'report')),
  description TEXT,

  -- File Storage
  file_url TEXT NOT NULL, -- Supabase Storage URL
  file_size INTEGER, -- bytes
  file_type TEXT, -- 'application/pdf', etc.

  -- Validity Period
  issued_date DATE,
  expiry_date DATE,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'archived')),

  -- Access Control
  requires_signature BOOLEAN DEFAULT FALSE,
  signed_at TIMESTAMP WITH TIME ZONE,

  -- Audit
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge Base Articles Table
CREATE TABLE IF NOT EXISTS knowledge_base_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Article Details
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT CHECK (category IN ('getting-started', 'troubleshooting', 'security', 'compliance', 'best-practices')),

  -- Content
  summary TEXT,
  content TEXT NOT NULL, -- Markdown supported

  -- Media
  video_url TEXT, -- YouTube, Vimeo, or direct upload
  video_duration INTEGER, -- seconds
  thumbnail_url TEXT,

  -- SEO & Discoverability
  tags TEXT[], -- Array of tags for search
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),

  -- Engagement
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,

  -- Publishing
  published BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,

  -- Access Control
  public BOOLEAN DEFAULT FALSE, -- TRUE = visible to all, FALSE = clients only

  -- Audit
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT
);

-- Ticket Updates/Comments Table
CREATE TABLE IF NOT EXISTS ticket_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ticket Reference
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,

  -- Update Content
  message TEXT NOT NULL,

  -- Author
  author_type TEXT CHECK (author_type IN ('client', 'staff')),
  author_name TEXT NOT NULL,

  -- Visibility
  internal BOOLEAN DEFAULT FALSE, -- TRUE = staff only, FALSE = visible to client

  -- Attachments
  attachments JSONB
);

-- Indexes for Client Portal
CREATE INDEX idx_clients_auth_user_id ON clients(auth_user_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_status ON clients(status);

CREATE INDEX idx_tickets_client_id ON tickets(client_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX idx_tickets_ticket_number ON tickets(ticket_number);

CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);

CREATE INDEX idx_compliance_documents_client_id ON compliance_documents(client_id);
CREATE INDEX idx_compliance_documents_status ON compliance_documents(status);
CREATE INDEX idx_compliance_documents_expiry_date ON compliance_documents(expiry_date);

CREATE INDEX idx_knowledge_base_articles_slug ON knowledge_base_articles(slug);
CREATE INDEX idx_knowledge_base_articles_category ON knowledge_base_articles(category);
CREATE INDEX idx_knowledge_base_articles_published ON knowledge_base_articles(published);

CREATE INDEX idx_ticket_updates_ticket_id ON ticket_updates(ticket_id);
CREATE INDEX idx_ticket_updates_created_at ON ticket_updates(created_at DESC);

-- Row Level Security for Client Portal
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Clients Table
CREATE POLICY "Clients can view their own profile" ON clients
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Service role has full access to clients" ON clients
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for Tickets Table
CREATE POLICY "Clients can view their own tickets" ON tickets
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Clients can create tickets" ON tickets
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM clients WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Service role has full access to tickets" ON tickets
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for Invoices Table
CREATE POLICY "Clients can view their own invoices" ON invoices
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Service role has full access to invoices" ON invoices
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for Compliance Documents Table
CREATE POLICY "Clients can view their own compliance documents" ON compliance_documents
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Service role has full access to compliance documents" ON compliance_documents
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for Knowledge Base Articles Table
CREATE POLICY "Anyone can view public articles" ON knowledge_base_articles
  FOR SELECT USING (public = TRUE AND published = TRUE);

CREATE POLICY "Authenticated clients can view all published articles" ON knowledge_base_articles
  FOR SELECT USING (
    published = TRUE AND auth.uid() IN (SELECT auth_user_id FROM clients)
  );

CREATE POLICY "Service role has full access to knowledge base" ON knowledge_base_articles
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for Ticket Updates Table
CREATE POLICY "Clients can view non-internal updates for their tickets" ON ticket_updates
  FOR SELECT USING (
    internal = FALSE AND
    ticket_id IN (
      SELECT id FROM tickets WHERE client_id IN (
        SELECT id FROM clients WHERE auth_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Clients can create updates for their tickets" ON ticket_updates
  FOR INSERT WITH CHECK (
    ticket_id IN (
      SELECT id FROM tickets WHERE client_id IN (
        SELECT id FROM clients WHERE auth_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Service role has full access to ticket updates" ON ticket_updates
  FOR ALL USING (auth.role() = 'service_role');

-- Function to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_count INTEGER;
  v_ticket_number TEXT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM tickets;
  v_ticket_number := 'TKT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD((v_count + 1)::TEXT, 5, '0');
  RETURN v_ticket_number;
END;
$$;

-- Function to auto-generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_count INTEGER;
  v_invoice_number TEXT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM invoices;
  v_invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD((v_count + 1)::TEXT, 5, '0');
  RETURN v_invoice_number;
END;
$$;

-- Trigger to auto-generate ticket number
CREATE OR REPLACE FUNCTION set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_number IS NULL THEN
    NEW.ticket_number := generate_ticket_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_ticket_number
  BEFORE INSERT ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION set_ticket_number();

-- Trigger to auto-generate invoice number
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_invoice_number
  BEFORE INSERT ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION set_invoice_number();

-- Triggers to update updated_at for client portal tables
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_documents_updated_at
  BEFORE UPDATE ON compliance_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_base_articles_updated_at
  BEFORE UPDATE ON knowledge_base_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
