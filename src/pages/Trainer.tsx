import React, { useState, useCallback, useRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { STARTINGPOSFEN } from "../constants";
import { Models } from "../typings";
import { playSound } from "../utils/audio/playSound";
import { normalizeCastlingMove } from "../utils/chess/normalizeCastle";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import WarningMessage from "../components/trainer/WarningMessage";

interface TrainerProps {
  puzzles: Models.Move.Info[][];
}

const Trainer: React.FC<TrainerProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess(STARTINGPOSFEN));
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<Models.Move.Info | null>(
    null
  );

  const [boardSize, setBoardSize] = useState<number>(400);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isBestMove, setIsBestMove] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const { puzzleIndex, fen, moveToNextPuzzle, moveToPreviousPuzzle, setFen } =
    useChangePuzzle(puzzles, sessionStarted, setSessionStarted);

  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const newSize = Math.min(
          window.innerWidth - 100,
          window.innerHeight - 100
        );
        setBoardSize(newSize);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);
  }, [puzzleIndex, puzzles]);

  useEffect(() => {
    if (currentPuzzle) {
      const newGame = new Chess(currentPuzzle.fen);
      setGame(newGame);
      setFen(newGame.fen());

      if (currentPuzzle.lastMove) {
        setTimeout(() => {
          const move = newGame.move(currentPuzzle.lastMove);
          playSound(newGame, move);
          setGame(newGame);
          setFen(newGame.fen());
        }, 1000);
      }
    }
  }, [currentPuzzle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const initialX = e.clientX;
    const initialWidth = boardRef.current?.offsetWidth || 650;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(200, Math.min(width, 650)));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const move = attemptMove(sourceSquare, targetSquare);
      if (!move) return false;
      const isBestMove = checkBestMove(move);
      setIsBestMove(isBestMove);
      playSound(game, move);
      setIsTransitioning(true);
      setFen(game.fen());
      setTimeout(() => setIsTransitioning(false), 300);
      setFen(game.fen());
      console.log("isBestMove", isBestMove);
      if (!isBestMove) {
        resetBoardAfterDelay();
      } else {
        setTimeout(() => {
          moveToNextPuzzle();
        }, 400);
      }
      setTimeout(() => setIsBestMove(null), 500);

      return true;
    },
    [game, fen, currentPuzzle?.evaluation.best, puzzleIndex]
  );

  const handleSquareClick = (clickedSquare: Square) => {
    const clickedPiece = game.get(clickedSquare);

    const isValidFirstClick = !clickSourceSquare && clickedPiece;
    const isSecondClick = clickSourceSquare;

    if (isValidFirstClick) {
      setClickSourceSquare(clickedSquare);

      const legalMovesFromClickedSquare = game.moves({
        square: clickedSquare,
        verbose: true,
      });
      setMoveSquares({
        [clickedSquare]: {
          borderRadius: "50%",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
          transform: "scale(0.7)",
        },
      });

      highlightLegalMoves(legalMovesFromClickedSquare);
    } else if (isSecondClick) {
      handlePieceDrop(clickSourceSquare!, clickedSquare);
      setClickSourceSquare(null);
      setMoveSquares({});
    }
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      const legalDestinationSquares = legalMoves.map((move) => move.to);

      const highlightedSquaresStyles = legalDestinationSquares.reduce(
        (styles, square) => {
          const isCaptureMove = legalMoves.some(
            (move) => move.to === square && move.captured
          );

          const squareStyle = {
            background: `radial-gradient(circle, rgba(0,0,0,.1) ${
              isCaptureMove ? "70%" : "30%"
            }, transparent 25%)`,
            borderRadius: "50%",
            zIndex: 1,
          };

          styles[square] = squareStyle;
          return styles;
        },
        {} as Record<string, any>
      );
      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  const attemptMove = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        return move;
      } catch (error) {
        console.error("Move failed", error);
      }
    },
    [game]
  );

  const checkBestMove = (move: any) => {
    return (
      normalizeCastlingMove(move.lan) ===
      normalizeCastlingMove(currentPuzzle?.evaluation.best as string)
    );
  };

  const resetBoardAfterDelay = () => {
    setTimeout(() => {
      game.load(fen);
      setFen(fen);
    }, 400);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
      <WarningMessage
        show={showWarning}
        onClose={() => setShowWarning(false)}
      />
      <div
        ref={boardRef}
        className="relative"
        style={{
          width: `${boardSize}px`,
          height: `${boardSize}px`,
          backgroundColor:
            isBestMove === null ? "grey" : isBestMove ? "green" : "red",
          transition: "background 0.9s ease-out",
        }}
      >
        <Chessboard
          position={fen}
          showBoardNotation={true}
          onSquareClick={handleSquareClick}
          animationDuration={200}
          onPieceDrop={handlePieceDrop}
          boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
          boardWidth={boardSize}
          customSquareStyles={{
            ...moveSquares,
          }}
          customBoardStyle={{
            opacity: isTransitioning ? 0.3 : 1,
          }}
        />
        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>
      <ControlPanel
        game={game}
        puzzles={puzzles}
        puzzleIndex={puzzleIndex}
        currentPuzzle={currentPuzzle}
        moveToNextPuzzle={moveToNextPuzzle}
        moveToPreviousPuzzle={moveToPreviousPuzzle}
        sessionStarted={sessionStarted}
        className="w-full md:w-auto mt-4 md:mt-0 md:ml-4"
      />
    </div>
  );
};

export default Trainer;
