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
# Copy node_modules and built application
COPY --from=install /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/apps/server .
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json

# Create startup script
RUN echo '#!/bin/sh\nbunx prisma migrate deploy\nbun run start' > /usr/src/app/apps/server/start.sh && \
    chmod +x /usr/src/app/apps/server/start.sh

USER bun
EXPOSE 9999/tcp

# Set the entrypoint to run the startup script
ENTRYPOINT [ "./start.sh" ]
