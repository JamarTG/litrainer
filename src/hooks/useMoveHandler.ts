import { Chess, Move } from "chess.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { UciEngine } from "@/libs/analysis/engine/uciEngine";
import { Classification, MoveClassification } from "@/types/classification";
import { CLASSIFICATION_MESSAGES } from "@/constants/classification";
import { setClassification, setFeedbackMoves, setIsPuzzleSolved } from "@/redux/slices/feedback";
import { RootState, store } from "@/redux/store";
import { useEngineContext } from "@/context/hooks/useEngineContext";
import { updateBoardStates } from "@/redux/slices/board";
import { playSound } from "@/libs/sound";
import { setEngineRunning } from "@/redux/slices/engine";
import { convertLanToSan } from "@/utils/move";
import { nextPuzzle } from "@/redux/slices/puzzle";

const ATTEMPTED_PUZZLE_DELAY_TIME = 1500;

const PositiveClassifications = new Set(["Best", "Excellent", "Good", "Brilliant"]);

export const useMoveHandler = (game: Chess) => {
  const { engine } = useEngineContext();
  const engineDepth = useSelector((state: RootState) => state.engine.depth);
  const fen = useSelector((state: RootState) => state.board.fen);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const autoSkip = useSelector((state: RootState) => state.puzzle.autoSkip);

  const dispatch = useDispatch();

  const isInOpeningBook = useCallback(
    (move: Move) => {
      if (!puzzle?.positionOpening) return false;

      dispatch(setClassification(MoveClassification.Book));
      dispatch(setIsPuzzleSolved(true));

      requestIdleCallback(() => {
        dispatch(
          setFeedbackMoves({
            bestMove: `${move} is acceptable`,
            playedMove: `${move} ${CLASSIFICATION_MESSAGES[MoveClassification.Book]}`
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
          playedMove: `${movePlayedByUser.san} ${CLASSIFICATION_MESSAGES[classification!]}`
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
          bestMove: result.bestMove ?? null
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

  const attemptMove = (
    currentGame: Chess,
    fromSquare: string,
    toSquare: string,
    promotion: string = "q"
  ): Move | null => {
    try {
      return currentGame.move({ from: fromSquare, to: toSquare, promotion });
    } catch (error) {
      console.error("Invalid move attempt:", error);
      return null;
    }
  };

  const handleMoveAttempt = useCallback(
    (sourceSquare: string, targetSquare: string, promotion: string) => {
      if (isPuzzleSolved) return false;
      if (game.turn() !== puzzle?.userMove.color) return false;

      const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare, promotion);
      if (!movePlayedByUser) return false;

      const newFen = game.fen();
      dispatch(updateBoardStates({ fen: newFen, sourceSquare, destinationSquare: targetSquare }));
      playSound(game);

      const isSameMistake = movePlayedByUser.lan === puzzle?.userMove.lan;

      if (isSameMistake) {
        const lichessProvidedClassification = puzzle?.evaluation.judgment?.name || null;
        const bestMove = convertLanToSan(puzzle.fen.current, puzzle.evaluation.best ?? "");
        handleEvaluation(bestMove, movePlayedByUser, lichessProvidedClassification as Classification, false);

        return true;
      }

      if (!isInOpeningBook(movePlayedByUser)) {
        evaluateMoveQuality(fen, movePlayedByUser).then(({ classification, bestMove }) => {
          handleEvaluation(bestMove, movePlayedByUser, classification, true);

          if (autoSkip && classification && PositiveClassifications.has(classification)) {
            setTimeout(() => dispatch(nextPuzzle()), ATTEMPTED_PUZZLE_DELAY_TIME);
          }
        });

        return true;
      }

      if (autoSkip) {
        setTimeout(() => dispatch(nextPuzzle()), ATTEMPTED_PUZZLE_DELAY_TIME);
      }

      return true;
    },
    [isPuzzleSolved, game, puzzle, dispatch, isInOpeningBook, evaluateMoveQuality, fen, handleEvaluation, autoSkip]
  );

  return useMemo(() => ({ handleMoveAttempt, evaluateMoveQuality }), [handleMoveAttempt, evaluateMoveQuality]);
};
