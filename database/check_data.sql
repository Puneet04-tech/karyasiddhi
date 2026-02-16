-- Check if we have the right data

SELECT 'Users with goals:' as check_type, COUNT(DISTINCT u.id) as count
FROM users u
INNER JOIN goals g ON g."assignedUserId" = u.id;

SELECT 'Sample user-goal mapping:' as info;
SELECT u.name, u.email, u.role, d.name as department, COUNT(g.id) as goal_count
FROM users u
LEFT JOIN departments d ON u."departmentId" = d.id
LEFT JOIN goals g ON g."assignedUserId" = u.id
GROUP BY u.id, u.name, u.email, u.role, d.name
ORDER BY goal_count DESC
LIMIT 10;
