# 🚀 Two Vercel Projects Setup Script for Windows
# This script helps you set up both production and staging Vercel projects

Write-Host "🚀 Setting up Two Vercel Projects for Syndik" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Yellow

# Check if Vercel CLI is installed
if (-not (Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Login to Vercel
Write-Host "🔐 Logging into Vercel..." -ForegroundColor Blue
vercel login

Write-Host ""
Write-Host "📋 Choose setup option:" -ForegroundColor Yellow
Write-Host "1. Set up Production project only"
Write-Host "2. Set up Staging project only"
Write-Host "3. Set up both Production and Staging projects"
$choice = Read-Host "Choose an option (1-3)"

function Set-ProductionProject {
    Write-Host ""
    Write-Host "🏭 Setting up Production Project..." -ForegroundColor Green
    
    # Create production project
    Write-Host "Creating production project..." -ForegroundColor Blue
    Write-Host "⚠️  When prompted, choose:" -ForegroundColor Yellow
    Write-Host "   - Project name: syndik-production" -ForegroundColor Yellow
    Write-Host "   - Framework: Next.js" -ForegroundColor Yellow
    Write-Host "   - Production branch: main" -ForegroundColor Yellow
    
    # Link to production project
    vercel link --scope="your-team" --project="syndik-production"
    
    # Set production environment variables
    Write-Host "📝 Setting production environment variables..." -ForegroundColor Blue
    
    vercel env add NEXT_PUBLIC_ENVIRONMENT "production" production
    vercel env add NEXT_PUBLIC_MAIN_URL "https://syndik.ma" production
    vercel env add NEXT_PUBLIC_APP_URL "https://app.syndik.ma" production
    vercel env add NEXT_PUBLIC_ADMIN_URL "https://admin.syndik.ma" production
    vercel env add NEXT_PUBLIC_API_URL "https://api.syndik.ma" production
    
    Write-Host "✅ Production project configured!" -ForegroundColor Green
    Write-Host "📋 Next steps for production:" -ForegroundColor Yellow
    Write-Host "   1. Add custom domains in Vercel dashboard:"
    Write-Host "      - syndik.ma"
    Write-Host "      - admin.syndik.ma"
    Write-Host "      - app.syndik.ma"
    Write-Host "   2. Add your database URL"
    Write-Host "   3. Add your Clerk production keys"
}

function Set-StagingProject {
    Write-Host ""
    Write-Host "🧪 Setting up Staging Project..." -ForegroundColor Green
    
    # Create staging project
    Write-Host "Creating staging project..." -ForegroundColor Blue
    Write-Host "⚠️  When prompted, choose:" -ForegroundColor Yellow
    Write-Host "   - Project name: syndik-staging" -ForegroundColor Yellow
    Write-Host "   - Framework: Next.js" -ForegroundColor Yellow
    Write-Host "   - Production branch: staging" -ForegroundColor Yellow
    
    # Link to staging project
    vercel link --scope="your-team" --project="syndik-staging"
    
    # Set staging environment variables
    Write-Host "📝 Setting staging environment variables..." -ForegroundColor Blue
    
    vercel env add NEXT_PUBLIC_ENVIRONMENT "staging" production
    vercel env add NEXT_PUBLIC_MAIN_URL "https://staging.syndik.ma" production
    vercel env add NEXT_PUBLIC_APP_URL "https://app.staging.syndik.ma" production
    vercel env add NEXT_PUBLIC_ADMIN_URL "https://admin.staging.syndik.ma" production
    vercel env add NEXT_PUBLIC_API_URL "https://api.staging.syndik.ma" production
    
    Write-Host "✅ Staging project configured!" -ForegroundColor Green
    Write-Host "📋 Next steps for staging:" -ForegroundColor Yellow
    Write-Host "   1. Add custom domains in Vercel dashboard:"
    Write-Host "      - staging.syndik.ma"
    Write-Host "      - admin.staging.syndik.ma"
    Write-Host "      - app.staging.syndik.ma"
    Write-Host "   2. Add your staging database URL"
    Write-Host "   3. Add your Clerk test/staging keys"
}

# Execute based on choice
switch ($choice) {
    "1" { Set-ProductionProject }
    "2" { Set-StagingProject }
    "3" { 
        Set-ProductionProject
        Set-StagingProject
    }
    default {
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Vercel setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Manual Steps Remaining:" -ForegroundColor Yellow
Write-Host "1. Configure DNS records (see VERCEL_TWO_PROJECTS_SETUP.md)"
Write-Host "2. Add custom domains in each Vercel project dashboard"
Write-Host "3. Add database URLs to environment variables"
Write-Host "4. Add Clerk authentication keys"
Write-Host "5. Create staging branch: git checkout -b staging && git push origin staging"
Write-Host ""
Write-Host "🌐 Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "📖 Full Documentation: VERCEL_TWO_PROJECTS_SETUP.md" -ForegroundColor Cyan

# Optional: Create branches
$createBranches = Read-Host "Would you like to create the staging branch now? (y/n)"
if ($createBranches -eq "y" -or $createBranches -eq "Y") {
    Write-Host "🌿 Creating staging branch..." -ForegroundColor Blue
    
    git checkout main
    git pull origin main
    git checkout -b staging
    git push -u origin staging
    git checkout main
    
    Write-Host "✅ Staging branch created!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup finished! Check the documentation for next steps." -ForegroundColor Green
