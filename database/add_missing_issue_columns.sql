-- Add missing columns to issues table
-- This fixes the column errors for resolved_at, created_at, and updated_at

-- Add resolved_at column
ALTER TABLE issues ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP;

-- Add created_at column with default current timestamp
ALTER TABLE issues ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add updated_at column with default current timestamp
ALTER TABLE issues ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows to have created_at if they don't have it
UPDATE issues SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL;

-- Update existing rows to have updated_at if they don't have it
UPDATE issues SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;