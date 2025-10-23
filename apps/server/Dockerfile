FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install OpenSSL in the base image
RUN apt-get update -y && apt-get install -y openssl

FROM base AS install
# Copy root package.json for workspace configuration
COPY package.json bun.lock* ./
# Copy server package.json and bun.lock
COPY apps/server/package.json apps/server/bun.lock* ./apps/server/
# Install dependencies from the server directory
WORKDIR /usr/src/app/apps/server
RUN bun install --frozen-lockfile --production

FROM base AS build
WORKDIR /usr/src/app
# Copy the entire monorepo structure needed for the server
COPY package.json bun.lock* ./
COPY apps/server/ ./apps/server/
# Copy node_modules from install stage
COPY --from=install /usr/src/app/apps/server/node_modules ./apps/server/node_modules/

WORKDIR /usr/src/app/apps/server
ENV NODE_ENV=production

# Generate Prisma client
RUN bunx prisma generate

FROM base AS release
WORKDIR /usr/src/app/apps/server
# Copy node_modules and built application
COPY --from=install /usr/src/app/apps/server/node_modules ./node_modules/
COPY --from=build /usr/src/app/apps/server .

# Create startup script
RUN echo '#!/bin/sh\nbunx prisma migrate deploy\nbun run start' > /usr/src/app/apps/server/start.sh && \
    chmod +x /usr/src/app/apps/server/start.sh

USER bun
EXPOSE 9999/tcp

# Set the entrypoint to run the startup script
ENTRYPOINT [ "./start.sh" ]
