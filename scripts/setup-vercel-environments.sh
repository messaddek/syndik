#!/bin/bash

# Vercel Environment Setup Script
# Run this script to set up your two Vercel environments

echo "🚀 Setting up Vercel Two-Environment Configuration"
echo "================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📋 Choose your setup method:"
echo "1. Two separate Vercel projects (Recommended)"
echo "2. Single project with branch-based deployments"
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo "🏗️  Setting up TWO SEPARATE VERCEL PROJECTS"
    echo "==========================================="
    
    echo "📦 Setting up PRODUCTION project..."
    echo "1. Create a new Vercel project named 'syndik-production'"
    echo "2. Connect it to your main/master branch"
    echo "3. Add these domains:"
    echo "   - syndik.ma"
    echo "   - admin.syndik.ma"
    echo "   - app.syndik.ma"
    echo "4. Copy environment variables from .env.production file"
    echo ""
    
    echo "📦 Setting up STAGING project..."
    echo "1. Create a new Vercel project named 'syndik-staging'"
    echo "2. Connect it to your staging branch"
    echo "3. Add these domains:"
    echo "   - staging.syndik.ma"
    echo "   - admin.staging.syndik.ma"
    echo "   - app.staging.syndik.ma"
    echo "4. Copy environment variables from .env.staging file"
    
elif [ "$choice" = "2" ]; then
    echo "🏗️  Setting up SINGLE PROJECT with branch deployments"
    echo "===================================================="
    
    echo "📦 Setting up single Vercel project..."
    echo "1. Create one Vercel project named 'syndik'"
    echo "2. Configure Git Integration:"
    echo "   - main branch → syndik.ma"
    echo "   - staging branch → staging.syndik.ma"
    echo "3. Add all domains to the same project:"
    echo "   - syndik.ma"
    echo "   - admin.syndik.ma"
    echo "   - app.syndik.ma"
    echo "   - staging.syndik.ma"
    echo "   - admin.staging.syndik.ma"
    echo "   - app.staging.syndik.ma"
    echo "4. Set environment variables by environment (Production/Preview)"
fi

echo ""
echo "🌐 DNS CONFIGURATION REQUIRED:"
echo "=============================="
echo "Add these DNS records to your domain provider:"
echo ""
echo "Production Records:"
echo "A    @           76.76.19.61  (syndik.ma)"
echo "A    admin       76.76.19.61  (admin.syndik.ma)"
echo "A    app         76.76.19.61  (app.syndik.ma)"
echo ""
echo "Staging Records:"
echo "A    staging           76.76.19.61  (staging.syndik.ma)"
echo "A    admin.staging     76.76.19.61  (admin.staging.syndik.ma)"
echo "A    app.staging       76.76.19.61  (app.staging.syndik.ma)"

echo ""
echo "✅ Environment files created:"
echo "- .env.production (Copy to Vercel Production)"
echo "- .env.staging (Copy to Vercel Staging)"
echo "- .env.local (Local development - already configured)"

echo ""
echo "🎯 NEXT STEPS:"
echo "============="
echo "1. Configure DNS records above"
echo "2. Set up Vercel project(s) as described"
echo "3. Copy environment variables to Vercel dashboard"
echo "4. Test deployments:"
echo "   - git push origin staging → staging.syndik.ma"
echo "   - git push origin main → syndik.ma"

echo ""
echo "📚 Need help? Check these files:"
echo "- VERCEL_TWO_ENVIRONMENT_SETUP.md"
echo "- STAGING_ENVIRONMENT_GUIDE.md"

echo ""
echo "🚀 Setup complete! Happy deploying!"
