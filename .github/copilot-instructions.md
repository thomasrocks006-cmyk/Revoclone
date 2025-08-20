# Revolut Banking App Clone

This is a Revolut-inspired mobile banking application built as a full-stack web application with React + TypeScript frontend and Express.js backend. The project features account management, transaction tracking, card management, and cryptocurrency portfolio viewing designed as a Progressive Web App (PWA) with mobile-first responsive design.

**Always reference these instructions first** and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Dependencies
- **Node.js Version**: v20.19.4 (required)
- **npm Version**: 10.8.2 
- **Install Dependencies**: `npm install` - takes ~20 seconds
- **Environment**: Runs on port 5000 (ALWAYS use port 5000 - other ports are firewalled)

### Build and Development
- **Development Server**: `npm run dev` - starts in <5 seconds. NEVER CANCEL.
- **Production Build**: `npm run build` - takes 4 seconds. NEVER CANCEL. Set timeout to 30+ seconds for safety.
- **TypeScript Check**: `npm run check` - takes 2.5 seconds. **NOTE**: Currently has 25 TypeScript errors but build succeeds anyway.
- **Database Schema**: `npm run db:push` - applies Drizzle schema changes

### Running the Application
- **Development**: 
  - Run `npm run dev` 
  - Application serves at `http://localhost:5000`
  - Serves both API routes (`/api/*`) and React frontend
  - Hot module reloading enabled via Vite
- **Production**:
  - Build first: `npm run build`  
  - Run: `npm run start`
  - Uses pre-built static assets from `dist/` folder

## Validation Requirements

### Manual Testing Scenarios
After making changes, **ALWAYS** test these complete user scenarios:
1. **Home Page Navigation**: Verify balance display, account summary, and navigation works
2. **Transaction History**: Navigate to Payments tab, verify transaction list loads and displays properly
3. **Crypto Portfolio**: Navigate to Crypto tab, verify crypto prices and portfolio data displays
4. **Card Management**: Verify cards section shows Original and Disposable cards
5. **Cross-Navigation**: Test switching between all navigation tabs (Home, Invest, Payments, Crypto, Lifestyle)

### Build Validation  
- **ALWAYS** run `npm run build` after code changes to ensure build succeeds
- **NEVER CANCEL** builds - they complete quickly (~4 seconds)
- Verify no new build errors are introduced
- Check `dist/` folder is created with `index.js` and `public/` assets

### TypeScript Issues
- Current codebase has 25 TypeScript errors but builds successfully
- Focus on **not introducing NEW TypeScript errors** 
- Run `npm run check` to validate - it should show same error count
- Do not fix existing TypeScript errors unless specifically required

## Architecture and Key Locations

### Directory Structure
```
/home/runner/work/Revoclone/Revoclone/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Express.js backend API
├── shared/          # Shared types and schema definitions  
├── dist/            # Built production assets (created by build)
├── package.json     # Dependencies and npm scripts
├── vite.config.ts   # Vite build configuration
├── tsconfig.json    # TypeScript configuration
└── drizzle.config.ts # Database schema configuration
```

### Important Files to Know
- **`server/index.ts`** - Main Express server entry point
- **`server/routes.ts`** - API route definitions (/api/user, /api/transactions, etc.)
- **`server/storage.ts`** - In-memory data storage with mock user/transaction data
- **`client/src/main.tsx`** - React application entry point  
- **`shared/schema.ts`** - Database schema definitions using Drizzle ORM
- **`client/src/lib/data.ts`** - Mock data for frontend components

### Key API Endpoints
- `GET /api/user` - Get default Thomas Francis user
- `GET /api/transactions/:userId` - Get user transactions
- `GET /api/cards/:userId` - Get user cards  
- `GET /api/crypto` - Get cryptocurrency data

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI, TanStack Query
- **Backend**: Express.js, TypeScript
- **Build Tool**: Vite (frontend), esbuild (backend)
- **Database**: PostgreSQL schema defined, currently uses in-memory storage
- **Routing**: Wouter (lightweight React router)

## Development Notes

### No Testing Framework
- No test scripts configured in package.json
- No linting scripts configured  
- Manual testing via browser is the primary validation method

### Database Setup
- Drizzle ORM schema defined for PostgreSQL
- Currently uses in-memory mock data storage
- `DATABASE_URL` environment variable required for database connections
- Mock user: Thomas Francis (thomas.francis) with sample transactions and crypto data

### Environment Configuration  
- Optimized for Replit development environment
- Uses special Vite plugins: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`
- PWA manifest configured for mobile experience
- Custom font loading (Inter) from Google Fonts

### Build Artifacts
- Frontend builds to `dist/public/` directory
- Backend builds to `dist/index.js`
- Static assets served from `dist/public/` in production
- Source maps and TypeScript declarations generated

## Common Tasks Reference

### Repository Root Files
```
ls -la
.git/
.gitignore  
.replit
attached_assets/
client/
components.json      # shadcn/ui configuration
drizzle.config.ts    # Database configuration  
package-lock.json
package.json         # Main dependency definitions
postcss.config.js    # PostCSS configuration
replit.md           # Project documentation
server/
shared/
tailwind.config.ts   # Tailwind CSS configuration
tsconfig.json        # TypeScript configuration
vite.config.ts       # Vite build configuration
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist", 
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  }
}
```

### TypeScript Configuration
- Includes: client/src, server, shared directories
- Module resolution: bundler (modern)
- Strict mode enabled
- Path aliases: `@/*` → `./client/src/*`, `@shared/*` → `./shared/*`

This project demonstrates a modern full-stack TypeScript application with excellent development experience and fast build times.