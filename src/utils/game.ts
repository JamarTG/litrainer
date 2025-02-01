const gameStatusMap: Record<string, (player: string) => string> = {
  created: (player) =>
    `${player} has created the game but it has not started yet.`,
  started: (player) => `The game is in progress with ${player}.`,
  aborted: (player) =>
    `The game was aborted. ${player} left before it started.`,
  mate: (player) => `The game ended with a checkmate. ${player} lost.`,
  resign: (player) => `${player} resigned, ending the game.`,
  stalemate: (player) => `The game ended in a stalemate with ${player}.`,
  timeout: (player) => `${player} ran out of time, resulting in a loss.`,
  draw: (player) => `The game ended in a draw with ${player}.`,
  outoftime: (player) => `${player} ran out of time.`,
  cheat: (player) =>
    `The game ended due to cheating detected by Lichess involving ${player}.`,
  noStart: (player) => `${player} failed to start the game.`,
  unknownFinish: (player) =>
    `The game ended for an unknown reason involving ${player}.`,
  variantEnd: (player) =>
    `The game ended due to a variant-specific rule with ${player}.`,
};

function getGameStatusDescription(status: string, player: string): string {
  return (
    gameStatusMap[status]?.(player) || `Unknown game status for ${player}.`
  );
}

export { gameStatusMap, getGameStatusDescription };
