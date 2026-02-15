# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.base.json ./

# Copy package manifests only (for layer caching)
COPY packages/shared/package.json ./packages/shared/
COPY packages/backend/package.json ./packages/backend/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build
# ============================================
FROM deps AS builder

# Copy source code
COPY packages/shared/ ./packages/shared/
COPY packages/backend/ ./packages/backend/

# Build shared package
RUN pnpm --filter @lynkify/shared build

# Generate Prisma client
RUN pnpm --filter @lynkify/backend db:generate

# Build backend
RUN pnpm --filter @lynkify/backend build

# ============================================
# Stage 3: Production dependencies only
# ============================================
FROM deps AS prod-deps

RUN pnpm install --frozen-lockfile --prod

# ============================================
# Stage 4: Production runtime
# ============================================
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 backend

# Copy workspace config
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./

# Copy production node_modules
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=prod-deps /app/packages/backend/node_modules ./packages/backend/node_modules

# Copy built shared package
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Copy built backend
COPY --from=builder /app/packages/backend/package.json ./packages/backend/
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist

# Copy Prisma schema + generated client
COPY --from=builder /app/packages/backend/prisma ./packages/backend/prisma
COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER backend

EXPOSE 7000

ENV NODE_ENV=production

CMD ["node", "packages/backend/dist/index.js"]
