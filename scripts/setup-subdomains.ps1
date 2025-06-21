# PowerShell script to add subdomain entries to hosts file
# Run this as Administrator

$hostsFile = "$env:WINDIR\System32\drivers\etc\hosts"

Write-Host "🚀 Adding subdomain entries to hosts file..." -ForegroundColor Green

# Check if app.localhost exists
$content = Get-Content $hostsFile
if ($content -notmatch "app\.localhost") {
    Add-Content -Path $hostsFile -Value "127.0.0.1 app.localhost"
    Write-Host "✅ Added app.localhost" -ForegroundColor Green
} else {
    Write-Host "ℹ️  app.localhost already exists" -ForegroundColor Yellow
}

# Check if admin.localhost exists
if ($content -notmatch "admin\.localhost") {
    Add-Content -Path $hostsFile -Value "127.0.0.1 admin.localhost"
    Write-Host "✅ Added admin.localhost" -ForegroundColor Green
} else {
    Write-Host "ℹ️  admin.localhost already exists" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Subdomain setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now access:" -ForegroundColor Cyan
Write-Host "🏠 Main App:    http://localhost:3000" -ForegroundColor White
Write-Host "📱 App Portal:  http://app.localhost:3000" -ForegroundColor White
Write-Host "⚙️  Admin Portal: http://admin.localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  You may need to restart your browser or flush DNS cache:" -ForegroundColor Yellow
Write-Host "   ipconfig /flushdns" -ForegroundColor Gray

Read-Host "Press Enter to continue..."
