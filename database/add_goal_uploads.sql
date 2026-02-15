-- Add goal uploads table
CREATE TABLE IF NOT EXISTS goal_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(100),
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_goal_uploads_goal_id ON goal_uploads(goal_id);
CREATE INDEX IF NOT EXISTS idx_goal_uploads_user_id ON goal_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_goal_uploads_uploaded_at ON goal_uploads(uploaded_at);