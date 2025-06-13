# PowerShell script to convert all article pages to use ArticleLayout

# Define the article mappings (path -> slug)
$articles = @{
    "getting-started\setting-up-user-accounts" = "setting-up-user-accounts"
    "getting-started\understanding-roles-permissions" = "understanding-roles-permissions"
    "getting-started\initial-configuration-guide" = "initial-configuration-guide"
    "property-management\unit-management-organization" = "unit-management-organization"
    "property-management\property-information-updates" = "property-information-updates"
    "property-management\document-management-system" = "document-management-system"
    "resident-management\lease-agreement-management" = "lease-agreement-management"
    "resident-management\resident-communication-tools" = "resident-communication-tools"
    "resident-management\move-in-move-out-process" = "move-in-move-out-process"
    "financial-management\setting-up-rent-collection" = "setting-up-rent-collection"
    "financial-management\processing-payments" = "processing-payments"
    "financial-management\generating-financial-reports" = "generating-financial-reports"
    "financial-management\late-payment-management" = "late-payment-management"
    "maintenance\creating-work-orders" = "creating-work-orders"
    "maintenance\tracking-maintenance-requests" = "tracking-maintenance-requests"
    "maintenance\vendor-management" = "vendor-management"
    "maintenance\preventive-maintenance-setup" = "preventive-maintenance-setup"
    "communication\sending-announcements" = "sending-announcements"
    "communication\individual-messaging" = "individual-messaging"
    "communication\notification-settings" = "notification-settings"
    "communication\email-templates" = "email-templates"
}

$baseDir = "c:\Users\MohammedESSADDEK\source\repos\syndik\src\app\user-guide"

foreach ($articlePath in $articles.Keys) {
    $slug = $articles[$articlePath]
    $filePath = Join-Path $baseDir "$articlePath\page.tsx"
    
    if (Test-Path $filePath) {
        Write-Host "Processing: $filePath"
        
        # Read the file content
        $content = Get-Content $filePath -Raw
        
        # Replace LandingLayout import with ArticleLayout import
        $content = $content -replace "import { LandingLayout } from '@/components/landing/landing-layout';", "import ArticleLayout from '@/modules/articles/components/article-layout';"
        
        # Replace the opening LandingLayout with ArticleLayout
        $content = $content -replace "    <LandingLayout>\s*\n\s*<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>\s*\n\s*<div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>", "    <ArticleLayout `n      articleSlug=`"$slug`"`n      title=`"$title`"`n    >"
        
        # Replace the closing tags - this is more complex, so we'll do a simpler approach
        $content = $content -replace "        </div>\s*\n\s*</div>\s*\n\s*</LandingLayout>", "    </ArticleLayout>"
        $content = $content -replace "      </div>\s*\n\s*</div>\s*\n\s*</LandingLayout>", "    </ArticleLayout>"
        $content = $content -replace "    </div>\s*\n\s*</div>\s*\n\s*</LandingLayout>", "    </ArticleLayout>"
        
        # Write the updated content back to the file
        Set-Content $filePath $content -NoNewline
        
        Write-Host "✓ Updated: $filePath"
    } else {
        Write-Host "✗ File not found: $filePath"
    }
}

Write-Host "Conversion complete!"
