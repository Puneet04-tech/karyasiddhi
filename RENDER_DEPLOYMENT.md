# 🚀 KaryaSiddhi - Render Deployment Guide

## Quick Deploy to Render

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Prepare for Render deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/karyasiddhi.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `karyasiddhi` repo

3. **Configure Service** (Auto-detected from render.yaml)
   - Name: `karyasiddhi-backend`
   - Region: Singapore
   - Branch: `main`
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm run start:prod`

4. **Add Environment Variables**
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `DATABASE_URL` | `postgresql://postgres:37THWYPzsr5uGzTm@db.luqbzidwcqzjldaorkyo.supabase.co:5432/postgres` |
   | `JWT_SECRET` | `your-super-secret-jwt-key-change-in-production` |
   | `CORS_ORIGIN` | `https://your-frontend.netlify.app,http://localhost:5173` |

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment

### Step 3: Test Your Deployment

Your backend will be available at: `https://karyasiddhi-backend.onrender.com`

Test it:
```bash
curl https://karyasiddhi-backend.onrender.com/api/users
```

### Step 4: Update Frontend

Update `frontend/.env`:
```env
VITE_API_URL=https://karyasiddhi-backend.onrender.com/api
```

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Cold Starts**: Service spins down after 15 minutes of inactivity
- **Wake-up Time**: First request after sleep takes 30-60 seconds
- **Compute**: 750 hours/month free

### Auto-Deploy
- Every push to `main` branch triggers automatic redeployment
- Check "Auto-Deploy" is enabled in Render dashboard

### Monitoring
- **Logs**: Dashboard → Your Service → Logs
- **Metrics**: Dashboard → Your Service → Metrics
- **Health**: `/api/docs` endpoint for Swagger docs

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Ensure `start:prod` script exists

### Database Connection Issues
- Verify `DATABASE_URL` environment variable
- Check Supabase firewall allows Render IPs
- Test: `psql $DATABASE_URL`

### CORS Errors
- Add your frontend URL to `CORS_ORIGIN` env variable
- Format: Comma-separated list (no spaces)
- Example: `https://app.netlify.app,https://app2.netlify.app`

---

## 📚 Next Steps

1. ✅ Backend deployed on Render
2. ⏭️ Deploy frontend on Netlify
3. ⏭️ Update CORS_ORIGIN with frontend URL
4. ⏭️ Test complete application

---

## 🔗 Useful Links

- **Backend URL**: https://karyasiddhi-backend.onrender.com
- **API Docs**: https://karyasiddhi-backend.onrender.com/api/docs
- **Render Dashboard**: https://dashboard.render.com
- **Supabase Dashboard**: https://supabase.com/dashboard
