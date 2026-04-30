FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock tsconfig.json ./
RUN bun install --frozen-lockfile --production

COPY src ./src

EXPOSE 3000
USER bun
CMD ["bun", "src/index.ts"]