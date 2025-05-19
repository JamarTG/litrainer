import React, { useState, useCallback } from "react";
import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../lib/sound";
import { attemptMove, checkKnownOpening, isNotUserTurn } from "../utils/chess";
import { isPositiveClassification } from "../utils/classification";
import { getHighlightedLegalMoves } from "../utils/style";
import { useComputerMove } from "../hooks/useComputerMove";
import useChangePuzzle from "../hooks/useChangePuzzle";
import InteractiveChessBoard from "../components/Board/InteractiveBoard";
import PuzzleControlPanel from "../components/ControlPanel/ControlPanel";
import { useEngineContext } from "../context/EngineContext";
import SubmitButtonWithModal from "../components/Form/SubmitButtomWithModal";
import ThemeChanger from "../components/ThemeChanger";
import { UciEngine } from "../engine/uciEngine";
import { useDepth } from "../context/DepthContext";
import { ClassificationMessage, MoveClassification } from "../constants/classification";
import { Classification } from "../types/classification";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setClassification, setFeedback, setIsPuzzleSolved } from "./redux/slices/feedbackSlices";
import NoGamesFound from "../components/ControlPanel/NoGamesFound";
import usePuzzleSetup from "../hooks/usePuzzleSetup";
import useInitPuzzles from "../hooks/useInitPuzzles";

import { setDestinationSquare, setFen, setIsLoading, setMoveSquares, setSourceSquare } from "./redux/slices/boardSlices";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const [game, setGame] = useState<Chess>(new Chess());
  const { engine } = useEngineContext();
  const { depth: engineDepth } = useDepth();

  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);

  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const fen = useSelector((state: RootState) => state.board.fen);
  const sourceSquare = useSelector((state: RootState) => state.board.sourceSquare);

  const { executeComputerMove } = useComputerMove(setGame);

  const dispatch = useDispatch();

  useChangePuzzle();
  usePuzzleSetup(executeComputerMove, game);

  const unhighlightLegalMoves = useCallback(() => {
    dispatch(setMoveSquares({}));
  }, []);

  const isInOpeningBook = () => {
    const fenPosition = game.fen().split(" ")[0];
    const isMoveAccepted = true;

    if (checkKnownOpening(fenPosition)) {
      handleEvaluation(MoveClassification.Book,  isMoveAccepted);
      return true;
    }

    return false;
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

  const handleEvaluation = (classificationResult: Classification | null,  solved: boolean) => {
    dispatch(setClassification(classificationResult));
    setIsPuzzleSolved(solved);
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

  const handleSquareClick = (srcSquare: Square) => {
    if (isPuzzleSolved) return;
    const piece = game.get(srcSquare);

    if (!!piece && piece.color === game.turn()) {
      setSourceSquare(srcSquare);
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }
    handleMoveAttempt(sourceSquare!, srcSquare);
    unhighlightLegalMoves();
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (isPuzzleSolved) return;
      const highlightedSquaresStyles = getHighlightedLegalMoves(legalMoves);
      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center min-h-screen gap-1 items-center p-4">
      <InteractiveChessBoard
        game={game}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />

      {puzzles.length !== 0 ? (
        <div className={`w-full md:w-[400px]`}>
          <div className="mb-5 flex gap-8 justify-center items-center">
            <SubmitButtonWithModal />
            <ThemeChanger />
          </div>
          <PuzzleControlPanel
            unhighlightLegalMoves={unhighlightLegalMoves}
          />
        </div>
      ) : (
        <NoGamesFound />
      )}
    </div>
  );
};

export default Playground;
