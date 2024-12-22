import { Chess } from "chess.js";
import { Game } from "../../types/game";

const getOnlyStandardGames = (games: Game.LichessResponse[]) => {
  return games.filter((game) => game.variant === "standard");
};

const getOpColor = (username: string, game: Game.LichessResponse) => {
  return username === game.players.white.user.name ? "w" : "b";
};

const combineEvaluationsAndMisplays = (
  username: string,
  misplays: Game.LichessResponse[],
  evaluations: Game.Evaluation[][]
) => {
  const standardGames = getOnlyStandardGames(misplays);

  const result = standardGames.map((game, index) => {
    const chessgame = new Chess();
    chessgame.loadPgn(game.moves);

    const history = chessgame.history({ verbose: true });
    const gameEvals = evaluations[index];
    const OPColor = getOpColor(username, game);

    const res: Game.Info [] = []

    for (let i = 0; i < gameEvals.length; i++) {
      if (gameEvals[i].judgment && OPColor === history[i].color) {
        res.push({
          game_id: game.game_id,
          players: game.players,
          variant: game.variant,
          perf: game.perf,
          status: game.status,
          rated: game.rated,
          clock: game.clock,
          move: history[i].san,
          lastMove: i > 0 ? history[i - 1].san : null,
          evaluation: gameEvals[i],
          previousEvaluation: i > 0 ? gameEvals[i - 1] : null,
          colorToPlay: history[i].color === "w" ? "white" : "black",
          fenAfterOpponentMove: history[i].before,
          fenBeforeOpponentMove:
            i > 0 ? history[i - 1].before : chessgame.fen(),
        });
      }
    }

    return res;
  });

  return result;
};

export default combineEvaluationsAndMisplays;
