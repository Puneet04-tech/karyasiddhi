# User Achievements Implementation - Setup Guide

## Overview
This implementation adds unique, personalized achievements to each user profile. Each user now has a different set of achievements based on their role, designation, and performance level.

## Changes Made

### 1. Backend Changes

#### User Entity (`backend/src/users/user.entity.ts`)
- Added `achievements` field as JSONB column to store array of achievement objects
- Each achievement contains: id, title, icon, color, earnedAt

### 2. Database Changes

#### Files Created:
1. **`database/add_achievements_column.sql`** - Adds the achievements column
2. **`database/seed_user_achievements.sql`** - Seeds unique achievements for each user
3. **`database/setup_unique_achievements.sql`** - Complete setup script (recommended)

### 3. Frontend Changes

#### Profile Component (`frontend/src/pages/Profile.tsx`)
- Imported additional icons (Users, Zap, Trophy, Star, Heart, Briefcase, BookOpen, Rocket)
- Added icon mapping to convert string icon names to React components
- Updated to display user-specific achievements from backend
- Shows earned date for each achievement
- Displays message when no achievements exist

#### Auth Store (`frontend/src/store/authStore.ts`)
- Added `Achievement` interface with proper typing
- Updated `User` interface to include optional `achievements` array

## How to Apply Changes

### Step 1: Update Database
Run the complete setup script in your PostgreSQL database:

\`\`\`bash
psql -U karyasiddhi_user -d karyasiddhi -f database/setup_unique_achievements.sql
\`\`\`

Or connect to your database and run:
\`\`\`bash
docker-compose exec postgres psql -U karyasiddhi_user -d karyasiddhi -f /docker-entrypoint-initdb.d/setup_unique_achievements.sql
\`\`\`

### Step 2: Rebuild Backend
The TypeScript backend needs to be recompiled:

\`\`\`bash
cd backend
npm run build
# or for development
npm run start:dev
\`\`\`

### Step 3: Restart Services
Restart your services to apply changes:

\`\`\`bash
docker-compose restart backend
# or restart all services
docker-compose down
docker-compose up -d
\`\`\`

### Step 4: Clear Frontend Cache (if needed)
If using development mode:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

## Achievement Distribution

Each user now has unique achievements:

- **arun.singh@gov.in**: Visionary Leader, Strategic Planner, Department Champion (3)
- **rajesh.kumar@gov.in**: Goal Crusher, Performance Star, Innovation Driver (3)
- **priya.sharma@gov.in**: Security Guardian, Team Mentor, Excellence Award (3)
- **vikram.singh@gov.in**: Dedicated Worker, Team Player (2)
- **amit.patel@gov.in**: Project Leader, Delivery Master, Client Satisfaction (3)
- **sneha.reddy@gov.in**: Goal Achiever, Customer Champion, 100% Completion, Service Excellence (4)
- **deepika.roy@gov.in**: Team Leader, Collaboration Pro, Knowledge Sharer (3)
- **kavita.nair@gov.in**: Data Expert, Insight Generator, Quality Champion (3)
- **rahul.verma@gov.in**: Compliance Expert, Process Improver (2)
- **anita.desai@gov.in**: Data Guardian, Analytics Pro, Best Practice Leader (3)
- **suresh.yadav@gov.in**: Rising Star, Quick Learner (2)
- **manoj.gupta@gov.in**: Detail Oriented, Problem Solver, Team Contributor (3)
- **pooja.iyer@gov.in**: Fast Starter, Eager Learner (2)

## Available Achievement Icons

The following icons are supported (from lucide-react):
- Award, Target, TrendingUp, Users, Zap, Shield
- Trophy, Star, Heart, Briefcase, BookOpen, Rocket

## Customization

### Adding New Achievements
To add new achievements for a user:

\`\`\`sql
UPDATE users 
SET achievements = achievements || '[
  {"id": 5, "title": "New Achievement", "icon": "Star", "color": "text-blue-500", "earnedAt": "2024-12-15"}
]'::jsonb
WHERE email = 'user@gov.in';
\`\`\`

### Adding New Icon Types
1. Import the icon in `Profile.tsx`:
   \`\`\`typescript
   import { NewIcon } from 'lucide-react';
   \`\`\`

2. Add to iconMap:
   \`\`\`typescript
   const iconMap = {
     // ... existing icons
     NewIcon,
   };
   \`\`\`

## Verification

After applying changes, verify:

1. **Database**: Check if achievements column exists and is populated
   \`\`\`sql
   SELECT email, jsonb_array_length(achievements) as count 
   FROM users 
   WHERE achievements IS NOT NULL;
   \`\`\`

2. **Backend**: Ensure the backend returns achievements in user objects
   - Check `/api/auth/me` endpoint
   - Check `/api/users/:id` endpoint

3. **Frontend**: Login with different users and verify each has unique achievements

## Troubleshooting

### Achievements not showing?
1. Verify database column exists: `\d users` in psql
2. Check backend logs for errors
3. Verify user object in browser console: `console.log(user)`
4. Clear browser localStorage and login again

### Icons not displaying correctly?
1. Verify icon name matches exactly (case-sensitive)
2. Check if icon is imported in Profile.tsx
3. Fallback to Award icon if not found

### Need to reset?
\`\`\`sql
-- Remove all achievements
UPDATE users SET achievements = NULL;

-- Re-run the seed script
\i database/seed_user_achievements.sql
\`\`\`

## Future Enhancements

Consider implementing:
1. Achievement earning system based on goal completion
2. Achievement categories (Performance, Leadership, Innovation, etc.)
3. Rare/special achievements with different visual styles
4. Achievement notifications when earned
5. Leaderboard showing top achievers
6. Achievement descriptions and criteria
