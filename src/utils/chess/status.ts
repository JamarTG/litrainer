import { LichessPlayer } from "../../types/player";

const gameStatusMap: Record<string, (player: string) => string> = {
  mate: (player) => (player ? `${player} won by checkmate.` : "Draw."),
  resign: (player) => (player ? `${player} won by resignation.` : "Draw."),
  stalemate: () => "The game ended in a stalemate.",
  timeout: (player) => (player ? `${player} won by timeout.` : "Draw."),
  draw: () => "The game ended in a draw.",
  outoftime: (player) => (player ? `${player} won by timeout.` : "Draw."),
  cheat: (player) => (player ? `${player} won by cheating.` : "Draw."),
  noStart: (player) => (player ? `${player} failed to start the game.` : "Draw."),
  unknownFinish: () => "The game ended unexpectedly."
};

function getGameStatusDescription(status: string, player: LichessPlayer): string {
  return gameStatusMap[status]?.(player.user.name) || `Unknown game status: ${status}.`;
}

export { gameStatusMap, getGameStatusDescription };
