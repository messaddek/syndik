# PowerShell script to troubleshoot staging environment issues
# This script will help diagnose and fix the current 500 errors

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectName = "syndik-staging"
)

Write-Host "🔍 Troubleshooting Staging Environment Issues for: $ProjectName" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

# Function to test URL endpoint
function Test-Endpoint {
    param([string]$Url, [string]$Description)
    
    Write-Host "Testing $Description`: $Url" -ForegroundColor Cyan
    try {
        $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 30
        $statusCode = $response.StatusCode
        
        if ($statusCode -eq 200) {
            Write-Host "  ✅ Success ($statusCode)" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ⚠️  Unexpected status: $statusCode" -ForegroundColor Yellow
            return $false
        }
    } catch {
        $errorMsg = $_.Exception.Message
        Write-Host "  ❌ Failed: $errorMsg" -ForegroundColor Red
        return $false
    }
}

Write-Host ""
Write-Host "1. Checking Vercel Environment Variables..." -ForegroundColor Yellow

try {
    $envList = vercel env ls --scope $ProjectName 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Environment variables retrieved successfully" -ForegroundColor Green
        Write-Host $envList -ForegroundColor Gray
    } else {
        Write-Host "❌ Failed to retrieve environment variables" -ForegroundColor Red
        Write-Host $envList -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error checking environment variables: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Testing Staging Endpoints..." -ForegroundColor Yellow

$endpoints = @{
    "Main Site" = "https://staging.syndik.ma"
    "Admin Subdomain" = "https://admin.staging.syndik.ma"
    "App Subdomain" = "https://app.staging.syndik.ma"
    "Database Debug" = "https://staging.syndik.ma/api/debug-db"
    "Sign In" = "https://staging.syndik.ma/sign-in"
}

$results = @{}
foreach ($endpoint in $endpoints.GetEnumerator()) {
    $results[$endpoint.Key] = Test-Endpoint -Url $endpoint.Value -Description $endpoint.Key
}

Write-Host ""
Write-Host "3. Testing tRPC Endpoints..." -ForegroundColor Yellow

$trpcEndpoints = @{
    "getCurrentAccount" = "https://staging.syndik.ma/api/trpc/accounts.getCurrentAccount?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D"
    "getOrganizationUsage" = "https://staging.syndik.ma/api/trpc/accounts.getOrganizationUsage?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D"
}

foreach ($trpcEndpoint in $trpcEndpoints.GetEnumerator()) {
    Test-Endpoint -Url $trpcEndpoint.Value -Description "tRPC $($trpcEndpoint.Key)"
}

Write-Host ""
Write-Host "4. Checking Vercel Deployment Status..." -ForegroundColor Yellow

try {
    $deployments = vercel ls --scope $ProjectName 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Recent deployments:" -ForegroundColor Green
        Write-Host $deployments -ForegroundColor Gray
    } else {
        Write-Host "❌ Failed to get deployment status" -ForegroundColor Red
        Write-Host $deployments -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error checking deployments: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "5. Generating Fix Commands..." -ForegroundColor Yellow

# Generate fix commands based on test results
if ($results["Database Debug"] -eq $false) {
    Write-Host ""
    Write-Host "🔧 DATABASE ISSUE DETECTED - Run these commands:" -ForegroundColor Red
    Write-Host ""
    Write-Host "# Set database URL (replace with your actual connection string):" -ForegroundColor Cyan
    Write-Host "vercel env add DATABASE_URL production --scope $ProjectName" -ForegroundColor White
    Write-Host ""
    Write-Host "# Redeploy after setting DATABASE_URL:" -ForegroundColor Cyan
    Write-Host "vercel --prod --scope $ProjectName" -ForegroundColor White
}

if ($results["App Subdomain"] -eq $false) {
    Write-Host ""
    Write-Host "🔧 SUBDOMAIN ISSUE DETECTED - Check these settings:" -ForegroundColor Red
    Write-Host ""
    Write-Host "1. Verify domains are added in Vercel project settings:" -ForegroundColor Cyan
    Write-Host "   - staging.syndik.ma" -ForegroundColor White
    Write-Host "   - admin.staging.syndik.ma" -ForegroundColor White
    Write-Host "   - app.staging.syndik.ma" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Update Clerk dashboard allowed redirect origins:" -ForegroundColor Cyan
    Write-Host "   - https://staging.syndik.ma" -ForegroundColor White
    Write-Host "   - https://admin.staging.syndik.ma" -ForegroundColor White
    Write-Host "   - https://app.staging.syndik.ma" -ForegroundColor White
}

Write-Host ""
Write-Host "6. Quick Fix Commands Summary:" -ForegroundColor Yellow
Write-Host ""
Write-Host "# Check current environment variables:" -ForegroundColor Cyan
Write-Host "vercel env ls --scope $ProjectName" -ForegroundColor White
Write-Host ""
Write-Host "# Add missing DATABASE_URL:" -ForegroundColor Cyan
Write-Host "vercel env add DATABASE_URL production --scope $ProjectName" -ForegroundColor White
Write-Host ""
Write-Host "# Add missing Clerk keys (if needed):" -ForegroundColor Cyan
Write-Host "vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --scope $ProjectName" -ForegroundColor White
Write-Host "vercel env add CLERK_SECRET_KEY production --scope $ProjectName" -ForegroundColor White
Write-Host ""
Write-Host "# Redeploy staging:" -ForegroundColor Cyan
Write-Host "vercel --prod --scope $ProjectName" -ForegroundColor White
Write-Host ""
Write-Host "# Test database after deployment:" -ForegroundColor Cyan
Write-Host "curl https://staging.syndik.ma/api/debug-db" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Troubleshooting complete! Review the output above for specific issues." -ForegroundColor Green
