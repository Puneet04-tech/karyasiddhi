#!/bin/bash

# KaryaSiddhi Deployment Script
# This script helps deploy the application to Railway and Vercel

set -e

echo "🚀 KaryaSiddhi Deployment Script"
echo "================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Install it with: npm install -g @railway/cli"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install it with: npm install -g vercel"
    exit 1
fi

echo ""
echo "📦 Step 1: Deploy Database"
echo "-------------------------"
read -p "Have you created a PostgreSQL database on Railway? (y/n): " db_created

if [ "$db_created" != "y" ]; then
    echo "Please create a PostgreSQL database on Railway first."
    echo "Visit: https://railway.app"
    exit 1
fi

echo ""
echo "🔗 Step 2: Get Database Connection"
echo "---------------------------------"
read -p "Enter your DATABASE_URL from Railway: " database_url

if [ -z "$database_url" ]; then
    echo "❌ DATABASE_URL is required"
    exit 1
fi

echo ""
echo "📊 Step 3: Initialize Database"
echo "-----------------------------"
echo "Running migrations..."

psql "$database_url" -f ../database/init.sql
psql "$database_url" -f ../database/seed_complete_data.sql
psql "$database_url" -f ../database/setup_unique_achievements.sql

echo "✅ Database initialized successfully!"

echo ""
echo "🔧 Step 4: Deploy Backend"
echo "-----------------------"
cd ../backend

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "Creating .env.production..."
    cp .env.production.example .env.production
    echo "⚠️  Please edit backend/.env.production with your values"
    read -p "Press enter after updating .env.production..."
fi

echo "Deploying backend to Railway..."
railway up

echo "✅ Backend deployed!"
echo "Get your backend URL from Railway dashboard"

echo ""
echo "🎨 Step 5: Deploy Frontend"
echo "------------------------"
cd ../frontend

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "Creating .env.production..."
    cp .env.production.example .env.production
fi

read -p "Enter your backend URL (from Railway): " backend_url

if [ -z "$backend_url" ]; then
    echo "❌ Backend URL is required"
    exit 1
fi

# Update .env.production
echo "VITE_API_URL=$backend_url" > .env.production

echo "Deploying frontend to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment Complete!"
echo "====================="
echo ""
echo "Your application is now live!"
echo ""
echo "Next steps:"
echo "1. Test your application"
echo "2. Share the frontend URL with your team"
echo "3. Use test credentials:"
echo "   Email: arun.singh@gov.in"
echo "   Password: TestUser@2025"
echo ""
echo "Happy deploying! 🚀"
