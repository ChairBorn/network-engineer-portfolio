#!/bin/bash

# DevNet Application Deployment Script

set -e

echo "🚀 Starting DevNet Application Deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p uploads
mkdir -p ssl

# Build and start services
echo "🔨 Building and starting services..."
docker-compose down
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Show logs
echo "📋 Service logs:"
docker-compose logs --tail=50

echo "✅ Deployment complete!"
echo "🌐 Application is available at: http://localhost"
echo "🗄️  Database: PostgreSQL on port 5432"
echo "🔄 Redis: Available on port 6379"
echo "📦 MinIO: Available at http://localhost:9001"
echo ""
echo "Default admin credentials:"
echo "Email: admin@example.com"
echo "Password: admin123"
