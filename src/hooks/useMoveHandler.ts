import { Chess, Move } from "chess.js";
import { useDispatch } from "react-redux";
import { UciEngine } from "../engine/uciEngine";
import { attemptMove, checkKnownOpening, isNotUserTurn } from "../utils/chess";
import { ClassificationMessage, MoveClassification } from "../constants/classification";
import { setClassification, setFeedback, setIsPuzzleSolved } from "../pages/redux/slices/feedbackSlices";
import { setDestinationSquare, setFen, setIsLoading, setMoveSquares, setSourceSquare } from "../pages/redux/slices/boardSlices";
import { Classification } from "../types/classification";
import { isPositiveClassification } from "../utils/classification";
import { playSound } from "../lib/sound";
import { useSelector } from "react-redux";
import { RootState } from "../pages/redux/store";
import { useEngineContext } from "../context/EngineContext";
import { useDepth } from "../context/DepthContext";


export const useMoveHandler = (game: Chess) => {
  const dispatch = useDispatch();

  const { engine } = useEngineContext();
  const { depth: engineDepth } = useDepth();

  const puzzles = useSelector((state: RootState) => state.puzzle.puzzles);
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);


  const fen = useSelector((state: RootState) => state.board.fen);
 
  const isInOpeningBook = () => {
    const fenPosition = game.fen().split(" ")[0];
    const isMoveAccepted = true;
    if (checkKnownOpening(fenPosition)) {
      handleEvaluation(MoveClassification.Book, isMoveAccepted);
      return true;
    }
    return false;
  };

  const handleEvaluation = (classification: Classification | null, solved: boolean) => {
    dispatch(setClassification(classification));
    dispatch(setIsPuzzleSolved(solved));
  };

  const evaluateMoveQuality = async (fen: string, move: Move) => {
    dispatch(setIsLoading(true));
    try {
      const cacheKey = `evaluation_${fen}_${move.lan}`;
      const cachedEvaluation = sessionStorage.getItem(cacheKey);

      if (cachedEvaluation) {
        const parsedEvaluation = JSON.parse(cachedEvaluation);
        dispatch(
          setFeedback({
            best: `${parsedEvaluation.bestMove} is the best move`,
            played: `${move.san} ${ClassificationMessage[parsedEvaluation.classification as Classification]} `,
          })
        );

        handleEvaluation(parsedEvaluation.classification, isPositiveClassification(parsedEvaluation.classification));
        return parsedEvaluation.classification;
      }

      // If no cached evaluation, proceed with engine evaluation
      if (!engine?.isReady()) {
        throw new Error("Engine is not initialized");
      }

      UciEngine.setDepth(engineDepth);

      const result = await engine.evaluateMoveQuality(fen, move.lan);

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          bestMove: result.bestMove,
          classification: result.classification,
        })
      );

      dispatch(
        setFeedback({
          best: `${result.bestMove} is the best move`,
          played: `${move.san} ${ClassificationMessage[result.classification as keyof typeof ClassificationMessage]} `,
        })
      );

      handleEvaluation(result.classification, isPositiveClassification(result.classification));

      return result.classification;
    } catch (error) {
      console.error("Error evaluating move quality:", error);
      return null;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleMoveAttempt = (sourceSquare: string, targetSquare: string) => {
    if (isPuzzleSolved) return false;

    const puzzle = puzzles[puzzleIndex];
    if (isNotUserTurn(game, puzzle)) {
      return false;
    }

    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    const isMoveInvalid = !movePlayedByUser;

    if (isMoveInvalid) return false;

    dispatch(setSourceSquare(sourceSquare));
    dispatch(setDestinationSquare(targetSquare));

    if (!isInOpeningBook()) {
      evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
        const isSameMistake = movePlayedByUser.lan === puzzle?.userMove.lan;
        const sameJudgement = puzzle?.evaluation.judgment?.name;
        handleEvaluation(
          isSameMistake ? (sameJudgement as Classification) : classification,
          isPositiveClassification(classification as Classification)
        );
      });
    }

    playSound(game);
    dispatch(setFen(game.fen()));
    setMoveSquares({});
    return true;
  };

  return { handleMoveAttempt, evaluateMoveQuality };
};
