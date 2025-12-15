# 🚀 KaryaSiddhi - Render + Netlify Deployment Guide

## Overview
Deploy your application using **Render** (Backend + Database) and **Netlify** (Frontend)

**Cost:** FREE for 90 days (testing only), then $14/month for production
**Time:** 20-25 minutes
**Best for:** Cost-effective deployment with good free tier for testing

⚠️ **IMPORTANT:** Render's free database expires after 90 days and STOPS working entirely. For production use, upgrade to paid plan ($7/month for database).

---

## ✨ What You'll Get

- 🗄️ **PostgreSQL Database** on Render (Free tier: 90 days, then $7/mo)
- 🔧 **NestJS Backend** on Render (Free tier available with cold starts)
- ⚛️ **React Frontend** on Netlify (100GB bandwidth free)
- 🌍 **Global CDN** via Netlify
- 🔒 **Free SSL/HTTPS** on both platforms
- 🔄 **Auto-deployments** from GitHub

---

## 📋 Prerequisites

1. GitHub account with your code pushed
2. [Render account](https://render.com) (sign up free)
3. [Netlify account](https://netlify.com) (sign up free)
4. PostgreSQL client installed locally (for database setup)

---

## Step 1: Deploy PostgreSQL Database on Render

### 1.1 Create Database

⚠️ **CRITICAL DECISION:** Choose your plan carefully!
- **Free:** Only for testing/demo. Database EXPIRES and STOPS after 90 days.
- **Starter ($7/mo):** For production. Unlimited duration, daily backups.

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **PostgreSQL**
3. Configure:
   - **Name:** `karyasiddhi-db`
   - **Database:** `karyasiddhi`
   - **User:** `karyasiddhi_user` (auto-generated)
   - **Region:** Choose closest to your users (e.g., Singapore, Frankfurt, Oregon)
   - **PostgreSQL Version:** 15
   - **Plan:** 
     - **Free** (⚠️ EXPIRES after 90 days and STOPS working - testing/demo ONLY)
     - **Starter** ($7/month - REQUIRED for production use)

4. Click **Create Database**
5. Wait 2-3 minutes for provisioning

### 1.2 Get Database Credentials

Once created, you'll see:
- **Internal Database URL:** `postgresql://user:pass@hostname/database` (for backend)
- **External Database URL:** `postgresql://user:pass@hostname/database` (for local connection)
- **PSQL Command:** Ready to copy

### 1.3 Initialize Database

**Option A: Using External Connection (from your PC)**

```powershell
# Copy the External Database URL from Render
$env:DATABASE_URL = "postgresql://karyasiddhi_user:password@dpg-xxxxx.render.com/karyasiddhi"

# Run migration scripts
psql $env:DATABASE_URL -f database/init.sql
psql $env:DATABASE_URL -f database/seed_complete_data.sql
psql $env:DATABASE_URL -f database/setup_unique_achievements.sql
```

**Option B: Using Render Shell**

1. In Render Dashboard → Your Database → **Shell** tab
2. Paste contents of each SQL file and execute

### 1.4 Verify Data

```sql
-- In Render Shell or locally
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM goals;
SELECT COUNT(*) FROM kpis;
```

You should see seeded data.

---

## Step 2: Deploy Backend on Render

### 2.1 Create Web Service

1. Render Dashboard → **New +** → **Web Service**
2. **Connect GitHub Repository**
   - Authorize Render to access your repo
   - Select `karyasiddhi` repository

3. Configure Service:
   - **Name:** `karyasiddhi-backend`
   - **Region:** Same as database (important for low latency)
   - **Branch:** `main` or `master`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** 
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm run start:prod
     ```
   - **Plan:**
     - **Free** (cold starts after 15 min inactivity - good for demo)
     - **Starter** ($7/month - always on, recommended for production)

### 2.2 Set Environment Variables

In **Environment** section, add:

```env
NODE_ENV=production
DATABASE_URL=${{karyasiddhi-db.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this
PORT=10000
```

**Important Notes:**
- `${{karyasiddhi-db.DATABASE_URL}}` automatically links to your database
- Change `JWT_SECRET` to a strong random string (minimum 32 characters)
- Port `10000` is Render's default (don't change)

### 2.3 Deploy

1. Click **Create Web Service**
2. Render will start building (5-7 minutes first time)
3. Watch logs for any errors
4. Once deployed, you'll get a URL: `https://karyasiddhi-backend.onrender.com`

### 2.4 Test Backend

```powershell
# Test health endpoint
curl https://karyasiddhi-backend.onrender.com

# Test login
curl -X POST https://karyasiddhi-backend.onrender.com/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"arun.singh@gov.in","password":"TestUser@2025"}'
```

You should get a JWT token back.

---

## Step 3: Deploy Frontend on Netlify

### 3.1 Create Site

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. **Connect to Git provider** → Select **GitHub**
4. Authorize Netlify and select `karyasiddhi` repository

### 3.2 Configure Build Settings

- **Branch to deploy:** `main` or `master`
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `frontend/dist`

### 3.3 Set Environment Variables

In **Site settings** → **Environment variables**:

```env
VITE_API_URL=https://karyasiddhi-backend.onrender.com
```

⚠️ **Important:** Replace with YOUR actual Render backend URL!

### 3.4 Deploy

1. Click **Deploy site**
2. Netlify builds (2-3 minutes)
3. You'll get a random URL like: `https://random-name-12345.netlify.app`

### 3.5 Customize Domain (Optional)

1. **Site settings** → **Domain management** → **Options** → **Edit site name**
2. Change to: `karyasiddhi` → `https://karyasiddhi.netlify.app`
3. Or add custom domain: `yourdomain.com`

---

## Step 4: Update Backend CORS Settings

### 4.1 Add Netlify URL to CORS

Edit [backend/src/main.ts](backend/src/main.ts):

```typescript
app.enableCors({
  origin: [
    'https://karyasiddhi.netlify.app',  // Your Netlify URL
    'http://localhost:5173',             // Local development
    'http://localhost:5174'              // Alternative local port
  ],
  credentials: true,
});
```

### 4.2 Commit and Push

```powershell
git add backend/src/main.ts
git commit -m "Add Netlify domain to CORS"
git push origin main
```

Render will auto-redeploy backend (2-3 minutes).

---

## ✅ Verification & Testing

### Test the Complete Flow

1. **Open Frontend:** `https://karyasiddhi.netlify.app`
2. **Login with test credentials:**
   - Email: `arun.singh@gov.in`
   - Password: `TestUser@2025`
3. **Test features:**
   - View dashboard statistics
   - Create a new goal
   - Check KPI tracking
   - View analytics charts

### Check Logs

**Backend Logs (Render):**
- Dashboard → karyasiddhi-backend → **Logs** tab
- Watch for errors or API calls

**Frontend Logs (Netlify):**
- Dashboard → karyasiddhi → **Deploys** → Click latest deploy → **Deploy log**

---

## 🎉 Share Your Application

**Production URL:** `https://karyasiddhi.netlify.app`

⚠️ **If using FREE tier:** Your database will EXPIRE in 90 days. Upgrade to Starter plan ($7/mo) before expiration to avoid service disruption.

**Test Credentials to Share:**
```
Email: arun.singh@gov.in
Password: TestUser@2025
Role: Manager (can access all features)
```

**User Accounts Available:**
- Manager: arun.singh@gov.in
- Employee: amit.kumar@gov.in (all same password)
- View database/seed_complete_data.sql for more users

---

## 💰 Cost Breakdown

### Free Tier (Testing/Demo ONLY - 90 Days Maximum)
⚠️ **WARNING:** Database STOPS working after 90 days on free tier!
- **Render Database:** FREE for 90 days, then **STOPS PROCESSING**
- **Render Backend:** FREE (with cold starts after 15 min inactivity)
- **Netlify Frontend:** FREE (100GB bandwidth/month)
- **Total:** $0/month for first 90 days
- **After 90 days:** Database expires, app stops working completely

### Production Tier (Recommended for Real Use)
- **Render Database (Starter):** $7/month (unlimited, required after 90 days)
- **Render Backend (Starter):** $7/month (no cold starts, always-on)
- **Netlify (Free Plan):** $0/month
- **Total:** $14/month

### Minimum Production Cost (With Free Backend)
- **Render Database (Starter):** $7/month (required)
- **Render Backend:** FREE (cold starts acceptable)
- **Netlify:** FREE
- **Total:** $7/month (database only)

### Pro Tier (High Traffic)
- **Render Database (Pro):** $20/month
- **Render Backend (Standard):** $25/month
- **Netlify (Pro):** $19/month
- **Total:** $64/month

---

## 🔒 Security Best Practices

### 1. Environment Variables

✅ **DO:**
- Use strong random JWT_SECRET (32+ characters)
- Keep DATABASE_URL secret
- Never commit .env files to git

❌ **DON'T:**
- Use default secrets in production
- Share credentials publicly
- Log sensitive data

### 2. CORS Configuration

Only allow your production domains:
```typescript
origin: ['https://karyasiddhi.netlify.app']
```

### 3. Database Backups

**Render Automatic Backups:**
- Free plan: No backups
- Starter plan: Daily backups (7 days retention)
- Pro plan: Daily backups (30 days retention)

**Manual Backup:**
```powershell
pg_dump $env:DATABASE_URL > backup-$(Get-Date -Format "yyyy-MM-dd").sql
```

### 4. SSL/HTTPS

Both Render and Netlify provide:
- Free automatic SSL certificates
- HTTPS enforced by default
- Auto-renewal of certificates

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: Backend returns 502 Bad Gateway**
- **Cause:** Build failed or startup error
- **Fix:** Check Render logs → Look for `npm` errors → Fix dependencies/code
- **Verify:** Build command and start command are correct

**Problem: "Cannot connect to database"**
- **Cause:** DATABASE_URL incorrect or database not running
- **Fix:** Verify `${{karyasiddhi-db.DATABASE_URL}}` is linked correctly
- **Check:** Database status (should be "Available")

**Problem: "CORS error" in browser console**
- **Cause:** Netlify URL not in CORS whitelist
- **Fix:** Add Netlify URL to `backend/src/main.ts` CORS origin array
- **Commit:** Push changes to trigger redeploy

**Problem: Cold starts (Free tier)**
- **Symptom:** First request takes 30-60 seconds
- **Cause:** Render free tier spins down after 15 min inactivity
- **Solution:** 
  - Upgrade to Starter plan ($7/mo) for always-on
  - Or use external monitoring (ping every 10 min)

### Frontend Issues

**Problem: "Failed to fetch" or API errors**
- **Cause:** VITE_API_URL points to wrong backend
- **Fix:** Netlify → Site settings → Environment variables → Update `VITE_API_URL`
- **Redeploy:** Trigger redeploy after env var change

**Problem: White screen after deploy**
- **Cause:** Build failed or wrong publish directory
- **Fix:** Check build logs → Verify `frontend/dist` exists after build
- **Check:** Build command is `npm run build` (not `npm start`)

**Problem: "Module not found" errors**
- **Cause:** Dependencies not installed
- **Fix:** Ensure `package.json` and `package-lock.json` are committed
- **Verify:** Build command includes `npm install`

### Database Issues

**Problem: Migration scripts fail**
- **Cause:** Syntax error or missing dependencies
- **Fix:** Test scripts locally first: `psql postgres://localhost/test -f database/init.sql`
- **Check:** PostgreSQL version compatibility (using PG 15)

**Problem: "Connection refused"**
- **Cause:** Using internal URL from external location
- **Fix:** Use External Database URL for connections from your PC
- **Note:** Use Internal URL for backend (automatic with `${{...}}`)

**Problem: Database full (Free tier)**
- **Cause:** Free tier has 256MB limit
- **Fix:** Upgrade to Starter ($7/mo, 256MB) or Pro ($20/mo, 256GB)
- **Monitor:** Render dashboard shows storage usage

---

## 🔄 Continuous Deployment

Both platforms support automatic deployments:

### Auto-Deploy on Git Push

1. **Render:** 
   - Automatically rebuilds on `git push` to main branch
   - Can configure deploy hooks for manual trigger
   - Branch deploys available on paid plans

2. **Netlify:**
   - Automatically rebuilds on `git push` to main branch
   - Preview deploys for pull requests (automatic)
   - Deploy contexts for staging/production

### Manual Trigger

**Render:**
- Dashboard → Service → **Manual Deploy** → Select branch → Deploy

**Netlify:**
- Dashboard → Site → **Deploys** → **Trigger deploy** → Deploy site

---

## 📊 Monitoring & Logs

### Render Monitoring

- **Logs:** Real-time streaming logs for backend
- **Metrics:** CPU, Memory, Request count (paid plans)
- **Alerts:** Email notifications for deploy failures

**Access Logs:**
```
Dashboard → karyasiddhi-backend → Logs tab
```

### Netlify Analytics

- **Deploy logs:** Build output and errors
- **Function logs:** If using Netlify Functions
- **Analytics:** Pageviews, bandwidth (paid feature)

**Access Logs:**
```
Dashboard → Site → Deploys → Click deploy → View deploy log
```

### External Monitoring (Optional)

**UptimeRobot (Free):**
- Monitor both frontend and backend
- Get email alerts on downtime
- Ping every 5 minutes

**Setup:**
1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Add monitors:
   - `https://karyasiddhi.netlify.app`
   - `https://karyasiddhi-backend.onrender.com`
3. Configure email alerts

---

## 🚀 Performance Tips

### Backend Optimization (Render)

1. **Enable Keep-Alive:** Already configured in NestJS
2. **Database Connection Pooling:** Already configured in TypeORM
3. **Caching:** Consider Redis add-on for frequent queries
4. **CDN:** Render has built-in CDN for static assets

### Frontend Optimization (Netlify)

1. **Code Splitting:** Already enabled with Vite
2. **Asset Optimization:** Vite auto-minifies JS/CSS
3. **Image Optimization:** Use Netlify Large Media (paid)
4. **Headers:** Configure cache headers in `netlify.toml`

**Create `frontend/netlify.toml`:**
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 🎯 Next Steps

### 1. Custom Domain (Optional)

**Netlify:**
1. Buy domain (Namecheap, Google Domains, etc.)
2. Netlify → Domain settings → Add custom domain
3. Update DNS records as instructed
4. SSL automatically provisioned

**Render:**
1. Render → Service → Settings → Custom Domain
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update DNS CNAME record
4. SSL automatically provisioned

### 2. Set Up Staging Environment

**Create separate instances:**
- Database: `karyasiddhi-staging-db`
- Backend: `karyasiddhi-staging-backend` (deploy from `dev` branch)
- Frontend: Netlify branch deploy (automatic for PRs)

### 3. Add More Users

**Option A: Via API**
- Use Postman or curl to POST `/auth/register`

**Option B: Database SQL**
```sql
INSERT INTO users (email, password, name, role) 
VALUES ('newuser@example.com', '$2b$10$hashed_password', 'New User', 'employee');
```

### 4. Backup Strategy

**Automated Backups:**
```powershell
# Schedule with Windows Task Scheduler
pg_dump $env:DATABASE_URL > "backups/backup-$(Get-Date -Format 'yyyy-MM-dd-HHmm').sql"
```

---

## 📞 Support & Resources

### Documentation
- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **NestJS Docs:** https://docs.nestjs.com
- **Vite Docs:** https://vitejs.dev

### Community
- **Render Community:** https://community.render.com
- **Netlify Community:** https://answers.netlify.com

### Status Pages
- **Render Status:** https://status.render.com
- **Netlify Status:** https://www.netlifystatus.com

---

## ✅ Final Checklist

- [ ] Database created on Render
- [ ] Database initialized with SQL scripts
- [ ] Backend deployed on Render
- [ ] Backend environment variables configured
- [ ] Frontend deployed on Netlify
- [ ] Frontend environment variable set (VITE_API_URL)
- [ ] CORS updated in backend with Netlify URL
- [ ] Login tested with test credentials
- [ ] All features working (goals, KPIs, analytics)
- [ ] URLs shared with intended users

---

## 🎊 Congratulations!

Your KaryaSiddhi application is now live and globally accessible!

**Share these details:**
- **URL:** `https://karyasiddhi.netlify.app`
- **Test Login:** `arun.singh@gov.in` / `TestUser@2025`
- **Features:** Goal tracking, KPI management, Analytics dashboard

Your deployment is complete! 🚀
