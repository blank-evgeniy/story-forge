# WebSocket Events

## Flow

### Game loop

lobby → `start_game` → `game_started` → (2s) → `round_started` + `your_turn`
↓
`submit_entry` × N
↓
`round_ended` → (2s) → `round_started` + `your_turn`
↓ (последний раунд)
`all_revealed`
↓
`ai_comment`

### Подключение нового игрока

client → `join_room` → `room_state` (sender) + `player_joined` (broadcast)

### Реконнект в лобби:

client → `join_room` → `room_state` (sender)

### Реконнект:

client → `join_room` → `room_state` (sender) + `your_turn` (sender) + `player_reconnected` (broadcast)

### Дисконнект в лобби:

(разрыв соединения) → `player_left` (broadcast)

### Дисконнект во время игры:

(разрыв соединения) → `player_disconnected` (broadcast)

## Client → Server

| Event           | When                         | Notes                                   |
| --------------- | ---------------------------- | --------------------------------------- |
| `join_room`     | Вход / реконнект             | Реконнект если `playerId` уже в комнате |
| `start_game`    | Хост запускает игру          | Минимум 2 игрока, статус `lobby`        |
| `draft_entry`   | Игрок пишет предложение      | —                                       |
| `submit_entry`  | Игрок отправляет предложение | `twistId` только в раунде выбора твиста |
| `edit_entry`    | Игрок изменяет предложение   | —                                       |
| `restart_game`  | Хост перезапускает игру      | Игра переводится в состояние лобби      |
| `request_state` | После реконнекта / F5        | —                                       |

## Server → Client

| Event                 | To        | Trigger                                                                   |
| --------------------- | --------- | ------------------------------------------------------------------------- |
| `room_state`          | sender    | После `join_room` или `request_state`                                     |
| `game_started`        | broadcast | После `start_game`, содержит `totalRounds`                                |
| `player_joined`       | broadcast | Первый вход нового игрока                                                 |
| `player_left`         | broadcast | Выход из лобби                                                            |
| `player_disconnected` | broadcast | Выход во время игры                                                       |
| `player_reconnected`  | broadcast | Переподключение, если покинул во время игры                               |
| `round_started`       | broadcast | Начало раунда                                                             |
| `your_turn`           | sender    | Сразу после `round_started`. В `blindMode` — только последнее предложение |
| `player_submitted`    | broadcast | Любой сабмит, включая таймаут                                             |
| `round_ended`         | broadcast | Конец раунда                                                              |
| `all_revealed`        | broadcast | После последнего раунда                                                   |
| `ai_comment`          | broadcast | После `all_revealed`                                                      |
| `game_restarted`      | broadcast | После `restart_game`                                                      |
| `error`               | sender    | Невалидный запрос                                                         |

## Notes

- **Твисты:** `twistsToChoose` приходит в `your_turn` в середине игры. `twistId` отправляется в `submit_entry` того же раунда.
- **Таймаут:** сервер авто-сабмитит предложение, `wasTimeout: true` в истории.
- **Дисконнект:** поведение зависит от статуса комнаты. В `lobby | reveal` — игрок удаляется, broadcast `player_left`. В `writing` — игрок остаётся с `connected: false`, broadcast `player_disconnected`. При реконнекте — `connected: true`, broadcast `player_reconnected`.
- **Рестарт:** Если перед рестартом игры были дисконнектнутые игроки, они удалятся и только после
  этого игра переходит к статусу `lobby`
