# PowerShell script to set up Vercel environment variables for staging
# Run this script after creating the staging project in Vercel

param(
    [Parameter(Mandatory=$true)]
    [string]$StagingProjectName = "syndik-staging",
    
    [Parameter(Mandatory=$true)]
    [string]$DatabaseUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$ClerkPublishableKey,
    
    [Parameter(Mandatory=$true)]
    [string]$ClerkSecretKey,
    
    [Parameter(Mandatory=$false)]
    [string]$ClerkWebhookSecret = ""
)

Write-Host "🚀 Setting up Vercel environment variables for staging project: $StagingProjectName" -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Please install it first: npm install -g vercel" -ForegroundColor Red
    exit 1
}

# Environment variables to set
$envVars = @{
    "NEXT_PUBLIC_ENVIRONMENT" = "staging"
    "NEXT_PUBLIC_MAIN_URL" = "https://staging.syndik.ma"
    "NEXT_PUBLIC_APP_URL" = "https://app.staging.syndik.ma"
    "NEXT_PUBLIC_ADMIN_URL" = "https://admin.staging.syndik.ma"
    "NEXT_PUBLIC_API_URL" = "https://api.staging.syndik.ma"
    "NEXT_PUBLIC_DEV_MAIN_URL" = "http://localhost:3000"
    "NEXT_PUBLIC_DEV_APP_URL" = "http://app.localhost:3000"
    "NEXT_PUBLIC_DEV_ADMIN_URL" = "http://admin.localhost:3000"
    "DATABASE_URL" = $DatabaseUrl
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" = $ClerkPublishableKey
    "CLERK_SECRET_KEY" = $ClerkSecretKey
    "NEXT_PUBLIC_CLERK_SIGN_IN_URL" = "/sign-in"
    "NEXT_PUBLIC_CLERK_SIGN_UP_URL" = "/sign-up"
    "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL" = "/org-switcher"
    "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL" = "/org-switcher"
}

# Add webhook secret if provided
if ($ClerkWebhookSecret -ne "") {
    $envVars["CLERK_WEBHOOK_SECRET"] = $ClerkWebhookSecret
}

Write-Host "📝 Setting environment variables..." -ForegroundColor Yellow

foreach ($var in $envVars.GetEnumerator()) {
    $key = $var.Key
    $value = $var.Value
    
    Write-Host "  Setting $key..." -ForegroundColor Cyan
    
    try {
        # Set environment variable for production environment
        $result = vercel env add $key production --scope $StagingProjectName --force --yes
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    ✅ $key set successfully" -ForegroundColor Green
        } else {
            Write-Host "    ❌ Failed to set $key" -ForegroundColor Red
        }
    } catch {
        Write-Host "    ❌ Error setting $key`: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Environment variables setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify environment variables: vercel env ls --scope $StagingProjectName" -ForegroundColor White
Write-Host "2. Deploy staging: vercel --prod --scope $StagingProjectName" -ForegroundColor White
Write-Host "3. Test database connection: https://staging.syndik.ma/api/debug-db" -ForegroundColor White
Write-Host "4. Update Clerk dashboard with staging domains:" -ForegroundColor White
Write-Host "   - https://staging.syndik.ma" -ForegroundColor White
Write-Host "   - https://admin.staging.syndik.ma" -ForegroundColor White
Write-Host "   - https://app.staging.syndik.ma" -ForegroundColor White
Write-Host ""

# Example usage information
Write-Host "Example usage:" -ForegroundColor Magenta
Write-Host ".\setup-staging-env.ps1 -StagingProjectName 'syndik-staging' -DatabaseUrl 'postgresql://...' -ClerkPublishableKey 'pk_test_...' -ClerkSecretKey 'sk_test_...'" -ForegroundColor Gray
