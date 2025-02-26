# syntax=docker/dockerfile:1.7-labs
FROM oven/bun:latest as base

WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod/server/
COPY server/package.json server/bun.lock /temp/prod/server/
RUN cd /temp/prod/server && bun install --frozen-lockfile --production

RUN mkdir -p /temp/prod/client
COPY client/bun.lock client/package.json /temp/prod/client/
RUN cd /temp/prod/client && bun install --frozen-lockfile

FROM base as build
COPY . .
COPY --from=install /temp/prod/server/node_modules server/node_modules/
COPY --from=install /temp/prod/client/node_modules client/node_modules/
ENV NODE_ENV=production
# Generate Prisma client
RUN cd server && bunx prisma generate
RUN cd client && bun run build

FROM base as release
COPY --from=install /temp/prod/server/node_modules server/node_modules/
COPY --exclude=client --from=build /usr/src/app/ .
COPY --from=build /usr/src/app/client/dist ./client/dist/

USER bun
EXPOSE 9999/tcp
WORKDIR /usr/src/app/server
ENTRYPOINT [ "bun", "run", "start" ]
