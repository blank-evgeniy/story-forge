FROM oven/bun:1.1.38-slim AS base
WORKDIR /app

# Зависимости
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Production образ
FROM oven/bun:1.1.38-slim
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
COPY tsconfig.json ./

EXPOSE 3000
USER bun
CMD ["bun", "src/index.ts"]