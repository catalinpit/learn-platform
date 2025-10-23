FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install OpenSSL in the base image
RUN apt-get update -y && apt-get install -y openssl

FROM base AS install
# Server dependencies
WORKDIR /temp/prod/server
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS build
WORKDIR /usr/src/app/server
COPY --from=install /temp/prod/server/node_modules ./node_modules/

# Copy the server application code
COPY . .

ENV NODE_ENV=production

# Generate Prisma client
RUN bunx prisma generate

FROM base AS release
WORKDIR /usr/src/app/server
COPY --from=install /temp/prod/server/node_modules ./node_modules/
COPY --from=build /usr/src/app/server .

# Create startup script
RUN echo '#!/bin/sh\nbunx prisma migrate deploy\nbun run start' > /usr/src/app/server/start.sh && \
    chmod +x /usr/src/app/server/start.sh

USER bun
EXPOSE 9999/tcp

# Set the entrypoint to run the startup script
ENTRYPOINT [ "./start.sh" ]
