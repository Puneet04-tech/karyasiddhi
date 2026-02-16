UPDATE users SET password = '$2b$10$FTSu7mos2NWQ8B4y0meUiegMME7Ryx3GoZrIRiv3FzzykHkDLJRgy', "updatedAt" = NOW() WHERE email = 'test@gov.in';
SELECT email, password FROM users WHERE email='test@gov.in';
