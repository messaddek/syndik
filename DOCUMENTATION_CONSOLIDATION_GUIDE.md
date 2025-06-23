# Documentation Consolidation Script

This PowerShell script helps manage the documentation files after consolidation.

## Files Successfully Consolidated

The following files have been consolidated into the two main specification files:

### Technical Specifications (SYNDIK_TECHNICAL_SPECIFICATIONS.md)

- SUBDOMAIN_ARCHITECTURE_COMPLETE.md
- MIDDLEWARE_REDIRECT_LOOP_FIX.md
- API_ROUTES_PROTECTION_FIX.md
- CLEAN_URLS_DASHBOARD_HIDING.md
- SUBDOMAIN_LOCALE_REDIRECT_FIX.md
- SUBDOMAIN_IMPLEMENTATION_PLAN.md
- STAGING_URGENT_FIX.md
- STAGING_REDIRECT_FIX.md
- STAGING_ERRORS_FIX.md
- STAGING_ENVIRONMENT_GUIDE.md
- STAGING_DATABASE_AUTH_FIX.md
- STAGING_COMPLETE_FIX.md
- DATABASE_CONNECTION_FIX.md
- NEON_STAGING_DATABASE_SETUP.md
- VERCEL_TWO_PROJECTS_SETUP.md
- VERCEL_TWO_PROJECTS_REFERENCE.md
- VERCEL_TWO_ENVIRONMENT_SETUP.md
- VERCEL_TROUBLESHOOTING_GUIDE.md
- VERCEL_SUBDOMAIN_DEPLOYMENT.md
- VERCEL_ENVIRONMENT_SETUP.md
- DEPLOYMENT_MIGRATION_GUIDE.md
- WEBHOOK_SETUP.md
- CUSTOM_DOMAIN_MIGRATION_COMPLETE.md
- PULL_REQUEST_SUBDOMAIN_ARCHITECTURE.md
- I18N_RTL_IMPLEMENTATION_COMPLETE.md
- TABLE_TRANSLATION_IMPLEMENTATION.md
- PAGINATION_TRANSLATION_IMPLEMENTATION.md
- RTL_DYNAMIC_DIRECTION_GUIDE.md
- HELPDESK_PERFORMANCE_OPTIMIZATION.md
- FRONTEND_BACKEND_INTEGRATION.md
- SETTINGS_REFACTORING_SUMMARY.md
- LOADING_IMPLEMENTATION_SUMMARY.md
- PATH_VERIFICATION_REPORT.md
- PORTAL_REDIRECT_DEBUG.md

### Functional Specifications (SYNDIK_FUNCTIONAL_SPECIFICATIONS.md)

- B2B_HELPDESK_IMPLEMENTATION.md
- B2B_HELPDESK_SUMMARY.md
- ORGANIZATION_QUOTA_IMPLEMENTATION.md
- ORGANIZATION_SWITCHER_COMPLETE.md
- RESIDENT_LINKING_COMPLETE.md
- RESIDENT_LINKING_STRATEGY.md
- RESIDENT_PORTAL_README.md
- ARTICLE_SYSTEM_README.md
- DASHBOARD_INTEGRATION.md
- COMPLETE_INTEGRATION_PLAN.md
- BUILDINGS_TRANSLATION_SUMMARY.md
- MOCKED_FEATURES_CHECKLIST.md
- ADMIN_PORTAL_NO_ADMIN_RIGHTS.md

### Files to Keep (Not Consolidated)

- README.md (Main project documentation)
- SYNDIK_COMPREHENSIVE_SPECIFICATIONS.md (Preserved as requested)
- SYNDIK_FUNCTIONAL_SPECIFICATIONS.md (New consolidated functional specs)
- SYNDIK_TECHNICAL_SPECIFICATIONS.md (New consolidated technical specs)
- SYNDIK_APP_SPECS.md (Can be archived if no longer needed)
- src/i18n/messages/README.md (Translation guidelines)

## Commands to Archive Files

### Option 1: Move to Archive Folder

