-- Bulk reset seeded users' passwords to TestUser@2025
-- Uses bcrypt hash previously generated and used for test@gov.in

UPDATE users
SET password = '$2b$10$FTSu7mos2NWQ8B4y0meUiegMME7Ryx3GoZrIRiv3FzzykHkDLJRgy',
    "updatedAt" = NOW()
WHERE email IN (
  'arun.singh@gov.in',
  'rajesh.kumar@gov.in',
  'priya.sharma@gov.in',
  'vikram.singh@gov.in',
  'amit.patel@gov.in',
  'sneha.reddy@gov.in',
  'deepika.roy@gov.in',
  'kavita.nair@gov.in',
  'rahul.verma@gov.in',
  'anita.desai@gov.in',
  'suresh.yadav@gov.in',
  'manoj.gupta@gov.in',
  'pooja.iyer@gov.in'
);

-- Show results
SELECT email, id FROM users WHERE email IN (
  'arun.singh@gov.in',
  'rajesh.kumar@gov.in',
  'priya.sharma@gov.in',
  'vikram.singh@gov.in',
  'amit.patel@gov.in',
  'sneha.reddy@gov.in',
  'deepika.roy@gov.in',
  'kavita.nair@gov.in',
  'rahul.verma@gov.in',
  'anita.desai@gov.in',
  'suresh.yadav@gov.in',
  'manoj.gupta@gov.in',
  'pooja.iyer@gov.in'
) ORDER BY email;
