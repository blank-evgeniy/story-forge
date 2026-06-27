export default {
  story: "Story",
  back: "Back",
  on: "On",
  off: "Off",

  forms: {
    nicknameField: {
      label: "Nickname",
      placeholder: "Your name...",
      validationError: "Enter a nickname with at least 2 characters",
    },
    colorPicker: {
      label: "Color",
    },
    iconPicker: {
      label: "Icon",
    },
  },

  layout: {
    storiesLink: {
      ariaLabel: "Saved stories",
    },
    profileLink: "Profile",
  },

  backendErrors: {
    ROOM_NOT_FOUND: "Room not found",
    ROOM_FULL: "Room is full",
    GAME_ALREADY_STARTED: "Game has already started",
    NOT_ENOUGH_PLAYERS: "Not enough players",
    NOT_HOST_START: "Only the host can start the game",
    NOT_HOST_EDIT: "Only the host can edit the configuration",
    NOT_HOST_RESTART: "Only the host can restart the game",
    RATE_LIMIT: "Too many requests",
  },

  errorView: {
    heading: "Something went wrong",
    description:
      "An unexpected error occurred. Try refreshing the page or going back to home",
    retry: "Try again",
    backToHome: "Back to home",
  },

  notFoundView: {
    heading: "Page not found",
    description: "This page doesn't exist or has been removed",
    backToHome: "Back to home",
  },

  metadata: {
    titles: {
      welcome: "Welcome to StoryForge",
      stories: "Saved stories | StoryForge",
      login: "Login | StoryForge",
      profileEdit: "Profile | StoryForge",
      room: {
        idle: "Lobby",
        lobby: "Lobby",
        writing: "Round {{round}}",
        reveal: "Results",
        revealing: "Are you ready?",
        roundStarting: "Round starting...",
      },
      notFound: "Page not found | StoryForge",
      error: "Error | StoryForge",
    },
  },
} as const;
