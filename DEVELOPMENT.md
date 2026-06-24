# 🚀 Getting Started

## Prerequisites

- [pnpm](https://pnpm.io/) >= 9
- [Bun](https://bun.sh/) >= 1.0
- Node.js >= 22.12.0

## Install

```bash
pnpm install
```

## Environment Variables

<details>
<summary>Create <code>apps/web/.env.local</code></summary>

```env
VITE_API_BASE_URL=http://localhost:3001/
VITE_WS_BASE_URL=ws://localhost:3001/ws
```

</details>

<details>
<summary>Create <code>apps/server/.env.local</code></summary>

```env
TURSO_DATABASE_URL=url
TURSO_AUTH_TOKEN=key
OPENROUTER_API_KEY=key
```

</details>

## Run in Development

```bash
# All apps (web + server)
pnpm dev

# Individual apps
pnpm dev:web
pnpm dev:server
pnpm dev:landing
```

---

## ☁️ Deployment

| App     | Platform                         |
| ------- | -------------------------------- |
| Landing | GitHub Pages (`gh-pages` branch) |
| Web     | Vercel                           |
| Server  | Docker (any container host)      |
