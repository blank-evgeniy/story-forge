# Story Forge

> 🇷🇺 [Русский](#story-forge-ru) | 🇬🇧 [English](#story-forge-en)

---

<a name="story-forge-ru"></a>

# Story Forge RU

Многопользовательская игра в совместное сочинение историй — одно предложение за раз.

[Приложение](https://story-forge-web-omega.vercel.app/) · [Лендинг](https://blank-evgeniy.github.io/story-forge)

---

## Как это работает

1. Хост создаёт комнату и делится 4-значным кодом или QR-кодом с друзьями
2. Игроки заходят, хост запускает игру
3. В каждом раунде каждый игрок пишет одно предложение в рамках таймера (30–90 секунд)
4. В режиме **Слепого текста** игрок видит только предыдущее предложение — что делает историю непредсказуемой
5. После всех раундов история раскрывается предложение за предложением

---

## Структура монорепо

```
apps/
  server/   — WebSocket-сервер (Bun + Elysia)
  web/      — React-клиент
  landing/  — Лендинг (Astro)
```

---

## Технологии

| Слой              | Технология                         |
| ----------------- | ---------------------------------- |
| Монорепо          | pnpm workspaces                    |
| Среда сервера     | Bun                                |
| Фреймворк сервера | Elysia                             |
| Реальное время    | WebSockets                         |
| Фронтенд          | React 19, Vite, TanStack Router    |
| Стилизация        | Tailwind CSS 4, shadcn/ui, Base UI |
| Состояние         | Zustand                            |
| Анимации          | Motion                             |
| Лендинг           | Claude Code + Astro 6              |

---

## Начало работы

### Требования

- [pnpm](https://pnpm.io/) >= 9
- [Bun](https://bun.sh/) >= 1.0
- Node.js >= 22.12.0

### Установка

```bash
pnpm install
```

### Переменные окружения

Создайте `apps/web/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3001/
VITE_WS_BASE_URL=ws://localhost:3001/ws
```

### Запуск в режиме разработки

```bash
# Все приложения (web + server)
pnpm dev

# Отдельно
pnpm dev:web
pnpm dev:server
pnpm dev:landing
```

---

## Настройки игры

| Параметр             | Диапазон | По умолчанию |
| -------------------- | -------- | ------------ |
| Секунд на ход        | 30–90 с  | 60 с         |
| Режим слепого текста | вкл/выкл | выкл         |

В режиме слепого текста каждый игрок видит только предыдущее предложение — история получается неожиданной и смешной.

---

## Деплой

| Приложение | Платформа                           |
| ---------- | ----------------------------------- |
| Лендинг    | GitHub Pages (ветка `gh-pages`)     |
| Web        | Vercel                              |
| Server     | Docker (любой контейнерный хостинг) |

---

---

<a name="story-forge-en"></a>

# Story Forge EN

A multiplayer collaborative storytelling game where players build stories together — one sentence at a time.

[Live App](https://blank-evgeniy.github.io/story-forge) · [Landing Page](https://blank-evgeniy.github.io/story-forge)

---

## How It Works

1. A host creates a room and shares a 4-digit code or QR code with friends
2. Players join and the host starts the game
3. Each round, every player writes one sentence within a time limit (30–90 seconds)
4. In **Blind Mode**, players see only the previous sentence — creating unexpected twists
5. After all rounds, the full story is revealed sentence by sentence

---

## Monorepo Structure

```
apps/
  server/   — WebSocket game server (Bun + Elysia)
  web/      — React game client
  landing/  — Landing page (Astro)
```

---

## Tech Stack

| Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| Monorepo         | pnpm workspaces                    |
| Server runtime   | Bun                                |
| Server framework | Elysia                             |
| Real-time        | WebSockets                         |
| Frontend         | React 19, Vite, TanStack Router    |
| Styling          | Tailwind CSS 4, shadcn/ui, Base UI |
| State            | Zustand                            |
| Animations       | Motion                             |
| Landing          | Claude Code + Astro 6              |

---

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/) >= 9
- [Bun](https://bun.sh/) >= 1.0
- Node.js >= 22.12.0

### Install

```bash
pnpm install
```

### Environment Variables

Create `apps/web/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3001/
VITE_WS_BASE_URL=ws://localhost:3001/ws
```

### Run in Development

```bash
# All apps (web + server)
pnpm dev

# Individual apps
pnpm dev:web
pnpm dev:server
pnpm dev:landing
```

---

## Game Settings

| Setting          | Range   | Default |
| ---------------- | ------- | ------- |
| Seconds per turn | 30–90 s | 60 s    |
| Blind Mode       | on/off  | off     |

Blind Mode limits each player to seeing only the single sentence written before their turn, making stories unpredictable and fun.

---

## Deployment

| App     | Platform                         |
| ------- | -------------------------------- |
| Landing | GitHub Pages (`gh-pages` branch) |
| Web     | Vercel                           |
| Server  | Docker (any container host)      |

---
