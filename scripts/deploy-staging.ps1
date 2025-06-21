# 🧪 Deploy to Staging Script
# This script deploys your code to the staging Vercel project

Write-Host "🧪 Deploying to Staging (syndik-staging)..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Yellow

# Ensure staging branch exists
Write-Host "📋 Checking if staging branch exists..." -ForegroundColor Blue
$stagingExists = git branch -r --list "origin/staging"

if (-not $stagingExists) {
    Write-Host "🌿 Creating staging branch..." -ForegroundColor Blue
    git checkout main
    git pull origin main
    git checkout -b staging
    git push -u origin staging
}

# Switch to staging branch
Write-Host "📋 Switching to staging branch..." -ForegroundColor Blue
git checkout staging

# Merge latest main into staging
Write-Host "🔄 Merging main into staging..." -ForegroundColor Blue
git pull origin staging
git merge main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Merge conflicts detected! Please resolve manually." -ForegroundColor Red
    Write-Host "💡 After resolving conflicts:" -ForegroundColor Yellow
    Write-Host "   1. git add ." -ForegroundColor White
    Write-Host "   2. git commit -m 'Resolve merge conflicts'" -ForegroundColor White
    Write-Host "   3. git push origin staging" -ForegroundColor White
    exit 1
}

# Optional: Run tests
$runTests = Read-Host "Would you like to run tests before deploying to staging? (y/n)"
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
Write-Host "📤 Pushing to staging branch..." -ForegroundColor Blue
git push origin staging

Write-Host ""
Write-Host "✅ Staging deployment triggered!" -ForegroundColor Green
Write-Host "🌐 Staging URLs:" -ForegroundColor Cyan
Write-Host "   - Main: https://staging.syndik.ma" -ForegroundColor White
Write-Host "   - Admin: https://admin.staging.syndik.ma" -ForegroundColor White
Write-Host "   - App: https://app.staging.syndik.ma" -ForegroundColor White
Write-Host ""
Write-Host "📊 Check deployment status: https://vercel.com/dashboard" -ForegroundColor Cyan

# Optional: Open browser
$openBrowser = Read-Host "Would you like to open the staging site? (y/n)"
if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
    Start-Process "https://staging.syndik.ma"
}

# Switch back to main branch
Write-Host "🔄 Switching back to main branch..." -ForegroundColor Blue
git checkout main
