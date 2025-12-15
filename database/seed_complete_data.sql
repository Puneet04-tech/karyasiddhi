-- First, create departments
INSERT INTO departments (id, name, code, ministry, "createdAt", "updatedAt") 
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Digital Infrastructure', 'DI-001', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440002', 'Citizen Services', 'CS-002', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440003', 'Data Governance', 'DG-003', 'Ministry of Electronics and IT', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Update users with departments
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440001' WHERE email IN ('arun.singh@gov.in', 'rajesh.kumar@gov.in', 'priya.sharma@gov.in', 'vikram.singh@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440002' WHERE email IN ('amit.patel@gov.in', 'sneha.reddy@gov.in', 'deepika.roy@gov.in', 'kavita.nair@gov.in');
UPDATE users SET "departmentId" = '650e8400-e29b-41d4-a716-446655440003' WHERE email IN ('rahul.verma@gov.in', 'anita.desai@gov.in', 'suresh.yadav@gov.in', 'manoj.gupta@gov.in', 'pooja.iyer@gov.in');

-- Create sample goals
INSERT INTO goals (id, title, description, type, status, priority, progress, "startDate", "endDate", "departmentId", "assignedUserId", "createdAt", "updatedAt")
VALUES
  -- Rajesh Kumar's goals (High performer - 85%)
  ('750e8400-e29b-41d4-a716-446655440001', 'Digital Platform Modernization', 'Upgrade citizen portal infrastructure', 'Strategic', 'In Progress', 'High', 85, '2024-01-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440002', 'API Integration Project', 'Integrate state systems', 'Operational', 'In Progress', 'Medium', 90, '2024-02-01', '2024-11-30', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
  
  -- Priya Sharma's goals (Medium-High performer - 75%)
  ('750e8400-e29b-41d4-a716-446655440003', 'Security Audit Completion', 'Complete security compliance', 'Operational', 'In Progress', 'High', 75, '2024-01-15', '2024-10-15', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440004', 'Training Program', 'Staff development initiative', 'Development', 'In Progress', 'Medium', 70, '2024-03-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
  
  -- Amit Patel's goals (Medium performer - 60%)
  ('750e8400-e29b-41d4-a716-446655440005', 'Service Portal Enhancement', 'Improve user experience', 'Operational', 'In Progress', 'Medium', 60, '2024-02-01', '2024-11-30', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440006', 'Mobile App Development', 'Launch citizen services app', 'Strategic', 'In Progress', 'High', 55, '2024-01-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
  
  -- Sneha Reddy's goals (High performer - 88%)
  ('750e8400-e29b-41d4-a716-446655440007', 'Customer Support System', 'Deploy new helpdesk', 'Operational', 'Completed', 'High', 100, '2024-01-01', '2024-06-30', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440008', 'Feedback Analysis', 'Implement citizen feedback system', 'Operational', 'In Progress', 'Medium', 75, '2024-04-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
  
  -- Vikram Singh's goals (Low performer - 45%)
  ('750e8400-e29b-41d4-a716-446655440009', 'Documentation Update', 'Update technical documentation', 'Operational', 'In Progress', 'Low', 40, '2024-03-01', '2024-09-30', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440010', 'Process Automation', 'Automate reporting workflows', 'Operational', 'Not Started', 'Medium', 50, '2024-05-01', '2024-12-31', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', NOW(), NOW()),
  
  -- Rahul Verma's goals (Medium performer - 62%)
  ('750e8400-e29b-41d4-a716-446655440011', 'Data Quality Initiative', 'Improve data accuracy', 'Operational', 'In Progress', 'High', 65, '2024-02-01', '2024-10-31', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', NOW(), NOW()),
  ('750e8400-e29b-41d4-a716-446655440012', 'Privacy Compliance', 'GDPR compliance project', 'Strategic', 'In Progress', 'High', 60, '2024-01-15', '2024-12-15', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', NOW(), NOW());

-- Create sample KPIs
INSERT INTO kpis (id, name, description, target, current, baseline, unit, frequency, category, trend, "goalId", "lastUpdated", "createdAt", "updatedAt")
VALUES
  ('850e8400-e29b-41d4-a716-446655440001', 'API Response Time', 'Average API response time', 200, 180, 250, 'ms', 'Daily', 'Performance', 'Up', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440002', 'System Uptime', 'Platform availability', 99.9, 99.5, 98.0, '%', 'Daily', 'Reliability', 'Stable', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440003', 'User Satisfaction', 'Citizen satisfaction score', 90, 85, 75, '%', 'Monthly', 'Quality', 'Up', '750e8400-e29b-41d4-a716-446655440007', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440004', 'Security Score', 'Security compliance rating', 95, 88, 80, '%', 'Monthly', 'Security', 'Up', '750e8400-e29b-41d4-a716-446655440003', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440005', 'Service Requests', 'Monthly service requests processed', 1000, 850, 600, 'count', 'Monthly', 'Productivity', 'Up', '750e8400-e29b-41d4-a716-446655440005', NOW(), NOW(), NOW());

SELECT 'Data seeded successfully!' as message;
SELECT COUNT(*) as total_goals FROM goals;
SELECT COUNT(*) as total_kpis FROM kpis;
SELECT name, email, "departmentId" FROM users WHERE "departmentId" IS NOT NULL LIMIT 5;
