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
import Settings from "../components/Settings/Settings";
import PuzzleControlPanel from "../components/ControlPanel/ControlPanel";
import { useEngineContext } from "../context/EngineContext";
import { PuzzleContext } from "../context/PuzzleContext";
import { STARTINGPOSFEN } from "../constants";
import SubmitButtonWithModal from "../components/Form/SubmitButtomWithModal";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  // const initialHistory: (Classification | "")[] = puzzles.map(() => "");

  const [game, setGame] = useState<Chess>(new Chess());
  const [classification, setClassification] = useState<Classification | "">("");
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);
  const [sourceSquare, setSourceSquare] = useState<Move["from"] | "">("");
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );
  const [history, setHistory] = useState<Record<number, string>>({});
  const [moveSquares, setMoveSquares] = useState({});
  const [fen, setFen] = useState<string>(STARTINGPOSFEN);

  const { engine } = useEngineContext();
  const { puzzle, setPuzzle } = useContext(PuzzleContext);
  const [moveFeedback, setMoveFeedback] = useState<{
    best: string;
    played: string;
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
    if (history[puzzleIndex] && classification === "") return;

    setHistory({ ...history, [puzzleIndex]: classification });
  }, [classification, puzzleIndex]);

  useEffect(() => {
    const currentPuzzle = puzzles[puzzleIndex] || puzzles[0];
    if (!currentPuzzle) return;

    setPuzzle(currentPuzzle);
    setFen(currentPuzzle.fen.previous);
    game.load(currentPuzzle.fen.previous);
    setClassification("");
    setIsPuzzleSolved(false);
    setSourceSquare("");
    setDestinationSquare("" as Square | "");

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
    classificationResult: "" | Classification,
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

      if (result.classification === MoveClassification.Best) {
        setMoveFeedback({ best: `${move.san} is the best move`, played: "" });
      } else {
        setMoveFeedback({
          best: `${result.bestMove} is the best move`,
          played: `${move.san} ${
            ClassificationMessage[result.classification]
          } `,
        });
      }

      handleEvaluation(
        result.classification,
        move.to,
        isPositiveClassification(result.classification)
      );

      return result.classification ?? "";
    } catch (error) {
      console.error("Error evaluating move quality:", error);
      return "";
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
  return (
    <div className="bg-gray-700 text-white flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
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
      <div className="h-96 flex flex-col  gap-4">
        <Settings />
        <SubmitButtonWithModal text="New Set" />
        <PuzzleControlPanel
          jumpToPuzzle={jumpToPuzzle}
          classification={classification}
          puzzleIndex={puzzleIndex ?? 0}
          feedback={moveFeedback}
          nextPuzzle={nextPuzzle}
          prevPuzzle={prevPuzzle}
          unhighlightLegalMoves={unhighlightLegalMoves}
          setIsPuzzleSolved={setIsPuzzleSolved}
          setClassification={setClassification}
          history={history}
        />
      </div>
    </div>
  );
};

export default Playground;
