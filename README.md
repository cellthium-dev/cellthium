# Cellthium v2 - Modular Battery Pack E-Commerce Platform

A modern monorepo e-commerce platform specializing in modular battery packs built with **Medusa.js** and **Next.js**.

## 🏗️ Architecture

This is a **pnpm workspace** containing:

- **`client/`** - Next.js 15 frontend with React 19, TypeScript, and Tailwind CSS
- **`server/`** - Medusa.js 2.5 backend with PostgreSQL
- **`request/`** - API testing and development tools

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0 
- **PostgreSQL** (for Medusa backend)

### Installation

```bash
# Install all dependencies for both projects
pnpm install
```

### Development

```bash
# Run both client and server simultaneously
pnpm dev

# Run only the frontend (Next.js)
pnpm dev:client

# Run only the backend (Medusa.js)
pnpm dev:server
```

### Build

```bash
# Build both projects
pnpm build

# Build specific project
pnpm build:client
pnpm build:server
```

### Production

```bash
# Start both projects in production mode
pnpm start

# Start specific project
pnpm start:client
pnpm start:server
```

## 🛠️ Development Tools

### Code Quality

The client uses **Ultracite** (built on Biome) for ultra-fast linting and formatting:

```bash
# Lint client code
pnpm lint:client

# Format client code  
pnpm format:client
```

### Database & Seeding

```bash
# Seed the Medusa database
pnpm seed
```

### Testing

```bash
# Run all tests
pnpm test

# Run server unit tests
pnpm test:server

# Run integration tests
pnpm test:integration
```

## 📦 Project Structure

```
cellthium-v2/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities & data fetching
│   │   └── modules/        # Feature modules
│   ├── biome.jsonc         # Ultracite/Biome config
│   └── package.json
├── server/                 # Medusa.js Backend
│   ├── src/
│   │   ├── admin/          # Admin dashboard customizations
│   │   ├── api/            # API routes
│   │   └── modules/        # Custom Medusa modules
│   ├── medusa-config.ts    # Medusa configuration
│   └── package.json
├── request/                # API testing
├── package.json            # Workspace root
├── pnpm-workspace.yaml     # Workspace configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Client (`client/.env.local`)
```bash
# Medusa API
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Stripe (optional)
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
```

#### Server (`server/.env`)
```bash
# Database
DATABASE_URL=postgres://username:password@localhost:5432/medusa-db

# JWT
JWT_SECRET=your_jwt_secret

# Cookie Secret
COOKIE_SECRET=your_cookie_secret

# Stripe (optional)
STRIPE_API_KEY=your_stripe_secret_key
```

### URLs

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:9000  
- **Admin Dashboard**: http://localhost:9000/app

## 🎯 Core Features

### Frontend (Next.js)
- **Modern Stack**: Next.js 15, React 19 RC, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives + custom components
- **State Management**: Zustand + TanStack Query
- **Animations**: Framer Motion
- **Performance**: Optimized with App Router, Server Components
- **Code Quality**: Ultracite (Biome) for linting & formatting

### Backend (Medusa.js)
- **E-commerce Core**: Full-featured commerce backend
- **Database**: PostgreSQL with MikroORM
- **Admin**: Customizable admin dashboard
- **Payments**: Stripe integration
- **Multi-region**: International commerce support
- **Extensible**: Custom modules and workflows

### Product Categories
- **Power-Module**: High-performance battery packs for vehicles and high-demand applications
- **Energy-Module**: Battery solutions optimized for continuous operation and self-consumption

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run both client and server in development |
| `pnpm dev:client` | Run only Next.js frontend |
| `pnpm dev:server` | Run only Medusa backend |
| `pnpm build` | Build both projects |
| `pnpm start` | Start both projects in production |
| `pnpm lint` | Lint all projects |
| `pnpm format` | Format client code |
| `pnpm seed` | Seed the database |
| `pnpm test` | Run all tests |

## 🤝 Contributing

1. **Code Style**: Use Ultracite for the client (runs automatically)
2. **Commits**: Follow conventional commit format
3. **Testing**: Add tests for new features
4. **Documentation**: Update README for significant changes

## 📄 License

MIT License - see LICENSE file for details.

---

**Cellthium Labs** - Building the future of modular energy solutions 🔋
