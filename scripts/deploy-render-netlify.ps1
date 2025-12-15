# KaryaSiddhi - Render + Netlify Deployment Script
# This script helps deploy your application to Render (Backend + DB) and Netlify (Frontend)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   KaryaSiddhi Deployment Automation" -ForegroundColor Cyan
Write-Host "   Render + Netlify Stack" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if required CLIs are installed
function Test-CLI {
    param([string]$Command, [string]$Name, [string]$InstallCmd)
    
    Write-Host "Checking for $Name..." -ForegroundColor Yellow
    if (Get-Command $Command -ErrorAction SilentlyContinue) {
        Write-Host "✓ $Name found" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Name not found" -ForegroundColor Red
        Write-Host "  Install with: $InstallCmd" -ForegroundColor Gray
        return $false
    }
}

# Step 1: Check Prerequisites
Write-Host "`n[1/6] Checking Prerequisites..." -ForegroundColor Cyan
Write-Host "----------------------------------------`n" -ForegroundColor Gray

$hasGit = Test-CLI -Command "git" -Name "Git" -InstallCmd "https://git-scm.com/download/win"
$hasPsql = Test-CLI -Command "psql" -Name "PostgreSQL Client" -InstallCmd "https://www.postgresql.org/download/"
$hasNode = Test-CLI -Command "node" -Name "Node.js" -InstallCmd "https://nodejs.org/"

if (-not ($hasGit -and $hasNode)) {
    Write-Host "`n✗ Missing required tools. Please install them first.`n" -ForegroundColor Red
    exit 1
}

Write-Host "`n✓ Prerequisites check complete`n" -ForegroundColor Green

# Step 2: Render Account Setup
Write-Host "`n[2/6] Render Setup" -ForegroundColor Cyan
Write-Host "----------------------------------------`n" -ForegroundColor Gray

Write-Host "1. Go to: " -NoNewline
Write-Host "https://dashboard.render.com" -ForegroundColor Blue
Write-Host "2. Sign up or login (GitHub recommended)" -ForegroundColor Gray
Write-Host "3. Connect your GitHub repository" -ForegroundColor Gray

Read-Host "`nPress Enter when you have a Render account ready"

# Step 3: Database Setup
Write-Host "`n[3/6] Database Deployment" -ForegroundColor Cyan
Write-Host "----------------------------------------`n" -ForegroundColor Gray

Write-Host "⚠ CRITICAL: Choose your database plan carefully!" -ForegroundColor Red
Write-Host "   • Free: EXPIRES after 90 days and STOPS working (testing only)" -ForegroundColor Yellow
Write-Host "   • Starter ($7/mo): Production use, unlimited duration`n" -ForegroundColor Green

Write-Host "Follow these steps in Render Dashboard:" -ForegroundColor Yellow
Write-Host "1. Click 'New +' → PostgreSQL" -ForegroundColor Gray
Write-Host "2. Configure:" -ForegroundColor Gray
Write-Host "   - Name: karyasiddhi-db" -ForegroundColor Gray
Write-Host "   - Database: karyasiddhi" -ForegroundColor Gray
Write-Host "   - Region: Choose closest to your users" -ForegroundColor Gray
Write-Host "   - Plan: Starter ($7/mo) for production OR Free (90 days only)" -ForegroundColor Gray
Write-Host "3. Click 'Create Database'" -ForegroundColor Gray
Write-Host "4. Wait 2-3 minutes for provisioning" -ForegroundColor Gray

Read-Host "`nPress Enter when database is created"

# Get database URL
Write-Host "`nEnter your Render database External URL:" -ForegroundColor Yellow
Write-Host "(Format: postgresql://user:pass@host/database)" -ForegroundColor Gray
$dbUrl = Read-Host

if ([string]::IsNullOrWhiteSpace($dbUrl)) {
    Write-Host "✗ Database URL is required" -ForegroundColor Red
    exit 1
}

