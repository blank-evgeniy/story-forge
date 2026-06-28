import type { RoomPlayer, Story } from "../model/types";

export const MOCK_PLAYERS: RoomPlayer[] = [
  {
    id: "1",
    username: "Алиса",
    connected: true,
    color: "amber",
    icon: "angel",
  },
  {
    id: "2",
    username: "Борис",
    connected: true,
    color: "blue",
    icon: "laughing",
  },
  {
    id: "3",
    username: "Света",
    connected: false,
    color: "green",
    icon: "star-face",
  },
  { id: "4", username: "Дима", connected: true, color: "red", icon: "evil" },
  {
    id: "5",
    username: "Женя",
    connected: true,
    color: "violet",
    icon: "crying",
  },
  {
    id: "6",
    username: "Фёдор",
    connected: true,
    color: "sky",
    icon: "medical-mask",
  },
];

const alice = {
  username: "Алиса",
  color: "amber" as const,
  icon: "angel" as const,
};
const boris = {
  username: "Борис",
  color: "blue" as const,
  icon: "laughing" as const,
};
const sveta = {
  username: "Света",
  color: "green" as const,
  icon: "star-face" as const,
};
const vika = {
  username: "Вика",
  color: "violet" as const,
  icon: "crying" as const,
};

export const MOCK_STORIES: Story[] = [
  {
    id: "s1",
    playerName: "Алиса",
    entries: [
      {
        type: "player",
        player: alice,
        content:
          "Старый смотритель маяка заметил на горизонте что-то необычное.",
      },
      {
        type: "twist",
        id: "t1",
        content: "Внезапно начался сильный шторм",
      },
      {
        type: "player",
        player: boris,
        content: "Оно двигалось быстро, оставляя за собой серебристый след.",
      },
      {
        type: "player",
        player: sveta,
        content: "Никто не осмеливался говорить, пока силуэт выходил из волн.",
      },
    ],
  },
  {
    id: "s2",
    playerName: "Борис",
    entries: [
      {
        type: "player",
        player: boris,
        content: "Карта вела их вглубь леса, мимо забытого колодца.",
      },
      {
        type: "player",
        player: sveta,
        content:
          "Никто не ожидал, что сокровище будет зарыто так близко от деревни.",
      },
      {
        type: "twist",
        id: "t2",
        content: "Незнакомец оказался старым другом",
      },
    ],
  },
  {
    id: "s3",
    playerName: "Вика",
    entries: [
      {
        type: "player",
        player: vika,
        content: "Горы хранили древние тайны.",
      },
      {
        type: "twist",
        id: "t3",
        content: "Всё оказалось сном",
      },
      {
        type: "player",
        player: boris,
        content: "Или нет?",
      },
    ],
  },
];
