import { Chess, Move, Square } from "chess.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { UciEngine } from "@/features/analysis-engine";
import { playSound } from "@/sound";
import { attemptMove } from "@/shared/lib";
import { useEngineContext } from "@/features/analysis-engine";

import {
  Feedback,
  getPuzzleStatus,
  PuzzleStatus,
  resetFeedback,
  setClassification,
  setFeedback,
  setPuzzleStatus
} from "@/state/slices/feedback";

import { updateBoardStates } from "@/state/slices/board";
import { setEngineRunning } from "@/state/slices/engine";
import { getPuzzle, nextPuzzle, redoPuzzle } from "@/state/slices/puzzle";
import { RootState, store } from "@/state/store";

import { Classification } from "@/typing/types";
import { CLASSIFICATION_MESSAGES } from "@/constants/classification";
import { MoveClassification } from "@/typing/enums";

const POSITIVE_CLASSIFICATIONS = new Set<string>([
  MoveClassification.best,
  MoveClassification.excellent,
  MoveClassification.good,
  MoveClassification.great
]);
const EXTRA_POST_SOLVE_DEPTH = 2;
const MAX_ENGINE_DEPTH = 40;

const normalizeClassification = (value?: string | null): Classification | null => {
  if (!value) return null;
  const normalized = value.toLowerCase() as Classification;
  return normalized in CLASSIFICATION_MESSAGES ? normalized : null;
};

interface EvaluationResult {
  classification: Classification | null;
  bestMove: string | null;
  evaluationCp: number | null;
  evaluationMate: number | null;
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
    (
      bestMove: string | null,
      playedMove: Move,
      classification: Classification,
      evaluationCp: number | null,
      evaluationMate: number | null
    ): Feedback => ({
      bestMove: bestMove ? `${bestMove} is the best move` : "Repeated Error",
      playedMove: `${playedMove.san} ${CLASSIFICATION_MESSAGES[classification]}`,
      evaluationCp,
      evaluationMate
    }),
    []
  );

    const resetPuzzleState = () => {
    dispatch(resetFeedback());
    dispatch(redoPuzzle());    
  };


  const handleOpeningBookMove = useCallback(
    (move: Move): boolean => {
      if (!puzzle?.positionOpening) return false;

      const feedback = {
        bestMove: `${move} is acceptable`,
        playedMove: `${move} ${CLASSIFICATION_MESSAGES[MoveClassification.book]}`,
        evaluationCp: puzzle?.evaluation.eval ?? null,
        evaluationMate: null
      };

      dispatchResults(MoveClassification.book, "solved", feedback);
      return true;
    },
    [puzzle?.positionOpening, dispatchResults]
  );

  const processEvaluation = useCallback(
    (
      bestMove: string | null,
      playedMove: Move,
      classification: Classification,
      puzzleStatus: PuzzleStatus,
      evaluationCp: number | null,
      evaluationMate: number | null
    ) => {
      const feedback = createFeedback(bestMove, playedMove, classification, evaluationCp, evaluationMate);
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
        const postMovePosition = new Chess(fen);
        postMovePosition.move(move.lan);

        const extendedDepth = Math.min(engineDepth + EXTRA_POST_SOLVE_DEPTH, MAX_ENGINE_DEPTH);
        UciEngine.setDepth(extendedDepth);
        const extendedEval = await engine.evaluatePosition(postMovePosition.fen());
        UciEngine.setDepth(engineDepth);

        if (!store.getState().engine.isRunning) throw new Error("Evaluation cancelled");

        return {
          classification: result.classification ?? null,
          bestMove: result.bestMove ?? null,
          evaluationCp: extendedEval.lines[0]?.cp ?? result.evaluationCp ?? null,
          evaluationMate: extendedEval.lines[0]?.mate ?? result.evaluationMate ?? null
        };
      } catch (error) {
        console.error("Error evaluating move quality:", error);
        return { classification: null, bestMove: null, evaluationCp: null, evaluationMate: null };
      } finally {
        UciEngine.setDepth(engineDepth);
        dispatch(setEngineRunning(false));
      }
    },
    [engine, engineDepth, dispatch]
  );

  const handleSameMistake = useCallback(
    (playedMove: Move) => {
      const lichessClassification = normalizeClassification(puzzle?.evaluation.judgment?.name);
      if (!lichessClassification) return;
      const bestMove = convertLanToSan(puzzle!.fen.current, puzzle!.evaluation.best ?? "");
      processEvaluation(bestMove, playedMove, lichessClassification, "failed", puzzle?.evaluation.eval ?? null, null);

    },
    [puzzle, processEvaluation]
  );

  const handleNewMove = useCallback(
    async (playedMove: Move) => {
      const { classification, bestMove, evaluationCp, evaluationMate } = await evaluateMoveQuality(fen, playedMove);
      if (!classification) return;

      processEvaluation(bestMove, playedMove, classification, "solved", evaluationCp, evaluationMate);

      if ( POSITIVE_CLASSIFICATIONS.has(classification)) {
        setTimeout(() => dispatch(nextPuzzle()), 1000);
      } else  {
        //
        setTimeout(() => resetPuzzleState(), 1000);

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

        setTimeout(() => resetPuzzleState(), 1000);
    

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
