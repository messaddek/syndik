# 🚀 Vercel Environment Setup for Windows (PowerShell)
# This script helps you configure Vercel environments for Syndik

Write-Host "🚀 Setting up Vercel Environments for Syndik" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI. Please install manually: npm install -g vercel" -ForegroundColor Red
        exit 1
    }
}

# Login to Vercel
Write-Host "🔐 Logging into Vercel..." -ForegroundColor Yellow
vercel login

# Function to set environment variables
function Set-EnvironmentVariables {
    param(
        [string]$envType
    )
    
    Write-Host "📝 Setting $envType environment variables..." -ForegroundColor Yellow
    
    switch ($envType) {
        "production" {
            vercel env add NEXT_PUBLIC_ENVIRONMENT production production
            vercel env add NEXT_PUBLIC_MAIN_URL https://syndik.ma production
            vercel env add NEXT_PUBLIC_APP_URL https://app.syndik.ma production
            vercel env add NEXT_PUBLIC_ADMIN_URL https://admin.syndik.ma production
            vercel env add NEXT_PUBLIC_API_URL https://api.syndik.ma production
            Write-Host "✅ Production environment variables set" -ForegroundColor Green
        }
        "preview" {
            vercel env add NEXT_PUBLIC_ENVIRONMENT staging preview
            vercel env add NEXT_PUBLIC_MAIN_URL https://staging.syndik.ma preview
            vercel env add NEXT_PUBLIC_APP_URL https://app.staging.syndik.ma preview
            vercel env add NEXT_PUBLIC_ADMIN_URL https://admin.staging.syndik.ma preview
            vercel env add NEXT_PUBLIC_API_URL https://api.staging.syndik.ma preview
            Write-Host "✅ Preview (staging) environment variables set" -ForegroundColor Green
        }
        "development" {
            vercel env add NEXT_PUBLIC_ENVIRONMENT development development
            vercel env add NEXT_PUBLIC_MAIN_URL http://localhost:3000 development
            vercel env add NEXT_PUBLIC_APP_URL http://app.localhost:3000 development
            vercel env add NEXT_PUBLIC_ADMIN_URL http://admin.localhost:3000 development
            Write-Host "✅ Development environment variables set" -ForegroundColor Green
        }
    }
}

# Link project
Write-Host "🔗 Linking to Vercel project..." -ForegroundColor Yellow
vercel link

# Set environment variables
Write-Host "🌍 Setting up environment variables..." -ForegroundColor Cyan
Write-Host "Which environments would you like to set up?" -ForegroundColor Cyan
Write-Host "1) Production only" -ForegroundColor White
Write-Host "2) Staging (Preview) only" -ForegroundColor White
Write-Host "3) Both Production and Staging" -ForegroundColor White
Write-Host "4) All environments (Production, Staging, Development)" -ForegroundColor White

$choice = Read-Host "Choose an option (1-4)"

switch ($choice) {
    "1" {
        Set-EnvironmentVariables "production"
    }
    "2" {
        Set-EnvironmentVariables "preview"
    }
    "3" {
        Set-EnvironmentVariables "production"
        Set-EnvironmentVariables "preview"
    }
    "4" {
        Set-EnvironmentVariables "production"
        Set-EnvironmentVariables "preview"
        Set-EnvironmentVariables "development"
    }
    default {
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

# Display current environment variables
Write-Host "📋 Current environment variables:" -ForegroundColor Cyan
vercel env ls

Write-Host ""
Write-Host "✅ Vercel environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Add your database URLs to each environment in Vercel Dashboard" -ForegroundColor White
Write-Host "2. Add your Clerk authentication keys to each environment" -ForegroundColor White
Write-Host "3. Configure custom domains in Vercel Dashboard → Settings → Domains" -ForegroundColor White
Write-Host "4. Set up DNS records as shown in VERCEL_ENVIRONMENT_SETUP.md" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "📖 Documentation: See VERCEL_ENVIRONMENT_SETUP.md" -ForegroundColor Cyan

# Optional: Deploy
$deployChoice = Read-Host "Would you like to deploy now? (y/n)"
if ($deployChoice -eq "y" -or $deployChoice -eq "Y") {
    Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
    vercel --prod
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Production deployment complete!" -ForegroundColor Green
    } else {
        Write-Host "❌ Deployment failed. Check the output above for errors." -ForegroundColor Red
    }
}

Write-Host "🎉 Setup finished!" -ForegroundColor Green
