-- Cloudflare D1 SQL Database Schema
-- Table: feedbacks for Sai Shivansh Tours & Travels

CREATE TABLE IF NOT EXISTS feedbacks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  trip_name TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  approved INTEGER DEFAULT 0
);

-- Index for retrieving approved reviews sorted by date
CREATE INDEX IF NOT EXISTS idx_feedbacks_approved_created 
ON feedbacks(approved, created_at DESC);
