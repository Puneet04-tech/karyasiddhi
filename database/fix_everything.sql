-- Fix the trigger issue and populate everything

-- 1. Drop the problematic trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_departments_updated_at ON departments;
DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;
DROP TRIGGER IF EXISTS update_kpis_updated_at ON kpis;

-- 2. Link users to departments (this should work now)
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email IN ('arun.singh@gov.in', 'rajesh.kumar@gov.in', 'priya.sharma@gov.in', 'vikram.singh@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440002' WHERE email IN ('amit.patel@gov.in', 'sneha.reddy@gov.in', 'deepika.roy@gov.in', 'kavita.nair@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440003' WHERE email IN ('rahul.verma@gov.in', 'anita.desai@gov.in', 'suresh.yadav@gov.in', 'manoj.gupta@gov.in', 'pooja.iyer@gov.in');

-- 3. Verify everything
SELECT 'Users with departments:' as info, COUNT(*)::text FROM users WHERE "departmentId" IS NOT NULL;
SELECT 'Total goals:' as info, COUNT(*)::text FROM goals;
SELECT 'Total KPIs:' as info, COUNT(*)::text FROM kpis;

-- 4. Show sample data
SELECT u.name, u.email, d.name as department, COUNT(g.id) as goal_count
FROM users u
LEFT JOIN departments d ON u."departmentId" = d.id
LEFT JOIN goals g ON g."assignedUserId" = u.id
WHERE u."departmentId" IS NOT NULL
GROUP BY u.id, u.name, u.email, d.name
ORDER BY u.name
LIMIT 10;
