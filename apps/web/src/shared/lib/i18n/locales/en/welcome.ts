export default {
  newGame: {
    heading: "New game",
    submit: "Play",
  },
  joinGame: {
    heading: "Join an existing game",
    codeField: {
      description: "Enter the code of the room you want to join",
    },
    submit: "Join",
  },
  serverStatus: {
    checking: "Checking server...",
    online: "Server is up — you can create a game",
    starting: "Server is starting up, please wait...",
    error: {
      message: "An error occurred while checking the server status",
      retry: "Try again",
    },
  },
} as const;
