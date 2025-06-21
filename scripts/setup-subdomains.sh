#!/bin/bash

# Subdomain Development Setup Script
# This script sets up local development environment for subdomain testing

echo "🚀 Setting up subdomain development environment..."

# Check if running on Windows, macOS, or Linux
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    HOSTS_FILE="/c/Windows/System32/drivers/etc/hosts"
    echo "Detected Windows system"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    HOSTS_FILE="/etc/hosts"
    echo "Detected macOS system"
else
    # Linux
    HOSTS_FILE="/etc/hosts"
    echo "Detected Linux system"
fi

echo "📝 Adding subdomain entries to hosts file..."

# Backup hosts file
echo "Creating backup of hosts file..."
sudo cp "$HOSTS_FILE" "$HOSTS_FILE.backup.$(date +%Y%m%d_%H%M%S)"

# Add subdomain entries if they don't exist
if ! grep -q "app.localhost" "$HOSTS_FILE"; then
    echo "127.0.0.1 app.localhost" | sudo tee -a "$HOSTS_FILE" > /dev/null
    echo "✅ Added app.localhost"
else
    echo "ℹ️  app.localhost already exists"
fi

if ! grep -q "admin.localhost" "$HOSTS_FILE"; then
    echo "127.0.0.1 admin.localhost" | sudo tee -a "$HOSTS_FILE" > /dev/null
    echo "✅ Added admin.localhost"
else
    echo "ℹ️  admin.localhost already exists"
fi

echo ""
echo "🎉 Subdomain development setup complete!"
echo ""
echo "You can now access:"
echo "🏠 Main App:    http://app.localhost:3000"
echo "⚙️  Admin Portal: http://admin.localhost:3000"
echo ""
echo "Start your development server with: npm run dev"
echo ""
echo "⚠️  Note: You may need to restart your browser to see the changes."
