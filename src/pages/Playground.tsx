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
import { Classification, MoveClassification } from "../types/move";
import PuzzleControlPanel from "../features/ControlPanel/components/ControlPanel";
import useChangePuzzle from "../features/ControlPanel/hooks/useChangePuzzle";
import { getSquareStyle } from "../utils/style";
import { PuzzleContext } from "../context/Puzzle/PuzzleContext";
import { useComputerMove } from "../features/Engine/hooks/useComputerMove";
import { useEngineContext } from "../context/Engine/EngineContext";

import Settings from "../features/Settings/components/Settings";
import SubmitButtonWithModal from "../features/Form/components/SubmitButtomWithModal";
import InteractiveChessBoard from "../features/Board/components/InteractiveBoard";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [classification, setClassification] = useState<Classification | "">("");
  const [solved, setSolved] = useState<boolean | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);

  const [sourceSquare, setSourceSquare] = useState<Move["from"] | "">("");
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );

  const [moveSquares, setMoveSquares] = useState({});

  const { puzzleIndex, fen, setFen, nextPuzzle, prevPuzzle, sessionStarted } =
    useChangePuzzle(puzzles, setDestinationSquare, setSourceSquare);

  const { engine } = useEngineContext();
  const { puzzle, setPuzzle } = useContext(PuzzleContext);
  const { executeComputerMove } = useComputerMove(setGame, setFen);

  useEffect(() => {
    return () => {
      setDestinationSquare("");
      setSolved(null);
    };
  }, []);

  useEffect(() => {
    setPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);

    if (puzzle) {
      game.load(fen);
      setFen(puzzle.fen.previous);

      if (puzzle.opponentMove?.lan) {
        executeComputerMove(game, puzzle.opponentMove.lan);
      }
    }
  }, [puzzleIndex, puzzles, setFen]);

  const unhighlightLegalMoves = useCallback(() => {
    setMoveSquares({});
  }, []);

  const handleKnownOpening = (movePlayedByUser: Move) => {
    if (checkKnownOpening(game.fen().split(" ")[0])) {
      handleEvaluation(MoveClassification.Book, movePlayedByUser.to, true);
      return true;
    }
    return false;
  };

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    if (solved) return false;

    if (isNotUserTurn(game, puzzle)) {
      return false;
    }

    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    if (!movePlayedByUser) return false;

    setSourceSquare(sourceSquare as Square);
    setDestinationSquare(targetSquare as Square);
    const bookMove = handleKnownOpening(movePlayedByUser);

    if (!bookMove) {
      evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
        handleEvaluation(
          movePlayedByUser.lan === puzzle?.userMove.lan
            ? (puzzle.evaluation.judgment?.name as Classification)
            : classification,
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
    setSolved(solved);
  };

  const evaluateMoveQuality = async (fen: string, move: Move, depth = 15) => {
    setIsLoadingEvaluation(true);
    try {
      if (!engine?.isReady()) {
        throw new Error("Engine is not initialized");
      }

      const result = await engine.evaluateMoveQuality(fen, move.lan, depth);
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
    if (solved) return;
    const piece = game.get(srcSquare);

    if (!!piece && piece.color === game.turn()) {
      setSourceSquare(srcSquare);
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }
    handlePieceDrop(sourceSquare!, srcSquare);
    unhighlightLegalMoves();
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (solved) return;

      const highlightedSquaresStyles = legalMoves.reduce((styles, move) => {
        styles[move.to] = getSquareStyle(!!move.captured);
        return styles;
      }, {} as Record<string, any>);

      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  return (
    <div className="bg-gray-700 text-white flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
      <InteractiveChessBoard
        game={game}
        puzzle={puzzle}
        destinationSquare={destinationSquare}
        sourceSquare={sourceSquare}
        classification={classification}
        moveSquares={moveSquares}
        isLoadingEvaluation={isLoadingEvaluation}
        solved={solved}
        fen={fen}
        handleSquareClick={handleSquareClick}
        handlePieceDrop={handlePieceDrop}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <Settings />
        <PuzzleControlPanel
          nextPuzzle={nextPuzzle}
          prevPuzzle={prevPuzzle}
          unhighlightLegalMoves={unhighlightLegalMoves}
          setSolved={setSolved}
          setClassification={setClassification}
          sessionStarted={sessionStarted}
        />
        <SubmitButtonWithModal text="New Session" />
      </div>
    </div>
  );
};

export default Playground;