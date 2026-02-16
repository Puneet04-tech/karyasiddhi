-- Add missing resolved_at column to issues table
-- This fixes the column issue.resolved_at does not exist error

ALTER TABLE issues ADD COLUMN resolved_at TIMESTAMP;