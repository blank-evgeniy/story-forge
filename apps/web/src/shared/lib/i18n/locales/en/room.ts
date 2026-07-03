export default {
  common: {
    unknownPlayer: "Unknown",
    errors: {
      roomNotFound: "Room not found",
    },
    connection: {
      connecting: "Connecting...",
      reconnecting: "Reconnecting... ({{current}}/{{max}})",
      lost: "Connection lost",
      failed: "Failed to connect",
      retry: "Reconnect",
    },
    revealTransition: {
      phrases: ["Stories await...", "The curtain rises...", "Time to read..."],
    },
    roundTransition: {
      round: "Round",
      of: "of {{totalRounds}}",
    },
    rotateDevice: {
      heading: "Rotate your device",
      description: "Please rotate your phone to portrait orientation to continue playing",
    },
  },
  lobby: {
    playerList: {
      heading: "Players",
    },
    gameSettings: {
      heading: "Game settings",
      editAction: "Edit",
      saveAction: "Save",
      roundTimeSelect: {
        label: "Round time (sec.)",
      },
      blindModeSwitch: {
        label: "Blind Mode",
        description:
          "Blind Mode — players can only see the last message when writing their part of the story.",
      },
      twistsSwitch: {
        label: "Twists",
        description:
          "Twists are unexpected events that can occur mid-game and change the course of the story.",
      },
      aiCommentSelect: {
        label: "Story Oracle",
        description:
          "The Story Oracle will comment on each story at the end of the game",
        options: {
          comedian: "Comedian",
          critic: "Critic",
          fan: "Fan",
          philosopher: "Philosopher",
          teacher: "Teacher",
          disabled: "Disabled",
        },
      },
    },
    joinCode: {
      scan: "scan the code to join",
      enter: "Enter the code to join",
      showQr: "Show QR code",
      copyLink: "Copy invite link",
    },
    startGame: "Start game",
    waitingForHost: "Waiting for the host to start the game",
  },
  writing: {
    round: "Round {{round}} / {{totalRounds}}",
    entryForm: {
      placeholderFirst: "Start the story...",
      placeholderContinue: "Continue the story...",
      remaining: "{{count}} characters",
      shortcut: "Ctrl+Enter to submit",
      submit: "Submit",
      edit: "Edit",
      waitingForOthers: "Waiting for others...",
    },
    twist: {
      none: "No twist",
      choose: "Choose a twist",
      skip: "Skip",
    },
  },
  reveal: {
    startReveal: {
      heading: "Stories are written",
      storiesCount_one: "{{count}} story",
      storiesCount_other: "{{count}} stories",
      enableNarration: "Enable narration",
      viewResults: "View results",
    },
    storyActions: {
      publish: {
        submit: "Publish",
        submitted: "Published",
        tooltip: "This story will be visible to everyone in the public feed",
        successMessage: "Story published",
        errorMessage: "Failed to publish the story",
      },
      nextAction: "Next story",
    },
    historyViewer: {
      remember: "Want to revisit the players' stories?",
    },
    aiComment: {
      loading: "The Story Oracle is writing its verdict...",
      title: "Story Oracle",
      error: "The Story Oracle has fallen silent",
    },
    playAgain: "Play again",
    waitingForHost: "Waiting for the host to restart the game",
  },
} as const;
