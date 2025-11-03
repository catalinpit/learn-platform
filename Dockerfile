FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install OpenSSL in the base image
RUN apt-get update -y && apt-get install -y openssl

FROM base AS install
# Copy root package.json and lockfile for workspace configuration
COPY package.json bun.lock ./
# Copy all workspace package.json files (required for lockfile validation)
COPY apps/server/package.json ./apps/server/
COPY apps/client/package.json ./apps/client/
# Install dependencies from the root (monorepo workspace)
WORKDIR /usr/src/app
RUN bun install --frozen-lockfile --production --filter=server

FROM base AS build
WORKDIR /usr/src/app
# Copy the entire monorepo structure needed for the server
COPY package.json bun.lock ./
COPY apps/server/ ./apps/server/
COPY apps/client/package.json ./apps/client/
# Install all dependencies (including devDependencies) needed for Prisma generation
RUN bun install --frozen-lockfile --filter=server

WORKDIR /usr/src/app/apps/server
ENV NODE_ENV=production

# Generate Prisma client
RUN bunx prisma generate

FROM base AS release
WORKDIR /usr/src/app/apps/server

# Copy node_modules first (production dependencies including @prisma/client)
COPY --from=install /usr/src/app/node_modules /usr/src/app/node_modules

# Copy the entire server application
COPY --from=build /usr/src/app/apps/server .
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json

# Install Prisma CLI as dev dependency (needed for generate and migrate commands)
RUN bun add -d prisma

# Ensure we're in the correct directory and regenerate Prisma client
# This ensures the client is generated with the correct platform binaries for the runtime
WORKDIR /usr/src/app/apps/server
# Remove any existing generated client to avoid conflicts
RUN rm -rf prisma/generated/client prisma/generated/types 2>/dev/null || true
# Generate Prisma client with explicit schema path
RUN bunx prisma generate --schema=./prisma/schema.prisma

# Verify the generated client exists (fail build if it doesn't)
RUN test -f prisma/generated/client/index.ts || (echo "ERROR: Prisma client not generated!" && ls -la prisma/generated/ 2>/dev/null || echo "prisma/generated directory missing" && exit 1)

# Create startup script with explicit working directory
RUN echo '#!/bin/sh\ncd /usr/src/app/apps/server\nbunx prisma migrate deploy\nbun run start' > /usr/src/app/apps/server/start.sh && \
    chmod +x /usr/src/app/apps/server/start.sh

USER bun
EXPOSE 9999/tcp

# Set the entrypoint to run the startup script
ENTRYPOINT [ "./start.sh" ]
