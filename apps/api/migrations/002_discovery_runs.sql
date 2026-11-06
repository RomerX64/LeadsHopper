CREATE TABLE IF NOT EXISTS discovery_runs (
  id UUID PRIMARY KEY,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  result_limit INTEGER NOT NULL CHECK (result_limit BETWEEN 1 AND 10),
  status TEXT NOT NULL CHECK (status IN ('completed', 'failed')),
  results JSONB NOT NULL DEFAULT '[]'::jsonb,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS discovery_runs_created_at_idx ON discovery_runs (created_at DESC);
CREATE INDEX IF NOT EXISTS discovery_runs_expires_at_idx ON discovery_runs (expires_at);
