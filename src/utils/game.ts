const gameStatusMap: Record<string, (player: "white" | "black" | undefined) => string> = {
  created: () => "The game was created.",
  started: () => "The game started.",
  aborted: () => "The game was aborted.",
  mate: (player) => (player ? `${player} won by checkmate.` : "Draw."),
  resign: (player) => (player ? `${player === "white" ? "black" : "white"} won by resignation.` : "Draw."),
  stalemate: () => "The game ended in a stalemate.",
  timeout: (player) => (player ? `${player === "white" ? "black" : "white"} won by timeout.` : "Draw."),
  draw: () => "The game ended in a draw.",
  outoftime: (player) => (player ? `${player === "white" ? "black" : "white"} won by timeout.` : "Draw."),
  cheat: (player) => (player ? `${player === "white" ? "black" : "white"} won by cheating.` : "Draw."),
  noStart: (player) => (player ? `${player} failed to start the game.` : "Draw."),
  unknownFinish: () => "The game ended unexpectedly.",
  // variantEnd: () => "The game ended due to a variant-specific rule.",
};

function getGameStatusDescription(
  status: string,
  player: "white" | "black" | undefined
): string {
  return (
    gameStatusMap[status]?.(player) || `Unknown game status: ${status}.`
  );
}

export { gameStatusMap, getGameStatusDescription };