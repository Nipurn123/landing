-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) DEFAULT 'footer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Index for faster queries
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_created_at ON newsletter_subscribers(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert (from website footer)
CREATE POLICY "Allow anonymous insert on newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role can manage everything
CREATE POLICY "Service role can manage newsletter_subscribers" ON newsletter_subscribers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
