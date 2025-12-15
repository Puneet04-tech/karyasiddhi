# KaryaSiddhi Deployment Script (PowerShell)
# This script helps deploy the application to Railway and Vercel

Write-Host "🚀 KaryaSiddhi Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Railway CLI is installed
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Railway CLI not found. Install it with: npm install -g @railway/cli" -ForegroundColor Red
    exit 1
}

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Install it with: npm install -g vercel" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Step 1: Deploy Database" -ForegroundColor Yellow
Write-Host "-------------------------" -ForegroundColor Yellow
$dbCreated = Read-Host "Have you created a PostgreSQL database on Railway? (y/n)"

if ($dbCreated -ne "y") {
    Write-Host "Please create a PostgreSQL database on Railway first." -ForegroundColor Red
    Write-Host "Visit: https://railway.app" -ForegroundColor Blue
    exit 1
}

Write-Host ""
Write-Host "🔗 Step 2: Get Database Connection" -ForegroundColor Yellow
Write-Host "---------------------------------" -ForegroundColor Yellow
$databaseUrl = Read-Host "Enter your DATABASE_URL from Railway"

if ([string]::IsNullOrWhiteSpace($databaseUrl)) {
    Write-Host "❌ DATABASE_URL is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📊 Step 3: Initialize Database" -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Yellow
Write-Host "Running migrations..." -ForegroundColor Cyan

$env:PGPASSWORD = ""
psql $databaseUrl -f database/init.sql
psql $databaseUrl -f database/seed_complete_data.sql
psql $databaseUrl -f database/setup_unique_achievements.sql

Write-Host "✅ Database initialized successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "🔧 Step 4: Deploy Backend" -ForegroundColor Yellow
Write-Host "-----------------------" -ForegroundColor Yellow
Set-Location backend

# Check if .env.production exists
if (!(Test-Path .env.production)) {
    Write-Host "Creating .env.production..." -ForegroundColor Cyan
    Copy-Item .env.production.example .env.production
    Write-Host "⚠️  Please edit backend/.env.production with your values" -ForegroundColor Yellow
    Read-Host "Press enter after updating .env.production"
}

Write-Host "Deploying backend to Railway..." -ForegroundColor Cyan
railway up

Write-Host "✅ Backend deployed!" -ForegroundColor Green
Write-Host "Get your backend URL from Railway dashboard" -ForegroundColor Blue

Write-Host ""
Write-Host "🎨 Step 5: Deploy Frontend" -ForegroundColor Yellow
Write-Host "------------------------" -ForegroundColor Yellow
Set-Location ../frontend

# Check if .env.production exists
if (!(Test-Path .env.production)) {
    Write-Host "Creating .env.production..." -ForegroundColor Cyan
    Copy-Item .env.production.example .env.production
}

$backendUrl = Read-Host "Enter your backend URL (from Railway)"

if ([string]::IsNullOrWhiteSpace($backendUrl)) {
    Write-Host "❌ Backend URL is required" -ForegroundColor Red
    exit 1
}

# Update .env.production
"VITE_API_URL=$backendUrl" | Out-File -FilePath .env.production -Encoding UTF8

Write-Host "Deploying frontend to Vercel..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "=====================" -ForegroundColor Green
Write-Host ""
Write-Host "Your application is now live!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test your application" -ForegroundColor White
Write-Host "2. Share the frontend URL with your team" -ForegroundColor White
Write-Host "3. Use test credentials:" -ForegroundColor White
Write-Host "   Email: arun.singh@gov.in" -ForegroundColor Cyan
Write-Host "   Password: TestUser@2025" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy deploying! 🚀" -ForegroundColor Magenta

Set-Location ..
