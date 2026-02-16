-- Quick seed to populate dashboard with data

-- 1. Create departments
INSERT INTO departments (id, name, code, ministry, "createdAt", "updatedAt") 
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Digital Infrastructure', 'DI-001', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440002', 'Citizen Services', 'CS-002', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440003', 'Data Governance', 'DG-003', 'Ministry of Electronics and IT', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 2. Link Arun Singh (manager) to department
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email = 'arun.singh@gov.in';

-- 3. Link other users to departments
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email IN ('rajesh.kumar@gov.in', 'priya.sharma@gov.in', 'vikram.singh@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440002' WHERE email IN ('amit.patel@gov.in', 'sneha.reddy@gov.in', 'deepika.roy@gov.in', 'kavita.nair@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440003' WHERE email IN ('rahul.verma@gov.in', 'anita.desai@gov.in', 'suresh.yadav@gov.in', 'manoj.gupta@gov.in', 'pooja.iyer@gov.in');

-- 4. Create goals for each user
-- Rajesh Kumar (High performer)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440001',
  'Digital Platform Modernization',
  'Upgrade citizen portal',
  'Strategic',
  'In Progress',
  'High',
  85,
  '2024-01-01',
  '2024-12-31',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'rajesh.kumar@gov.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440002',
  'API Integration',
  'Connect state systems',
  'Operational',
  'Completed',
  'Medium',
  100,
  '2024-02-01',
  '2024-06-30',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'rajesh.kumar@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Priya Sharma (Medium performer)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440003',
  'Security Audit',
  'Complete compliance',
  'Operational',
  'In Progress',
  'High',
  72,
  '2024-01-15',
  '2024-10-15',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'priya.sharma@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Amit Patel (Lower performer)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440004',
  'Portal Enhancement',
  'Improve UX',
  'Operational',
  'In Progress',
  'Medium',
  58,
  '2024-02-01',
  '2024-11-30',
  '650e8400-e29b-41d4-a716-446655440002',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'amit.patel@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Sneha Reddy (High performer)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440005',
  'Support System',
  'Deploy helpdesk',
  'Operational',
  'Completed',
  'High',
  100,
  '2024-01-01',
  '2024-05-31',
  '650e8400-e29b-41d4-a716-446655440002',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'sneha.reddy@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Vikram Singh (Low performer)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440006',
  'Documentation',
  'Update docs',
  'Operational',
  'In Progress',
  'Low',
  42,
  '2024-03-01',
  '2024-09-30',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'vikram.singh@gov.in'
ON CONFLICT (id) DO NOTHING;

-- 5. Create KPIs
INSERT INTO kpis (id, name, description, target, current, baseline, unit, frequency, category, trend, "goalId", "createdAt", "updatedAt")
VALUES
  ('850e8400-e29b-41d4-a716-446655440001', 'API Response Time', 'Avg response', 200, 180, 250, 'ms', 'Daily', 'Performance', 'Up', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440002', 'User Satisfaction', 'Citizen score', 90, 88, 75, '%', 'Monthly', 'Quality', 'Up', '750e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440003', 'Security Score', 'Compliance', 95, 85, 80, '%', 'Monthly', 'Security', 'Up', '750e8400-e29b-41d4-a716-446655440003', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT 'Goals created:' as info, COUNT(*) FROM goals;
SELECT 'KPIs created:' as info, COUNT(*) FROM kpis;
SELECT 'Users with departments:' as info, COUNT(*) FROM users WHERE "departmentId" IS NOT NULL;
