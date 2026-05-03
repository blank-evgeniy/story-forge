export function getStoryIndex(
  playerOrder: number,
  round: number,
  totalPlayers: number,
): number {
  return (playerOrder - round + totalPlayers) % totalPlayers;
}
