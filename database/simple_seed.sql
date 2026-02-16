-- Simple seed data that should work
-- Run this with: psql -U karyasiddhi_user -d karyasiddhi -f database\simple_seed.sql

-- First check what we have
SELECT 'Current user count:' as info, COUNT(*) as count FROM users;

-- Show current users
SELECT id, name, email, role FROM users ORDER BY role DESC, name LIMIT 5;
