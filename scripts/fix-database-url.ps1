# PowerShell script to validate and fix DATABASE_URL for staging
param(
    [Parameter(Mandatory=$false)]
    [string]$DatabaseUrl = "",
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectName = "syndik-staging",
    
    [switch]$TestOnly = $false
)

Write-Host "🔧 DATABASE_URL Validation and Fix Tool" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

function Test-DatabaseUrl {
    param([string]$Url)
    
    if ([string]::IsNullOrWhiteSpace($Url)) {
        return @{ Valid = $false; Error = "URL is empty" }
    }
    
    try {
        $uri = [System.Uri]$Url
        
        $analysis = @{
            Valid = $true
            Protocol = $uri.Scheme
            Host = $uri.Host
            Port = if ($uri.Port -eq -1) { "Default" } else { $uri.Port }
            Database = $uri.LocalPath.TrimStart('/')
            HasAuth = (-not [string]::IsNullOrWhiteSpace($uri.UserInfo))
            Username = if ($uri.UserInfo) { $uri.UserInfo.Split(':')[0] } else { "None" }
            Query = $uri.Query
        }
        
        # Validate PostgreSQL specifics
        if ($uri.Scheme -ne "postgresql" -and $uri.Scheme -ne "postgres") {
            $analysis.Valid = $false
            $analysis.Error = "Invalid protocol. Must be 'postgresql://' or 'postgres://'"
        }
        
        if ([string]::IsNullOrWhiteSpace($uri.Host)) {
            $analysis.Valid = $false
            $analysis.Error = "Missing hostname"
        }
        
        if ([string]::IsNullOrWhiteSpace($uri.LocalPath.TrimStart('/'))) {
            $analysis.Valid = $false
            $analysis.Error = "Missing database name"
        }
        
        return $analysis
    }
    catch {
        return @{ Valid = $false; Error = $_.Exception.Message }
    }
}

function Show-DatabaseUrlAnalysis {
    param($Analysis)
    
    Write-Host ""
    Write-Host "📊 DATABASE_URL Analysis:" -ForegroundColor Yellow
    Write-Host "  Protocol: $($Analysis.Protocol)" -ForegroundColor Cyan
    Write-Host "  Host: $($Analysis.Host)" -ForegroundColor Cyan
    Write-Host "  Port: $($Analysis.Port)" -ForegroundColor Cyan
    Write-Host "  Database: $($Analysis.Database)" -ForegroundColor Cyan
    Write-Host "  Has Auth: $($Analysis.HasAuth)" -ForegroundColor Cyan
    Write-Host "  Username: $($Analysis.Username)" -ForegroundColor Cyan
    Write-Host "  Query: $($Analysis.Query)" -ForegroundColor Cyan
    
    if ($Analysis.Valid) {
        Write-Host "  Status: ✅ Valid Format" -ForegroundColor Green
    } else {
        Write-Host "  Status: ❌ Invalid - $($Analysis.Error)" -ForegroundColor Red
    }
}

# Step 1: Get current DATABASE_URL from user input or Vercel
if ([string]::IsNullOrWhiteSpace($DatabaseUrl)) {
    Write-Host ""
    Write-Host "🔍 Getting current DATABASE_URL from Vercel..." -ForegroundColor Yellow
    
    try {
        $envOutput = vercel env ls --scope $ProjectName 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Connected to Vercel project: $ProjectName" -ForegroundColor Green
            
            # Note: We can't actually retrieve the value, only see if it exists
            if ($envOutput -match "DATABASE_URL") {
                Write-Host "✅ DATABASE_URL exists in Vercel environment" -ForegroundColor Green
                $DatabaseUrl = Read-Host "Please enter your DATABASE_URL for validation (it will not be displayed)"
            } else {
                Write-Host "❌ DATABASE_URL not found in Vercel environment" -ForegroundColor Red
                $DatabaseUrl = Read-Host "Please enter your DATABASE_URL to set up"
            }
        } else {
            Write-Host "❌ Failed to connect to Vercel. Error: $envOutput" -ForegroundColor Red
            $DatabaseUrl = Read-Host "Please enter your DATABASE_URL for validation"
        }
    } catch {
        Write-Host "❌ Error checking Vercel: $_" -ForegroundColor Red
        $DatabaseUrl = Read-Host "Please enter your DATABASE_URL for validation"
    }
}

# Step 2: Validate the DATABASE_URL
Write-Host ""
Write-Host "🔍 Validating DATABASE_URL format..." -ForegroundColor Yellow

