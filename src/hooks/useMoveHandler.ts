import { Chess, Move } from "chess.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { UciEngine } from "@/libs/analysis/engine/uciEngine";
import { Classification, MoveClassification } from "@/types/classification";
import { CLASSIFICATION_MESSAGES } from "@/constants/classification";
import { Feedback, setClassification, setFeedback, setIsPuzzleSolved } from "@/redux/slices/feedback";
import { RootState, store } from "@/redux/store";
import { useEngineContext } from "@/context/hooks/useEngineContext";
import { updateBoardStates } from "@/redux/slices/board";
import { playSound } from "@/libs/sound";
import { setEngineRunning } from "@/redux/slices/engine";
import { attemptMove, convertLanToSan } from "@/utils/move";
import { nextPuzzle } from "@/redux/slices/puzzle";
import { ATTEMPTED_PUZZLE_DELAY_TIME } from "@/constants/time";

const POSITIVE_CLASSIFICATIONS = new Set<string>(["Best", "Excellent", "Good", "Great"]);

interface EvaluationResult {
  classification: Classification | null;
  bestMove: string | null;
}

export const useMoveHandler = (game: Chess) => {
  const { engine } = useEngineContext();
  const dispatch = useDispatch();

  const engineDepth = useSelector((state: RootState) => state.engine.depth);
  const fen = useSelector((state: RootState) => state.board.fen);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const autoSkip = useSelector((state: RootState) => state.puzzle.autoSkip);

  const dispatchResults = useCallback(
    (classification: Classification, solved: boolean, feedback: Feedback) => {
      dispatch(setClassification(classification));
      dispatch(setIsPuzzleSolved(solved));
      dispatch(setFeedback(feedback));
    },
    [dispatch]
  );

  const createFeedback = useCallback(
    (bestMove: string | null, playedMove: Move, classification: Classification): Feedback => ({
      bestMove: bestMove ? `${bestMove} is the best move` : "Repeated Error",
      playedMove: `${playedMove.san} ${CLASSIFICATION_MESSAGES[classification]}`
    }),
    []
  );

  const handleOpeningBookMove = useCallback(
    (move: Move): boolean => {
      if (!puzzle?.positionOpening) return false;

      const feedback = {
        bestMove: `${move} is acceptable`,
        playedMove: `${move} ${CLASSIFICATION_MESSAGES[MoveClassification.Book]}`
      };

      dispatchResults(MoveClassification.Book, true, feedback);
      return true;
    },
    [puzzle?.positionOpening, dispatchResults]
  );

  const processEvaluation = useCallback(
    (bestMove: string | null, playedMove: Move, classification: Classification, solved: boolean) => {
      const feedback = createFeedback(bestMove, playedMove, classification);
      dispatchResults(classification, solved, feedback);
    },
    [createFeedback, dispatchResults]
  );

  const evaluateMoveQuality = useCallback(
    async (fen: string, move: Move): Promise<EvaluationResult> => {
      dispatch(setEngineRunning(true));

      try {
        if (!engine?.isReady()) {
          throw new Error("Engine not ready");
        }

        if (!store.getState().engine.isRunning) {
          throw new Error("Evaluation cancelled");
        }

        UciEngine.setDepth(engineDepth);
        const result = await engine.evaluateMoveQuality(fen, move.lan);

        if (!store.getState().engine.isRunning) {
          throw new Error("Evaluation cancelled");
        }

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

  const handleSameMistake = useCallback(
    (playedMove: Move) => {
      const lichessClassification = (puzzle?.evaluation.judgment?.name as Classification) || null;
      const bestMove = convertLanToSan(puzzle!.fen.current, puzzle!.evaluation.best ?? "");
      processEvaluation(bestMove, playedMove, lichessClassification, false);
    },
    [puzzle, processEvaluation]
  );

  const handleNewMove = useCallback(
    async (playedMove: Move) => {
      const { classification, bestMove } = await evaluateMoveQuality(fen, playedMove);

      if (!classification) return;

      processEvaluation(bestMove, playedMove, classification, true);

      if (autoSkip && POSITIVE_CLASSIFICATIONS.has(classification)) {
        setTimeout(() => dispatch(nextPuzzle()), ATTEMPTED_PUZZLE_DELAY_TIME);
      }
    },
    [fen, evaluateMoveQuality, processEvaluation, autoSkip, dispatch]
  );

  const updateGameState = useCallback(
    (game: Chess, sourceSquare: string, targetSquare: string) => {
      const newFen = game.fen();
      dispatch(
        updateBoardStates({
          fen: newFen,
          sourceSquare,
          destinationSquare: targetSquare
        })
      );
      playSound(game);
    },
    [dispatch]
  );

  const handleMoveAttempt = useCallback(
    (sourceSquare: string, targetSquare: string, promotion: string): boolean => {
      if (isPuzzleSolved || game.turn() !== puzzle?.userMove.color) {
        return false;
      }

      const playedMove = attemptMove(game, sourceSquare, targetSquare, promotion);
      if (!playedMove) return false;

      updateGameState(game, sourceSquare, targetSquare);

      const isSameMistake = playedMove.lan === puzzle?.userMove.lan;

      if (isSameMistake) {
        handleSameMistake(playedMove);
        return true;
      }

      if (!handleOpeningBookMove(playedMove)) {
        handleNewMove(playedMove);
        return true;
      }

      if (autoSkip) {
        setTimeout(() => dispatch(nextPuzzle()), ATTEMPTED_PUZZLE_DELAY_TIME);
      }

      return true;
    },
    [
      isPuzzleSolved,
      game,
      puzzle,
      updateGameState,
      handleSameMistake,
      handleOpeningBookMove,
      handleNewMove,
      autoSkip,
      dispatch
    ]
  );

  return useMemo(
    () => ({
      handleMoveAttempt,
      evaluateMoveQuality
    }),
    [handleMoveAttempt, evaluateMoveQuality]
  );
};
