# Lynkify Monorepo

Full-stack TypeScript monorepo with tRPC, Next.js, Prisma, and PostgreSQL.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | Next.js 15, TailwindCSS v4, React 19 |
| Backend  | tRPC v11, Node.js, Prisma           |
| Database | PostgreSQL 17                       |
| Shared   | Zod schemas, TypeScript types        |
| Infra    | Docker, pnpm workspaces             |

## Project Structure

```
lynkify-me/
├── packages/
│   ├── shared/              # Shared types, schemas, constants
│   ├── backend/             # tRPC API server + Prisma (→ VPS)
│   └── frontend/            # Next.js app (→ Vercel)
├── docker/
│   └── backend.Dockerfile   # Multi-stage production build
├── .github/
│   └── workflows/
│       └── build-backend.yml # CI: build & push to GHCR
├── docker-compose.yml        # Local dev (PostgreSQL only)
├── docker-compose.prod.yml   # VPS production
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9
- **Docker** & **Docker Compose** (for PostgreSQL, or run it natively)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Database (Docker)

```bash
# Start only PostgreSQL
docker compose up postgres -d
```

### 3. Set Up Database

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 4. Run Development Servers

```bash
# Run everything in parallel
pnpm dev

# Or run individually
pnpm dev:backend   # http://localhost:4000
pnpm dev:frontend  # http://localhost:3000
```

> 💡 Docker is only used for PostgreSQL locally. Backend and frontend run natively via `pnpm dev`.

## Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `pnpm dev`      | Start all dev servers in parallel        |
| `pnpm build`    | Build all packages                       |
| `pnpm db:generate` | Generate Prisma client                |
| `pnpm db:push`  | Push schema to database                  |
| `pnpm db:migrate` | Run database migrations               |
| `pnpm db:studio` | Open Prisma Studio                      |
| `pnpm clean`    | Remove all build artifacts & node_modules |

## Environment Variables

Each package manages its own `.env` file. Copy the examples:

```bash
# Backend
cp packages/backend/.env.example packages/backend/.env

# Frontend
cp packages/frontend/.env.example packages/frontend/.env.local
```

### Backend (`packages/backend/.env`)

| Variable       | Default                            | Description          |
| -------------- | ---------------------------------- | -------------------- |
| `DATABASE_URL` | `postgresql://lynkify:...`         | PostgreSQL connection |
| `BACKEND_PORT` | `4000`                             | Server port           |
| `NODE_ENV`     | `development`                      | Environment           |
| `FRONTEND_URL` | `http://localhost:3000`            | CORS allowed origin   |

### Frontend (`packages/frontend/.env.local`)

| Variable              | Default                  | Description              |
| --------------------- | ------------------------ | ------------------------ |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000`  | Backend URL (public)     |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000`  | Frontend URL             |

## Deployment

### Frontend → Vercel

1. Import the repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `packages/frontend`
3. Vercel will auto-detect Next.js and use `vercel.json`
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` → your backend VPS URL (e.g. `https://api.lynkify.me`)
   - `NEXT_PUBLIC_APP_URL` → your Vercel domain (e.g. `https://lynkify.me`)

### Backend → VPS (via GitHub Container Registry)

The backend Docker image is **automatically built on push to `main`** via GitHub Actions and pushed to GHCR.

#### First-time VPS setup

```bash
# 1. Clone repo (for compose files & env templates)
git clone https://github.com/your-username/lynkify-me.git
cd lynkify-me

# 2. Create production env file
cp packages/backend/.env.production.example packages/backend/.env
# Edit with your production values (DATABASE_URL, FRONTEND_URL, etc.)

# 3. Log in to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# 4. Pull & start
docker compose -f docker-compose.prod.yml up -d
```

#### Updating on VPS

```bash
# Pull latest image and restart
docker compose -f docker-compose.prod.yml pull backend
docker compose -f docker-compose.prod.yml up -d backend
```

#### Running Prisma migrations on VPS

```bash
# Run migrations inside the running backend container
docker compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy
```
