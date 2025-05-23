# DevNet - Network Engineer & Developer Portfolio

A modern, clean web application for network engineers and software developers to showcase products, share code examples, and write technical articles.

## Features

- 🎨 **Clean Design**: GitIngest-inspired minimalist interface with 3D cream-colored cards
- 📝 **Content Management**: Full CMS for articles and code tutorials with snippet management
- 🔐 **Authentication**: Secure admin panel with role-based access control
- 🌐 **CDN Integration**: Asset management with file upload and organization
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🐳 **Dockerized**: Complete containerization with Docker Compose

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, PostgreSQL, Redis
- **Authentication**: Custom JWT-based authentication
- **File Storage**: MinIO (S3-compatible)
- **Deployment**: Docker, Docker Compose, Nginx

## Quick Start

### Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd devnet-portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development environment**
   \`\`\`bash
   docker-compose -f docker-compose.dev.yml up -d
   npm run dev
   \`\`\`

4. **Access the application**
   - Application: http://localhost:3000
   - Database: PostgreSQL on port 5432
   - Redis: Port 6379
   - MinIO Console: http://localhost:9001

### Production

1. **Deploy with Docker Compose**
   \`\`\`bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   \`\`\`

2. **Access the application**
   - Application: http://localhost
   - Admin Panel: http://localhost/admin

## Default Credentials

- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── code/              # Code tutorial pages
│   └── ...
├── components/            # Reusable React components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
├── scripts/               # Deployment and utility scripts
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile             # Production Docker image
├── Dockerfile.dev         # Development Docker image
└── nginx.conf            # Nginx configuration
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run docker:compose` - Start with Docker Compose
- `npm run docker:compose:build` - Build and start with Docker Compose
- `npm run docker:down` - Stop Docker services

## Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=postgresql://devnet_user:devnet_password@localhost:5432/devnet
REDIS_URL=redis://localhost:6379
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=devnet_admin
MINIO_SECRET_KEY=devnet_password123
\`\`\`

## Features Overview

### Content Management
- Create and edit blog articles
- Manage code tutorials with multiple snippets
- Rich text editing with Markdown support
- Category and tag organization
- Draft/published workflow

### Authentication & Security
- JWT-based authentication
- Role-based access control
- Protected admin routes
- Rate limiting
- Security headers

### File Management
- CDN asset management
- File upload and organization
- Image optimization
- Storage usage monitoring

### Design System
- 3D cream-colored cards
- Consistent color scheme
- Responsive design
- Accessibility features
- Clean typography

## Deployment

### Docker Compose (Recommended)

The application includes a complete Docker Compose setup with:
- Next.js application
- PostgreSQL database
- Redis for caching
- MinIO for file storage
- Nginx reverse proxy

### Manual Deployment

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Set up the database and run migrations
3. Configure environment variables
4. Start the application:
   \`\`\`bash
   npm start
   \`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
\`\`\`

I've completed the implementation with:

## 🎨 **3D Cream-Colored Cards**
- Added custom Tailwind classes for 3D effects with shadows
- Implemented hover and active states for interactive feedback
- Applied cream background (#FFF8E7) consistently across all cards

## 📝 **Enhanced Code Examples Page**
- Extended with full article functionality like the blog
- Added code snippet management with multiple snippets per tutorial
- Implemented admin interface for creating and editing code tutorials
- Added syntax highlighting and copy functionality

## 🐳 **Complete Dockerization**
- **Production Setup**: Multi-stage Dockerfile with optimized builds
- **Development Setup**: Hot-reload enabled development container
- **Docker Compose**: Complete stack with PostgreSQL, Redis, MinIO, and Nginx
- **Database**: PostgreSQL with initialization scripts
- **File Storage**: MinIO for CDN assets
- **Reverse Proxy**: Nginx with security headers and rate limiting

## 🚀 **Deployment Features**
- Automated deployment scripts
- Backup and restore functionality
- Environment-specific configurations
- Security hardening with Nginx
- Performance optimizations

The application now has a beautiful 3D design with cream-colored cards that provide depth and visual appeal while maintaining the clean GitIngest aesthetic. The Code Examples page functions like a full tutorial system where you can write articles and embed multiple code snippets. The entire application is fully dockerized and production-ready!
