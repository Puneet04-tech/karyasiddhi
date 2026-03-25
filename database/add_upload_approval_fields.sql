-- Add approval status and progress tracking to goal_uploads
ALTER TABLE goal_uploads
ADD COLUMN status VARCHAR(50) DEFAULT 'pending' NOT NULL,
ADD COLUMN progress_percentage INT DEFAULT 0,
ADD COLUMN approval_comments TEXT,
ADD COLUMN approved_at TIMESTAMP NULL,
ADD COLUMN approved_by_id UUID NULL,
ADD CONSTRAINT fk_approved_by FOREIGN KEY (approved_by_id) REFERENCES users(id) ON DELETE SET NULL;

-- Add index for status queries
CREATE INDEX IF NOT EXISTS idx_goal_uploads_status ON goal_uploads(status);
CREATE INDEX IF NOT EXISTS idx_goal_uploads_approved_by ON goal_uploads(approved_by_id);

-- Update existing uploads to approved status (backwards compatibility)
UPDATE goal_uploads SET status = 'approved' WHERE status IS NULL;
