# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn
- Docker (optional)

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/CMB702/template-clone-ai.git
cd template-clone-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your values:
- Database URL
- JWT secret
- API keys (Claude, OpenAI, Google Vision, AWS)

4. **Start the database** (using Docker)
```bash
docker-compose up -d
```

5. **Setup the database**
```bash
npm run db:push
```

6. **Start development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Project Structure

```
template-clone-ai/
├── apps/
│   ├── web/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/  # Reusable components
│   │   │   ├── pages/       # Page components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── stores/      # Zustand stores
│   │   │   ├── services/    # API services
│   │   │   ├── types/       # TypeScript types
│   │   │   ├── utils/       # Helper functions
│   │   │   └── App.tsx
│   │   ├── public/
│   │   └── index.html
│   │
│   └── api/                 # Express backend
│       ├── src/
│       │   ├── routes/      # API routes
│       │   ├── controllers/ # Route handlers
│       │   ├── services/    # Business logic
│       │   ├── middleware/  # Express middleware
│       │   ├── models/      # Data models
│       │   ├── utils/       # Helper functions
│       │   ├── config/      # Configuration
│       │   └── index.ts     # Entry point
│       ├── prisma/          # Database
│       └── package.json
│
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── types/               # Shared TypeScript types
│   └── utils/               # Shared utilities
│
├── docs/
├── .github/workflows/       # CI/CD
└── docker-compose.yml
```

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
```bash
git checkout -b feature/feature-name
```

2. **Make your changes**
- Write code following the project conventions
- Write tests for new functionality
- Update documentation if needed

3. **Test your changes**
```bash
npm run test
npm run lint
npm run type-check
```

4. **Commit and push**
```bash
git add .
git commit -m "feat: description of changes"
git push origin feature/feature-name
```

5. **Create a Pull Request**
- Describe what you changed
- Link related issues
- Request review from team members

## Code Style

### TypeScript
- Use strict mode
- Type all function parameters and returns
- Use interfaces for object types

### React
- Use functional components with hooks
- Use custom hooks for reusable logic
- Keep components small and focused
- Use prop destructuring

### Express
- Use async/await instead of callbacks
- Validate all inputs with Zod
- Return consistent error responses
- Use middleware for cross-cutting concerns

### Naming Conventions
- camelCase for variables and functions
- PascalCase for components and classes
- SCREAMING_SNAKE_CASE for constants
- Start boolean variables with `is`, `has`, `can`

## Testing

### Running Tests
```bash
# All tests
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Writing Tests
```typescript
// Example test
describe('Component', () => {
  it('should render', () => {
    const { getByText } = render(<Component />)
    expect(getByText('text')).toBeInTheDocument()
  })
})
```

## Database

### Migrations
```bash
# Create a migration
npm run db:migrate

# Push schema changes
npm run db:push

# Open Prisma Studio
npm run db:studio
```

### Editing Schema
Edit `apps/api/prisma/schema.prisma` then:
```bash
npm run db:migrate
```

## Debugging

### Backend
```bash
# Debug with node inspector
node --inspect-brk --loader ts-node/esm apps/api/src/index.ts

# Use VS Code debugger
# .vscode/launch.json already configured
```

### Frontend
```bash
# React DevTools browser extension
# Zustand DevTools in console

# VS Code Debugger
# .vscode/launch.json already configured
```

## Git Workflow

### Commit Messages
Follow conventional commits:
```
feat: add new feature
fix: fix bug
docs: update documentation
test: add tests
chore: update dependencies
refactor: refactor code
```

### Before Pushing
```bash
npm run lint        # Fix linting issues
npm run type-check  # Check TypeScript
npm run test        # Run tests
npm run build       # Build for production
```

## Performance Tips

### Frontend
- Use React.memo for expensive components
- Lazy load heavy components with React.lazy
- Optimize images with next-gen formats
- Use code splitting with React Router

### Backend
- Index frequently queried database fields
- Cache responses with Redis
- Use pagination for large datasets
- Compress images before storing

## Common Tasks

### Add a new API endpoint
1. Add route in `apps/api/src/routes/`
2. Add controller in `apps/api/src/controllers/`
3. Add service in `apps/api/src/services/`
4. Add tests
5. Document in `docs/API.md`

### Add a new page
1. Create component in `apps/web/src/pages/`
2. Add route in `apps/web/src/App.tsx`
3. Add navigation link if needed
4. Style with Tailwind CSS

### Add a new UI component
1. Create in `apps/web/src/components/`
2. Add stories for Storybook (optional)
3. Export from component index if needed

## Troubleshooting

### Port already in use
```bash
# Kill process using port
lsof -i :3001      # Find process
kill -9 <PID>      # Kill it

# Or use different port
PORT=3002 npm run dev:api
```

### Database connection error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Start if not running
docker-compose up -d postgres
```

### Dependency issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript errors
```bash
npm run type-check
# Fix errors as suggested
```

## Resources

- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

- 📧 Email: dev@templatecloneai.com
- 💬 Discord: [Join our community](https://discord.gg/templatecloneai)
- 🐛 Issues: [GitHub Issues](https://github.com/CMB702/template-clone-ai/issues)
