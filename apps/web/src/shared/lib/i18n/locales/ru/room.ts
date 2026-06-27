export default {
  common: {
    unknownPlayer: "Неизвестный",
    errors: {
      roomNotFound: "Комната не найдена",
    },
    connection: {
      connecting: "Подключение...",
      lost: "Соединение потеряно",
      failed: "Не удалось подключиться",
    },
    revealTransition: {
      phrases: ["Истории ждут...", "Занавес поднимается...", "Время читать..."],
    },
    roundTransition: {
      round: "Раунд",
      of: "из {{totalRounds}}",
    },
  },
  lobby: {
    playerList: {
      heading: "Игроки",
    },
    gameSettings: {
      heading: "Настройки игры",
      editAction: "Изменить",
      saveAction: "Сохранить",
      roundTimeSelect: {
        label: "Время раунда (сек.)",
      },
      blindModeSwitch: {
        label: "Blind Mode",
        description:
          "Blind Mode — режим, в котором игрокам видно только последнее сообщение при написании истории.",
      },
      twistsSwitch: {
        label: "Твисты",
        description:
          "Твисты — это неожиданные события, которые могут произойти в середине игры и изменить ход истории.",
      },
      aiCommentSelect: {
        label: "Оракул Историй",
        description:
          "Оракул Историй прокомментирует каждую историю в конце игры",
        options: {
          comedian: "Комик",
          critic: "Критик",
          fan: "Фанат",
          philosopher: "Философ",
          teacher: "Учитель",
          disabled: "Отключён",
        },
      },
    },
    joinCode: {
      scan: "отсканируйте код, чтобы присоединиться",
      enter: "Введите код, чтобы присоединиться",
      showQr: "Показать QR-код",
      copyLink: "Скопировать ссылку",
    },
    startGame: "Начать игру",
    waitingForHost: "Ждем, пока хост начнет игру",
  },
  writing: {
    round: "Раунд {{round}} / {{totalRounds}}",
    entryForm: {
      placeholderFirst: "Начни историю...",
      placeholderContinue: "Продолжи историю...",
      remaining: "{{count}} символов",
      shortcut: "Ctrl+Enter для отправки",
      submit: "Отправить",
      edit: "Редактировать",
      waitingForOthers: "Ожидаем остальных...",
    },
    twist: {
      none: "Без твиста",
      choose: "Выберите твист",
      skip: "Пропустить",
    },
  },
  reveal: {
    startReveal: {
      heading: "Истории написаны",
      storiesCount_one: "{{count}} история",
      storiesCount_few: "{{count}} истории",
      storiesCount_many: "{{count}} историй",
      enableNarration: "Включить озвучку",
      viewResults: "Смотреть результаты",
    },
    storyActions: {
      publish: {
        submit: "Опубликовать",
        submitted: "Опубликовано",
        tooltip: "История станет видна всем в публичной ленте",
        successMessage: "История опубликована",
        errorMessage: "Не удалось опубликовать историю",
      },
      nextAction: "Следующая история",
    },
    historyViewer: {
      remember: "Хотите вспомнить истории игроков?",
    },
    aiComment: {
      loading: "Оракул Историй пишет вердикт...",
      title: "Оракул Историй",
      error: "Оракул Историй погрузился в молчание",
    },
    playAgain: "Играть еще",
    waitingForHost: "Ждем, пока хост перезапустит игру",
  },
} as const;
