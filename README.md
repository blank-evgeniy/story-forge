# Story Forge

> 🇷🇺 [Русский](#story-forge-ru) | 🇬🇧 [English](#story-forge-en)

---

<a name="story-forge-ru"></a>

# Story Forge RU

Многопользовательская игра в совместное сочинение историй — одно предложение за раз.

[Приложение](https://story-forge-web-omega.vercel.app/) · [Лендинг](https://blank-evgeniy.github.io/story-forge)

---

## Как это работает

1. Настройте профиль: выберите аватар, цвет и имя
2. Хост создаёт комнату и делится 4-значным кодом или QR-кодом с друзьями
3. Игроки заходят, хост запускает игру
4. В каждом раунде каждый игрок пишет одно предложение в рамках таймера (30–90 секунд)
5. В режиме **Blind** игрок видит только предыдущее предложение — что делает историю непредсказуемой
6. В режиме **Твистов** в середине игры случайный поворот сюжета вписывается в историю
7. После всех раундов история раскрывается предложение за предложением с озвучкой через Web Speech API
8. Готовую историю можно сохранить — она появится на публичной странице историй
9. После сохранения ИИ оставляет короткий комментарий к истории

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
| База данных       | Turso (libSQL) + Drizzle ORM       |
| ИИ-комментарии    | OpenRouter + Vercel AI SDK         |
| Фронтенд          | React 19, Vite, TanStack Router    |
| Стилизация        | Tailwind CSS 4, shadcn/ui, Base UI |
| Состояние         | Zustand                            |
| Анимации          | Motion                             |
| Компоненты        | Storybook                          |
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

Создайте `apps/server/.env.local`:

```env
TURSO_DATABASE_URL=url
TURSO_AUTH_TOKEN=key
OPENROUTER_API_KEY=key
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
| Твисты               | вкл/выкл | выкл         |

**Слепой текст** — каждый игрок видит только предыдущее предложение, история получается неожиданной и смешной.

**Твисты** — в середине игры в историю вписывается случайный поворот сюжета, который получает только один из игроков.

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

A multiplayer collaborative storytelling game where players build stories together — one entry at a time.

[Live App](https://story-forge-web-omega.vercel.app/) · [Landing Page](https://blank-evgeniy.github.io/story-forge)

---

## How It Works

1. Set up your profile: pick an avatar, color, and username
2. A host creates a room and shares a 4-digit code or QR code with friends
3. Players join and the host starts the game
4. Each round, every player writes one entry within a time limit (30–90 seconds)
5. In **Blind Mode**, players see only the previous entry — creating unexpected twists
6. In **Twists Mode**, a random plot twist is injected mid-game for one of the players
7. After all rounds, the full story is revealed entry by entry with Web Speech API narration
8. The story can be saved and published to a public stories page
9. After saving, an AI leaves a short comment on the story

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
| Database         | Turso (libSQL) + Drizzle ORM       |
| AI comments      | OpenRouter + Vercel AI SDK         |
| Frontend         | React 19, Vite, TanStack Router    |
| Styling          | Tailwind CSS 4, shadcn/ui, Base UI |
| State            | Zustand                            |
| Animations       | Motion                             |
| Components       | Storybook                          |
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

Create `apps/server/.env.local`:

```env
TURSO_DATABASE_URL=url
TURSO_AUTH_TOKEN=key
OPENROUTER_API_KEY=key
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
| Twists           | on/off  | off     |

**Blind Mode** limits each player to seeing only the single entry written before their turn, making stories unpredictable and fun.

**Twists** injects a random plot twist mid-game for one player, steering the story in an unexpected direction.

---

## Deployment

| App     | Platform                         |
| ------- | -------------------------------- |
| Landing | GitHub Pages (`gh-pages` branch) |
| Web     | Vercel                           |
| Server  | Docker (any container host)      |

---
