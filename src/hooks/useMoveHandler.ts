import { Chess, Move } from "chess.js";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { UciEngine } from "../engine/uciEngine";
import { ClassificationMessage, MoveClassification, PositiveClassifications } from "../constants/classification";
import { setClassification, setFeedbackMoves, setIsPuzzleSolved } from "../redux/slices/feedback";
import { Classification } from "../types/classification";
import { playSound } from "../lib/sound";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEngineContext } from "../context/hooks/useEngineContext";
import { useDepth } from "../context/hooks/useDepth";
import { attemptMove } from "../utils/chess/move";
import { updateBoardStates } from "../redux/slices/board";

const selectPuzzleData = (state: RootState) => ({
  fen: state.board.fen,
  puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
  isPuzzleSolved: state.feedback.isPuzzleSolved,
});

const evaluationCache = new Map<string, { bestMove: string; classification: Classification }>();

export const useMoveHandler = (game: Chess) => {
  const dispatch = useDispatch();

  const { engine } = useEngineContext();
  const { depth: engineDepth } = useDepth();

  const puzzleData = useSelector(selectPuzzleData);
  const { puzzle, isPuzzleSolved, fen } = puzzleData;

  const isInOpeningBook = useCallback(
    (move: string) => {
      if (!puzzle?.positionOpening) return false;

      const isMoveAccepted = true;

      requestIdleCallback(() => {
        dispatch(
          setFeedbackMoves({
            bestMove: `${move} is acceptable`,
            playedMove: `${move} ${ClassificationMessage["Book"]} `,
          })
        );
      });

      handleEvaluation(MoveClassification.Book, isMoveAccepted);
      return true;
    },
    [puzzle?.positionOpening]
  );

  const handleEvaluation = useCallback(
    (classification: Classification | null, solved: boolean) => {
      dispatch(setClassification(classification));
      dispatch(setIsPuzzleSolved(solved));
    },
    [dispatch]
  );

  const getCachedEvaluation = async (cacheKey: string) => {
    const memoryCache = evaluationCache.get(cacheKey);
    if (memoryCache) return memoryCache;

    return new Promise<any>((resolve) => {
      setTimeout(() => {
        try {
          const cached = sessionStorage.getItem(cacheKey);
          const parsed = cached ? JSON.parse(cached) : null;
          if (parsed) {
            evaluationCache.set(cacheKey, parsed);
          }
          resolve(parsed);
        } catch {
          resolve(null);
        }
      }, 0);
    });
  };

  const setCachedEvaluation = async (cacheKey: string, data: any) => {
    evaluationCache.set(cacheKey, data);

    setTimeout(() => {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (error) {
        console.warn("Failed to cache evaluation:", error);
      }
    }, 0);
  };

  const evaluateMoveQuality = useCallback(
    async (fen: string, move: Move) => {
      const cacheKey = `evaluation_${fen}_${move.lan}`;

      try {
        const cachedEvaluation = await getCachedEvaluation(cacheKey);

        if (cachedEvaluation) {
          requestIdleCallback(() => {
            dispatch(
              setFeedbackMoves({
                bestMove: `${cachedEvaluation.bestMove} is the best move`,
                playedMove: `${move.san} ${ClassificationMessage[cachedEvaluation.classification as Classification]} `,
              })
            );
          });

          const classification = cachedEvaluation.classification;
          const isPositiveClassification = PositiveClassifications.has(classification);

          handleEvaluation(classification, isPositiveClassification);
          return classification;
        }

        if (!engine?.isReady()) {
          throw new Error("Engine is not initialized");
        }

        UciEngine.setDepth(engineDepth);
        const result = await engine.evaluateMoveQuality(fen, move.lan);

        setCachedEvaluation(cacheKey, {
          bestMove: result.bestMove,
          classification: result.classification,
        });

        requestIdleCallback(() => {
          dispatch(
            setFeedbackMoves({
              bestMove: `${result.bestMove} is the best move`,
              playedMove: `${move.san} ${ClassificationMessage[result.classification as keyof typeof ClassificationMessage]} `,
            })
          );
        });
        const isPositiveClassification = PositiveClassifications.has(result.classification);
        handleEvaluation(result.classification, isPositiveClassification);
        return result.classification;
      } catch (error) {
        console.error("Error evaluating move quality:", error);
        return null;
      }
    },
    [engine, engineDepth, dispatch, handleEvaluation]
  );

  const handleMoveAttempt = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      if (isPuzzleSolved) return false;

      const isOpponentsTurn = game.turn() !== puzzle?.userMove.color;

      if (isOpponentsTurn) return false;

      const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
      const isMoveInvalid = !movePlayedByUser;

      console.log(isMoveInvalid);
      if (isMoveInvalid) return false;

      const newFen = game.fen();

      dispatch(updateBoardStates({ fen: newFen, sourceSquare, destinationSquare: targetSquare, moveSquares: {} }));

      playSound(game);

      if (!isInOpeningBook(movePlayedByUser.san)) {
        setTimeout(() => {
          evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
            const isSameMistake = movePlayedByUser.lan === puzzle?.userMove.lan;
            const sameJudgement = puzzle?.evaluation.judgment?.name;

            const isPositiveClassification = PositiveClassifications.has(classification);

            handleEvaluation(isSameMistake ? (sameJudgement as Classification) : classification, isPositiveClassification);
          });
        }, 0);
      }

      return true;
    },
    [isPuzzleSolved, game, puzzle, dispatch, playSound, isInOpeningBook, evaluateMoveQuality, fen, handleEvaluation]
  );

  return useMemo(
    () => ({
      handleMoveAttempt,
      evaluateMoveQuality,
    }),
    [handleMoveAttempt, evaluateMoveQuality]
  );
};
