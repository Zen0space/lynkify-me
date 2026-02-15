# OpenCode Rules for lynkify-me

## Project Structure
- Monorepo using pnpm workspaces
- Frontend: Next.js 15 on port 3000 (`@lynkify/frontend`)
- Backend: tRPC standalone server on port 4000 (`@lynkify/backend`)
- Shared: Shared types and schemas (`@lynkify/shared`)

## Development Commands

### Start All Services
**Ask user to run:** `pnpm dev`

### Start Backend Only
**Ask user to run:** `pnpm dev:backend`

### Start Frontend Only
**Ask user to run:** `pnpm dev:frontend`

### Database Operations
```bash
pnpm db:push        # Push schema changes to database
pnpm db:migrate     # Run migrations
pnpm db:studio      # Open Prisma Studio (port 5555)
pnpm db:generate    # Generate Prisma Client
```

### Kill Processes
```bash
lsof -ti:4000 | xargs kill -9  # Kill backend
lsof -ti:3000 | xargs kill -9  # Kill frontend
```

## Important Rules

### tRPC Provider
- Client-side tRPC hooks require `TRPCProvider` in component tree
- Server-side tRPC calls use `trpcServer` (no provider needed)
- `TRPCProvider` must wrap children in root `app/layout.tsx`

### Server Management
- NEVER start backend or frontend servers automatically
- Always ask user to run: `pnpm dev` (or `pnpm dev:backend`, `pnpm dev:frontend`)
- Wait for user to confirm servers are running before proceeding
- Do not run background processes or use `&` to start servers

### tRPC Configuration
- DO NOT use `superjson` transformer - it causes tRPC requests to fail
- Both backend and frontend should use plain tRPC without transformers
- Server-side client: `@/lib/trpc-server.ts` uses `httpLink`
- Client-side provider: `@/lib/trpc.tsx` uses `httpBatchLink`

### Auth Flow
1. User logs in via Logto
2. Redirects to `/callback` route
3. Callback syncs user to database via `trpcServer.user.sync.mutate()`
4. Checks onboarding status via `trpcServer.user.byLogtoId.query()`
5. Redirects to `/onboarding` if `onboardingComplete: false`
6. Redirects to `/dashboard` if `onboardingComplete: true`

### User Schema
- `onboardingComplete` defaults to `false` for new users
- Users can sign up with either `email` OR `username` (Logto supports both)
- `email` and `username` fields are now optional in database
- New users created via `sync` mutation have `logtoId`, `username`, and/or `email`
- `displayName`, `slug`, and `avatarConfig` are set during onboarding
- After onboarding, `completeOnboarding` mutation sets `onboardingComplete: true`

### File Locations
- Backend router: `packages/backend/src/trpc/router.ts`
- User procedures: `packages/backend/src/trpc/routers/user.ts`
- Callback route: `packages/frontend/src/app/callback/route.ts`
- Onboarding flow: `packages/frontend/src/app/onboarding/flow.tsx`
- Database schema: `packages/backend/prisma/schema.prisma`

## Testing Checklist
After changes, verify:
1. Backend server starts without errors
2. Frontend server starts without errors
3. Database connection is successful
4. User can sign up with username only and is redirected to onboarding
5. Onboarding page loads without tRPC context errors
6. User can complete onboarding and is redirected to dashboard
7. No false "NEXT_REDIRECT" error logs in callback
8. No console errors in browser or terminal

## Debugging Console Logs

### Important Notes
- `Error: NEXT_REDIRECT` in callback is NOT a real error - it's Next.js's internal redirect mechanism
- This error is only logged when redirects are inside try-catch blocks (should be avoided)
- Client-side pages (like onboarding) need `TRPCProvider` in root layout to use tRPC hooks

### Backend Logs
- `📥 Backend: Incoming POST request` - Receives sync request from frontend
- `🔐 User sync attempt` - Attempting to create/update user in database
- `🆕 Creating new user` - User doesn't exist, creating in database
- `✅ User already exists` - User exists, updating email
- `✅ User sync completed successfully` - Database write successful
- `🔍 Fetching user by logtoId` - Fetching user from database
- `✅ User found` / `❌ User not found` - Query result

### Frontend Logs
- `🌐 Frontend: Attempting to sync user with backend` - Calling tRPC backend
- `✅ Frontend: User synced successfully` - Backend sync successful
- `📊 Frontend: User data received` - User data from backend query
- `🔄 Frontend: Redirecting to onboarding` - User needs onboarding
- `✅ Frontend: Redirecting to dashboard` - User completed onboarding
- `❌ Frontend: Failed to sync user` - Backend unreachable or error
