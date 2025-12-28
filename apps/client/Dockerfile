# TanStack Start (SSR) Client Dockerfile
# Multi-stage build for optimized production image
#
# NOTE: This Dockerfile expects to be run from the monorepo root
# Build command: docker build -f apps/client/Dockerfile .

FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install OpenSSL (required for some dependencies)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# ============================================
# Build Stage
# ============================================
FROM base AS builder
WORKDIR /usr/src/app

# Copy root workspace files
COPY package.json bun.lock* ./

# Copy the entire monorepo structure (client needs server types)
COPY apps/server ./apps/server/
COPY apps/client ./apps/client/

# Install all dependencies from monorepo root
RUN bun install --frozen-lockfile

# Set build-time environment variables (can be overridden during build)
ARG VITE_API_URL
ARG VITE_APP_URL
ARG VITE_BETTER_AUTH_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_URL=${VITE_APP_URL}
ENV VITE_BETTER_AUTH_URL=${VITE_BETTER_AUTH_URL}

# Build the client application
WORKDIR /usr/src/app/apps/client
RUN bun run build

# ============================================
# Production Stage - Nginx
# ============================================
FROM nginx:alpine AS runner

# Copy built static files to nginx html directory
COPY --from=builder /usr/src/app/apps/client/dist/client /usr/share/nginx/html

# Copy custom nginx configuration
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
