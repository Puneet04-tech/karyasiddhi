-- Correct seed data with proper enum values

-- 1. Create departments
INSERT INTO departments (id, name, code, ministry, "createdAt", "updatedAt") 
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Digital Infrastructure', 'DI-001', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440002', 'Citizen Services', 'CS-002', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440003', 'Data Governance', 'DG-003', 'Ministry of Electronics and IT', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- 2. Link users to departments
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email = 'arun.singh@gov.in';
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email IN ('rajesh.kumar@gov.in', 'priya.sharma@gov.in', 'vikram.singh@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440002' WHERE email IN ('amit.patel@gov.in', 'sneha.reddy@gov.in', 'deepika.roy@gov.in', 'kavita.nair@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440003' WHERE email IN ('rahul.verma@gov.in', 'anita.desai@gov.in', 'suresh.yadav@gov.in', 'manoj.gupta@gov.in', 'pooja.iyer@gov.in');

-- 3. Create goals (using correct enum values: specific/measurable/achievable/relevant/timebound, not_started/in_progress/completed/delayed, low/medium/high/critical)

-- Rajesh Kumar (High performer - 85%)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440001',
  'Digital Platform Modernization',
  'Upgrade citizen portal infrastructure',
  'specific',
  'in_progress',
  'high',
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
  'API Integration Project',
  'Connect all state systems',
  'measurable',
  'completed',
  'high',
  100,
  '2024-02-01',
  '2024-06-30',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'rajesh.kumar@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Priya Sharma (Medium performer - 72%)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440003',
  'Security Audit Completion',
  'Complete security compliance audit',
  'achievable',
  'in_progress',
  'high',
  72,
  '2024-01-15',
  '2024-10-15',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'priya.sharma@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Amit Patel (Lower performer - 58%)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440004',
  'Service Portal Enhancement',
  'Improve user experience',
  'relevant',
  'in_progress',
  'medium',
  58,
  '2024-02-01',
  '2024-11-30',
  '650e8400-e29b-41d4-a716-446655440002',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'amit.patel@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Sneha Reddy (High performer - 88%)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440005',
  'Customer Support System',
  'Deploy new helpdesk platform',
  'timebound',
  'completed',
  'high',
  100,
  '2024-01-01',
  '2024-05-31',
  '650e8400-e29b-41d4-a716-446655440002',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'sneha.reddy@gov.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440006',
  'Feedback Analysis System',
  'Implement citizen feedback system',
  'measurable',
  'in_progress',
  'medium',
  75,
  '2024-04-01',
  '2024-12-31',
  '650e8400-e29b-41d4-a716-446655440002',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'sneha.reddy@gov.in'
ON CONFLICT (id) DO NOTHING;

-- Vikram Singh (Low performer - 42%)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440007',
  'Documentation Update',
  'Update technical documentation',
  'achievable',
  'in_progress',
  'low',
  42,
  '2024-03-01',
  '2024-09-30',
  '650e8400-e29b-41d4-a716-446655440001',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'vikram.singh@gov.in'
ON CONFLICT (id) DO NOTHING;

-- More goals for other users
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
SELECT 
  '750e8400-e29b-41d4-a716-446655440008',
  'Data Quality Initiative',
  'Improve data accuracy',
  'specific',
  'in_progress',
  'high',
  65,
  '2024-02-01',
  '2024-10-31',
  '650e8400-e29b-41d4-a716-446655440003',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'rahul.verma@gov.in'
ON CONFLICT (id) DO NOTHING;

-- 4. Create KPIs (using correct enum values: daily/weekly/monthly/quarterly/yearly, up/down/stable)
INSERT INTO kpis (id, name, description, target, current, baseline, unit, frequency, category, trend, "goalId", "createdAt", "updatedAt")
VALUES
  ('850e8400-e29b-41d4-a716-446655440001', 'API Response Time', 'Average API response time', 200, 180, 250, 'ms', 'daily', 'Performance', 'up', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440002', 'User Satisfaction', 'Citizen satisfaction score', 90, 88, 75, '%', 'monthly', 'Quality', 'up', '750e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440003', 'Security Score', 'Security compliance rating', 95, 85, 80, '%', 'monthly', 'Security', 'up', '750e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440004', 'System Uptime', 'Platform availability', 99.9, 99.5, 98.0, '%', 'daily', 'Reliability', 'stable', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440005', 'Service Requests', 'Monthly service requests', 1000, 850, 600, 'count', 'monthly', 'Productivity', 'up', '750e8400-e29b-41d4-a716-446655440004', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT 'Goals created:' as info, COUNT(*)::text as count FROM goals;
SELECT 'KPIs created:' as info, COUNT(*)::text as count FROM kpis;
SELECT 'Users with departments:' as info, COUNT(*)::text as count FROM users WHERE "departmentId" IS NOT NULL;
