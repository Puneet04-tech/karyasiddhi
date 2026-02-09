-- Test achievements data
SELECT 
    email,
    CASE 
        WHEN achievements IS NOT NULL THEN jsonb_array_length(achievements)
        ELSE 0 
    END as achievement_count,
    achievements
FROM users 
WHERE email = 'arun.singh@gov.in';
