FROM oven/bun:1.3.3-slim AS base
WORKDIR /app

# =========================
# Stage 1: Install deps
# =========================
FROM base AS deps
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
COPY apps/server/package.json ./apps/server/
RUN bun install --filter=server

# =========================
# Stage 2: Build (prisma)
# =========================
FROM base AS build
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock ./
COPY apps/server ./apps/server

WORKDIR /app/apps/server
RUN bun run prisma:generate

# =========================
# Stage 3: Release
# =========================
FROM base AS release
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Reuse deps (no reinstall)
COPY --from=deps /app/node_modules ./node_modules

# App files and generated prisma
COPY package.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/server ./apps/server
COPY --from=build /app/apps/server/prisma/generated ./apps/server/prisma/generated

WORKDIR /app/apps/server

EXPOSE 9999

CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start"]
