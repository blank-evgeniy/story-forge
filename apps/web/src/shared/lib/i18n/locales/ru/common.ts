export default {
  story: "История",
  back: "Назад",
  on: "Вкл",
  off: "Выкл",

  forms: {
    nicknameField: {
      label: "Никнейм",
      placeholder: "Ваше имя...",
      validationError: "Введите никнейм из минимум 2 символов",
    },
    colorPicker: {
      label: "Цвет",
    },
    iconPicker: {
      label: "Иконка",
    },
  },

  layout: {
    storiesLink: {
      ariaLabel: "Сохранённые истории",
    },
    profileLink: "Профиль",
  },

  backendErrors: {
    ROOM_NOT_FOUND: "Комната не найдена",
    ROOM_FULL: "Комната уже заполнена",
    GAME_ALREADY_STARTED: "Игра уже началась",
    NOT_ENOUGH_PLAYERS: "Недостаточно игроков",
    NOT_HOST_START: "Только хост может начать игру",
    NOT_HOST_EDIT: "Только хост может редактировать конфигурацию",
    NOT_HOST_RESTART: "Только хост может перезапустить игру",
    RATE_LIMIT: "Слишком много запросов",
  },

  errorView: {
    heading: "Что-то пошло не так",
    description:
      "Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную",
    retry: "Повторить",
    backToHome: "На главную",
  },

  notFoundView: {
    heading: "Страница не найдена",
    description: "Такой страницы не существует или она была удалена",
    backToHome: "На главную",
  },

  metadata: {
    titles: {
      welcome: "Добро пожаловать в StoryForge",
      stories: "Сохраненные истории | StoryForge",
      login: "Вход | StoryForge",
      profileEdit: "Профиль | StoryForge",
      room: {
        idle: "Лобби",
        lobby: "Лобби",
        writing: "Раунд {{round}}",
        reveal: "Результаты",
        revealing: "Вы готовы?",
        roundStarting: "Раунд начинается...",
      },
      notFound: "Страница не найдена | StoryForge",
      error: "Произошла ошибка | StoryForge",
    },
  },
} as const;
