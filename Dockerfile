FROM docker.io/node:18-alpine AS builder

RUN corepack enable
WORKDIR /app
ENV CI true

# Files required by pnpm to fetch dependencies
COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm fetch

# Bundle app source
COPY . ./

RUN pnpm install -r --offline --frozen-lockfile

# Build
RUN pnpm -r run build

# Shrinkwrap for deployment
RUN pnpm deploy --filter=jomshir-test-srv1 --prod /app/deploy/srv1
RUN pnpm deploy --filter=jomshir-test-srv2 --prod /app/deploy/srv2

# Srv1
FROM docker.io/node:18-alpine AS srv1

WORKDIR /app

COPY --from=builder /app/deploy/srv1 /app

CMD ["node", "--enable-source-maps", "dist/index.js"]

# Srv2
FROM docker.io/node:18-alpine AS srv2

WORKDIR /app

COPY --from=builder /app/deploy/srv2 /app

CMD ["node", "--enable-source-maps", "dist/index.js"]
