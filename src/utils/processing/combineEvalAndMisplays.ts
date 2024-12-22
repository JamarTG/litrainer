import { Chess } from "chess.js";
import { LichessGameResponse } from "../../types/response";
import { LichessEvaluation } from "../../types/eval";
import { Puzzle } from "../../types/puzzle";

const getOnlyStandardGames = (games: LichessGameResponse[]) => {
  return games.filter((game) => game.variant === "standard");
};

const getOpColor = (username: string, game: LichessGameResponse) => {
  return username === game.players.white.user.name ? "w" : "b";
};

const combineEvaluationsAndMisplays = (
  username: string,
  misplays: LichessGameResponse[],
  evaluations: LichessEvaluation[][]
) => {
  const standardGames = getOnlyStandardGames(misplays);

  const result = standardGames.map((game, index) => {
    const chessgame = new Chess();
    chessgame.loadPgn(game.moves);

    const history = chessgame.history({ verbose: true });
    const gameEvals = evaluations[index];
    const OPColor = getOpColor(username, game);

    const res: Puzzle[] = [];

    for (let i = 0; i < gameEvals.length; i++) {
      if (gameEvals[i].judgment && OPColor === history[i].color && i > 0) {
        res.push({
          gameId: game.game_id,
          players: game.players,
          variant: game.variant,
          timeControl: game.perf,
          status: game.status,
          rated: game.rated,
          clock: game.clock,
          userMove: {
            san: history[i].san,
            lan: history[i].lan,
            piece: history[i].piece,
            color: history[i].color,
            source: history[i].from,
            destination: history[i].to,
          },
          opponentMove: {
            san: history[i - 1].san,
            lan: history[i - 1].lan,
            piece: history[i - 1].piece,
            source: history[i - 1].from,
            destination: history[i - 1].to,
            color: history[i - 1].color,
          },
          evaluation: gameEvals[i],
          fen : {
            current: history[i].before,
            previous: history[i - 1].before || history[i].before,
          }
          
        });
      }
    }

    return res;
  });

  return result;
};

export default combineEvaluationsAndMisplays;