$analysis = Test-DatabaseUrl -Url $DatabaseUrl
Show-DatabaseUrlAnalysis -Analysis $analysis

# Step 3: Provide specific guidance based on validation
if (-not $analysis.Valid) {
    Write-Host ""
    Write-Host "🛠️ DATABASE_URL FORMAT ISSUES DETECTED" -ForegroundColor Red
    Write-Host ""
    
    Write-Host "Common PostgreSQL formats:" -ForegroundColor Yellow
    Write-Host "  Neon:     postgresql://user:pass@ep-name-123.region.neon.tech/dbname?sslmode=require" -ForegroundColor White
    Write-Host "  Supabase: postgresql://postgres:pass@db.ref.supabase.co:5432/postgres" -ForegroundColor White
    Write-Host "  Railway:  postgresql://postgres:pass@containers-us-west-123.railway.app:5432/railway" -ForegroundColor White
    Write-Host "  Local:    postgresql://postgres:password@localhost:5432/syndik_db" -ForegroundColor White
    Write-Host ""
    
    $correctUrl = Read-Host "Enter the corrected DATABASE_URL"
    $newAnalysis = Test-DatabaseUrl -Url $correctUrl
    Show-DatabaseUrlAnalysis -Analysis $newAnalysis
    
    if ($newAnalysis.Valid) {
        $DatabaseUrl = $correctUrl
        $analysis = $newAnalysis
    }
}

# Step 4: Test connection if URL is valid
if ($analysis.Valid -and -not $TestOnly) {
    Write-Host ""
    Write-Host "🔗 Testing database connection..." -ForegroundColor Yellow
    
    # Try to test connection using psql if available
    try {
        $psqlTest = Get-Command psql -ErrorAction SilentlyContinue
        if ($psqlTest) {
            Write-Host "Testing with psql..." -ForegroundColor Cyan
            $testResult = psql $DatabaseUrl -c "SELECT 1 as test;" 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Database connection successful!" -ForegroundColor Green
            } else {
                Write-Host "❌ Database connection failed!" -ForegroundColor Red
                Write-Host "Error: $testResult" -ForegroundColor Red
            }
        } else {
            Write-Host "⚠️ psql not available for connection testing" -ForegroundColor Yellow
            Write-Host "Install PostgreSQL client: choco install postgresql" -ForegroundColor Gray
        }
    } catch {
        Write-Host "❌ Error testing connection: $_" -ForegroundColor Red
    }
}

# Step 5: Update Vercel if URL is valid and not test-only
if ($analysis.Valid -and -not $TestOnly) {
    Write-Host ""
    $updateVercel = Read-Host "Update DATABASE_URL in Vercel staging environment? (y/N)"
    
    if ($updateVercel.ToLower() -eq 'y' -or $updateVercel.ToLower() -eq 'yes') {
        Write-Host ""
        Write-Host "🚀 Updating DATABASE_URL in Vercel..." -ForegroundColor Yellow
        
        try {
            # Remove existing DATABASE_URL
            vercel env rm DATABASE_URL production --scope $ProjectName --yes 2>$null
            
            # Add new DATABASE_URL
            Write-Host "Setting new DATABASE_URL..." -ForegroundColor Cyan
            $result = $DatabaseUrl | vercel env add DATABASE_URL production --scope $ProjectName --stdin
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ DATABASE_URL updated successfully!" -ForegroundColor Green
                
                Write-Host ""
                Write-Host "🚀 Redeploying staging..." -ForegroundColor Yellow
                $deployResult = vercel --prod --scope $ProjectName
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Staging redeployed successfully!" -ForegroundColor Green
                    Write-Host ""
                    Write-Host "🔍 Test the fix:" -ForegroundColor Cyan
                    Write-Host "  Visit: https://staging.syndik.ma/api/debug-db" -ForegroundColor White
                } else {
                    Write-Host "❌ Deployment failed: $deployResult" -ForegroundColor Red
                }
            } else {
                Write-Host "❌ Failed to update DATABASE_URL: $result" -ForegroundColor Red
            }
        } catch {
            Write-Host "❌ Error updating Vercel: $_" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "🎉 Database URL validation complete!" -ForegroundColor Green

if ($analysis.Valid) {
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Test database endpoint: https://staging.syndik.ma/api/debug-db" -ForegroundColor White
    Write-Host "2. If tables missing, run migrations: npm run db:push" -ForegroundColor White
    Write-Host "3. Test application functionality" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "⚠️ Please fix DATABASE_URL format and run this script again" -ForegroundColor Yellow
}
