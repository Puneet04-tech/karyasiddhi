-- KaryaSiddhi - User Achievements Setup Script
-- Compatible with: Supabase, Render, Neon, and all PostgreSQL databases
-- Run this AFTER seed_complete_data.sql to add user achievements
-- This script is idempotent and safe to run multiple times

-- Step 1: Add achievements column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS achievements JSONB;

-- Step 2: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_users_achievements ON users USING GIN (achievements);

-- Step 3: Seed unique achievements for each user
-- Each user gets a different combination based on role, performance, and designation

-- Update arun.singh@gov.in - Director level
UPDATE users SET achievements = '[
  {"id": 1, "title": "Visionary Leader", "icon": "Rocket", "color": "text-blue-500", "earnedAt": "2024-08-15"},
  {"id": 2, "title": "Strategic Planner", "icon": "Target", "color": "text-indigo-500", "earnedAt": "2024-09-20"},
  {"id": 3, "title": "Department Champion", "icon": "Trophy", "color": "text-yellow-500", "earnedAt": "2024-10-05"}
]'::jsonb
WHERE email = 'arun.singh@gov.in';

-- Update rajesh.kumar@gov.in - High performer (85-90% goals)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Goal Crusher", "icon": "Target", "color": "text-green-500", "earnedAt": "2024-07-12"},
  {"id": 2, "title": "Performance Star", "icon": "Star", "color": "text-yellow-500", "earnedAt": "2024-09-18"},
  {"id": 3, "title": "Innovation Driver", "icon": "Zap", "color": "text-purple-500", "earnedAt": "2024-10-22"}
]'::jsonb
WHERE email = 'rajesh.kumar@gov.in';

-- Update priya.sharma@gov.in - Senior Officer with Security focus
UPDATE users SET achievements = '[
  {"id": 1, "title": "Security Guardian", "icon": "Shield", "color": "text-red-500", "earnedAt": "2024-06-30"},
  {"id": 2, "title": "Team Mentor", "icon": "Users", "color": "text-cyan-500", "earnedAt": "2024-08-14"},
  {"id": 3, "title": "Excellence Award", "icon": "Award", "color": "text-amber-500", "earnedAt": "2024-10-10"}
]'::jsonb
WHERE email = 'priya.sharma@gov.in';

-- Update vikram.singh@gov.in - Below Average (45% performer)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Dedicated Worker", "icon": "Heart", "color": "text-pink-500", "earnedAt": "2024-09-05"},
  {"id": 2, "title": "Team Player", "icon": "Users", "color": "text-blue-500", "earnedAt": "2024-10-12"}
]'::jsonb
WHERE email = 'vikram.singh@gov.in';

-- Update amit.patel@gov.in - Average Performer (60%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Project Contributor", "icon": "Briefcase", "color": "text-slate-500", "earnedAt": "2024-05-20"},
  {"id": 2, "title": "Process Follower", "icon": "TrendingUp", "color": "text-emerald-500", "earnedAt": "2024-07-15"}
]'::jsonb
WHERE email = 'amit.patel@gov.in';

-- Update sneha.reddy@gov.in - High performer (88%) with completed goals
UPDATE users SET achievements = '[
  {"id": 1, "title": "Goal Achiever", "icon": "Target", "color": "text-green-500", "earnedAt": "2024-06-30"},
  {"id": 2, "title": "Customer Champion", "icon": "Heart", "color": "text-red-500", "earnedAt": "2024-08-25"},
  {"id": 3, "title": "100% Completion", "icon": "Trophy", "color": "text-yellow-500", "earnedAt": "2024-09-30"},
  {"id": 4, "title": "Service Excellence", "icon": "Star", "color": "text-amber-500", "earnedAt": "2024-11-01"}
]'::jsonb
WHERE email = 'sneha.reddy@gov.in';

-- Update kavita.nair@gov.in - Good Performer (70%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Workflow Expert", "icon": "TrendingUp", "color": "text-violet-500", "earnedAt": "2024-08-08"},
  {"id": 2, "title": "Process Optimizer", "icon": "Zap", "color": "text-yellow-500", "earnedAt": "2024-09-25"},
  {"id": 3, "title": "Dashboard Creator", "icon": "Star", "color": "text-purple-500", "earnedAt": "2024-11-03"}
]'::jsonb
WHERE email = 'kavita.nair@gov.in';

