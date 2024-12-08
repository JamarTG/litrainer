import { Chess } from "chess.js";
import { Models } from "../../typings";

const combineEvaluationsAndMisplays = (
  username: string,
  misplays: Models.Game.LichessGameInfo[],
  evaluations: Models.Move.Evaluation[][]
) => {
  const standardGames = misplays.filter((game) => game.variant === "standard");
  //@ts-ignore
  const playerColor = username === standardGames[0].players.white.user.name ? "white" : "black";

  return standardGames
    .map((game, index) => {
      const chessEngine = new Chess();
      const moves = game.moves.split(" ");
      let fenBeforeOpponentMove = chessEngine.fen(); // Initialize with the starting position
      const errors = moves
        .map((move, moveIndex) => {
          const turn = chessEngine.turn();
          chessEngine.move(move);
          const isBadMove = evaluations[index][moveIndex]?.judgment;

          if (moveIndex >= 2) {
            // Update fenBeforeOpponentMove to the position two moves before the current move
            chessEngine.loadPgn(moves.slice(0, moveIndex - 1).join(" "));
            fenBeforeOpponentMove = chessEngine.fen();
            chessEngine.loadPgn(moves.slice(0, moveIndex + 1).join(" ")); // Restore the current state
          }

          return isBadMove
            ? {
                game_id: game.game_id,
                players: {
                  white: {
                    rating: game.players.white.rating,
                    //@ts-ignore
                    user: game.players.white.user.name,
                  },
                  black: {
                    rating: game.players.black.rating,
                    //@ts-ignore
                    user: game.players.black.user.name,
                  },
                },
                variant: game.variant,
                perf: game.perf,
                status: game.status,
                rated: game.rated,
                move,
                
                lastMove: moveIndex > 0 ? moves[moveIndex - 1] : null, // Include the last move played
                evaluation: evaluations[index][moveIndex],
                fen: fenBeforeOpponentMove, // FEN for moveIndex - 2
                colorToPlay: turn === "w" ? "white" : "black",
              }
            : null;
        })
        .filter((info): info is Models.Move.Info & { lastMove: string } => info !== null);

      return errors.filter((error) => error.colorToPlay === playerColor);
    })
    .filter((filteredErrors) => filteredErrors.length > 0);
};

export default combineEvaluationsAndMisplays;
