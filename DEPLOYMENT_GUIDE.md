# KaryaSiddhi - Complete Deployment Guide

## 🚀 Overview
Deploy your full-stack application globally with database, backend, and frontend accessible to anyone.

---

## ⚡ Option 1: Railway (Recommended - Easiest)

**Cost:** $5/month (includes everything)
**Time:** 15-20 minutes
**Best for:** Quick deployment, automatic CI/CD

### Step 1: Deploy Database (PostgreSQL)

1. **Sign up at [Railway.app](https://railway.app)**
   - Login with GitHub

2. **Create New Project** → **Provision PostgreSQL**
   - Railway automatically creates a PostgreSQL database
   - Copy the connection details (provided automatically)

3. **Run Database Migrations**
   ```bash
   # Connect to Railway database and run init script
   psql $DATABASE_URL -f database/init.sql
   psql $DATABASE_URL -f database/seed_complete_data.sql
   psql $DATABASE_URL -f database/setup_unique_achievements.sql
   ```

### Step 2: Deploy Backend (NestJS)

1. **In Railway → New Service → GitHub Repo**
   - Select your repository
   - Set Root Directory: `/backend`

2. **Configure Environment Variables**
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_HOST=${{Postgres.HOST}}
   DATABASE_PORT=${{Postgres.PORT}}
   DATABASE_USER=${{Postgres.USER}}
   DATABASE_PASSWORD=${{Postgres.PASSWORD}}
   DATABASE_NAME=${{Postgres.DATABASE}}
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

3. **Configure Build Settings**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

4. **Deploy** → Railway will provide a public URL: `https://your-backend.up.railway.app`

### Step 3: Deploy Frontend (Vercel)

1. **Sign up at [Vercel.com](https://vercel.com)**
   - Login with GitHub

2. **Import Repository**
   - Select your repository
   - Framework Preset: **Vite**
   - Root Directory: `frontend`

3. **Configure Environment Variables**
   ```env
   VITE_API_URL=https://your-backend.up.railway.app
   ```

4. **Build Settings (Auto-detected)**
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Deploy** → Vercel provides: `https://karyasiddhi.vercel.app`

### Step 4: Update Backend CORS

Update `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: ['https://karyasiddhi.vercel.app', 'http://localhost:5173'],
  credentials: true,
});
```

**✅ Done! Share:** `https://karyasiddhi.vercel.app`

---

## 🔷 Option 2: Render (Free Tier Available)

**Cost:** Free tier available (limited)
**Time:** 20-25 minutes

### Step 1: Deploy Database

1. **Sign up at [Render.com](https://render.com)**

2. **New PostgreSQL**
   - Name: `karyasiddhi-db`
   - Database: `karyasiddhi`
   - User: `karyasiddhi_user`
   - Region: Choose nearest
   - Plan: **Free** (limited) or **Starter ($7/mo)**

3. **Connect and Initialize**
   ```bash
   psql postgresql://user:pass@host/database -f database/init.sql
   psql postgresql://user:pass@host/database -f database/seed_complete_data.sql
   psql postgresql://user:pass@host/database -f database/setup_unique_achievements.sql
   ```

### Step 2: Deploy Backend

1. **New Web Service**
   - Connect GitHub repository
   - Root Directory: `backend`
   - Environment: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

2. **Environment Variables**
   ```env
   NODE_ENV=production
   DATABASE_URL=${{karyasiddhi-db.DATABASE_URL}}
   JWT_SECRET=your-secret-key-here
   PORT=3000
   ```

3. **Deploy** → Get URL: `https://karyasiddhi-api.onrender.com`

### Step 3: Deploy Frontend (Vercel or Render)

**On Vercel:** (Same as Option 1 Step 3)

**On Render:**
1. **New Static Site**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Environment Variables**
   ```env
   VITE_API_URL=https://karyasiddhi-api.onrender.com
   ```

---

## 🌊 Option 3: DigitalOcean App Platform

**Cost:** $12/month (all services)
**Time:** 25-30 minutes
**Best for:** Professional deployment, better performance

### Step 1: Deploy Database

1. **Sign up at [DigitalOcean](https://digitalocean.com)**
   - Get $200 free credit (with referral)

2. **Databases → Create Database**
   - PostgreSQL 15
   - Plan: Basic ($15/mo) or Dev ($7/mo)
   - Region: Choose nearest
   - Database Name: `karyasiddhi`

3. **Initialize Database**
   ```bash
   psql -h host -U doadmin -d karyasiddhi -f database/init.sql
   psql -h host -U doadmin -d karyasiddhi -f database/seed_complete_data.sql
   psql -h host -U doadmin -d karyasiddhi -f database/setup_unique_achievements.sql
   ```

### Step 2: Deploy Backend & Frontend

1. **Apps → Create App → GitHub**
   - Select repository

2. **Backend Component**
   - Type: **Web Service**
   - Source Directory: `/backend`
   - Build Command: `npm install && npm run build`
   - Run Command: `npm run start:prod`
   - HTTP Port: 3000

3. **Frontend Component**
   - Type: **Static Site**
   - Source Directory: `/frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`

4. **Environment Variables** (Backend)
   ```env
   DATABASE_URL=${db.DATABASE_URL}
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

5. **Environment Variables** (Frontend)
   ```env
   VITE_API_URL=${backend.PUBLIC_URL}
   ```

**✅ App URL:** `https://karyasiddhi-xyz.ondigitalocean.app`

---

## 🔥 Option 4: Full AWS Deployment (Production Grade)

**Cost:** ~$30-50/month
**Time:** 1-2 hours
**Best for:** Enterprise, high traffic

### Services:
- **Database:** AWS RDS PostgreSQL
- **Backend:** AWS Elastic Beanstalk or ECS
- **Frontend:** AWS S3 + CloudFront CDN
- **Domain:** Route 53

### Quick Setup:

1. **RDS PostgreSQL**
   - t3.micro instance ($15/mo)
   - Enable public access for initialization
   - Security group: Allow port 5432

2. **Elastic Beanstalk (Backend)**
   - Node.js platform
   - Upload backend as .zip
   - Set environment variables

3. **S3 + CloudFront (Frontend)**
   - Create S3 bucket
   - Upload `dist` folder
   - Create CloudFront distribution
   - Point to S3 bucket

---

## 🛠️ Required Code Changes

### 1. Update API URL in Frontend

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com
```

### 2. Update Backend CORS

`backend/src/main.ts`:
```typescript
app.enableCors({
  origin: [
    'https://your-frontend-url.com',
    'http://localhost:5173',
  ],
  credentials: true,
});
```

### 3. Production Environment File

Create `backend/.env.production`:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/database
JWT_SECRET=super-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
- **NEVER** commit `.env` files
- Use platform-provided secrets management
- Generate strong JWT secrets: `openssl rand -base64 32`

### 2. Database
- Enable SSL connections in production
- Use strong passwords (Railway/Render generate these)
- Regular backups (enable on platform)

### 3. CORS
- Only allow your frontend domain
- Remove `localhost` from production CORS

### 4. Rate Limiting
Already configured in your backend (`@nestjs/throttler`)

---

## 📊 Cost Comparison

| Platform | Database | Backend | Frontend | Total/Month |
|----------|----------|---------|----------|-------------|
| **Railway + Vercel** | $5 | Included | Free | **$5** |
| **Render** | Free/$7 | Free/$7 | Free | **Free-$14** |
| **DigitalOcean** | $7 | $5 | Free | **$12** |
| **AWS** | $15 | $15 | $2 | **$32** |

---

## 🚀 Quick Start (Railway + Vercel)

### Prerequisites
```bash
# Install Railway CLI (optional)
npm install -g @railway/cli

# Install Vercel CLI (optional)
npm install -g vercel
```

### Deploy in 5 Steps

1. **Database (Railway)**
   ```bash
   # Login
   railway login
   
   # Create project and add PostgreSQL
   railway init
   railway add postgresql
   
   # Get connection string
   railway variables
   ```

2. **Backend (Railway)**
   ```bash
   cd backend
   railway up
   # Set environment variables in Railway dashboard
   ```

3. **Frontend (Vercel)**
   ```bash
   cd frontend
   vercel
   # Follow prompts, set VITE_API_URL
   ```

4. **Run Migrations**
   ```bash
   # Use Railway's psql or connect directly
   railway connect postgres
   \i /path/to/init.sql
   \i /path/to/seed_complete_data.sql
   \i /path/to/setup_unique_achievements.sql
   ```

5. **Share URL** 🎉
   - Frontend: `https://karyasiddhi.vercel.app`
   - Share test credentials:
     - Email: `arun.singh@gov.in`
     - Password: `TestUser@2025`

---

## 📝 Post-Deployment Checklist

- [ ] Database initialized with all tables
- [ ] Seed data loaded (users, departments, goals, KPIs)
- [ ] Achievements data loaded
- [ ] Backend health check: `GET /api/health`
- [ ] Frontend loads without errors
- [ ] Login works with test credentials
- [ ] All API calls work (check Network tab)
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled (automatic on platforms)

---

## 🐛 Troubleshooting

### Database Connection Issues
```typescript
// Add to backend/src/app.module.ts
TypeOrmModule.forRoot({
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // ... other config
})
```

### Frontend Can't Connect to Backend
1. Check `VITE_API_URL` is correct
2. Verify backend CORS allows frontend domain
3. Check browser console for errors
4. Ensure backend is running (visit /api/health)

### Build Failures
```bash
# Backend: Ensure all dependencies in package.json
npm install --production

# Frontend: Check for TypeScript errors
npm run build
```

---

## 🎯 Recommended: Railway + Vercel

**Why?**
- ✅ Easiest setup (20 minutes)
- ✅ Automatic deployments on git push
- ✅ Affordable ($5/month)
- ✅ Great developer experience
- ✅ Built-in monitoring
- ✅ Free SSL certificates
- ✅ Global CDN

**Steps:**
1. Deploy database on Railway (3 min)
2. Deploy backend on Railway (5 min)
3. Deploy frontend on Vercel (5 min)
4. Run database migrations (5 min)
5. Test and share! (2 min)

---

## 📞 Support & Resources

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **DigitalOcean Docs:** https://docs.digitalocean.com

---

## 🎉 After Deployment

Your app will be accessible at:
- **Frontend:** `https://karyasiddhi.vercel.app`
- **Backend API:** `https://karyasiddhi-api.up.railway.app`

**Share with others:**
```
Website: https://karyasiddhi.vercel.app
Email: arun.singh@gov.in
Password: TestUser@2025
```

**Test all features:**
- ✅ Login/Logout
- ✅ Dashboard with stats
- ✅ Goals management
- ✅ KPIs tracking
- ✅ Analytics & AI insights
- ✅ Team rankings
- ✅ Profile with achievements
- ✅ Manager features (All Accounts, Manage Employees)

---

Made with ❤️ for Digital India Initiative
