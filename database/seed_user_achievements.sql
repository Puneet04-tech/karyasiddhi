-- Seed unique achievements for each user based on their role, designation, and performance
-- This script assigns different combinations of achievements to make each profile unique

-- Define different achievement sets that can be earned
-- Icons correspond to lucide-react icons: Award, Target, TrendingUp, Users, Zap, Shield, Trophy, Star, Heart, Briefcase, BookOpen, Rocket

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

-- Update vikram.singh@gov.in - Technical Officer (lower performer)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Dedicated Worker", "icon": "Heart", "color": "text-pink-500", "earnedAt": "2024-09-05"},
  {"id": 2, "title": "Team Player", "icon": "Users", "color": "text-blue-500", "earnedAt": "2024-10-12"}
]'::jsonb
WHERE email = 'vikram.singh@gov.in';

-- Update amit.patel@gov.in - Project Manager
UPDATE users SET achievements = '[
  {"id": 1, "title": "Project Leader", "icon": "Briefcase", "color": "text-slate-500", "earnedAt": "2024-05-20"},
  {"id": 2, "title": "Delivery Master", "icon": "TrendingUp", "color": "text-emerald-500", "earnedAt": "2024-07-15"},
  {"id": 3, "title": "Client Satisfaction", "icon": "Heart", "color": "text-rose-500", "earnedAt": "2024-09-08"}
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

-- Update deepika.roy@gov.in - Team Lead
UPDATE users SET achievements = '[
  {"id": 1, "title": "Team Leader", "icon": "Users", "color": "text-blue-500", "earnedAt": "2024-07-10"},
  {"id": 2, "title": "Collaboration Pro", "icon": "Award", "color": "text-indigo-500", "earnedAt": "2024-09-15"},
  {"id": 3, "title": "Knowledge Sharer", "icon": "BookOpen", "color": "text-teal-500", "earnedAt": "2024-10-20"}
]'::jsonb
WHERE email = 'deepika.roy@gov.in';

-- Update kavita.nair@gov.in - Senior Analyst
UPDATE users SET achievements = '[
  {"id": 1, "title": "Data Expert", "icon": "TrendingUp", "color": "text-violet-500", "earnedAt": "2024-08-08"},
  {"id": 2, "title": "Insight Generator", "icon": "Zap", "color": "text-yellow-500", "earnedAt": "2024-09-25"},
  {"id": 3, "title": "Quality Champion", "icon": "Star", "color": "text-purple-500", "earnedAt": "2024-11-03"}
]'::jsonb
WHERE email = 'kavita.nair@gov.in';

-- Update rahul.verma@gov.in - Data Officer (medium performer 62%)
UPDATE users SET achievements = '[
  {"id": 1, "title": "Compliance Expert", "icon": "Shield", "color": "text-green-500", "earnedAt": "2024-07-22"},
  {"id": 2, "title": "Process Improver", "icon": "TrendingUp", "color": "text-blue-500", "earnedAt": "2024-10-08"}
]'::jsonb
WHERE email = 'rahul.verma@gov.in';

-- Update anita.desai@gov.in - Senior Data Officer
UPDATE users SET achievements = '[
  {"id": 1, "title": "Data Guardian", "icon": "Shield", "color": "text-cyan-500", "earnedAt": "2024-06-18"},
  {"id": 2, "title": "Analytics Pro", "icon": "TrendingUp", "color": "text-indigo-500", "earnedAt": "2024-08-30"},
  {"id": 3, "title": "Best Practice Leader", "icon": "Award", "color": "text-yellow-500", "earnedAt": "2024-10-15"}
]'::jsonb
WHERE email = 'anita.desai@gov.in';

-- Update suresh.yadav@gov.in - Analyst
UPDATE users SET achievements = '[
  {"id": 1, "title": "Rising Star", "icon": "Star", "color": "text-amber-500", "earnedAt": "2024-09-12"},
  {"id": 2, "title": "Quick Learner", "icon": "BookOpen", "color": "text-green-500", "earnedAt": "2024-10-28"}
]'::jsonb
WHERE email = 'suresh.yadav@gov.in';

-- Update manoj.gupta@gov.in - Data Analyst
UPDATE users SET achievements = '[
  {"id": 1, "title": "Detail Oriented", "icon": "Target", "color": "text-blue-500", "earnedAt": "2024-08-05"},
  {"id": 2, "title": "Problem Solver", "icon": "Zap", "color": "text-purple-500", "earnedAt": "2024-10-01"},
  {"id": 3, "title": "Team Contributor", "icon": "Users", "color": "text-teal-500", "earnedAt": "2024-11-05"}
]'::jsonb
WHERE email = 'manoj.gupta@gov.in';

-- Update pooja.iyer@gov.in - Junior Analyst
UPDATE users SET achievements = '[
  {"id": 1, "title": "Fast Starter", "icon": "Rocket", "color": "text-orange-500", "earnedAt": "2024-10-10"},
  {"id": 2, "title": "Eager Learner", "icon": "BookOpen", "color": "text-pink-500", "earnedAt": "2024-11-02"}
]'::jsonb
WHERE email = 'pooja.iyer@gov.in';

-- Verify the achievements were assigned
SELECT 
  name, 
  email, 
  designation,
  jsonb_array_length(achievements) as achievement_count,
  achievements
FROM users 
WHERE email IN (
  'arun.singh@gov.in',
  'rajesh.kumar@gov.in',
  'priya.sharma@gov.in',
  'vikram.singh@gov.in',
  'amit.patel@gov.in',
  'sneha.reddy@gov.in',
  'deepika.roy@gov.in',
  'kavita.nair@gov.in',
  'rahul.verma@gov.in',
  'anita.desai@gov.in',
  'suresh.yadav@gov.in',
  'manoj.gupta@gov.in',
  'pooja.iyer@gov.in'
)
ORDER BY email;

-- Summary
SELECT 
  'Total users with achievements' as metric,
  COUNT(*) as count
FROM users 
WHERE achievements IS NOT NULL AND jsonb_array_length(achievements) > 0;
