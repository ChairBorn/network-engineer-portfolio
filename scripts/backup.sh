#!/bin/bash

# DevNet Application Backup Script

set -e

BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "💾 Starting backup process..."

# Backup database
echo "📊 Backing up PostgreSQL database..."
docker-compose exec -T postgres pg_dump -U devnet_user devnet > "$BACKUP_DIR/database.sql"

# Backup uploads
echo "📁 Backing up uploads..."
docker cp $(docker-compose ps -q app):/app/uploads "$BACKUP_DIR/uploads"

# Backup MinIO data
echo "🗄️  Backing up MinIO data..."
docker-compose exec -T minio mc mirror /data "$BACKUP_DIR/minio"

# Create archive
echo "📦 Creating backup archive..."
tar -czf "$BACKUP_DIR.tar.gz" -C backups "$(basename "$BACKUP_DIR")"
rm -rf "$BACKUP_DIR"

echo "✅ Backup completed: $BACKUP_DIR.tar.gz"
