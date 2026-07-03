<a id="readme-top"></a>

<!-- HERO -->
<div align="center">
  <a href="https://github.com/blank-evgeniy/story-forge">
    <img src="images/logo.svg" alt="Logo" width="200" height="auto">
  </a>

  <p align="center">
    <br />
    A multiplayer collaborative storytelling game where players build stories together.
    <br />
    <a href="https://story-forge-web-omega.vercel.app"><strong>Play now!</strong></a>
    <br />
    <br />
    <a href="https://blank-evgeniy.github.io/story-forge">About the App</a>
    &middot;
    <a href="https://github.com/blank-evgeniy/story-forge/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/blank-evgeniy/story-forge/issues/new?labels=enhancement">Request Feature</a>
  </p>

  <br />
  
  **English | [Русский](README.ru.md)**
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#how-to-play">How To Play</a>
      <ul>
        <li><a href="#game-settings">Game Settings</a></li>
      </ul>
    </li>
    <li>
      <a href="#technical-details">Technical Details</a>
      <ul>
        <li><a href="#monorepo-structure">Monorepo Structure</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Story Forge Screen Shot][banner]](https://story-forge-web-omega.vercel.app)

**Story Forge** is a real-time party game about writing stories together. Gather your friends in a shared room, and take turns building the story until an entire tale takes shape — then watch it read back to you, twist by twist.

The catch is that you rarely see the whole picture while you write. In **Blind Mode** you only see the line before yours, and **Twists Mode** can drop a surprise plot turn on an unsuspecting player mid-game. The result is chaotic, unpredictable stories that no single person could have written alone. When the round ends, the full tale is revealed line by line with voice narration, and an AI of your choosing — a critic, a comedian, a philosopher — leaves its verdict.

No installs, no accounts: the host shares a 4-digit code or QR, everyone joins from their phone, and you're playing in seconds.

### Built With

[![TypeScript][TypeScript]][TypeScript-url]
[![React][React.js]][React-url]
[![Elysia][Elysia]][Elysia-url]
[![Turso][Turso]][Turso-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## How To Play

1. Set up your profile: pick an avatar, color, and username
2. A host creates a room and shares a 4-digit code or QR code with friends
3. Players join and the host starts the game
4. Each round, every player writes one entry within a time limit (15–120 seconds)
5. In **Blind Mode**, players see only the previous entry — creating unexpected twists
6. In **Twists Mode**, a random plot twist is injected mid-game for one of the players
7. After all rounds, the full story is revealed entry by entry with Web Speech API narration
8. The story can be saved and published to a public stories page
9. After saving, an AI leaves a short comment on the story

### Game Settings

| Setting          | Range                                       | Default |
| ---------------- | ------------------------------------------- | ------- |
| Seconds per turn | 15–120 s                                    | 60 s    |
| Blind Mode       | on/off                                      | off     |
| Twists           | on/off                                      | off     |
| AI commentator   | comedian/critic/fan/philosopher/teacher/off | critic  |

> **Blind Mode** limits each player to seeing only the single entry written before their turn, making stories unpredictable and fun.

> **Twists** injects a random plot twist mid-game for one player, steering the story in an unexpected direction.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Technical Details

### Monorepo Structure

```
apps/
  server/   — WebSocket game server (Bun + Elysia)
  web/      — React game client
  landing/  — Landing page (Astro)
```

### Tech Stack

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [roadmap](roadmap.md) for a list of future features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

> 🧑‍💻 Running the project locally? See [DEVELOPMENT.md](DEVELOPMENT.md).

<!-- LINKS -->

[banner]: images/banner.png
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Elysia]: https://img.shields.io/badge/Elysia-0f172a?style=for-the-badge
[Elysia-url]: https://elysiajs.com/
[Turso]: https://img.shields.io/badge/Turso-4ff8d2?style=for-the-badge&logo=turso&logoColor=black
[Turso-url]: https://turso.tech/
