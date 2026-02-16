-- Create issues table for production database
-- This script creates the issues table that was missing from the production database

-- Create custom enum types for PostgreSQL
CREATE TYPE issue_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE issue_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create the issues table
CREATE TABLE issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status issue_status DEFAULT 'open',
    priority issue_priority DEFAULT 'medium',
    solution TEXT,
    resolved_at TIMESTAMP,
    "created_by" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "assigned_to" UUID REFERENCES users(id) ON DELETE SET NULL,
    "goal_id" UUID REFERENCES goals(id) ON DELETE SET NULL,
    "kpi_id" UUID REFERENCES kpis(id) ON DELETE SET NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_priority ON issues(priority);
CREATE INDEX idx_issues_created_by ON issues("created_by");
CREATE INDEX idx_issues_assigned_to ON issues("assigned_to");
CREATE INDEX idx_issues_goal_id ON issues("goal_id");
CREATE INDEX idx_issues_kpi_id ON issues("kpi_id");
CREATE INDEX idx_issues_created_at ON issues("createdAt");

-- Create trigger to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();