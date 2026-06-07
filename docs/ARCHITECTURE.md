# Template Clone AI - Architecture

## System Overview

```
┌─────────────────┐
│  React Frontend │
│  (Canvas Editor)│
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│  Express API    │
│  (Node.js)      │
└────────┬────────┘
         │
    ┌────┴─────────────────┬──────────────┐
    ↓                      ↓              ↓
┌─────────────┐    ┌──────────────┐  ┌─────────┐
│ PostgreSQL  │    │ Claude API   │  │  AWS S3 │
│ (Database)  │    │ (AI Analysis)│  │(Storage)│
└─────────────┘    └──────────────┘  └─────────┘
```

## Frontend Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Canvas**: Fabric.js for editor
- **UI**: Tailwind CSS + Shadcn UI
- **Build**: Vite

### Key Components
1. **Layout** - App shell with navbar and footer
2. **Pages** - Home, Dashboard, Editor, 404
3. **Editor** - Canvas-based design editor with:
   - Drag & drop support
   - Layer panel
   - Properties panel
   - Real-time preview
4. **Services** - API client for backend communication

### State Management
```
zustand stores/
├── projectStore.ts    # Project state
├── editorStore.ts     # Editor state
├── authStore.ts       # Authentication
└── exportStore.ts     # Export state
```

## Backend Architecture

### Tech Stack
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **AI Services**: Claude API, Google Vision, OpenAI
- **File Storage**: AWS S3
- **Image Processing**: Sharp
- **OCR**: Tesseract.js

### API Routes

#### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
```

#### Projects
```
GET    /api/projects              # List user's projects
POST   /api/projects              # Create new project
GET    /api/projects/:id          # Get project details
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
POST   /api/projects/:id/upload   # Upload image
POST   /api/projects/:id/analyze  # AI analysis
```

#### Elements
```
GET    /api/projects/:id/elements     # List elements
POST   /api/projects/:id/elements     # Create element
PUT    /api/elements/:elementId       # Update element
DELETE /api/elements/:elementId       # Delete element
```

#### Export
```
POST   /api/projects/:id/export       # Export project
GET    /api/exports/:exportId         # Get export
GET    /api/exports/:exportId/download
```

#### Templates
```
GET    /api/templates              # List templates
GET    /api/templates/:id          # Get template
POST   /api/templates              # Create template
PUT    /api/templates/:id          # Update template
DELETE /api/templates/:id          # Delete template
```

### Database Schema

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  userId INT REFERENCES users(id),
  imageUrl VARCHAR,
  jsonData JSON,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Elements (UI components)
CREATE TABLE elements (
  id SERIAL PRIMARY KEY,
  projectId INT REFERENCES projects(id),
  type VARCHAR NOT NULL,        -- text, image, shape, etc.
  content TEXT,
  style JSON,                   -- colors, fonts, spacing
  position JSON,                -- x, y coordinates
  size JSON,                    -- width, height
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Exports
CREATE TABLE exports (
  id SERIAL PRIMARY KEY,
  projectId INT REFERENCES projects(id),
  format VARCHAR NOT NULL,      -- html, react, tailwind, pdf, png
  content TEXT,
  fileUrl VARCHAR,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Templates
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  userId INT REFERENCES users(id),
  category VARCHAR,
  thumbnailUrl VARCHAR,
  jsonData JSON,
  isPublic BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- AI Analysis Cache
CREATE TABLE ai_analysis (
  id SERIAL PRIMARY KEY,
  imagePath VARCHAR UNIQUE NOT NULL,
  colors JSON,
  fonts JSON,
  layout JSON,
  components JSON,
  extractedText TEXT,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## Data Flow

### Image Upload & Analysis
```
1. User uploads image
   ↓
2. Image saved to AWS S3
   ↓
3. Send to Claude Vision API
   ↓
4. Extract: colors, fonts, layout, components, text
   ↓
5. Cache analysis in database
   ↓
6. Return to frontend
   ↓
7. Generate initial template structure
```

### Template Editing
```
1. User modifies elements (text, colors, etc.)
   ↓
2. Real-time update in editor
   ↓
3. State updated in Zustand
   ↓
4. Changes saved to database
   ↓
5. Preview updated
```

### Export Process
```
1. User selects export format
   ↓
2. Generate code based on template structure
   ↓
3. For HTML/CSS: Generate semantic HTML + Tailwind
   ↓
4. For React: Generate React components
   ↓
5. For PDF/PNG: Use html2canvas + jsPDF
   ↓
6. Return file to user
```

## Security

### Authentication
- JWT tokens for API authentication
- Refresh token rotation
- Password hashing with bcrypt
- OAuth integration (GitHub, Google)

### File Upload
- Validate file type (image only)
- Limit file size (10MB max)
- Scan for malware
- Store in secure S3 bucket

### API Security
- Rate limiting
- CORS configuration
- Input validation with Zod
- SQL injection prevention via Prisma ORM
- XSS protection

## Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading of heavy components
- Image optimization
- Service worker caching
- Memoization for expensive computations

### Backend
- Database indexing on frequently queried fields
- Connection pooling
- Caching with Redis
- CDN for static assets
- Image compression before storage

## Deployment

### Frontend
- Build: Vite
- Hosting: Vercel
- Domain: Custom domain via Vercel

### Backend
- Containerization: Docker
- Orchestration: Docker Compose (dev), Kubernetes (prod)
- Hosting: Railway, Render, or AWS ECS

### Database
- PostgreSQL managed service (AWS RDS, Heroku, PlanetScale)
- Automated backups
- Replication for high availability

### Storage
- AWS S3 for file storage
- CloudFront for CDN

## Monitoring & Logging

- Application logs: Winston
- Error tracking: Sentry
- Performance monitoring: DataDog
- Database monitoring: Native cloud provider tools

## CI/CD Pipeline

```
Code Push
   ↓
GitHub Actions
   ├─ Lint & Type Check
   ├─ Run Tests
   ├─ Build
   └─ Deploy
      ├─ Frontend → Vercel
      └─ Backend → Railway
```
