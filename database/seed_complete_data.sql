-- KaryaSiddhi - Complete Data Seeding Script
-- Compatible with: Supabase, Render, Neon, and all PostgreSQL databases
-- Run this AFTER init.sql to populate with sample data
-- This script cleans existing data and inserts fresh sample data

-- Step 1: Clean existing data (respecting foreign key constraints)
-- Delete in reverse order of dependencies
DELETE FROM activities;
DELETE FROM kpis;
DELETE FROM goals;
DELETE FROM users;
DELETE FROM departments;

-- Step 2: Insert users with specific UUIDs (password: TestUser@2025)
INSERT INTO users (id, name, email, password, role, designation, employee_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Arun Singh', 'arun.singh@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'manager', 'Director', 'EMP001'),
('550e8400-e29b-41d4-a716-446655440002', 'Rajesh Kumar', 'rajesh.kumar@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Senior Officer', 'EMP002'),
('550e8400-e29b-41d4-a716-446655440003', 'Priya Sharma', 'priya.sharma@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Officer', 'EMP003'),
('550e8400-e29b-41d4-a716-446655440004', 'Amit Patel', 'amit.patel@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Manager', 'EMP004'),
('550e8400-e29b-41d4-a716-446655440005', 'Sneha Reddy', 'sneha.reddy@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Senior Officer', 'EMP005'),
('550e8400-e29b-41d4-a716-446655440006', 'Vikram Singh', 'vikram.singh@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Officer', 'EMP006'),
('550e8400-e29b-41d4-a716-446655440007', 'Deepika Roy', 'deepika.roy@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Team Lead', 'EMP007'),
('550e8400-e29b-41d4-a716-446655440008', 'Rahul Verma', 'rahul.verma@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Analyst', 'EMP008'),
('550e8400-e29b-41d4-a716-446655440009', 'Anita Desai', 'anita.desai@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Senior Analyst', 'EMP009'),
('550e8400-e29b-41d4-a716-446655440010', 'Suresh Yadav', 'suresh.yadav@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Data Officer', 'EMP010'),
('550e8400-e29b-41d4-a716-446655440011', 'Kavita Nair', 'kavita.nair@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Manager', 'EMP011'),
('550e8400-e29b-41d4-a716-446655440012', 'Manoj Gupta', 'manoj.gupta@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Data Analyst', 'EMP012'),
('550e8400-e29b-41d4-a716-446655440013', 'Pooja Iyer', 'pooja.iyer@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'employee', 'Junior Analyst', 'EMP013');

-- Step 3: Create departments
INSERT INTO departments (id, name, code, ministry, created_at, updated_at) 
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Digital Infrastructure', 'DI-001', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440002', 'Citizen Services', 'CS-002', 'Ministry of Electronics and IT', NOW(), NOW()),
  ('650e8400-e29b-41d4-a716-446655440003', 'Data Governance', 'DG-003', 'Ministry of Electronics and IT', NOW(), NOW());

-- Step 4: Update users with departments
UPDATE users SET department_id = '650e8400-e29b-41d4-a716-446655440001' WHERE email IN ('arun.singh@gov.in', 'rajesh.kumar@gov.in', 'priya.sharma@gov.in', 'vikram.singh@gov.in');
UPDATE users SET department_id = '650e8400-e29b-41d4-a716-446655440002' WHERE email IN ('amit.patel@gov.in', 'sneha.reddy@gov.in', 'deepika.roy@gov.in', 'kavita.nair@gov.in');
UPDATE users SET department_id = '650e8400-e29b-41d4-a716-446655440003' WHERE email IN ('rahul.verma@gov.in', 'anita.desai@gov.in', 'suresh.yadav@gov.in', 'manoj.gupta@gov.in', 'pooja.iyer@gov.in');

-- Step 5: Create sample goals
INSERT INTO goals (id, title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id, created_at, updated_at)
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
  ('750e8400-e29b-41d4-a716-446655440012', 'Privacy Compliance', 'GDPR compliance project', 'Strategic', 'In Progress', 'High', 60, '2024-01-15', '2024-12-15', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Step 6: Create sample KPIs
INSERT INTO kpis (id, name, description, target, current, baseline, unit, frequency, category, trend, goal_id, last_updated, created_at, updated_at)
VALUES
  ('850e8400-e29b-41d4-a716-446655440001', 'API Response Time', 'Average API response time', 200, 180, 250, 'ms', 'Daily', 'Performance', 'Up', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440002', 'System Uptime', 'Platform availability', 99.9, 99.5, 98.0, '%', 'Daily', 'Reliability', 'Stable', '750e8400-e29b-41d4-a716-446655440001', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440003', 'User Satisfaction', 'Citizen satisfaction score', 90, 85, 75, '%', 'Monthly', 'Quality', 'Up', '750e8400-e29b-41d4-a716-446655440007', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440004', 'Security Score', 'Security compliance rating', 95, 88, 80, '%', 'Monthly', 'Security', 'Up', '750e8400-e29b-41d4-a716-446655440003', NOW(), NOW(), NOW()),
  ('850e8400-e29b-41d4-a716-446655440005', 'Service Requests', 'Monthly service requests processed', 1000, 850, 600, 'count', 'Monthly', 'Productivity', 'Up', '750e8400-e29b-41d4-a716-446655440005', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Step 7: Verification queries
SELECT 'Data seeded successfully!' as message;
SELECT COUNT(*) as total_goals FROM goals;
SELECT COUNT(*) as total_kpis FROM kpis;
SELECT name, email, department_id FROM users WHERE department_id IS NOT NULL LIMIT 5;
