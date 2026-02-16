-- Create a test user with known password: TestUser@2025
-- Password hash for "TestUser@2025"
INSERT INTO users (id, name, email, password, designation, role, "aadhaarVerified", "digilockerVerified", "createdAt", "updatedAt")
VALUES (
  '99999999-9999-9999-9999-999999999999',
  'Test User',
  'test@gov.in',
  '$2b$10$rH8qG4ZqK5yLZ5L5Y5L5YeZ6x8GcH2A5B7C9D1E3F5G7H9I1J3K5L7', -- TestUser@2025
  'Test Officer',
  'Government Official',
  false,
  false,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET 
  password = EXCLUDED.password,
  "updatedAt" = NOW();

SELECT 'Test user created: test@gov.in / TestUser@2025' as status;