# Run migrations
if ($hasPsql) {
    Write-Host "`nRunning database migrations..." -ForegroundColor Yellow
    
    $env:DATABASE_URL = $dbUrl
    
    Write-Host "→ Creating schema..." -ForegroundColor Gray
    $result1 = psql $env:DATABASE_URL -f database/init.sql 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Schema creation failed" -ForegroundColor Red
        Write-Host $result1 -ForegroundColor Red
    } else {
        Write-Host "✓ Schema created" -ForegroundColor Green
    }
    
    Write-Host "→ Seeding data..." -ForegroundColor Gray
    $result2 = psql $env:DATABASE_URL -f database/seed_complete_data.sql 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Data seeding failed" -ForegroundColor Red
        Write-Host $result2 -ForegroundColor Red
    } else {
        Write-Host "✓ Data seeded" -ForegroundColor Green
    }
    
    Write-Host "→ Setting up achievements..." -ForegroundColor Gray
    $result3 = psql $env:DATABASE_URL -f database/setup_unique_achievements.sql 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠ Achievements setup warning (may already exist)" -ForegroundColor Yellow
    } else {
        Write-Host "✓ Achievements configured" -ForegroundColor Green
    }
    
    Write-Host "`n✓ Database initialization complete`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠ PostgreSQL client not found. Run migrations manually:" -ForegroundColor Yellow
    Write-Host "psql `$DATABASE_URL -f database/init.sql" -ForegroundColor Gray
    Write-Host "psql `$DATABASE_URL -f database/seed_complete_data.sql" -ForegroundColor Gray
    Write-Host "psql `$DATABASE_URL -f database/setup_unique_achievements.sql`n" -ForegroundColor Gray
}

# Step 4: Backend Deployment
Write-Host "`n[4/6] Backend Deployment" -ForegroundColor Cyan
Write-Host "----------------------------------------`n" -ForegroundColor Gray

Write-Host "Follow these steps in Render Dashboard:" -ForegroundColor Yellow
Write-Host "1. Click 'New +' → Web Service" -ForegroundColor Gray
Write-Host "2. Connect your GitHub repository" -ForegroundColor Gray
Write-Host "3. Configure:" -ForegroundColor Gray
Write-Host "   - Name: karyasiddhi-backend" -ForegroundColor Gray
Write-Host "   - Region: Same as database" -ForegroundColor Gray
Write-Host "   - Root Directory: backend" -ForegroundColor Gray
Write-Host "   - Environment: Node" -ForegroundColor Gray
Write-Host "   - Build Command: npm install && npm run build" -ForegroundColor Gray
Write-Host "   - Start Command: npm run start:prod" -ForegroundColor Gray
Write-Host "   - Plan: Starter ($7/mo) or Free" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Add Environment Variables:" -ForegroundColor Gray
Write-Host "   NODE_ENV=production" -ForegroundColor Gray
Write-Host "   DATABASE_URL=" -NoNewline -ForegroundColor Gray
Write-Host "`${{karyasiddhi-db.DATABASE_URL}}" -ForegroundColor Magenta
Write-Host "   JWT_SECRET=" -NoNewline -ForegroundColor Gray
Write-Host "[generate a strong 32+ char secret]" -ForegroundColor Yellow
Write-Host "   PORT=10000" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Click 'Create Web Service'" -ForegroundColor Gray
Write-Host "6. Wait 5-7 minutes for deployment" -ForegroundColor Gray

Read-Host "`nPress Enter when backend is deployed"

Write-Host "`nEnter your Render backend URL:" -ForegroundColor Yellow
Write-Host "(Format: https://karyasiddhi-backend.onrender.com)" -ForegroundColor Gray
$backendUrl = Read-Host

if ([string]::IsNullOrWhiteSpace($backendUrl)) {
    Write-Host "✗ Backend URL is required" -ForegroundColor Red
    exit 1
}

# Test backend
Write-Host "`nTesting backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $backendUrl -Method Get -TimeoutSec 10 -ErrorAction Stop
    Write-Host "✓ Backend is responding" -ForegroundColor Green
} catch {
    Write-Host "⚠ Backend test failed (might still be starting up)" -ForegroundColor Yellow
    Write-Host "  Check Render logs if issues persist" -ForegroundColor Gray
}

# Step 5: Frontend Deployment
Write-Host "`n[5/6] Frontend Deployment (Netlify)" -ForegroundColor Cyan
Write-Host "----------------------------------------`n" -ForegroundColor Gray

Write-Host "Follow these steps in Netlify:" -ForegroundColor Yellow
Write-Host "1. Go to: " -NoNewline
Write-Host "https://app.netlify.com" -ForegroundColor Blue
Write-Host "2. Click 'Add new site' → 'Import an existing project'" -ForegroundColor Gray
Write-Host "3. Connect to GitHub → Select your repository" -ForegroundColor Gray
Write-Host "4. Configure build settings:" -ForegroundColor Gray
Write-Host "   - Base directory: frontend" -ForegroundColor Gray
Write-Host "   - Build command: npm run build" -ForegroundColor Gray
Write-Host "   - Publish directory: frontend/dist" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Add environment variable:" -ForegroundColor Gray
Write-Host "   VITE_API_URL=" -NoNewline -ForegroundColor Gray
Write-Host $backendUrl -ForegroundColor Magenta
Write-Host ""
Write-Host "6. Click 'Deploy site'" -ForegroundColor Gray
Write-Host "7. Wait 2-3 minutes for deployment" -ForegroundColor Gray
Write-Host "8. Optional: Customize site name to 'karyasiddhi'" -ForegroundColor Gray

