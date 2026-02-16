-- Fix user data scoping for goals and KPIs
-- This ensures each user sees different data

-- First, clear existing goals and KPIs to avoid conflicts
TRUNCATE TABLE kpis CASCADE;
TRUNCATE TABLE goals CASCADE;

-- Verify departments exist (should already be there)
INSERT INTO departments (id, name, code, ministry, "createdAt", "updatedAt") 
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Digital Infrastructure', 'DI-001', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440002', 'Citizen Services', 'CS-002', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440003', 'Data Governance', 'DG-003', 'Ministry of Electronics and IT', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Update users with departments if not set
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email IN ('arun.singh@gov.in', 'rajesh.kumar@gov.in', 'priya.sharma@gov.in', 'vikram.singh@gov.in') AND "departmentId" IS NULL;
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440002' WHERE email IN ('amit.patel@gov.in', 'sneha.reddy@gov.in', 'deepika.roy@gov.in', 'kavita.nair@gov.in') AND "departmentId" IS NULL;
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440003' WHERE email IN ('rahul.verma@gov.in', 'anita.desai@gov.in', 'suresh.yadav@gov.in', 'manoj.gupta@gov.in', 'pooja.iyer@gov.in') AND "departmentId" IS NULL;

-- Insert goals with EXPLICIT user assignments using the snake_case column name that TypeORM creates
-- Rajesh Kumar's goals (rajesh.kumar@gov.in - id: 550e8400-e29b-41d4-a716-446655440002)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 'Digital Platform Modernization', 'Upgrade citizen portal infrastructure', 'specific', 'in_progress', 'high', 85, '2024-01-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440002', 'API Integration Project', 'Integrate state systems', 'measurable', 'in_progress', 'medium', 90, '2024-02-01', '2024-11-30', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW());

-- Priya Sharma's goals (priya.sharma@gov.in - id: 550e8400-e29b-41d4-a716-446655440003)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440003', 'Security Audit Completion', 'Complete security compliance', 'achievable', 'in_progress', 'high', 75, '2024-01-15', '2024-10-15', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440004', 'Training Program', 'Staff development initiative', 'relevant', 'in_progress', 'medium', 70, '2024-03-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW());

-- Amit Patel's goals (amit.patel@gov.in - id: 550e8400-e29b-41d4-a716-446655440004)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440005', 'Service Portal Enhancement', 'Improve user experience', 'specific', 'in_progress', 'medium', 60, '2024-02-01', '2024-11-30', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440006', 'Mobile App Development', 'Launch citizen services app', 'timebound', 'in_progress', 'high', 55, '2024-01-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW());

-- Sneha Reddy's goals (sneha.reddy@gov.in - id: 550e8400-e29b-41d4-a716-446655440005)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440007', 'Customer Support System', 'Deploy new helpdesk', 'specific', 'completed', 'high', 100, '2024-01-01', '2024-06-30', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440008', 'Feedback Analysis', 'Implement citizen feedback system', 'measurable', 'in_progress', 'medium', 75, '2024-04-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW());

-- Vikram Singh's goals (vikram.singh@gov.in - id: 550e8400-e29b-41d4-a716-446655440006)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440009', 'Documentation Update', 'Update technical documentation', 'relevant', 'in_progress', 'low', 40, '2024-03-01', '2024-09-30', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440010', 'Process Automation', 'Automate reporting workflows', 'achievable', 'not_started', 'medium', 50, '2024-05-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', NOW(), NOW());

-- Rahul Verma's goals (rahul.verma@gov.in - id: 550e8400-e29b-41d4-a716-446655440008)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440011', 'Data Quality Initiative', 'Improve data accuracy', 'specific', 'in_progress', 'high', 65, '2024-02-01', '2024-10-31', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440012', 'Privacy Compliance', 'GDPR compliance project', 'timebound', 'in_progress', 'high', 60, '2024-01-15', '2024-12-15', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', NOW(), NOW());

-- Anita Desai's goals (anita.desai@gov.in - id: 550e8400-e29b-41d4-a716-446655440009)
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('750e8400-e29b-41d4-a716-446655440013', 'Analytics Dashboard', 'Build executive dashboard', 'measurable', 'in_progress', 'high', 70, '2024-03-01', '2024-11-30', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440009', NOW(), NOW());

-- Insert KPIs linked to goals (KPIs inherit user through goal relationship)
INSERT INTO kpis (id, name, description, target, current, baseline, unit, frequency, category, trend, "goalId", "departmentId", "lastUpdated", "createdAt", "updatedAt")
VALUES
  -- Rajesh Kumar's KPIs
  ('850e8400-e29b-41d4-a716-446655440001', 'API Response Time', 'Average API response time', 200, 180, 250, 'ms', 'daily', 'Performance', 'up', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440002', 'System Uptime', 'Platform availability', 99.9, 99.5, 98.0, '%', 'daily', 'Reliability', 'stable', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  
  -- Priya Sharma's KPIs
  ('850e8400-e29b-41d4-a716-446655440003', 'Security Score', 'Security compliance rating', 95, 88, 80, '%', 'monthly', 'Security', 'up', '750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  
  -- Amit Patel's KPIs
  ('850e8400-e29b-41d4-a716-446655440004', 'User Engagement', 'Portal engagement rate', 80, 65, 50, '%', 'monthly', 'Quality', 'up', '750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440002', NOW(), NOW(), NOW()),
  
  -- Sneha Reddy's KPIs
  ('850e8400-e29b-41d4-a716-446655440005', 'User Satisfaction', 'Citizen satisfaction score', 90, 85, 75, '%', 'monthly', 'Quality', 'up', '750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440002', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440006', 'Ticket Resolution', 'Support ticket resolution rate', 95, 88, 70, '%', 'daily', 'Productivity', 'up', '750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440002', NOW(), NOW(), NOW()),
  
  -- Rahul Verma's KPIs
  ('850e8400-e29b-41d4-a716-446655440007', 'Data Accuracy', 'Data quality score', 98, 92, 85, '%', 'monthly', 'Quality', 'up', '750e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440003', NOW(), NOW(), NOW());

-- Verify the setup
SELECT 'Setup complete!' as status;
SELECT u.name, u.email, COUNT(g.id) as goal_count 
FROM users u 
LEFT JOIN goals g ON g."assignedUserId" = u.id 
GROUP BY u.id, u.name, u.email 
ORDER BY goal_count DESC;
