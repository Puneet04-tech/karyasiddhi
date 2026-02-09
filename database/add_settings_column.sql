-- KaryaSiddhi - Add Settings Column to Users Table
-- Compatible with: Supabase, Render, Neon, and all PostgreSQL databases
-- This script adds a settings column to store user preferences

-- Add settings column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS settings JSONB;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_users_settings ON users USING GIN (settings);

-- Update existing users with default settings
UPDATE users 
SET settings = '{
  "notifications": true,
  "emailAlerts": true,
  "darkMode": true,
  "offlineMode": false,
  "twoFactor": false,
  "language": "English"
}'::jsonb
WHERE settings IS NULL;

-- Verification
SELECT 
  'Settings column added successfully' as status,
  COUNT(*) as users_with_settings
FROM users 
WHERE settings IS NOT NULL;

SELECT '=== Setup Complete ===' as status;
