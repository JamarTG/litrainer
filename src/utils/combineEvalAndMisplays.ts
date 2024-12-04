import { Chess } from "chess.js";
import { Models } from "../typings";
import axios from "axios";


const getEvaluationFromStockfish = async (fen: string): Promise<any> => {
  try {
    const response = await axios.post('http://localhost:3000/evaluate', { fen });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
};

const filterStandardGames = (extraGameInfo: Models.Game.LichessGameInfo[]) => {
  return extraGameInfo.filter(
    (extraInfo: Models.Game.LichessGameInfo) => extraInfo.variant === "standard"
  );
};

const combineEvalAndMisplays = (
  username: string,
  misplaysInfo: Models.Game.LichessGameInfo[],
  evaluationsInfo: Models.Move.Evaluation[][]
) => {
  const standardGames = filterStandardGames(misplaysInfo);

  const playerColor =
    username === standardGames[0].players.white.user ? "white" : "black";

  return standardGames
    .map((gameInfo: Models.Game.LichessGameInfo, index: number) => {
      const gameErrors = filterGameErrors(gameInfo, evaluationsInfo[index]);
      return gameErrors || [];
    })
    .map((entry: Models.Move.Info[]) => {
      if (!entry || entry.length === 0) {
        return []; 
      }

      return entry.filter((a) => {

        return a.colorToPlay === playerColor; 
      });
    })
    .filter((filteredEntry) => filteredEntry.length > 0); 
};

const filterGameErrors = (
  gameInfo: any,
  evaluation: Models.Move.Evaluation[]
): Models.Move.Info[] => {

  const game = new Chess();
  const moves = gameInfo.moves.split(" ");

  return moves
    .map(function (move: string, index: number) {
      const positionFenBeforeMove = game.fen();
      const colorToPlay = game.turn();

      game.move(move);

      console.log(getEvaluationFromStockfish(positionFenBeforeMove))

      const moveIsBad = evaluation[index]?.judgment;

      return moveIsBad
        ? {
            game_id: gameInfo.game_id,
            players: {
              white: {
                rating: gameInfo.players.white.rating,
                user: gameInfo.players.white.user.name,
              },
              black: {
                rating: gameInfo.players.black.rating,
                user: gameInfo.players.black.user.name,
              },
            },
            variant: gameInfo.variant,
            perf: gameInfo.perf,
            status: gameInfo.status,
            rated: gameInfo.rated,
            move: move,
            evaluation: evaluation[index],
            fen: positionFenBeforeMove,
            colorToPlay: colorToPlay === "w" ? "white" : "black",
          }
        : null;
    })
    .filter((entry: any) => entry !== null) as Models.Move.Info[];
};

export default combineEvalAndMisplays;