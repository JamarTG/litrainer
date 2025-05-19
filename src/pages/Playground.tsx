import React, { useState, useCallback, useEffect, useContext } from "react";
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
import { STARTING_POS_FEN } from "../constants/piece";
import SubmitButtonWithModal from "../components/Form/SubmitButtomWithModal";
import { ThemeContext } from "../context/ThemeContext";
import ThemeChanger from "../components/ThemeChanger";
import { UciEngine } from "../engine/uciEngine";
import { useDepth } from "../context/DepthContext";
import { ClassificationMessage, MoveClassification } from "../constants/classification";
import { Classification } from "../types/classification";
import { useDispatch, useSelector } from "react-redux";
import { setPuzzles } from "./redux/slices/puzzleSlices";
import { RootState } from "./redux/store";
import { setClassification, setFeedback, setIsPuzzleSolved } from "./redux/slices/feedbackSlices";
import NoGamesFound from "../components/ControlPanel/NoGamesFound";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const initialHistory: (Classification | "")[] = puzzles.map(() => "");

  const [game, setGame] = useState<Chess>(new Chess());
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState<boolean>(false);
  const [sourceSquare, setSourceSquare] = useState<Move["from"] | null>(null);
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | null>(null);
  const [history, setHistory] = useState<Record<number, string | null>>(initialHistory);
  const [moveSquares, setMoveSquares] = useState({});
  const [fen, setFen] = useState<string>(STARTING_POS_FEN);

  const { engine } = useEngineContext();
  const { depth: engineDepth } = useDepth();

  const { theme } = useContext(ThemeContext);

  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  const classification = useSelector((state: RootState) => state.feedback.classification);
  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);

  useChangePuzzle(setDestinationSquare, setSourceSquare, setFen);

  const { executeComputerMove } = useComputerMove(setGame, setFen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPuzzles(puzzles));
  }, [puzzles]);

  useEffect(() => {
    if (history[puzzleIndex] && classification === null) return;
    setHistory({ ...history, [puzzleIndex]: classification });
  }, [classification, puzzleIndex]);

  useEffect(() => {
    const currentPuzzle = puzzles[puzzleIndex] || puzzles[0];
    if (!currentPuzzle) return;

    setFen(currentPuzzle.fen.previous);
    game.load(currentPuzzle.fen.previous);

    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    setSourceSquare(null);
    setDestinationSquare(null as Square | null);

    if (currentPuzzle.opponentMove?.lan) {
      executeComputerMove(game, currentPuzzle.opponentMove.lan);
    }
  }, [puzzleIndex, puzzles, setFen]);

  const unhighlightLegalMoves = useCallback(() => {
    setMoveSquares({});
  }, []);

  const isInOpeningBook = (movePlayedByUser: Move) => {
    const fenPosition = game.fen().split(" ")[0];
    const isMoveAccepted = true;

    if (checkKnownOpening(fenPosition)) {
      handleEvaluation(MoveClassification.Book, movePlayedByUser.to, isMoveAccepted);
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

    setSourceSquare(sourceSquare as Square);
    setDestinationSquare(targetSquare as Square);

    if (!isInOpeningBook(movePlayedByUser)) {
      evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
        const isSameMistake = movePlayedByUser.lan === puzzle?.userMove.lan;
        const sameJudgement = puzzle?.evaluation.judgment?.name;
        handleEvaluation(
          isSameMistake ? (sameJudgement as Classification) : classification,
          movePlayedByUser.to,
          isPositiveClassification(classification as Classification)
        );
      });
    }

    playSound(game);
    setFen(game.fen());
    setMoveSquares({});

    return true;
  };

  const handleEvaluation = (classificationResult: Classification | null, dstSquare: Square, solved: boolean) => {
    dispatch(setClassification(classificationResult));
    setDestinationSquare(dstSquare);
    setIsPuzzleSolved(solved);
  };

  const evaluateMoveQuality = async (fen: string, move: Move) => {
    setIsLoadingEvaluation(true);
    try {
      // Check if the evaluation already exists in sessionStorage
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

        handleEvaluation(parsedEvaluation.classification, move.to, isPositiveClassification(parsedEvaluation.classification));
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

      handleEvaluation(result.classification, move.to, isPositiveClassification(result.classification));

      return result.classification;
    } catch (error) {
      console.error("Error evaluating move quality:", error);
      return null;
    } finally {
      setIsLoadingEvaluation(false);
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

  // const resetBoard = (changePuzzle: () => void) => {
  //   changePuzzle();
  //   setClassification(null);
  //   unhighlightLegalMoves();
  //   setIsPuzzleSolved(false);
  // };

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center min-h-screen gap-1 items-center p-4">
      <InteractiveChessBoard
        game={game}
        sourceSquare={sourceSquare}
        destinationSquare={destinationSquare}
        moveSquares={moveSquares}
        isLoadingEvaluation={isLoadingEvaluation}
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
            history={history}
          />
        </div>
      ) : (
        <NoGamesFound theme={theme}/>
      )}
    </div>
  );
};

export default Playground;
