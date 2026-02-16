-- Insert remaining 8 employees
INSERT INTO users (id, name, email, password, role, designation, "createdAt", "updatedAt") 
VALUES 
  ('550e8400-e29b-41d4-a716-446655440006', 'Vikram Singh', 'vikram.singh@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Section Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440007', 'Deepika Roy', 'deepika.roy@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Assistant Director', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440008', 'Rahul Verma', 'rahul.verma@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Deputy Director', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440009', 'Anita Desai', 'anita.desai@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Senior Analyst', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440010', 'Suresh Yadav', 'suresh.yadav@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Program Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440011', 'Kavita Nair', 'kavita.nair@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Technical Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440012', 'Manoj Gupta', 'manoj.gupta@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Research Officer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440013', 'Pooja Iyer', 'pooja.iyer@gov.in', '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeK5YqK5YqK5YqK5YqK5YqK5YqK5YqK5Y', 'Employee', 'Administrative Officer', NOW(), NOW());

-- Show all users
SELECT name, email, role, designation FROM users ORDER BY role DESC, name;
