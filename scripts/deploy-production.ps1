# 🚀 Deploy to Production Script
# This script deploys your code to the production Vercel project

Write-Host "🚀 Deploying to Production (syndik-production)..." -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Yellow

# Ensure we're on main branch
Write-Host "📋 Checking current branch..." -ForegroundColor Blue
$currentBranch = git branch --show-current

if ($currentBranch -ne "main") {
    Write-Host "⚠️  Switching to main branch..." -ForegroundColor Yellow
    git checkout main
}

# Pull latest changes
Write-Host "📥 Pulling latest changes..." -ForegroundColor Blue
git pull origin main

# Optional: Run tests
$runTests = Read-Host "Would you like to run tests before deploying? (y/n)"
if ($runTests -eq "y" -or $runTests -eq "Y") {
    Write-Host "🧪 Running tests..." -ForegroundColor Blue
    npm test
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Tests failed! Aborting deployment." -ForegroundColor Red
        exit 1
    }
}

# Build locally to check for errors
Write-Host "🔨 Building project locally..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

# Push to trigger deployment
Write-Host "📤 Pushing to main branch..." -ForegroundColor Blue
git push origin main

Write-Host ""
Write-Host "✅ Production deployment triggered!" -ForegroundColor Green
Write-Host "🌐 Production URLs:" -ForegroundColor Cyan
Write-Host "   - Main: https://syndik.ma" -ForegroundColor White
Write-Host "   - Admin: https://admin.syndik.ma" -ForegroundColor White
Write-Host "   - App: https://app.syndik.ma" -ForegroundColor White
Write-Host ""
Write-Host "📊 Check deployment status: https://vercel.com/dashboard" -ForegroundColor Cyan

# Optional: Open browser
$openBrowser = Read-Host "Would you like to open the production site? (y/n)"
if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
    Start-Process "https://syndik.ma"
}
