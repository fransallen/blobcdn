# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine AS base
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile --production\
      && bun run build

# copy production dependencies and source code into final image
FROM alpine:latest
WORKDIR /app

LABEL org.opencontainers.image.source=https://github.com/fransallen/blobcdn

RUN apk add libgcc libstdc++

COPY --from=base /app/blobcdn ./blobcdn
RUN chmod +x ./blobcdn

COPY ./views ./views
COPY ./public ./public

EXPOSE 3000/tcp
CMD [ "./blobcdn" ]
