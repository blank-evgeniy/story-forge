# Клиентские ивенты

## --- join_room ---

### Description

Вход игрока в комнату. Если игрок с таким `playerId` уже существует в комнате — восстанавливает его соединение (реконнект).
При первом входе рассылает всем игрокам комнаты `player_joined`. В обоих случаях зашедшему игроку отправляется `room_state`.

### Payload

```
type: "join_room"
code: string       - код комнаты
username: string   - никнейм игрока (1–50 символов)
playerId: string   - уникальный id игрока, сгенерированный на клиенте
```

---

## --- submit_sentence ---

### Description

Отправка игроком предложения для текущей итерации. Предложение записывается в историю, которую ведёт данный игрок в этом раунде.
После сабмита рассылает всем `player_submitted`. Если все подключённые игроки сдали — немедленно завершает раунд (сбрасывает таймер).

### Payload

```
type: "submit_sentence"
content: string    - текст предложения (1–200 символов)
```

---

## --- start_game ---

### Description

Запуск игры хостом. Комната должна быть в статусе `lobby` и содержать минимум 2 игроков.
Создаёт по одной истории на каждого игрока, переводит комнату в статус `writing` и инициирует первый раунд.

### Payload

```
type: "start_game"
```

---

## --- request_state ---

### Description

Запрос текущего состояния комнаты. Сервер отвечает отправителю событием `room_state`.
Используется для восстановления UI после реконнекта или обновления страницы.

### Payload

```
type: "request_state"
```

---

# Серверные ивенты

## --- error ---

### Description

Сообщение об ошибке, отправляемое конкретному клиенту при невалидном запросе.

### Payload

```
type: "error"
message: string    - описание ошибки
```

---

## --- room_state ---

### Description

Полное состояние комнаты. Отправляется конкретному клиенту при входе в комнату или по запросу `request_state`.

### Payload

```
type: "room_state"
room: {
  code: string
  status: "lobby" | "writing" | "reveal"
  hostId: string
  secondsPerTurn: number
  blindMode: boolean
  round: number
  totalRounds: number | undefined
  submitted: string[]           - массив playerId игроков, уже сдавших в текущем раунде
  players: Array<{
    id: string
    username: string
    turnOrder: number
    connected: boolean
  }>
  stories: Array<{
    id: string
    ownerId: string             - playerId игрока, которому принадлежит история
    sentences: Array<{
      playerId: string
      content: string
      wasTimeout: boolean
    }>
  }>
}
```

---

## --- player_joined ---

### Description

Рассылается всем игрокам комнаты, когда новый игрок впервые входит в комнату.

### Payload

```
type: "player_joined"
username: string
playerId: string
```

---

## --- player_left ---

### Description

Рассылается всем игрокам комнаты, когда игрок отключился.

### Payload

```
type: "player_left"
playerId: string
```

---

## --- iteration_started ---

### Description

Рассылается всем игрокам в начале каждого раунда. Сразу после этого события каждый игрок получает персональное `your_turn`.

### Payload

```
type: "iteration_started"
round: number          - номер текущего раунда (1-based)
totalRounds: number    - всего раундов в игре (равно количеству игроков)
timer: number          - длительность раунда в миллисекундах
```

---

## --- your_turn ---

### Description

Отправляется персонально каждому игроку в начале раунда. Содержит предыдущее предложение (или все предложения) из истории, которую игрок продолжает в этом раунде.
В первом раунде `prevSentence` равен `null`. В режиме `blindMode` передаётся только последнее предложение, иначе — весь список.

### Payload

```
type: "your_turn"
prevSentence: null | Sentence | Sentence[]

Sentence: {
  playerId: string
  content: string
  wasTimeout: boolean
}
```

---

## --- player_submitted ---

### Description

Рассылается всем игрокам комнаты, когда любой игрок сдаёт предложение (в том числе автоматически по таймауту).

### Payload

```
type: "player_submitted"
playerId: string
```

---

## --- iteration_ended ---

### Description

Рассылается всем игрокам в конце раунда, если игра ещё не закончена. После паузы в 3 секунды следует `iteration_started` нового раунда.

### Payload

```
type: "iteration_ended"
```

---

## --- all_revealed ---

### Description

Рассылается всем игрокам по завершении последнего раунда. Содержит все истории целиком для финального показа результатов.

### Payload

```
type: "all_revealed"
stories: Array<{
  id: string
  ownerId: string
  sentences: Array<{
    playerId: string
    content: string
    wasTimeout: boolean
  }>
}>
```
