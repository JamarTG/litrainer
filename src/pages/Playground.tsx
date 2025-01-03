import React, { useState, useCallback, useEffect, useContext } from "react";
import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import {
  BOARD_DIMENSIONS,
  INITIAL_FORM_STATE,
  INITIAL_MATERIAL,
} from "../constants";
import {
  attemptMove,
  checkKnownOpening,
  isPositiveClassification,
  isNotUserTurn,
} from "../utils/chess";
import { Classification, MoveClassification } from "../types/move";
import PuzzleControlPanel from "../features/ControlPanel/components/ControlPanel";
import useChangePuzzle from "../features/ControlPanel/hooks/useChangePuzzle";
import useResizableBoard from "../features/Board/hooks/useResizableBoard";
import { Materials } from "../types/eval";
import { getSquareStyle } from "../utils/style";
import { PuzzleContext } from "../context/Puzzle/PuzzleContext";
import { useComputerMove } from "../features/Engine/hooks/useComputerMove";
import { useMaterialEffect } from "../features/Board/hooks/useMaterialEffect";
import { useMarkerPositionEffect } from "../features/Board/hooks/useMarkerPositionEffect";
import { useEngineContext } from "../context/Engine/EngineContext";
import Settings from "../features/Settings/components/Settings";
import SubmitButtonWithModal from "../features/Form/components/SubmitButtomWithModal";
import { Fields } from "../types/form";
import useHandleSubmit from "../features/Board/hooks/useHandleSubmit";
import InteractiveChessBoard from "../features/Board/components/InteractiveBoard";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [undoneMoves, setUndoneMoves] = useState<string[]>([]);
  const [classification, setClassification] = useState<Classification | "">("");
  const [solved, setSolved] = useState<boolean | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);
  const [material, setMaterial] = useState<Materials>(INITIAL_MATERIAL);
  const [sourceSquare, setSourceSquare] = useState<Move["from"] | "">("");
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );

  const [moveSquares, setMoveSquares] = useState({});
  const [markerPosition, setMarkerPosition] = useState<{
    right: number;
    top: number;
  }>({ right: 0, top: 0 });

  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);

  const { boardSize, boardRef, resizeRef, handleMouseDown } = useResizableBoard(
    BOARD_DIMENSIONS.INITIAL_SIZE,
    BOARD_DIMENSIONS.MIN_SIZE,
    BOARD_DIMENSIONS.MAX_SIZE
  );

  const { puzzleIndex, fen, setFen, nextPuzzle, prevPuzzle,sessionStarted } = useChangePuzzle(
    puzzles,
    setUndoneMoves,
    setDestinationSquare,
    setSourceSquare
  
  );

  const { engine } = useEngineContext();
  const { puzzle, setPuzzle } = useContext(PuzzleContext);
  const { executeComputerMove } = useComputerMove(setGame, setFen);

  useMaterialEffect(game, setMaterial);
  useMarkerPositionEffect(
    destinationSquare,
    boardSize,
    puzzle?.userMove.color as "w" | "b",
    setMarkerPosition
  );
  const handleSubmit = useHandleSubmit(formData, setFormData);

  useEffect(() => {
    return () => {
      setDestinationSquare("");
      setSolved(null);
    };
  }, []);

  useEffect(() => {
    setPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);

    if (puzzle) {
      setGameFen(game, puzzle.fen.previous);
      if (puzzle.opponentMove?.lan) {
        executeComputerMove(game, puzzle.opponentMove.lan);
      }
    }
  }, [puzzleIndex, puzzles, setFen]);

  const unhighlightSquares = useCallback(() => {
    setMoveSquares({});
  }, []);

  const setGameFen = useCallback(
    (game: Chess, fen: string) => {
      game.load(fen);
      setFen(fen);
    },
    [game, setFen]
  );

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
    setUndoneMoves([]);
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

        if (!isPositiveClassification(classification as Classification)) {
          setTimeout(() => {
            undoMove();
            setUndoneMoves([]);
          }, 1000);
        }
      });
    }

    // Play sound and update the board state
    playSound(game, movePlayedByUser);
    setFen(game.fen());
    setMoveSquares({});

    return true;
  };

  const undoMove = () => {
    if (game.history().length < 3) return;
    const a = game.undo();
    setUndoneMoves([a?.san || "", ...undoneMoves]);
    setFen(game.fen());
    setDestinationSquare("");
    setClassification("");
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
      const result = await engine?.evaluateMoveQuality(fen, move.lan, depth);
      if (result) {
        const { classification } = result;
        handleEvaluation(
          classification,
          move.to,
          isPositiveClassification(classification)
        );

        return classification;
      }
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
    unhighlightSquares();
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
        boardRef={boardRef}
        boardSize={boardSize}
        puzzle={puzzle}
        markerPosition={markerPosition}
        destinationSquare={destinationSquare}
        sourceSquare={sourceSquare}
        classification={classification}
        moveSquares={moveSquares}
        isLoadingEvaluation={isLoadingEvaluation}
        solved={solved}
        material={material}
        fen={fen}
        handleSquareClick={handleSquareClick}
        handlePieceDrop={handlePieceDrop}
        unhighlightSquares={unhighlightSquares}
        resizeRef={resizeRef}
        handleMouseDown={handleMouseDown}
      />
    
      <div className="flex flex-col justify-center items-center gap-4">
        <Settings />
        <PuzzleControlPanel
          nextPuzzle={nextPuzzle}
          prevPuzzle={prevPuzzle}
          unhighlightLegalMoves={unhighlightSquares}
          setSolved={setSolved}
          setClassification={setClassification}
          sessionStarted={sessionStarted}
        />
        <SubmitButtonWithModal
        text="New Session"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      </div>
    </div>
  );
};

export default Playground;
