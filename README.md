<div align="center">

# 📖 Story Forge

**🇬🇧 English · [🇷🇺 Русский](README.ru.md)**

A multiplayer collaborative storytelling game where players build stories together.

<br />

[![Live App](https://img.shields.io/badge/▶_Live_App-000?style=for-the-badge)](https://story-forge-web-omega.vercel.app/)
[![Landing Page](https://img.shields.io/badge/🌐_Landing_Page-555?style=for-the-badge)](https://blank-evgeniy.github.io/story-forge)

<br />

![React](https://img.shields.io/badge/React_19-20232a?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)
![Elysia](https://img.shields.io/badge/Elysia-0f172a?style=flat-square)
![Turso](https://img.shields.io/badge/Turso-4ff8d2?style=flat-square&logo=turso&logoColor=black)

</div>

---

## ✨ How It Works

1. Set up your profile: pick an avatar, color, and username
2. A host creates a room and shares a 4-digit code or QR code with friends
3. Players join and the host starts the game
4. Each round, every player writes one entry within a time limit (15–120 seconds)
5. In **Blind Mode**, players see only the previous entry — creating unexpected twists
6. In **Twists Mode**, a random plot twist is injected mid-game for one of the players
7. After all rounds, the full story is revealed entry by entry with Web Speech API narration
8. The story can be saved and published to a public stories page
9. After saving, an AI leaves a short comment on the story

---

## 🎮 Game Settings

| Setting          | Range                                       | Default |
| ---------------- | ------------------------------------------- | ------- |
| Seconds per turn | 15–120 s                                    | 60 s    |
| Blind Mode       | on/off                                      | off     |
| Twists           | on/off                                      | off     |
| AI commentator   | comedian/critic/fan/philosopher/teacher/off | critic  |

> **Blind Mode** limits each player to seeing only the single entry written before their turn, making stories unpredictable and fun.

> **Twists** injects a random plot twist mid-game for one player, steering the story in an unexpected direction.

---

## 🗂️ Monorepo Structure

```
apps/
  server/   — WebSocket game server (Bun + Elysia)
  web/      — React game client
  landing/  — Landing page (Astro)
```

---

## 🛠️ Tech Stack

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
| Tests            | Bun, Vitest + RTL, Playwright      |
| Landing          | Claude Code + Astro 6              |

---

> 🧑‍💻 Running the project locally? See [DEVELOPMENT.md](DEVELOPMENT.md).