```powershell
# Create archive folder
New-Item -ItemType Directory -Path ".\docs-archive" -Force

# Move consolidated files to archive
$filesToArchive = @(
    "SUBDOMAIN_ARCHITECTURE_COMPLETE.md",
    "MIDDLEWARE_REDIRECT_LOOP_FIX.md",
    "API_ROUTES_PROTECTION_FIX.md",
    "CLEAN_URLS_DASHBOARD_HIDING.md",
    "SUBDOMAIN_LOCALE_REDIRECT_FIX.md",
    "SUBDOMAIN_IMPLEMENTATION_PLAN.md",
    "STAGING_URGENT_FIX.md",
    "STAGING_REDIRECT_FIX.md",
    "STAGING_ERRORS_FIX.md",
    "STAGING_ENVIRONMENT_GUIDE.md",
    "STAGING_DATABASE_AUTH_FIX.md",
    "STAGING_COMPLETE_FIX.md",
    "DATABASE_CONNECTION_FIX.md",
    "NEON_STAGING_DATABASE_SETUP.md",
    "VERCEL_TWO_PROJECTS_SETUP.md",
    "VERCEL_TWO_PROJECTS_REFERENCE.md",
    "VERCEL_TWO_ENVIRONMENT_SETUP.md",
    "VERCEL_TROUBLESHOOTING_GUIDE.md",
    "VERCEL_SUBDOMAIN_DEPLOYMENT.md",
    "VERCEL_ENVIRONMENT_SETUP.md",
    "DEPLOYMENT_MIGRATION_GUIDE.md",
    "WEBHOOK_SETUP.md",
    "CUSTOM_DOMAIN_MIGRATION_COMPLETE.md",
    "PULL_REQUEST_SUBDOMAIN_ARCHITECTURE.md",
    "I18N_RTL_IMPLEMENTATION_COMPLETE.md",
    "TABLE_TRANSLATION_IMPLEMENTATION.md",
    "PAGINATION_TRANSLATION_IMPLEMENTATION.md",
    "RTL_DYNAMIC_DIRECTION_GUIDE.md",
    "HELPDESK_PERFORMANCE_OPTIMIZATION.md",
    "FRONTEND_BACKEND_INTEGRATION.md",
    "SETTINGS_REFACTORING_SUMMARY.md",
    "LOADING_IMPLEMENTATION_SUMMARY.md",
    "PATH_VERIFICATION_REPORT.md",
    "PORTAL_REDIRECT_DEBUG.md",
    "B2B_HELPDESK_IMPLEMENTATION.md",
    "B2B_HELPDESK_SUMMARY.md",
    "ORGANIZATION_QUOTA_IMPLEMENTATION.md",
    "ORGANIZATION_SWITCHER_COMPLETE.md",
    "RESIDENT_LINKING_COMPLETE.md",
    "RESIDENT_LINKING_STRATEGY.md",
    "RESIDENT_PORTAL_README.md",
    "ARTICLE_SYSTEM_README.md",
    "DASHBOARD_INTEGRATION.md",
    "COMPLETE_INTEGRATION_PLAN.md",
    "BUILDINGS_TRANSLATION_SUMMARY.md",
    "MOCKED_FEATURES_CHECKLIST.md",
    "ADMIN_PORTAL_NO_ADMIN_RIGHTS.md"
)

foreach ($file in $filesToArchive) {
    if (Test-Path $file) {
        Move-Item $file ".\docs-archive\" -Force
        Write-Host "Archived: $file"
    }
}
```

### Option 2: Delete Files (Use with caution)

```powershell
# Only run this if you're sure you don't need the individual files
$filesToDelete = @(
    # Same array as above
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file"
    }
}
```

## Final Documentation Structure

After consolidation, your documentation structure will be:

```
syndik/
├── README.md                           # Main project documentation
├── SYNDIK_COMPREHENSIVE_SPECIFICATIONS.md  # Preserved as requested
├── SYNDIK_FUNCTIONAL_SPECIFICATIONS.md     # Complete functional specs
├── SYNDIK_TECHNICAL_SPECIFICATIONS.md      # Complete technical specs
├── docs-archive/                       # Archived individual files
│   ├── SUBDOMAIN_ARCHITECTURE_COMPLETE.md
│   ├── MIDDLEWARE_REDIRECT_LOOP_FIX.md
│   └── [... all other archived files]
└── src/i18n/messages/README.md        # Translation guidelines
```

## Benefits of Consolidation

1. **Easier Navigation**: Two comprehensive files instead of 50+ scattered files
2. **Better Organization**: Logical grouping of related functionality
3. **Improved Searchability**: All related information in context
4. **Reduced Maintenance**: Fewer files to keep updated
5. **Better Documentation**: More comprehensive and interconnected information
6. **Cleaner Repository**: Less clutter in the root directory

## Usage Notes

- The consolidated files maintain all important technical and functional details
- Cross-references between sections provide better context
- Table of contents in each file enables quick navigation
- All debugging information and troubleshooting steps are preserved
- Implementation details and code examples are maintained