Read-Host "`nPress Enter when frontend is deployed"

Write-Host "`nEnter your Netlify URL:" -ForegroundColor Yellow
Write-Host "(Format: https://karyasiddhi.netlify.app)" -ForegroundColor Gray
$frontendUrl = Read-Host

if ([string]::IsNullOrWhiteSpace($frontendUrl)) {
    Write-Host "✗ Frontend URL is required" -ForegroundColor Red
    exit 1
}

# Test frontend
Write-Host "`nTesting frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $frontendUrl -Method Get -TimeoutSec 10 -ErrorAction Stop
    Write-Host "✓ Frontend is responding" -ForegroundColor Green
} catch {
    Write-Host "⚠ Frontend test failed" -ForegroundColor Yellow
    Write-Host "  Check Netlify deploy logs" -ForegroundColor Gray
}

# Step 6: Update CORS
Write-Host "`n[6/6] Updating CORS Configuration" -ForegroundColor Cyan
Write-Host "----------------------------------------`n" -ForegroundColor Gray

$mainTsPath = "backend/src/main.ts"

if (Test-Path $mainTsPath) {
    Write-Host "Updating CORS to allow Netlify URL..." -ForegroundColor Yellow
    
    # Read current content
    $content = Get-Content $mainTsPath -Raw
    
    # Check if Netlify URL already exists
    if ($content -match [regex]::Escape($frontendUrl)) {
        Write-Host "✓ Netlify URL already in CORS configuration" -ForegroundColor Green
    } else {
        # Add Netlify URL to CORS
        $pattern = "(origin:\s*\[)([^\]]*?)(\])"
        $replacement = "`$1`$2,`n    '$frontendUrl'`$3"
        $newContent = $content -replace $pattern, $replacement
        
        # Save updated content
        Set-Content -Path $mainTsPath -Value $newContent
        
        Write-Host "✓ Added Netlify URL to CORS" -ForegroundColor Green
        Write-Host "`nCommitting changes..." -ForegroundColor Yellow
        
        git add $mainTsPath
        git commit -m "Add Netlify URL to CORS configuration"
        
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        git push origin main
        
        Write-Host "`n✓ CORS updated. Render will auto-redeploy backend (2-3 min)`n" -ForegroundColor Green
    }
} else {
    Write-Host "⚠ Could not find $mainTsPath" -ForegroundColor Yellow
    Write-Host "  Manually add this to app.enableCors():" -ForegroundColor Gray
    Write-Host "  origin: ['$frontendUrl', ...]`n" -ForegroundColor Gray
}

# Final Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Your application is now live:`n" -ForegroundColor White

Write-Host "Frontend:  " -NoNewline -ForegroundColor Gray
Write-Host $frontendUrl -ForegroundColor Blue

Write-Host "Backend:   " -NoNewline -ForegroundColor Gray
Write-Host $backendUrl -ForegroundColor Blue

Write-Host "Database:  " -NoNewline -ForegroundColor Gray
Write-Host "Render PostgreSQL" -ForegroundColor Blue

Write-Host "`nTest Credentials:" -ForegroundColor Yellow
Write-Host "  Email:    arun.singh@gov.in" -ForegroundColor White
Write-Host "  Password: TestUser@2025" -ForegroundColor White

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Open $frontendUrl" -ForegroundColor Gray
Write-Host "2. Login with test credentials" -ForegroundColor Gray
Write-Host "3. Test all features (goals, KPIs, analytics)" -ForegroundColor Gray
Write-Host "4. Share URL and credentials with users" -ForegroundColor Gray

Write-Host "`nMonitoring:" -ForegroundColor Yellow
Write-Host "• Backend logs: https://dashboard.render.com" -ForegroundColor Gray
Write-Host "• Frontend logs: https://app.netlify.com" -ForegroundColor Gray

Write-Host "`nCost:" -ForegroundColor Yellow
Write-Host "• Free tier: $0 for 90 days only (⚠ database STOPS after 90 days)" -ForegroundColor Yellow
Write-Host "• Minimum production: $7/mo (Starter DB + Free backend)" -ForegroundColor Gray
Write-Host "• Full production: $14/mo (Starter DB + Starter backend)" -ForegroundColor Gray

Write-Host "`n========================================`n" -ForegroundColor Cyan

Write-Host "Deployment script completed successfully! 🚀`n" -ForegroundColor Green
