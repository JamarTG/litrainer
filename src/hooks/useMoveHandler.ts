import { Chess, Move } from "chess.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { UciEngine } from "../libs/analysis/engine/uciEngine";
import { ClassificationMessage } from "../constants/classification";
import { setClassification, setFeedbackMoves, setIsPuzzleSolved } from "../redux/slices/feedback";
import { Classification } from "../types/classification";
import { RootState, store } from "../redux/store";
import { useEngineContext } from "../context/hooks/useEngineContext";
import { useDepth } from "../context/hooks/useDepth";
import { updateBoardStates } from "../redux/slices/board";
import { playSound } from "../libs/sound";
import { setEngineRunning } from "../redux/slices/engine";
import { convertLanToSan } from "../utils/chess/game";

const selectPuzzleData = (state: RootState) => ({
  fen: state.board.fen,
  puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
  isPuzzleSolved: state.feedback.isPuzzleSolved,
});

export const useMoveHandler = (game: Chess) => {
  const { engine } = useEngineContext();
  const { depth: engineDepth } = useDepth();
  const puzzleData = useSelector(selectPuzzleData);
  const { puzzle, isPuzzleSolved, fen } = puzzleData;

  const dispatch = useDispatch();

  const isInOpeningBook = useCallback(
    (move: Move) => {
      if (!puzzle?.positionOpening) return false;

      dispatch(setClassification("Book"));
      dispatch(setIsPuzzleSolved(true));

      requestIdleCallback(() => {
        dispatch(
          setFeedbackMoves({
            bestMove: `${move} is acceptable`,
            playedMove: `${move} ${ClassificationMessage["Book"]}`,
          })
        );
      });

      return true;
    },
    [puzzle?.positionOpening, dispatch]
  );

  const handleEvaluation = useCallback(
    (bestMove: string | null, movePlayedByUser: Move, classification: Classification | null, solved: boolean) => {
      dispatch(setClassification(classification));
      dispatch(setIsPuzzleSolved(solved));
      dispatch(
        setFeedbackMoves({
          bestMove: bestMove ? `${bestMove} is the best move` : "Repeated Error",
          playedMove: `${movePlayedByUser.san} ${ClassificationMessage[classification!] || "Unknown"}`,
        })
      );
    },
    [dispatch]
  );

  const evaluateMoveQuality = useCallback(
    async (fen: string, move: Move): Promise<{ classification: Classification | null; bestMove: string | null }> => {
      dispatch(setEngineRunning(true));

      try {
        if (!engine?.isReady()) throw new Error("Engine not ready");
        if (!store.getState().engine.isRunning) throw new Error("Evaluation cancelled");

        UciEngine.setDepth(engineDepth);
        const result = await engine.evaluateMoveQuality(fen, move.lan);

        if (!store.getState().engine.isRunning) throw new Error("Evaluation cancelled");

        return {
          classification: result.classification ?? null,
          bestMove: result.bestMove ?? null,
        };
      } catch (error) {
        console.error("Error evaluating move quality:", error);
        return { classification: null, bestMove: null };
      } finally {
        dispatch(setEngineRunning(false));
      }
    },
    [engine, engineDepth, dispatch]
  );

  const attemptMove = (currentGame: Chess, fromSquare: string, toSquare: string, promotion: string = "q"): Move | null => {
    try {
      return currentGame.move({ from: fromSquare, to: toSquare, promotion });
    } catch (error) {
      console.error("Invalid move attempt:", error);
      return null;
    }
  };

  const handleMoveAttempt = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      if (isPuzzleSolved) return false;
      if (game.turn() !== puzzle?.userMove.color) return false;

      const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
      if (!movePlayedByUser) return false;

      const newFen = game.fen();
      dispatch(updateBoardStates({ fen: newFen, sourceSquare, destinationSquare: targetSquare }));
      playSound(game);

      const isSameMistake = movePlayedByUser.lan === puzzle?.userMove.lan;

      if (isSameMistake) {
        const lichessProvidedClassification = puzzle?.evaluation.judgment?.name || null;
        const bestMove = convertLanToSan(puzzle.fen.current, puzzle.evaluation.best ?? "");
        handleEvaluation(bestMove, movePlayedByUser, lichessProvidedClassification, false);
        return true;
      } else if (!isInOpeningBook(movePlayedByUser)) {
        evaluateMoveQuality(fen, movePlayedByUser).then(({ classification, bestMove }) => {
          handleEvaluation(bestMove, movePlayedByUser, classification, true);
        });

        return true;
      }

      return true;
    },
    [isPuzzleSolved, game, puzzle, dispatch, playSound, isInOpeningBook, evaluateMoveQuality, fen, handleEvaluation]
  );

  return useMemo(() => ({ handleMoveAttempt, evaluateMoveQuality }), [handleMoveAttempt, evaluateMoveQuality]);
};
