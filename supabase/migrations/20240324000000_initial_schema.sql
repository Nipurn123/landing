-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  company_domain VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  referral_source VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Docs waitlist
CREATE TABLE docs_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Email notifications log
CREATE TABLE email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'contact', 'docs_launch'
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  success BOOLEAN DEFAULT TRUE
);

-- Indexes for faster queries
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_docs_waitlist_email ON docs_waitlist(email);
CREATE INDEX idx_docs_waitlist_notified ON docs_waitlist(notified);

-- Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE docs_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert for contact submissions (from website form)
CREATE POLICY "Allow anonymous insert on contact_submissions" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous insert for docs waitlist (from website form)
CREATE POLICY "Allow anonymous insert on docs_waitlist" ON docs_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only service role can read/update (for admin operations)
CREATE POLICY "Service role can manage contact_submissions" ON contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage docs_waitlist" ON docs_waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage email_notifications" ON email_notifications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
