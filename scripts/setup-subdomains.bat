@echo off
REM Subdomain Development Setup Script for Windows
REM This script sets up local development environment for subdomain testing

echo 🚀 Setting up subdomain development environment...

set HOSTS_FILE=%WINDIR%\System32\drivers\etc\hosts

echo 📝 Adding subdomain entries to hosts file...

REM Create backup
echo Creating backup of hosts file...
copy "%HOSTS_FILE%" "%HOSTS_FILE%.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%" >nul

REM Check and add app.localhost
findstr /C:"app.localhost" "%HOSTS_FILE%" >nul
if %errorlevel% neq 0 (
    echo 127.0.0.1 app.localhost >> "%HOSTS_FILE%"
    echo ✅ Added app.localhost
) else (
    echo ℹ️  app.localhost already exists
)

REM Check and add admin.localhost
findstr /C:"admin.localhost" "%HOSTS_FILE%" >nul
if %errorlevel% neq 0 (
    echo 127.0.0.1 admin.localhost >> "%HOSTS_FILE%"
    echo ✅ Added admin.localhost
) else (
    echo ℹ️  admin.localhost already exists
)

echo.
echo 🎉 Subdomain development setup complete!
echo.
echo You can now access:
echo 🏠 Main App:    http://app.localhost:3000
echo ⚙️  Admin Portal: http://admin.localhost:3000
echo.
echo Start your development server with: npm run dev
echo.
echo ⚠️  Note: You may need to restart your browser to see the changes.
echo ⚠️  Note: You may need to run this script as Administrator.

pause
