# syntax=docker/dockerfile:1.7-labs
FROM oven/bun:latest as base

WORKDIR /usr/src/app

# Install OpenSSL in the base image
RUN apt-get update -y && apt-get install -y openssl

FROM base AS install
# Server dependencies
WORKDIR /temp/prod/server
COPY server/package.json server/bun.lock ./
RUN bun install --frozen-lockfile --production

# Client dependencies
WORKDIR /temp/prod/client
COPY client/bun.lock client/package.json ./
RUN bun install --frozen-lockfile

FROM base as build
WORKDIR /usr/src/app
COPY --from=install /temp/prod/server/node_modules server/node_modules/
COPY --from=install /temp/prod/client/node_modules client/node_modules/

# Copy the rest of your application code
COPY . .

ENV NODE_ENV=production

# Generate Prisma client and run migrations in the server directory
WORKDIR /usr/src/app/server
RUN bunx prisma generate
RUN bunx prisma migrate deploy

# Build the client
WORKDIR /usr/src/app/client
RUN bun run build

FROM base as release
WORKDIR /usr/src/app
COPY --from=install /temp/prod/server/node_modules server/node_modules/
COPY --from=build /usr/src/app/server ./server
COPY --from=build /usr/src/app/client/dist ./client/dist/

USER bun
EXPOSE 9999/tcp

# Set the entrypoint to run the server
WORKDIR /usr/src/app/server
ENTRYPOINT [ "bun", "run", "start" ]
