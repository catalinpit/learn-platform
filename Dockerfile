# syntax=docker/dockerfile:1.7-labs
FROM oven/bun:latest as base

WORKDIR /usr/src/app

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
COPY . .
# Remove any .env files to prevent local development credentials from being used in production
RUN rm -f server/.env
COPY --from=install /temp/prod/server/node_modules server/node_modules/
COPY --from=install /temp/prod/client/node_modules client/node_modules/
ENV NODE_ENV=production
# Generate Prisma client
WORKDIR /usr/src/app/server
RUN bunx prisma generate
WORKDIR /usr/src/app/client
RUN bun run build

FROM base as release
WORKDIR /usr/src/app
COPY --from=install /temp/prod/server/node_modules server/node_modules/
COPY --exclude=client --exclude=server/.env --from=build /usr/src/app/ .
COPY --from=build /usr/src/app/client/dist ./client/dist/

USER bun
EXPOSE 9999/tcp
WORKDIR /usr/src/app/server
ENTRYPOINT [ "bun", "run", "start" ]
