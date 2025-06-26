// External imports
import { Chess, Move, Square } from "chess.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

// Internal imports
import { UciEngine } from "@/libs/analysis/engine/uciEngine";
import { playSound } from "@/libs/sound";
import { attemptMove } from "@/libs/trainer/move";
import { useEngineContext } from "@/context/hooks/useEngineContext";

// Redux slices & selectors
import {
  Feedback,
  getPuzzleStatus,
  PuzzleStatus,
  setClassification,
  setFeedback,
  setPuzzleStatus
} from "@/redux/slices/feedback";
import { updateBoardStates } from "@/redux/slices/board";
import { setEngineRunning } from "@/redux/slices/engine";
import { getPuzzle, nextPuzzle } from "@/redux/slices/puzzle";
import { RootState, store } from "@/redux/store";

// Types & constants
import { Classification } from "@/types/classification";
import { CLASSIFICATION_MESSAGES } from "@/constants/classification";
import { MoveClassification } from "@/typing/enums";

const POSITIVE_CLASSIFICATIONS = new Set<string>(["Best", "Excellent", "Good", "Great"]);

interface EvaluationResult {
  classification: Classification | null;
  bestMove: string | null;
}

const convertLanToSan = (fen: string, lanMove: string) => {
  try {
    const tempGame = new Chess(fen);
    const move = tempGame.move(lanMove);
    return move ? move.san : lanMove;
  } catch (error) {
    console.error("Error converting LAN to SAN:", error);
    return lanMove;
  }
};

export const useMoveHandler = (game: Chess) => {
  const { engine } = useEngineContext();
  const dispatch = useDispatch();

  const engineDepth = useSelector((state: RootState) => state.engine.depth);
  const fen = useSelector((state: RootState) => state.board.fen);
  const puzzle = useSelector(getPuzzle);
  const puzzleStatus = useSelector(getPuzzleStatus);
  const autoSkip = useSelector((state: RootState) => state.puzzle.autoSkip);

  const dispatchResults = useCallback(
    (classification: Classification, puzzleStatus: PuzzleStatus, feedback: Feedback) => {
      dispatch(setClassification(classification));
      dispatch(setPuzzleStatus(puzzleStatus));
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

      dispatchResults(MoveClassification.Book, "solved", feedback);
      return true;
    },
    [puzzle?.positionOpening, dispatchResults]
  );

  const processEvaluation = useCallback(
    (bestMove: string | null, playedMove: Move, classification: Classification, puzzleStatus: PuzzleStatus) => {
      const feedback = createFeedback(bestMove, playedMove, classification);
      dispatchResults(classification, puzzleStatus, feedback);
    },
    [createFeedback, dispatchResults]
  );

  const evaluateMoveQuality = useCallback(
    async (fen: string, move: Move): Promise<EvaluationResult> => {
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

  const handleSameMistake = useCallback(
    (playedMove: Move) => {
      const lichessClassification = (puzzle?.evaluation.judgment?.name as Classification) || null;
      const bestMove = convertLanToSan(puzzle!.fen.current, puzzle!.evaluation.best ?? "");
      processEvaluation(bestMove, playedMove, lichessClassification, "failed");
    },
    [puzzle, processEvaluation]
  );

  const handleNewMove = useCallback(
    async (playedMove: Move) => {
      const { classification, bestMove } = await evaluateMoveQuality(fen, playedMove);
      if (!classification) return;

      processEvaluation(bestMove, playedMove, classification, "solved");

      if (autoSkip && POSITIVE_CLASSIFICATIONS.has(classification)) {
        setTimeout(() => dispatch(nextPuzzle()), 1000);
      }
    },
    [fen, evaluateMoveQuality, processEvaluation, autoSkip, dispatch]
  );

  const updateGameState = useCallback(
    (game: Chess, sourceSquare: Square, targetSquare: Square) => {
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
    (sourceSquare: Square, targetSquare: Square, promotion: string): boolean => {
      if (puzzleStatus === "solved" || game.turn() !== puzzle?.userMove.color) return false;

      const playedMove = attemptMove(game, sourceSquare, targetSquare, promotion);
      if (!playedMove) return false;

      updateGameState(game, sourceSquare, targetSquare);

      if (playedMove.lan === puzzle?.userMove.lan) {
        handleSameMistake(playedMove);
        return true;
      }

      if (!handleOpeningBookMove(playedMove)) {
        handleNewMove(playedMove);
        return true;
      }

      if (autoSkip) {
        setTimeout(() => dispatch(nextPuzzle()), 1000);
      }

      return true;
    },
    [
      puzzleStatus,
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
      handleMoveAttempt
    }),
    [handleMoveAttempt]
  );
};