-- Update rahul.verma@gov.in - Average Performer (62%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Data Analyst", "icon": "TrendingUp", "color": "text-green-500", "earnedAt": "2024-07-22"},
  {"id": 2, "title": "Testing Contributor", "icon": "Shield", "color": "text-blue-500", "earnedAt": "2024-10-08"}
]'::jsonb
WHERE email = 'rahul.verma@gov.in';

-- Update anjali.mehta@gov.in - High Performer (82%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "AI Champion", "icon": "Zap", "color": "text-purple-500", "earnedAt": "2024-06-18"},
  {"id": 2, "title": "Analytics Pro", "icon": "TrendingUp", "color": "text-indigo-500", "earnedAt": "2024-08-30"},
  {"id": 3, "title": "Innovation Leader", "icon": "Rocket", "color": "text-yellow-500", "earnedAt": "2024-10-15"}
]'::jsonb
WHERE email = 'anjali.mehta@gov.in';

-- Update suresh.yadav@gov.in - Below Average (48%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Data Worker", "icon": "Database", "color": "text-amber-500", "earnedAt": "2024-09-12"},
  {"id": 2, "title": "Backup Support", "icon": "Shield", "color": "text-green-500", "earnedAt": "2024-10-28"}
]'::jsonb
WHERE email = 'suresh.yadav@gov.in';

-- Update deepika.roy@gov.in - Good Performer (75%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "QA Leader", "icon": "Award", "color": "text-blue-500", "earnedAt": "2024-08-05"},
  {"id": 2, "title": "Quality Champion", "icon": "Star", "color": "text-purple-500", "earnedAt": "2024-10-01"},
  {"id": 3, "title": "Testing Expert", "icon": "Shield", "color": "text-teal-500", "earnedAt": "2024-11-05"}
]'::jsonb
WHERE email = 'deepika.roy@gov.in';

-- Update manish.gupta@gov.in - Average Performer (58%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Security Monitor", "icon": "Shield", "color": "text-red-500", "earnedAt": "2024-10-10"},
  {"id": 2, "title": "Compliance Checker", "icon": "FileCheck", "color": "text-blue-500", "earnedAt": "2024-11-02"}
]'::jsonb
WHERE email = 'manish.gupta@gov.in';

-- Update pooja.deshmukh@gov.in - High Performer (86%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Infrastructure Hero", "icon": "Server", "color": "text-orange-500", "earnedAt": "2024-06-10"},
  {"id": 2, "title": "Network Master", "icon": "Network", "color": "text-cyan-500", "earnedAt": "2024-08-15"},
  {"id": 3, "title": "DR Champion", "icon": "Shield", "color": "text-emerald-500", "earnedAt": "2024-10-20"},
  {"id": 4, "title": "Critical Systems Lead", "icon": "Trophy", "color": "text-yellow-500", "earnedAt": "2024-11-12"}
]'::jsonb
WHERE email = 'pooja.deshmukh@gov.in';

-- Step 4: Verification and reporting
SELECT 
  '=== Achievement Distribution Summary ===' as report;

SELECT 
  name, 
  email, 
  designation,
  jsonb_array_length(achievements) as achievement_count,
  achievements->0->>'title' as first_achievement,
  achievements->>0 as sample_achievement_json
FROM users 
WHERE achievements IS NOT NULL
ORDER BY jsonb_array_length(achievements) DESC, email;

-- Summary statistics
SELECT 
  'Total users with achievements' as metric,
  COUNT(*) as count
FROM users 
WHERE achievements IS NOT NULL AND jsonb_array_length(achievements) > 0;

SELECT 
  'Average achievements per user' as metric,
  ROUND(AVG(jsonb_array_length(achievements))::numeric, 2) as count
FROM users 
WHERE achievements IS NOT NULL;

-- Achievement variety check
SELECT 
  'Unique achievement titles' as metric,
  COUNT(DISTINCT achievement->>'title') as count
FROM users, jsonb_array_elements(achievements) as achievement
WHERE achievements IS NOT NULL;

SELECT '=== Setup Complete ===' as status;
