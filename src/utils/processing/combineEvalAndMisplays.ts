import { Chess } from "chess.js";
import { Game } from "../../types/game";
const combineEvaluationsAndMisplays = (
  username: string,
  misplays: Game.LichessResponse[],
  evaluations: Game.Evaluation[][] 
) => {
  const standardGames = misplays.filter((game) => game.variant === "standard");

  

  return standardGames
    .map((game, index) => {
      const playerColor = username === game.players.white.user.name ? "white" : "black";
      const chessEngine = new Chess();
      const moves = game.moves.split(" ");
      let previousFen = chessEngine.fen();

      const errors = moves
        .map((move, moveIndex) => {
          let fenBeforeOpponentMove = previousFen;
          let fenAfterOpponentMove = chessEngine.fen();

          previousFen = fenAfterOpponentMove;
          const turn = chessEngine.turn();
          chessEngine.move(move);
          
          
          const isBadMove = evaluations[index][moveIndex]?.judgment;

          if (moveIndex >= 2) {
            chessEngine.loadPgn(moves.slice(0, moveIndex - 1).join(" "));
            fenBeforeOpponentMove = chessEngine.fen();
            chessEngine.loadPgn(moves.slice(0, moveIndex + 1).join(" "));
          }

          return isBadMove
            ? {
                game_id: game.game_id,
                players: game.players,
                variant: game.variant,
                perf: game.perf,
                status: game.status,
                rated: game.rated,
                clock: game.clock,
                move,
                lastMove: moveIndex > 0 ? moves[moveIndex - 1] : null,
                evaluation: evaluations[index][moveIndex],
                fenBeforeOpponentMove: fenBeforeOpponentMove,
                fenAfterOpponentMove : fenAfterOpponentMove,
                colorToPlay: turn === "w" ? "white" : "black",
              }
            : null;
        })
        .filter((info) => info !== null);

      return errors.filter((error:any) => error.colorToPlay === playerColor);
    })
    .filter((filteredErrors) => filteredErrors.length > 0);
};

export default combineEvaluationsAndMisplays;
