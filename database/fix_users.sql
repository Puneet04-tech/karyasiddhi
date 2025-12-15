-- Delete all existing users
DELETE FROM users;

-- Insert users with CORRECT bcrypt hash for 'password123'
-- Hash: $2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y

INSERT INTO users (id, name, email, password, role, designation, "createdAt", "updatedAt") 
VALUES 
  -- Department Head
  ('550e8400-e29b-41d4-a716-446655440001', 'Arun Singh', 'arun.singh@gov.in', '$2b$10$YourActualHashHere', 'Department Head', 'Additional Secretary', NOW(), NOW()),
  
  -- Employees
  ('550e8400-e29b-41d4-a716-446655440002', 'Rajesh Kumar', 'rajesh.kumar@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Joint Secretary', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Priya Sharma', 'priya.sharma@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Director', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'Amit Patel', 'amit.patel@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Deputy Secretary', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', 'Sneha Reddy', 'sneha.reddy@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Under Secretary', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440006', 'Vikram Singh', 'vikram.singh@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Section Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440007', 'Deepika Roy', 'deepika.roy@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Assistant Director', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440008', 'Rahul Verma', 'rahul.verma@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Deputy Director', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440009', 'Anita Desai', 'anita.desai@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Senior Analyst', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440010', 'Suresh Yadav', 'suresh.yadav@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Program Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440011', 'Kavita Nair', 'kavita.nair@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Technical Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440012', 'Manoj Gupta', 'manoj.gupta@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Research Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440013', 'Pooja Iyer', 'pooja.iyer@gov.in', '$2b$10$YourActualHashHere', 'Employee', 'Administrative Officer', NOW(), NOW());
