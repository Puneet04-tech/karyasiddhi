# KaryaSiddhi Setup Script for Windows
# Digital India Initiative - SIH 2025

Write-Host "🇮🇳 KaryaSiddhi Setup - Digital India Initiative" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node -v
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Install Node.js 20+" -ForegroundColor Red
    exit 1
}

# Check Python
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "✓ Python installed: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python not found. Install Python 3.11+" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow

Set-Location frontend
npm install
Set-Location ..
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

Set-Location backend
npm install
Set-Location ..
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Set-Location ai-service
pip install -r requirements.txt
Set-Location ..
Write-Host "✓ AI service dependencies installed" -ForegroundColor Green

# Setup environment files
if (-not (Test-Path backend\.env)) {
    Copy-Item backend\.env.example backend\.env
    Write-Host "✓ Backend .env created" -ForegroundColor Green
}

if (-not (Test-Path ai-service\.env)) {
    Copy-Item ai-service\.env.example ai-service\.env
    Write-Host "✓ AI service .env created" -ForegroundColor Green
}

Write-Host "`n✓ Setup completed!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Setup PostgreSQL and Redis"
Write-Host "2. Run 'npm run dev:backend' for backend"
Write-Host "3. Run 'npm run dev:frontend' for frontend"
Write-Host "4. Run 'npm run dev:ai' for AI service"
Write-Host "`nOr use Docker: docker-compose up"
