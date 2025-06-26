import { LichessPlayer } from "@/typing/lichess";

export const formatTimeControl = (initial: number, increment: number): string => {
  if (initial >= 86400 && increment === 0) {
    const days = (initial / 86400).toFixed(1).replace(/\.0$/, "");
    return `${days}d/move`;
  }

  if (initial >= 3600) {
    const hours = (initial / 3600).toFixed(1).replace(/\.0$/, "");
    return `${hours}h+${increment}`;
  }

  if (initial >= 60) {
    const minutes = (initial / 60).toFixed(1).replace(/\.0$/, "");
    return `${minutes}+${increment}`;
  }

  return `${initial}s+${increment}`;
};

const getGameStatusDescription = (status: string, player: LichessPlayer): string => {
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
  return gameStatusMap[status]?.(player.user.name) || `Unknown game status: ${status}.`;
};

export { getGameStatusDescription };
