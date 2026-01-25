FROM oven/bun:1-slim AS base
WORKDIR /app

# ==========================================
# Stage 1: Install dependencies (cached layer)
# ==========================================
FROM base AS deps

COPY package.json bun.lock ./
COPY apps/client/package.json ./apps/client/

RUN bun install

# ==========================================
# Stage 2: Build
# ==========================================
FROM base AS build

# Reuse dependencies (no reinstall)
COPY --from=deps /app/node_modules ./node_modules

# Package files
COPY package.json bun.lock ./
COPY apps/client/package.json ./apps/client/

# Server bits needed for @server imports and tsconfig references
COPY apps/server/tsconfig.json ./apps/server/tsconfig.json
COPY apps/server/prisma/generated ./apps/server/prisma/generated
COPY apps/server/shared ./apps/server/shared
COPY apps/server/lib/hc.ts ./apps/server/lib/hc.ts

# Client source
COPY apps/client ./apps/client

# Build the client
WORKDIR /app/apps/client
RUN bun run build

# ==========================================
# Stage 3: Release
# ==========================================
FROM base AS release

WORKDIR /app
ENV NODE_ENV=production

# Reuse deps from deps stage (no reinstall)
COPY --from=deps /app/node_modules ./node_modules

# Runtime files
COPY package.json ./
COPY apps/client/package.json ./apps/client/
COPY --from=build /app/apps/client/dist ./apps/client/dist
COPY --from=build /app/apps/client/server.ts ./apps/client/server.ts

WORKDIR /app/apps/client

USER bun

EXPOSE 5173

CMD ["bun", "run", "start"]
