import React, { useState, useCallback, useEffect, useContext } from "react";
import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import {
  attemptMove,
  checkKnownOpening,
  isPositiveClassification,
  isNotUserTurn,
} from "../utils/chess";
import {
  Classification,
  ClassificationMessage,
  MoveClassification,
} from "../types/move";
import { getHighlightedLegalMoves } from "../utils/style";
import { useComputerMove } from "../hooks/useComputerMove";
import useChangePuzzle from "../hooks/useChangePuzzle";
import InteractiveChessBoard from "../components/Board/InteractiveBoard";
import PuzzleControlPanel from "../components/ControlPanel/ControlPanel";
import { useEngineContext } from "../context/EngineContext";
import { PuzzleContext } from "../context/PuzzleContext";
import { STARTING_POS_FEN } from "../constants/piece";
import SubmitButtonWithModal from "../components/Form/SubmitButtomWithModal";
import { ThemeContext } from "../context/ThemeContext";
import ThemeChanger from "../components/ThemeChanger";
import ThemeWrapper from "../components/Wrapper/ThemeWrapper";
// import Navigation from "../components/ControlPanel/Navigation";
// import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  // const initialHistory: (Classification | "")[] = puzzles.map(() => "");

  const [game, setGame] = useState<Chess>(new Chess());
  const [classification, setClassification] = useState<Classification | null>(
    null
  );
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);
  const [sourceSquare, setSourceSquare] = useState<Move["from"] | null>(null);
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | null>(
    null
  );
  const [history, setHistory] = useState<Record<number, string | null>>({});
  const [moveSquares, setMoveSquares] = useState({});
  const [fen, setFen] = useState<string>(STARTING_POS_FEN);

  const { engine } = useEngineContext();
  const { puzzle, setPuzzle } = useContext(PuzzleContext);
  const { theme } = useContext(ThemeContext);

  const [moveFeedback, setMoveFeedback] = useState<{
    best: string | null;
    played: string | null;
  }>({ best: "", played: "" });

  const { puzzleIndex, nextPuzzle, prevPuzzle, jumpToPuzzle } = useChangePuzzle(
    puzzles,
    setDestinationSquare,
    setSourceSquare,
    setFen,
    setMoveFeedback,
    setClassification,
    setIsPuzzleSolved
  );

  const { executeComputerMove } = useComputerMove(setGame, setFen);

  useEffect(() => {
    if (history[puzzleIndex] && classification === null) return;

    setHistory({ ...history, [puzzleIndex]: classification });
  }, [classification, puzzleIndex]);

  useEffect(() => {
    const currentPuzzle = puzzles[puzzleIndex] || puzzles[0];
    if (!currentPuzzle) return;

    setPuzzle(currentPuzzle);
    setFen(currentPuzzle.fen.previous);
    game.load(currentPuzzle.fen.previous);
    setClassification(null);
    setIsPuzzleSolved(false);
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
      handleEvaluation(
        MoveClassification.Book,
        movePlayedByUser.to,
        isMoveAccepted
      );
      return true;
    }

    return false;
  };

  const handleMoveAttempt = (sourceSquare: string, targetSquare: string) => {
    if (isPuzzleSolved) return false;

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

    playSound(game, movePlayedByUser);
    setFen(game.fen());
    setMoveSquares({});

    return true;
  };

  const handleEvaluation = (
    classificationResult: Classification | null,
    dstSquare: Square,
    solved: boolean
  ) => {
    setClassification(classificationResult);
    setDestinationSquare(dstSquare);
    setIsPuzzleSolved(solved);
  };

  const evaluateMoveQuality = async (fen: string, move: Move, depth = 15) => {
    setIsLoadingEvaluation(true);
    try {
      if (!engine?.isReady()) {
        throw new Error("Engine is not initialized");
      }

      const result = await engine.evaluateMoveQuality(fen, move.lan, depth);

      // if (result.classification === MoveClassification.Best) {
      //   setMoveFeedback({ best: `${move.san} is the best move`, played: "" });
      // } else {
      setMoveFeedback({
        best: `${result.bestMove} is the best move`,
        played: `${move.san} ${ClassificationMessage[result.classification]} `,
      });
      // }

      handleEvaluation(
        result.classification,
        move.to,
        isPositiveClassification(result.classification)
      );

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
    <ThemeWrapper className="flex flex-col gap-4 md:flex-row justify-center min-h-screen gap-1 items-center p-4">
      <div className="flex flex-col">
      
      <InteractiveChessBoard
        game={game}
        sourceSquare={sourceSquare}
        destinationSquare={destinationSquare}
        classification={classification}
        moveSquares={moveSquares}
        isLoadingEvaluation={isLoadingEvaluation}
        solved={isPuzzleSolved}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />
      </div>
      
      {puzzles.length !== 0 ? (
        <ThemeWrapper className={`w-full md:w-[400px]`}>
          <div className="mb-5 flex gap-8 justify-center items-center">
            <SubmitButtonWithModal />
            <ThemeChanger />
          </div>
          <PuzzleControlPanel
            puzzleIndex={puzzleIndex}
            classification={classification}
            feedback={moveFeedback}
            nextPuzzle={nextPuzzle}
            prevPuzzle={prevPuzzle}
            unhighlightLegalMoves={unhighlightLegalMoves}
            setIsPuzzleSolved={setIsPuzzleSolved}
            setClassification={setClassification}
            jumpToPuzzle={jumpToPuzzle}
            history={history}
          />
        </ThemeWrapper>
      ) : (
        <ThemeWrapper
          style={{ height: 600 }}
          className="w-full md:w-[400px] flex flex-col gap-4 justify-center items-center p-6"
        >
          <h2
            style={{
              color: theme === "light" ? "#4d4d4d" : "#ffd700",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No Games Found on Specified Parameters
          </h2>
          <p
            style={{
              color: theme === "light" ? "#666" : "#ccc",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Try adjusting your search or explore other puzzles!
          </p>
          <div style={{ marginTop: "1rem" }}>
            <SubmitButtonWithModal />
          </div>
        </ThemeWrapper>
      )}
    </ThemeWrapper>
  );
};

export default Playground;
