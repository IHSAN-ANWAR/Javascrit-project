#!/bin/bash

echo "🚀 Deploying GiftLink Backend to Railway..."

# Navigate to backend directory
cd giftlink-backend

# Install Railway CLI if not installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway (you'll need to do this manually)
echo "Please run: railway login"
echo "Then run: railway link"
echo "Then run: railway up"

echo "✅ Backend deployment script ready!"