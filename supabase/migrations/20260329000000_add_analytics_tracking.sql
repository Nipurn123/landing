-- Unique visitors with IP and location tracking
CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  first_visit TIMESTAMPTZ DEFAULT NOW(),
  last_visit TIMESTAMPTZ DEFAULT NOW(),
  visit_count INTEGER DEFAULT 1,
  country VARCHAR(100),
  country_code VARCHAR(10),
  region VARCHAR(100),
  region_code VARCHAR(10),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone VARCHAR(50),
  isp VARCHAR(255),
  org VARCHAR(255),
  device_type VARCHAR(20),
  browser VARCHAR(50),
  browser_version VARCHAR(20),
  os VARCHAR(50),
  os_version VARCHAR(20),
  screen_resolution VARCHAR(20),
  language VARCHAR(20)
);

-- Track page views
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL REFERENCES visitors(visitor_id),
  page_path VARCHAR(500) NOT NULL,
  page_title TEXT,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),
  time_on_page INTEGER DEFAULT 0,
  scroll_depth INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track button clicks and interactions
CREATE TABLE click_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL REFERENCES visitors(visitor_id),
  element_type VARCHAR(50) NOT NULL,
  element_id VARCHAR(100),
  element_text TEXT,
  element_class VARCHAR(255),
  page_path VARCHAR(500),
  href VARCHAR(500),
  x_position INTEGER,
  y_position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track custom events (CTA clicks, form submissions, etc.)
CREATE TABLE custom_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL REFERENCES visitors(visitor_id),
  event_name VARCHAR(100) NOT NULL,
  event_category VARCHAR(50),
  event_label VARCHAR(255),
  event_value DECIMAL(10, 2),
  page_path VARCHAR(500),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session tracking
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL REFERENCES visitors(visitor_id),
  session_id VARCHAR(64) NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  page_views INTEGER DEFAULT 0,
  device_type VARCHAR(20),
  browser VARCHAR(50),
  os VARCHAR(50),
  country VARCHAR(100),
  region VARCHAR(100),
  city VARCHAR(100)
);

-- Indexes for performance
CREATE INDEX idx_visitors_visitor_id ON visitors(visitor_id);
CREATE INDEX idx_visitors_ip ON visitors(ip_address);
CREATE INDEX idx_visitors_country ON visitors(country);
CREATE INDEX idx_visitors_created ON visitors(first_visit DESC);

CREATE INDEX idx_page_views_visitor ON page_views(visitor_id);
CREATE INDEX idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON page_views(page_path);

CREATE INDEX idx_click_events_visitor ON click_events(visitor_id);
CREATE INDEX idx_click_events_created ON click_events(created_at DESC);
CREATE INDEX idx_click_events_type ON click_events(element_type);

CREATE INDEX idx_custom_events_visitor ON custom_events(visitor_id);
CREATE INDEX idx_custom_events_name ON custom_events(event_name);
CREATE INDEX idx_custom_events_created ON custom_events(created_at DESC);

CREATE INDEX idx_sessions_visitor ON sessions(visitor_id);
CREATE INDEX idx_sessions_started ON sessions(started_at DESC);

-- Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert (tracking from website)
CREATE POLICY "Allow anonymous insert on visitors" ON visitors
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on page_views" ON page_views
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on click_events" ON click_events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on custom_events" ON custom_events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on sessions" ON sessions
  FOR INSERT TO anon WITH CHECK (true);

-- Service role can manage everything
CREATE POLICY "Service role full access on visitors" ON visitors
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on page_views" ON page_views
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on click_events" ON click_events
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on custom_events" ON custom_events
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on sessions" ON sessions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow anon to update their own visitor record (for last_visit)
CREATE POLICY "Allow anon update visitors" ON visitors
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Function to get visitor stats
CREATE OR REPLACE FUNCTION get_visitor_stats(days INTEGER DEFAULT 30)
RETURNS TABLE (
  total_visitors BIGINT,
  unique_visitors BIGINT,
  total_page_views BIGINT,
  total_clicks BIGINT,
  avg_session_duration DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM visitors WHERE first_visit >= NOW() - (days || ' days')::INTERVAL)::BIGINT,
    (SELECT COUNT(DISTINCT visitor_id) FROM visitors WHERE first_visit >= NOW() - (days || ' days')::INTERVAL)::BIGINT,
    (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - (days || ' days')::INTERVAL)::BIGINT,
    (SELECT COUNT(*) FROM click_events WHERE created_at >= NOW() - (days || ' days')::INTERVAL)::BIGINT,
    (SELECT COALESCE(AVG(duration_seconds), 0) FROM sessions WHERE started_at >= NOW() - (days || ' days')::INTERVAL);
END;
$$ LANGUAGE plpgsql;

-- Function to get visitors by country
CREATE OR REPLACE FUNCTION get_visitors_by_country(days INTEGER DEFAULT 30)
RETURNS TABLE (
  country VARCHAR(100),
  country_code VARCHAR(10),
  visitor_count BIGINT,
  percentage DECIMAL(5, 2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.country,
    v.country_code,
    COUNT(*)::BIGINT as visitor_count,
    ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0), 2) as percentage
  FROM visitors v
  WHERE v.first_visit >= NOW() - (days || ' days')::INTERVAL
    AND v.country IS NOT NULL
  GROUP BY v.country, v.country_code
  ORDER BY visitor_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get visitors by region (state)
CREATE OR REPLACE FUNCTION get_visitors_by_region(country_code_param VARCHAR(10), days INTEGER DEFAULT 30)
RETURNS TABLE (
  region VARCHAR(100),
  region_code VARCHAR(10),
  visitor_count BIGINT,
  percentage DECIMAL(5, 2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.region,
    v.region_code,
    COUNT(*)::BIGINT as visitor_count,
    ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0), 2) as percentage
  FROM visitors v
  WHERE v.first_visit >= NOW() - (days || ' days')::INTERVAL
    AND v.country_code = country_code_param
    AND v.region IS NOT NULL
  GROUP BY v.region, v.region_code
  ORDER BY visitor_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get click events summary
CREATE OR REPLACE FUNCTION get_click_events_summary(days INTEGER DEFAULT 30)
RETURNS TABLE (
  element_type VARCHAR(50),
  element_text TEXT,
  click_count BIGINT,
  unique_clickers BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ce.element_type,
    ce.element_text,
    COUNT(*)::BIGINT as click_count,
    COUNT(DISTINCT ce.visitor_id)::BIGINT as unique_clickers
  FROM click_events ce
  WHERE ce.created_at >= NOW() - (days || ' days')::INTERVAL
  GROUP BY ce.element_type, ce.element_text
  ORDER BY click_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get daily visitors
CREATE OR REPLACE FUNCTION get_daily_visitors(days INTEGER DEFAULT 30)
RETURNS TABLE (
  date DATE,
  visitors BIGINT,
  page_views BIGINT,
  clicks BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE(v.first_visit) as date,
    COUNT(DISTINCT v.visitor_id)::BIGINT as visitors,
    (SELECT COUNT(*) FROM page_views pv WHERE DATE(pv.created_at) = DATE(v.first_visit))::BIGINT as page_views,
    (SELECT COUNT(*) FROM click_events ce WHERE DATE(ce.created_at) = DATE(v.first_visit))::BIGINT as clicks
  FROM visitors v
  WHERE v.first_visit >= NOW() - (days || ' days')::INTERVAL
  GROUP BY DATE(v.first_visit)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql;
