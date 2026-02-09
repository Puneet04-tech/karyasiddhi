-- KaryaSiddhi - Fix Column Names for User Entity
-- This script fixes column naming issues between entity and database

-- Check if columns exist with wrong names and rename them
DO $$
BEGIN
    -- Check and rename aadhaar column if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'aadhaar'
    ) THEN
        ALTER TABLE users RENAME COLUMN aadhaar TO aadhaar_number;
    END IF;

    -- Check if aadhaar_verified column exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'aadhaar_verified'
    ) THEN
        ALTER TABLE users ADD COLUMN aadhaar_verified BOOLEAN DEFAULT FALSE;
    END IF;

    -- Check if digilocker_verified column exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'digilocker_verified'
    ) THEN
        ALTER TABLE users ADD COLUMN digilocker_verified BOOLEAN DEFAULT FALSE;
    END IF;

    -- Check if achievements column exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'achievements'
    ) THEN
        ALTER TABLE users ADD COLUMN achievements JSONB;
    END IF;

    -- Check if settings column exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'settings'
    ) THEN
        ALTER TABLE users ADD COLUMN settings JSONB;
    END IF;

    -- Check if employee_id column exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'employee_id'
    ) THEN
        ALTER TABLE users ADD COLUMN employee_id VARCHAR;
    END IF;

    -- Check if department_id column exists, if not create it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'department_id'
    ) THEN
        ALTER TABLE users ADD COLUMN department_id UUID REFERENCES departments(id);
    END IF;
END $$;

-- Update existing users with default settings if settings is null
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

-- Show current status
SELECT 
    'Column fixes applied' as status,
    COUNT(*) as total_users,
    COUNT(CASE WHEN achievements IS NOT NULL THEN 1 END) as users_with_achievements,
    COUNT(CASE WHEN settings IS NOT NULL THEN 1 END) as users_with_settings
FROM users;

SELECT '=== Fix Complete ===' as status;
