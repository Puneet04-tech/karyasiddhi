-- Simple achievements fix - ensure data exists
-- This script ensures achievements data exists for testing

-- First, ensure the user exists with correct password
UPDATE users 
SET password = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'
WHERE email = 'arun.singh@gov.in';

-- Add achievements if they don't exist
UPDATE users 
SET achievements = '[{"id": 1, "title": "Visionary Leader", "icon": "Rocket", "color": "text-blue-500", "earnedAt": "2024-08-15"}, {"id": 2, "title": "Strategic Planner", "icon": "Target", "color": "text-indigo-500", "earnedAt": "2024-09-20"}, {"id": 3, "title": "Department Champion", "icon": "Trophy", "color": "text-yellow-500", "earnedAt": "2024-10-05"}]'::jsonb
WHERE email = 'arun.singh@gov.in' AND (achievements IS NULL OR jsonb_array_length(achievements) = 0);

-- Verify the data
SELECT 
    email,
    jsonb_array_length(achievements) as achievement_count,
    achievements->0->>'title' as first_achievement
FROM users 
WHERE email = 'arun.singh@gov.in';
