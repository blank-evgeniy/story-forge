<a id="readme-top"></a>

<!-- HERO -->
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.svg" alt="Logo" width="200" height="auto">
  </a>

  <p align="center">
    <br />
    Многопользовательская игра в совместное сочинение историй.
    <br />
    <a href="https://story-forge-web-omega.vercel.app"><strong>Играть!</strong></a>
    <br />
    <br />
    <a href="https://blank-evgeniy.github.io/story-forge">О приложении</a>
    &middot;
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug">Сообщить об ошибке</a>
    &middot;
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement">Предложить улучшение</a>
  </p>

  <br />
  
  **[English](README.md) | Русский**
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Содержание</summary>
  <ol>
    <li>
      <a href="#о-проекте">О проекте</a>
      <ul>
        <li><a href="#основные-технологии">Основные технологии</a></li>
      </ul>
    </li>
    <li>
      <a href="#как-играть">Как играть</a>
      <ul>
        <li><a href="#настройки-игры">Настройки игры</a></li>
      </ul>
    </li>
    <li>
      <a href="#технические-детали">Технические детали</a>
      <ul>
        <li><a href="#структура-проекта">Структура проекта</a></li>
        <li><a href="#стек-технологий">Стек технологий</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## О проекте

[![Story Forge Screen Shot][banner]](https://story-forge-web-omega.vercel.app)

**Story Forge** — это онлайн-игра для компании, в которой вы сочиняете истории вместе. Соберите друзей в общей комнате и по очереди дополняйте историю, пока не сложится целый рассказ, — а затем послушайте, как она раскрывается, поворот за поворотом.

Всё дело в том, что во время игры вы почти никогда не видите картину целиком. В **слепом режиме** вам доступна только предыдущая строчка, а в **режиме твистов** одному из игроков посреди игры может достаться неожиданный поворот сюжета. В итоге получаются хаотичные и непредсказуемые истории, которые в одиночку никто бы не придумал. В конце раунда история раскрывается строка за строкой с озвучкой, а выбранный вами ИИ — критик, комик или философ — выносит свой вердикт.

Ни установок, ни аккаунтов: хост делится 4-значным кодом или QR, все заходят с телефона, и через пару секунд вы уже играете.

### Основные технологии

[![TypeScript][TypeScript]][TypeScript-url]
[![React][React.js]][React-url]
[![Elysia][Elysia]][Elysia-url]
[![Turso][Turso]][Turso-url]

<p align="right">(<a href="#readme-top">наверх</a>)</p>

## Как играть

1. Настройте профиль: выберите аватар, цвет и имя
2. Хост создаёт комнату и делится 4-значным кодом или QR-кодом с друзьями
3. Игроки заходят, хост запускает игру
4. В каждом раунде каждый игрок пишет одно предложение в рамках таймера (15–120 секунд)
5. В режиме **Blind** игрок видит только предыдущее предложение — что делает историю непредсказуемой
6. В режиме **Твистов** в середине игры случайный поворот сюжета вписывается в историю для одного из игроков
7. После всех раундов история раскрывается предложение за предложением с озвучкой через Web Speech API
8. Готовую историю можно сохранить — она появится на публичной странице историй
9. После сохранения ИИ оставляет короткий комментарий к истории

### Настройки игры

| Параметр       | Диапазон                                | По умолчанию |
| -------------- | --------------------------------------- | ------------ |
| Секунд на ход  | 15–120 с                                | 60 с         |
| Слепой режим   | вкл/выкл                                | выкл         |
| Твисты         | вкл/выкл                                | выкл         |
| ИИ-комментатор | комик/критик/фанат/философ/учитель/выкл | критик       |

> **Слепой режим** — каждый игрок видит только предыдущее предложение, история получается неожиданной и смешной.

> **Твисты** — в середине игры в историю вписывается случайный поворот сюжета, который получает только один из игроков.

<p align="right">(<a href="#readme-top">наверх</a>)</p>

## Технические детали

### Структура проекта

```
apps/
  server/   — WebSocket-сервер (Bun + Elysia)
  web/      — React-клиент
  landing/  — Лендинг (Astro)
```

### Стек технологий

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
| Тесты             | Bun, Vitest + RTL, Playwright      |
| Лендинг           | Claude Code + Astro 6              |

<p align="right">(<a href="#readme-top">наверх</a>)</p>

---

<!-- ROADMAP -->

## Roadmap

Смотрите [roadmap](roadmap.md) со списком будущих функций (и известных проблем).

<p align="right">(<a href="#readme-top">наверх</a>)</p>

---

> 🧑‍💻 Хотите запустить проект локально? См. [DEVELOPMENT.md](DEVELOPMENT.md).

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
