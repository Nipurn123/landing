ALTER TABLE click_events ADD COLUMN IF NOT EXISTS session_id VARCHAR(64);
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100);
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100);
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_click_events_session ON click_events(session_id);

ALTER TABLE sessions ADD CONSTRAINT sessions_session_id_key UNIQUE (session_id);
